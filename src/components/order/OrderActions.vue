<template>
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
</template>

<script setup>
defineProps(["createOrder", "dispatchOrders", "openExportModal"]);
</script>
