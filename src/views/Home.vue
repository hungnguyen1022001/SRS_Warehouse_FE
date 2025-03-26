<template>
  <div class="relative">
    <div class="absolute top-4 left-4 flex flex-col space-y-4">
      <div class="bg-white shadow-md rounded-md p-3 w-64 border border-gray-200">
        <button @click="createOrder" class="w-full px-3 py-2 bg-yellow-500 text-sm rounded-md hover:bg-yellow-600 transition">
          ➕ Tạo Đơn Hàng
        </button>
      </div>

      <div class="bg-white shadow-md rounded-md p-3 w-64 border border-gray-200">
        <button @click="dispatchOrders" class="w-full px-3 py-2 bg-purple-500 text-sm rounded-md hover:bg-purple-600 transition">
          🚛 Điều Phối Đơn Hàng
        </button>
      </div>

      <div class="bg-white shadow-md rounded-md p-3 w-64 border border-gray-200">
        <button @click="openExportModal" class="w-full px-3 py-2 bg-red-500 text-sm rounded-md hover:bg-red-600 transition">
          📦 Xuất Đơn Hàng
        </button>
      </div>
    </div>

    <div class="absolute top-4 right-4 bg-white shadow-md rounded-md p-3 w-64 border border-gray-200">
      <h2 class="text-base font-medium text-gray-700 mb-2 text-center">Import Đơn Hàng</h2>
      <div class="border border-gray-300 p-2 rounded-md text-center">
        <input type="file" ref="fileInput" @change="handleFileUpload" accept=".xlsx, .xls" class="hidden">
        <button @click="triggerFileInput" class="px-2 py-1 bg-blue-500 text-sm rounded-md hover:bg-blue-600 transition">
          📂 Chọn file
        </button>
        <p v-if="fileName" class="mt-1 text-gray-600 text-xs truncate">📄 {{ fileName }}</p>
      </div>
      <button 
        @click="importOrders" 
        :disabled="!selectedFile" 
        class="mt-2 w-full px-3 py-1 bg-green-500 text-sm rounded-md hover:bg-green-600 transition disabled:bg-gray-300">
        📤 Import
      </button>
    </div>
    <div v-if="showExportModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-5 rounded-md shadow-lg w-96">
        <h2 class="text-lg font-bold text-gray-700 mb-3">Chọn đơn hàng để xuất</h2>
        <div class="max-h-60 overflow-y-auto border p-2 rounded-md">
          <label v-for="order in orderList" :key="order" class="flex items-center space-x-2">
            <input 
              type="checkbox" 
              :value="order" 
              v-model="selectedOrders" 
              :disabled="selectedOrders.length >= 10 && !selectedOrders.includes(order)"
            >
            <span>{{ order }}</span>
          </label>
        </div>
        <p class="text-xs text-gray-500 mt-2">Tối đa 10 đơn hàng có thể chọn.</p>
        <div class="mt-4 flex justify-end space-x-2">
          <button @click="closeExportModal" class="px-3 py-1 bg-gray-400 text-sm rounded-md hover:bg-gray-500">
            ❌ Hủy
          </button>
          <button @click="exportOrders" :disabled="selectedOrders.length === 0" 
            class="px-3 py-1 bg-green-500 text-sm rounded-md hover:bg-green-600 disabled:bg-gray-300">
            📤 Xuất
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axiosConfig from '@/services/api.ts';
import { API } from '@/utils/api.ts';
import { toastStore } from '@/stores/toasted.ts';

const router = useRouter();
const toast = toastStore();
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const fileName = ref<string>('');
const showExportModal = ref<boolean>(false);
const orderList = ref<string[]>([]);
const selectedOrders = ref<string[]>([]);

/** Mở popup xuất đơn hàng */
const openExportModal = async () => {
  try {
    const response = await axiosConfig.get(`${API.ORDER_LIST}`);
    if (response.data.status === 1) {
      orderList.value = response.data.data;
      showExportModal.value = true;
    } else {
      toast.setMessagePopupError("Không thể tải danh sách đơn hàng.");
    }
  } catch (error) {
    toast.setMessagePopupError("Lỗi khi lấy danh sách đơn hàng.");
    console.error(error);
  }
};

/** Đóng popup xuất đơn hàng */
const closeExportModal = () => {
  showExportModal.value = false;
  selectedOrders.value = [];
};

/** Xuất nhãn đơn hàng */
const exportOrders = async () => {
  if (selectedOrders.value.length === 0) {
    toast.setMessagePopupError("❌ Vui lòng chọn ít nhất 1 đơn hàng để xuất!");
    return;
  }

  try {
    toast.setMessageSuccess("📤 Đang xuất nhãn đơn hàng...");

    const response = await axiosConfig.post(`${API.ORDER_LABEL}`, selectedOrders.value, {
      responseType: 'blob',
    });

    const contentDisposition = response.headers['content-disposition'];
    const match = contentDisposition?.match(/filename="(.+?)"/);
    const fileName = match ? match[1] : `Labels_${new Date().toISOString().slice(0, 10)}.xlsx`;

    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.setMessageSuccess("✅ Xuất nhãn đơn hàng thành công!");
  } catch (error) {
    toast.setMessagePopupError("❌ Lỗi khi xuất nhãn đơn hàng!");
    console.error(error);
  } finally {
    closeExportModal();
  }
};

/** Kích hoạt chọn file */
const triggerFileInput = () => {
  fileInput.value?.click();
};

/** Xử lý khi chọn file */
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
    fileName.value = target.files[0].name;
  }
};

/** Import đơn hàng */
const importOrders = async () => {
  if (!selectedFile.value) return;

  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    toast.setMessageSuccess("Đang tải lên...");
    const response = await axiosConfig.post(`${API.ORDER_IMPORT}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data.status === 1) {
      toast.setMessageSuccess(response.data.message || 'Import thành công!');
    } else {
      toast.setMessagePopupError(response.data.message || 'Import thất bại!');
    }
  } catch (error) {
    toast.setMessagePopupError('Lỗi khi import file!');
    console.error(error);
  } finally {
    resetFile();
  }
};

/** Reset input file */
const resetFile = () => {
  selectedFile.value = null;
  fileName.value = '';
};

/** Chuyển đến trang tạo đơn hàng */
const createOrder = () => {
  router.push('/order/create');
};

/** Điều phối đơn hàng */
const dispatchOrders = async () => {
  try {
    toast.setMessageSuccess("Đang điều phối đơn hàng...");
    const response = await axiosConfig.post(`${API.ORDER_DISPATCH}`);

    if (response.data.status === 1) {
      toast.setMessageSuccess(response.data.message || "Điều phối đơn hàng thành công!");
    } else {
      toast.setMessagePopupError(response.data.message || "Điều phối đơn hàng thất bại!");
    }
  } catch (error) {
    toast.setMessagePopupError("Lỗi khi điều phối đơn hàng!");
    console.error(error);
  }
};
</script>
