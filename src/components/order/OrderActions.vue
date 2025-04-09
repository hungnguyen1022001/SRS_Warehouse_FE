<template>
    <div class="flex flex-col space-y-4 w-64">
      <div class="bg-white shadow-md rounded-md p-3 border border-gray-200">
        <button @click="$emit('create')" class="w-full px-3 py-2 bg-yellow-500 text-sm rounded-md hover:bg-yellow-600 transition">
          ➕ Tạo Đơn Hàng
        </button>
      </div>
      <div class="bg-white shadow-md rounded-md p-3 border border-gray-200">
        <button @click="$emit('dispatch')" class="w-full px-3 py-2 bg-purple-500 text-sm rounded-md hover:bg-purple-600 transition">
          🚛 Điều Phối Đơn Hàng
        </button>
      </div>
      <div class="bg-white shadow-md rounded-md p-3 border border-gray-200">
        <button @click="$emit('export')" class="w-full px-3 py-2 bg-red-500 text-sm rounded-md hover:bg-red-600 transition">
          📦 Xuất Đơn Hàng
        </button>
      </div>
      <div class="bg-white shadow-md rounded-md p-3 border border-gray-200">
  <button @click="$emit('export-report')" class="w-full px-3 py-2 bg-indigo-500 text-sm rounded-md hover:bg-indigo-600 transition">
    📊 Xuất Thống Kê
  </button>
</div>
    </div>
  </template>
  
  <script setup lang="ts">
  // emits: 'create', 'dispatch', 'export'
  </script>
  