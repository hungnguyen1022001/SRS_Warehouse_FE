<template>
    <div>
        <div class="flex items-center gap-x-4 mb-4">
            <!-- Lọc theo kho hàng -->
            <div class="flex items-center">
                <label for="warehouseFilter" class="font-semibold text-gray-700 text-sm mr-2">Kho hàng:</label>
                <select id="warehouseFilter" v-model="state.selectedFilters.warehouseId" 
                    @change="() => { state.pagination.page = 1; fetchOrders(); }"
                    class="p-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Tất cả kho hàng</option>
                    <option v-for="warehouse in state.warehouseList" :key="warehouse.id" :value="warehouse.id">
                        {{ warehouse.name }}
                    </option>
                </select>
            </div>

            <!-- Lọc theo trạng thái -->
            <div class="flex items-center">
                <label for="statusFilter" class="font-semibold text-gray-700 text-sm mr-2">Trạng thái:</label>
                <select id="statusFilter" v-model="state.selectedFilters.status" 
                    @change="() => { state.pagination.page = 1; fetchOrders(); }"
                    class="p-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Tất cả trạng thái</option>
                    <option v-for="(status, key) in statusMap" :key="key" :value="key">
                        {{ status.text }}
                    </option>
                </select>
            </div>
        </div>

        <div class="flex items-center gap-x-4 mb-4">
            <!-- Nhập mã đơn hàng -->
            <div class="flex items-center">
                <label for="orderFilter" class="font-semibold text-gray-700 text-sm mr-2">Mã Đơn:</label>
                <input id="orderFilter" v-model="state.searchFilters.orderId"
                    class="p-2 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-56"
                    placeholder="Nhập mã đơn hàng">
            </div>

            <!-- Nhập số điện thoại -->
            <div class="flex items-center">
                <label for="phoneFilter" class="font-semibold text-gray-700 text-sm mr-2">Số Điện Thoại:</label>
                <input id="phoneFilter" v-model="state.searchFilters.phone"
                    class="p-2 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-56"
                    placeholder="Nhập số điện thoại">
            </div>


            <!-- Nút Tìm Kiếm -->
            <button @click="applySearchFilters"
                class="px-4 py-2 bg-[#D0E8FF] text-black font-semibold border border-[#B0D8FF] rounded-md hover:bg-[#B0D8FF] focus:outline-none transition duration-200">
                Tìm Kiếm
            </button>

        </div>
    </div>

    <BaseTable :headers="headers" :items="items">
        <template #order_id="{ item }">
            <div class="p-2 text-sm text-gray-600 w-40">
                <div class="font-semibold">{{ item.orderId }}</div>
                <div>Ngày tạo: {{ formatDate(item.createdAt) }}</div>
            </div>
        </template>

        <template #warehouse_info="{ item }">
            <div class="p-2 text-sm text-gray-600 w-40 border rounded-md">
                <!-- Kho hàng -->
                <div class="mb-2 border-l-4 border-[#6366F1] pl-2 bg-[#EEF2FF] rounded-r-md p-1">
                    <div class="font-semibold">Kho: {{ item.warehouseName }}</div>
                </div>
                
                <!-- Ngày nhập -->
                <div class="border-l-4 border-[#F59E0B] pl-2 bg-[#FFFBEB] rounded-r-md p-1">
                    <div>Ngày nhập: {{ formatDate(item.storedAt) }}</div>
                </div>
            </div>
        </template>

        <template #supplier_receiver_info="{ item }">
            <div class="p-2 text-sm text-gray-600 w-56 border rounded-md">
                <!-- Nhà cung cấp -->
                <div class="mb-2 border-l-4 border-[#9B59B6] pl-2 bg-[#EADCF8] rounded-r-md p-1">
                    <div class="font-semibold">Nhà Cung Cấp: {{ item.supplierName }}</div>
                    <div>Địa chỉ: {{ item.supplierAddress }}</div>
                    <div>ĐT: {{ item.supplierPhone }}</div>
                </div>

                <!-- Người nhận -->
                <div class="border-l-4 border-[#F1C40F] pl-2 bg-[#FEF4C5] rounded-r-md p-1">
                    <div class="font-semibold">Người Nhận: {{ item.receiverName }}</div>
                    <div>Địa chỉ: {{ item.receiverAddress }}</div>
                    <div>ĐT: {{ item.receiverPhone }}</div>
                </div>
            </div>
        </template>


        <template #status="{ item }">
            <div :style="{ backgroundColor: item.color, color: 'black' }"
                class="text-center py-1 px-3 font-semibold rounded-md text-sm w-24 h-10 flex items-center justify-center">
                {{ item.statusText }}
            </div>
        </template>

        <template #delivery_info="{ item }">
            <div class="p-2 text-sm w-56 border rounded-md bg-gray-50">
                <div v-if="item.deliveredAt" class="mb-2 p-1 bg-[#D1F2C9] rounded border-l-4 border-[#4CAF50]">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600 mr-1" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="font-medium text-green-800">Giao hàng:</span>
                    </div>
                    <div class="pl-5 text-green-700">{{ formatDate(item.deliveredAt) }}</div>
                </div>

                <div v-if="item.failedDeliveries > 0" class="mb-2 p-1 bg-[#FAD2D2] rounded border-l-4 border-[#E53935]">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-600 mr-1" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span class="font-medium text-red-800">Thất bại:</span>
                    </div>
                    <div class="pl-5 text-red-700">{{ item.failedDeliveries }} lần</div>
                </div>

                <div v-if="item.returnAt" class="mb-2 p-1 bg-[#FFE5B4] rounded border-l-4 border-[#FF9800]">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-600 mr-1" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        <span class="font-medium text-orange-800">Hoàn hàng:</span>
                    </div>
                    <div class="pl-5 text-orange-700">{{ formatDate(item.returnAt) }}</div>
                </div>

                <div v-if="!item.deliveredAt && item.failedDeliveries === 0 && !item.returnAt"
                    class="p-1 bg-gray-100 rounded border-l-4 border-gray-400">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 mr-1" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="font-medium text-gray-800">Đang chờ</span>
                    </div>
                    <div class="pl-5 text-gray-700">Chưa giao hàng</div>
                </div>
            </div>
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
import BaseTable from '@/components/elements/BaseTable.vue';
import Pagination from '@/components/elements/Pagination.vue';
import { loadingStore } from '@/stores/loading';
import { useRouter } from "vue-router";

const router = useRouter();

const orderStore = useOrder();
const loading = loadingStore();

const state = reactive({
    warehouseList: [],
    selectedFilters: {
        warehouseId: '',
        status: '',
        orderId: '', // Chỉ nhận giá trị khi nhấn "Tìm kiếm"
        phone: '',   // Chỉ nhận giá trị khi nhấn "Tìm kiếm"
    },
    searchFilters: {
        orderId: '', // Dùng để nhập giá trị trước khi nhấn "Tìm kiếm"
        phone: '',
    },
    pagination: {
        page: 1,
        limit: 3,
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

const fetchOrders = async () => {
    const params = {
        page: state.pagination.page - 1,
        size: state.pagination.limit,
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
    state.selectedFilters.orderId = state.searchFilters.orderId;
    state.selectedFilters.phone = state.searchFilters.phone;
    state.pagination.page = 1; // Đặt lại trang về 1 khi tìm kiếm
    fetchOrders();
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

    console.log("Xem chi tiết đơn hàng:", orderId);
    router.push( `/order/detail/${orderId}`);  
};


onMounted(fetchOrders);
</script>