<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-5 rounded-md shadow-lg w-[500px]">
      <h2 class="text-lg font-bold text-gray-700 mb-3">📊 Xuất Thống Kê</h2>

      <!-- Mode -->
      <div class="mb-4 space-x-4">
        <label class="inline-flex items-center space-x-1">
          <input type="radio" value="daily" v-model="type" />
          <span>Theo ngày</span>
        </label>
        <label class="inline-flex items-center space-x-1">
          <input type="radio" value="monthly" v-model="type" />
          <span>Theo tháng</span>
        </label>
      </div>

      <!-- Date Range -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-600">Từ ngày</label>
        <input type="date" v-model="fromDate" class="border p-2 rounded w-full" />

        <label class="block text-sm font-medium text-gray-600 mt-2">Đến ngày</label>
        <input type="date" v-model="toDate" class="border p-2 rounded w-full" />
      </div>

      <!-- Warehouses -->
      <div class="border p-2 rounded-md max-h-40 overflow-y-auto mb-4">
        <label
          v-for="warehouse in warehouses"
          :key="warehouse"
          class="flex items-center space-x-2"
        >
          <input
            type="checkbox"
            :value="warehouse"
            v-model="warehouseIds"
            :disabled="warehouseIds.length >= 10 && !warehouseIds.includes(warehouse)"
          />
          <span>{{ warehouse }}</span>
        </label>
      </div>

      <p class="text-xs text-gray-500 mb-4">
        Tối đa 10 kho. Phạm vi tối đa: 15 ngày (daily), 12 tháng (monthly).
      </p>

      <div class="flex justify-end space-x-2">
        <button
          @click="$emit('cancel')"
          class="px-3 py-1 bg-gray-400 text-sm rounded-md hover:bg-gray-500"
        >
          ❌ Hủy
        </button>
        <button
          :disabled="!fromDate || !toDate || warehouseIds.length === 0"
          @click="handleConfirm"
          class="px-3 py-1 bg-green-500 text-sm rounded-md hover:bg-green-600 disabled:bg-gray-300"
        >
          📥 Xuất
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  warehouses: string[];
}>();

const emits = defineEmits<{
  (e: 'cancel'): void;
  (e: 'confirm', payload: {
    type: 'daily' | 'monthly';
    fromDate: string;
    toDate: string;
    warehouseIds: string[];
  }): void;
}>();

const type = ref<'daily' | 'monthly'>('daily');
const fromDate = ref('');
const toDate = ref('');
const warehouseIds = ref<string[]>([]);

const handleConfirm = () => {
  const start = new Date(fromDate.value);
  const end = new Date(toDate.value);

  if (end < start) {
    alert("❗ 'Đến ngày' phải lớn hơn hoặc bằng 'Từ ngày'");
    return;
  }

  if (type.value === 'daily') {
    const dayDiff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (dayDiff > 14) {
      alert("❗ Chỉ được chọn tối đa 15 ngày cho chế độ theo ngày.");
      return;
    }
  } else if (type.value === 'monthly') {
    const monthDiff =
      (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (monthDiff > 11) {
      alert("❗ Chỉ được chọn tối đa 12 tháng cho chế độ theo tháng.");
      return;
    }
  }

  emits('confirm', {
    type: type.value,
    fromDate: fromDate.value,
    toDate: toDate.value,
    warehouseIds: warehouseIds.value,
  });
};
</script>
