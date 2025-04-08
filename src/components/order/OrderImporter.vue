<template>
  <div class="bg-white shadow-md rounded-md p-3 w-64 border border-gray-200">
    <h2 class="text-base font-medium text-gray-700 mb-2 text-center">Import Đơn Hàng</h2>

    <div class="border border-gray-300 p-2 rounded-md text-center">
      <input
        type="file"
        ref="fileInput"
        @change="handleFileUpload"
        accept=".xlsx, .xls"
        class="hidden"
      />
      <button
        @click="triggerFileInput"
        class="px-2 py-1 bg-blue-500 text-sm rounded-md hover:bg-blue-600 transition"
      >
        📂 Chọn file
      </button>
      <p v-if="fileName" class="mt-1 text-gray-600 text-xs truncate">
        📄 {{ fileName }}
      </p>
    </div>

    <button
      @click="importOrders"
      :disabled="!selectedFile"
      class="mt-2 w-full px-3 py-1 bg-green-500 text-sm rounded-md hover:bg-green-600 transition disabled:bg-gray-300"
    >
      📤 Import
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axiosConfig from '@/services/api';
import { API } from '@/utils/api';
import { toastStore } from '@/stores/toasted';

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const fileName = ref('');
const toast = toastStore();

// 👉 Trigger file selection dialog
const triggerFileInput = () => {
  fileInput.value?.click();
};

// 👉 Handle file selection
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file) {
    selectedFile.value = file;
    fileName.value = file.name;
  }
};

// 👉 Reset selected file
const resetFile = () => {
  selectedFile.value = null;
  fileName.value = '';
  if (fileInput.value) fileInput.value.value = '';
};

// 👉 Perform file import
const importOrders = async () => {
  if (!selectedFile.value) return;

  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    toast.setMessageSuccess('📤 Đang tải lên...');

    const response = await axiosConfig.post(API.ORDER_IMPORT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob'
    });
    console.log("response",response);
    const contentType = response.headers['content-type'];
    const contentDisposition = response.headers['content-disposition'];

    const isAttachment = contentDisposition?.includes('attachment');
    const isJson = contentType?.includes('application/json');

    if (isAttachment) {
      // ✅ Handle file download
      const matches = contentDisposition.match(/filename\*?=(?:UTF-8'')?["']?([^;"']+)["']?/);
      const decodedFileName = matches && decodeURIComponent(matches[1]);

      const blob = new Blob([response.data], {
        type: contentType || 'application/octet-stream'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = decodedFileName || 'Import_Error.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      toast.setMessagePopupError('⚠️ File có lỗi! Vui lòng kiểm tra.');
    } else if (isJson) {
      // ✅ Parse the JSON response safely
      const reader = new FileReader();
      reader.onload = function () {
        try {
          const resData = JSON.parse(reader.result as string);

          if (resData?.status === 1) {
            toast.setMessageSuccess(resData.message || '✅ Import thành công!');
          } else {
            toast.setMessagePopupError(resData.message || '❌ Import thất bại!');
          }
        } catch (err) {
          console.error('JSON parse error:', err);
          toast.setMessagePopupError('⚠️ Lỗi không xác định trong phản hồi!');
        }
      };
      reader.readAsText(response.data);
    } else {
      toast.setMessagePopupError('⚠️ Không thể xác định kiểu phản hồi!');
    }
  } catch (err) {
    console.error(err);
    toast.setMessagePopupError('❌ Lỗi khi import file!');
  } finally {
    resetFile();
  }
};

</script>
