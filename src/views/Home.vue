<template>
  <div class="relative">
    <!-- LEFT ACTIONS -->
    <div class="absolute top-4 left-4">
      <OrderActions
        @create="createOrder"
        @dispatch="dispatchOrders"
        @export="openExportModal"
      />
    </div>

    <!-- RIGHT IMPORT -->
    <div class="absolute top-4 right-4">
      <OrderImporter />
    </div>

    <!-- EXPORT MODAL -->
    <ExportOrderModal
      v-if="showExportModal"
      :orderList="orderList"
      @confirm="exportOrders"
      @cancel="closeExportModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axiosConfig from '@/services/api.ts';
import { API } from '@/utils/api.ts';
import { toastStore } from '@/stores/toasted.ts';

import OrderActions from '@/components/order/OrderActions.vue';
import OrderImporter from '@/components/order/OrderImporter.vue';
import ExportOrderModal from '@/components/order/ExportOrderModal.vue';

const router = useRouter();
const toast = toastStore();

const showExportModal = ref(false);
const orderList = ref<string[]>([]);

/** Mở modal xuất đơn hàng */
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

/** Đóng modal */
const closeExportModal = () => {
  showExportModal.value = false;
};

/** Xuất đơn hàng */
const exportOrders = async (selectedOrders: string[]) => {
  try {
    toast.setMessageSuccess("📤 Đang xuất nhãn đơn hàng...");

    const response = await axiosConfig.post(`${API.ORDER_LABEL}`, selectedOrders, {
      responseType: 'blob',
    });

    const contentDisposition = response.headers['content-disposition'];
    const match = contentDisposition?.match(/filename="(.+?)"/);
    const fileName = match ? match[1] : `Labels_${new Date().toISOString().slice(0, 10)}.xlsx`;

    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

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

/** Tạo đơn hàng */
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
