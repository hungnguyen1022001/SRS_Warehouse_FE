<template>
    <FilterPanel 
        :warehouseList="state.warehouseList"
        :filters="state.selectedFilters"
        :searchFilters="state.searchFilters"
        :statusMap="statusMap"
        @update:filters="fetchOrders(true)"
        @search="applySearchFilters" 
    />

    <BaseTable :headers="headers" :items="items">
        <template #order_id="{ item }">
            <div class="p-2 text-sm text-gray-600 w-40">
                <div class="font-semibold">{{ item.orderId }}</div>
                <div>Ngày tạo: {{ formatDate(item.createdAt) }}</div>
            </div>
        </template>

        <template #warehouse_info="{ item }">
            <WarehouseInfo :warehouseName="item.warehouseName" :storedAt="item.storedAt" />
        </template>

        <template #supplier_receiver_info="{ item }">
            <SupplierReceiverInfo 
                :supplierName="item.supplierName"
                :supplierAddress="item.supplierAddress"
                :supplierPhone="item.supplierPhone"
                :receiverName="item.receiverName"
                :receiverAddress="item.receiverAddress"
                :receiverPhone="item.receiverPhone"
            />
        </template>

        <template #delivery_info="{ item }">
            <DeliveryInfo 
                :deliveredAt="item.deliveredAt"
                :failedDeliveries="item.failedDeliveries"
                :returnAt="item.returnAt"
            />
        </template>

        <template #status="{ item }">
            <OrderStatus :statusText="item.statusText" :color="item.color" />
        </template>

        <template #view_detail="{ item }">
            <button @click="viewOrderDetail(item.orderId)"
                class="px-3 py-1 bg-blue-500 text-sm rounded hover:bg-blue-600 transition">
                Xem Chi Tiết
            </button>
        </template>
    </BaseTable>

    <Pagination :total-item="state.totalItems" :current-page="state.pagination.page"
        :item-project="state.pagination.limit" @changePage="handlePageChange" />
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue';
import { useOrder } from '@/stores/order';
import { useRouter } from "vue-router";
import BaseTable from '@/components/elements/BaseTable.vue';
import Pagination from '@/components/elements/Pagination.vue';
import FilterPanel from '@/components/order/FilterPanel.vue';
import WarehouseInfo from '@/components/order/WarehouseInfo.vue';
import OrderStatus from '@/components/order/OrderStatus.vue';
import SupplierReceiverInfo from '@/components/order/SupplierReceiverInfo.vue';
import DeliveryInfo from '@/components/order/DeliveryInfo.vue';
import { loadingStore } from '@/stores/loading';
import axiosConfig from "@/services/api.ts";
import { API } from "@/utils/api.ts";

const router = useRouter();
const orderStore = useOrder();
const loading = loadingStore();

const state = reactive({
    warehouseList: [], 
    selectedFilters: {
        warehouseId: '',
        status: '',
        orderId: '', 
        phone: '',
    },
    searchFilters: {
        orderId: '',
        phone: '',
    },
    pagination: {
        page: 1,
        limit: 2,
    },
    totalItems: computed(() => orderStore.total),
});

const headers = [
    { title: 'Mã Đơn', key: 'order_id', width: '100px' },
    { title: 'Kho & Ngày Nhập', key: 'warehouse_info', width: '150px' },
    { title: 'Nhà Cung Cấp & Người Nhận', key: 'supplier_receiver_info', width: '250px' },
    { title: 'Thông Tin Giao Hàng', key: 'delivery_info', width: '180px' },
    { title: 'Trạng Thái', key: 'status', width: '100px' },
    { title: 'Xem Chi Tiết', key: 'view_detail', width: '100px' },
];

const statusMap = {
    0: { text: 'New Order', color: 'lightgray' },
    1: { text: 'Stored', color: '#BFDBFE' },
    2: { text: 'Success', color: 'green' },
    3: { text: 'Delivery Failed', color: 'red' },
    4: { text: 'Returned', color: 'orange' },
};

const items = computed(() => {
    return (orderStore.list_order || []).map((order) => {
        const status = statusMap[order.status] || { text: 'Không xác định', color: 'gray' };
        return {
            orderId: order.orderId,
            createdAt: order.createdAt,
            warehouseName: order.warehouseName,
            storedAt: order.storedAt || null,
            supplierName: order.supplierName,
            supplierAddress: order.supplierAddress,
            supplierPhone: order.supplierPhone,
            receiverName: order.receiverName,
            receiverAddress: order.receiverAddress,
            receiverPhone: order.receiverPhone,
            statusText: status.text,
            color: status.color,
            failedDeliveries: order.failedDeliveries,
            deliveredAt: order.deliveredAt,
            returnAt: order.returnAt
        };
    });
});

const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleDateString('vi-VN') : '-');

const fetchWarehouseList = async () => {
    try {
        const response = await axiosConfig.get(API.WAREHOUSE_LIST)
        if (response.data.status === 1) {
            state.warehouseList = response.data.data; 
        } else {
            console.error("Lỗi lấy danh sách kho:", response.data.message);
        }
    } catch (error) {
        console.error("Lỗi kết nối API kho hàng:", error);
    }
};

const fetchOrders = async (resetPage = false) => {
    if (resetPage) {
        state.pagination.page = 1; 
    }

    const params = {
        page: state.pagination.page - 1,
        limit: state.pagination.limit,
        warehouseId: state.selectedFilters.warehouseId || undefined,
        status: state.selectedFilters.status || undefined,
        orderId: state.selectedFilters.orderId || undefined,
        phone: state.selectedFilters.phone || undefined,
    };

    loading.setLoading(true);
    await orderStore.get_list(params);
    loading.setLoading(false);
};


const applySearchFilters = () => {
    state.selectedFilters.warehouseId = state.selectedFilters.warehouseId;
    state.selectedFilters.orderId = state.searchFilters.orderId;
    state.selectedFilters.phone = state.searchFilters.phone;
    state.pagination.page = 1;
    fetchOrders(true);
};

const handlePageChange = (page) => {
    state.pagination.page = page;
    fetchOrders();
};

const viewOrderDetail = (orderId) => {
    if (!orderId) {
        console.warn("Không có orderId hợp lệ để điều hướng!");
        return;
    }
    router.push(`/order/detail/${orderId}`);
};

// Gọi API lấy danh sách kho hàng và danh sách đơn hàng khi component được mount
onMounted(async () => {
    await fetchWarehouseList();
    await fetchOrders();
});
</script>

