<template>
  <div class="relative">
    <!-- LEFT ACTIONS -->
    <OrderActions @create="createOrder" @dispatch="orderStore.dispatchOrders" @export="orderStore.openExportModal"
      @export-report="orderStore.showExportReportModal = true" />


    <!-- RIGHT IMPORT -->
    <div class="absolute top-4 right-4">
      <OrderImporter />
    </div>

    <!-- EXPORT ORDER MODAL -->
    <ExportOrderModal v-if="orderStore.showExportModal" :orderList="orderStore.orderList"
      @confirm="orderStore.exportOrders" @cancel="orderStore.showExportModal = false" />

    <!-- EXPORT REPORT MODAL -->
    <ExportReportModal v-if="orderStore.showExportReportModal" :warehouses="orderStore.warehouseList"
      @confirm="orderStore.exportReport" @cancel="orderStore.showExportReportModal = false" />

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/order-store.ts';

import OrderActions from '@/components/order/OrderActions.vue';
import OrderImporter from '@/components/order/OrderImporter.vue';
import ExportOrderModal from '@/components/order/ExportOrderModal.vue';
import ExportReportModal from '@/components/order/ReportExportModal.vue';

const router = useRouter();
const orderStore = useOrderStore();

onMounted(() => {
  orderStore.fetchWarehouses();
});

const createOrder = () => {
  router.push('/order/create');
};
</script>
