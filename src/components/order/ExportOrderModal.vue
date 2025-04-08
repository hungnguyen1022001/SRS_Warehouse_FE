<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-5 rounded-md shadow-lg w-96">
        <h2 class="text-lg font-bold text-gray-700 mb-3">Chọn đơn hàng để xuất</h2>
        <div class="max-h-60 overflow-y-auto border p-2 rounded-md">
          <label
            v-for="order in orderList"
            :key="order"
            class="flex items-center space-x-2"
          >
            <input
              type="checkbox"
              :value="order"
              v-model="selectedOrders"
              :disabled="selectedOrders.length >= 10 && !selectedOrders.includes(order)"
            />
            <span>{{ order }}</span>
          </label>
        </div>
        <p class="text-xs text-gray-500 mt-2">Tối đa 10 đơn hàng có thể chọn.</p>
        <div class="mt-4 flex justify-end space-x-2">
          <button @click="$emit('cancel')" class="px-3 py-1 bg-gray-400 text-sm rounded-md hover:bg-gray-500">
            ❌ Hủy
          </button>
          <button
            @click="$emit('confirm', selectedOrders)"
            :disabled="selectedOrders.length === 0"
            class="px-3 py-1 bg-green-500 text-sm rounded-md hover:bg-green-600 disabled:bg-gray-300"
          >
            📤 Xuất
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const props = defineProps<{
    orderList: string[];
  }>();
  
  const emits = defineEmits<{
    (e: 'confirm', value: string[]): void;
    (e: 'cancel'): void;
  }>();
  
  const selectedOrders = ref<string[]>([]);
  
  watch(props.orderList, () => {
    selectedOrders.value = [];
  });
  </script>
  