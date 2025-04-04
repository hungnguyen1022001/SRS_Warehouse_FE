<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" v-if="isOpen">
      <div class="bg-white p-5 rounded-md shadow-lg w-96 max-w-full">
        <h2 class="text-lg font-bold text-gray-700 mb-3">Xuất Thống Kê</h2>
        
        <!-- Loại báo cáo -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Loại báo cáo</label>
          <div class="flex space-x-4">
            <label class="inline-flex items-center">
              <input 
                type="radio" 
                v-model="reportService.reportType" 
                value="daily"
                class="h-4 w-4 text-blue-600"
              >
              <span class="ml-2 text-sm text-gray-700">Theo ngày</span>
            </label>
            <label class="inline-flex items-center">
              <input 
                type="radio" 
                v-model="reportService.reportType" 
                value="monthly"
                class="h-4 w-4 text-blue-600"
              >
              <span class="ml-2 text-sm text-gray-700">Theo tháng</span>
            </label>
          </div>
        </div>
  
        <!-- Khoảng thời gian -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Khoảng thời gian</label>
          <div class="flex space-x-2">
            <div class="flex-1">
              <label class="block text-xs text-gray-500 mb-1">Từ ngày</label>
              <input 
                type="date" 
                v-model="reportService.dateRange.fromDate"
                class="w-full px-2 py-1 border rounded-md text-sm"
              >
            </div>
            <div class="flex-1">
              <label class="block text-xs text-gray-500 mb-1">Đến ngày</label>
              <input 
                type="date" 
                v-model="reportService.dateRange.toDate"
                class="w-full px-2 py-1 border rounded-md text-sm"
              >
            </div>
          </div>
          <div class="mt-1">
            <p class="text-xs text-amber-600" v-if="reportService.dateRange.fromDate && reportService.dateRange.toDate">
              <span v-if="reportService.reportType === 'daily'">
                {{ reportService.daysBetween }} ngày 
                <span v-if="reportService.daysBetween > 15" class="text-red-500">(Tối đa 15 ngày)</span>
              </span>
              <span v-else>
                {{ reportService.monthsBetween }} tháng
                <span v-if="reportService.monthsBetween > 12" class="text-red-500">(Tối đa 12 tháng)</span>
              </span>
            </p>
          </div>
        </div>
  
        <!-- Chọn kho -->
        <div class="mb-4">
          <label class="flex justify-between">
            <span class="block text-sm font-medium text-gray-700 mb-1">Chọn kho (tối đa 10)</span>
            <span class="text-xs text-gray-500">Đã chọn: {{ reportService.selectedWarehouses.length }}/10</span>
          </label>
          <div class="max-h-40 overflow-y-auto border p-2 rounded-md">
            <label 
              v-for="warehouse in reportService.warehouseList" 
              :key="warehouse.id" 
              class="flex items-center space-x-2 py-1 hover:bg-gray-50"
            >
              <input 
                type="checkbox" 
                :value="warehouse.id" 
                v-model="reportService.selectedWarehouses" 
                :disabled="reportService.selectedWarehouses.length >= 10 && !reportService.selectedWarehouses.includes(warehouse.id)"
                class="h-4 w-4 text-blue-600"
              >
              <span class="text-sm">{{ warehouse.name }} ({{ warehouse.id }})</span>
            </label>
          </div>
        </div>
  
        <!-- Alerts -->
        <div class="mb-4">
          <div v-if="!reportService.isValidDateRange && reportService.dateRange.fromDate && reportService.dateRange.toDate" 
            class="p-2 bg-red-50 text-red-700 text-xs rounded border border-red-100">
            <span v-if="reportService.reportType === 'daily'">
              ⚠️ Vui lòng chọn khoảng thời gian không vượt quá 15 ngày
            </span>
            <span v-else>
              ⚠️ Vui lòng chọn khoảng thời gian không vượt quá 12 tháng
            </span>
          </div>
        </div>
  
        <!-- Buttons -->
        <div class="mt-4 flex justify-end space-x-2">
          <button 
            @click="close" 
            class="px-3 py-1 bg-gray-400 text-sm rounded-md hover:bg-gray-500 text-white"
          >
            ❌ Hủy
          </button>
          <button 
            @click="handleExport" 
            :disabled="!canExport" 
            class="px-3 py-1 bg-green-500 text-sm rounded-md hover:bg-green-600 text-white disabled:bg-gray-300"
          >
            📤 Xuất Báo Cáo
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch, computed } from 'vue';
  import { useReportService } from '@/stores/report-service';
  
  const props = defineProps<{
    isOpen: boolean;
  }>();
  
  const emit = defineEmits(['close']);
  
  const reportService = useReportService();
  
  const canExport = computed(() => {
    return reportService.isValidDateRange.value && reportService.isValidWarehouseSelection.value;
  });
  
  const handleExport = async () => {
    const success = await reportService.exportReport();
    if (success) {
      close();
    }
  };
  
  const close = () => {
    emit('close');
  };
  
  onMounted(async () => {
    await reportService.getWarehouses();
    
    // Set default dates
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);
    
    reportService.dateRange.value.toDate = today.toISOString().split('T')[0];
    reportService.dateRange.value.fromDate = lastMonth.toISOString().split('T')[0];
  });
  
  // Reset when modal is closed
  watch(() => props.isOpen, (newValue) => {
    if (!newValue) {
      reportService.selectedWarehouses.value = [];
    }
  });
  </script>