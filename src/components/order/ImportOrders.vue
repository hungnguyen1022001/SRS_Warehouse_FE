<template>
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
</template>

<script setup>
defineProps(["fileName", "selectedFile", "triggerFileInput", "importOrders"]);
</script>
