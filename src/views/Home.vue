<template>
  <div class="relative">
    <!-- LEFT ACTIONS -->
    <OrderActions
      @create="createOrder"
      @dispatch="orderExportStore.dispatchOrders"
      @export="orderExportStore.openExportModal"
      @export-report="orderExportStore.showExportReportModal = true"
    />

    <!-- RIGHT IMPORT -->
    <div class="absolute top-4 right-4">
      <OrderImporter />
    </div>

    <!-- EXPORT ORDER MODAL -->
    <ExportOrderModal
      v-if="orderExportStore.showExportModal"
      :orderList="orderExportStore.orderList"
      @confirm="orderExportStore.exportOrders"
      @cancel="orderExportStore.showExportModal = false"
    />

    <!-- EXPORT REPORT MODAL -->
    <ExportReportModal
      v-if="orderExportStore.showExportReportModal"
      :warehouses="orderExportStore.warehouseList"
      @confirm="orderExportStore.exportReport"
      @cancel="orderExportStore.showExportReportModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 👉 Đã đổi tên store tương ứng
import { useOrderExportStore } from '@/stores/order-store';
import OrderActions from '@/components/order/OrderActions.vue';
import OrderImporter from '@/components/order/OrderImporter.vue';
import ExportOrderModal from '@/components/order/ExportOrderModal.vue';
import ExportReportModal from '@/components/order/ReportExportModal.vue';

const router = useRouter();
const orderExportStore = useOrderExportStore();

onMounted(() => {
  orderExportStore.fetchWarehouses();
});

const createOrder = () => {
  router.push('/order/create');
};
</script>
