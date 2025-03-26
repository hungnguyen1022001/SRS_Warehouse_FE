<template>
    <Breadcrumb></Breadcrumb>
    <div>
      <!-- Filter Row -->
      <div class="flex items-center gap-x-4 mb-4">
        <!-- Area Filter Dropdown -->
        <div class="flex items-center">
          <label for="areaFilter" class="font-semibold text-gray-700 text-sm mr-2">Khu vực:</label>
          <select id="areaFilter" v-model="state.selectedFilters.areaId" @change="filterByArea"
            class="p-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Tất cả khu vực</option>
            <option v-for="area in state.areaList" :key="area.id" :value="area.id">
              {{ area.name }}
            </option>
          </select>
        </div>
  
        <!-- Status Filter Dropdown -->
        <div class="flex items-center">
          <label for="statusFilter" class="font-semibold text-gray-700 text-sm mr-2">Trạng thái:</label>
          <select id="statusFilter" v-model="state.selectedFilters.status" @change="filterByStatus"
            class="p-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Tất cả trạng thái</option>
            <option value="1">Mới Tạo</option>
            <option value="2">Giữ Căn</option>
            <option value="3">Đã Xác Nhận</option>
            <option value="4">Đã Hoàn Thành</option>
            <option value="5">Hủy đơn</option>
          </select>
        </div>
  
        <!-- Year Filter Dropdown -->
        <div class="flex items-center">
          <label for="yearFilter" class="font-semibold text-gray-700 text-sm mr-2">Năm:</label>
          <select id="yearFilter" v-model="state.selectedFilters.year" @change="filterByDate"
            class="p-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Tất cả năm</option>
            <option v-for="year in state.availableYears" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
  
        <!-- Month Filter Dropdown -->
        <div class="flex items-center">
          <label for="monthFilter" class="font-semibold text-gray-700 text-sm mr-2">Tháng:</label>
          <select id="monthFilter" v-model="state.selectedFilters.month" @change="filterByDate"
            :disabled="!state.selectedFilters.year"
            class="p-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Tất cả tháng</option>
            <option v-for="month in state.availableMonths" :key="month" :value="month">{{ month }}</option>
          </select>
        </div>
      </div>
    </div>
  
    <!-- BaseTable -->
    <BaseTable :headers="headers" :items="items">
      <template #houses="{ item }">
        <div>
          <div class="font-semibold text-lg mb-2 text-gray-800">{{ item.areaName }}</div>
          <ul class="list-none p-0">
            <li v-for="(house, index) in item.houses" :key="index"
              class="bg-gray-100 border border-gray-300 p-2 mb-2 rounded-md hover:bg-gray-200">
              {{ house.houseName }} - Số lượng: <strong>{{ house.houseAmount }}</strong>
            </li>
          </ul>
        </div>
      </template>
      <template #check_in="{ item }">
        <div class="text-sm text-gray-600">{{ item.checkIn }}</div>
      </template>
      <template #check_out="{ item }">
        <div class="text-sm text-gray-600">{{ item.checkOut }}</div>
      </template>
      <template #status="{ item }">
        <div :style="{ backgroundColor: item.backgroundColor }"
          class="text-white text-center py-1 px-2 rounded-md text-xs w-20 h-8 flex items-center justify-center">
          {{ item.status }}
        </div>
      </template>
      <template #action="{ item }">
        <div class="flex gap-2">
          <span @click="editItem(item)" class="text-blue-500 hover:text-blue-700 transition">
            <Icon :type="PENCIL" class="w-5 h-5" />
          </span>
        </div>
      </template>
    </BaseTable>
  
    <!-- Pagination -->
    <Pagination
      :total-item="state.totalItems"
      :current-page="state.pagination.page"
      :item-project="state.pagination.limit"
      @changePage="handlePageChange"
    />
  </template>
  
  <script setup>
import { reactive, ref, computed , onMounted } from 'vue';
import axiosConfig from '@/services/api.ts';
import { PENCIL } from '@/utils/constant';
import { useAuthStore } from "@/stores/auth";
import { API } from '@/utils/api.ts';
import BaseTable from '@/components/elements/BaseTable.vue';
import Pagination from '@/components/elements/Pagination.vue';
import BaseConfirmDelete from '@/components/elements/BaseConfirmDelete.vue';
import { breadcrumbsStore } from '@/stores/breadcrumb';
import Icon from '@/components/elements/Icon.vue';
import Breadcrumb from '@/components/layouts/Breadcrumb.vue';
import { useContractBookingAd } from '@/stores/contract-booking-admin';
import { loadingStore } from '@/stores/loading';
import { toastStore } from '@/stores/toasted';
import { useRouter } from 'vue-router';

// Stores and utilities
const loading = loadingStore();
const toast = toastStore();
const router = useRouter();
const auth = useAuthStore();
const breadcrumb = breadcrumbsStore();
const title = 'Danh sách hợp đồng';
const listBreadcrumb = [
    { title: 'Dashboard' },
    { title: 'Danh sách hợp đồng', src: '/contract-booking-admin' }
];
breadcrumb.setBreadcrumb(title, listBreadcrumb);
  // Pinia Store
  const contractBookingStore = useContractBookingAd();
  const getAreaList = async () => {
      try {
          const response = await axiosConfig.get(`${API.AREAVILLALIST}/${auth.userId}`);
          if (response.data && response.data.status === 1) {
              // Map response data to area list
              state.areaList = response.data.data.map(area => ({
                  id: area._id,
                  name: area.name,
              }));
          } else {
              toast.setMessageError('Không tải được danh sách khu vực');
          }
      } catch (error) {
          console.error('Lỗi khi tải danh sách khu vực:', error);
          toast.setMessageError('Đã xảy ra lỗi khi tải danh sách khu vực');
      }
  };
  
  // State
  const state = reactive({
    areaList: [],
    selectedFilters: {
      areaId: '',
      status: '',
      year: '',
      month: '',
    },
    pagination: {
      page: 1,
      limit: 3,
    },
    totalItems: computed(() => contractBookingStore.total),
    availableYears: [2022, 2023, 2024],
    availableMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  });
  
  // Table Headers
  const headers = [
    { title: 'STT', key: 'stt' },
    { title: 'Tên', key: 'cusName' },
    { title: 'Điện Thoại', key: 'cusPhone' },
    { title: 'Danh sách phòng', key: 'houses' },
    { title: 'Ngày Nhận', key: 'checkIn' },
    { title: 'Ngày Trả', key: 'checkOut' },
    { title: 'Trạng Thái', key: 'status' },
    { title: 'Action', key: 'action' },
  ];
  
  // Computed Items
  const items = computed(() => {
    const contracts = contractBookingStore.list_contract_booking_2.contracts || [];
    return contracts.map((contract, index) => ({
      _id: contract._id,
      stt: (state.pagination.page - 1) * state.pagination.limit + index + 1,
      cusName: contract.cusName,
      cusPhone: contract.cusPhone,
      checkIn: contract.checkIn,
      checkOut: contract.checkOut,
      houses: contract.houses || [],
      areaName: contract.areaName || 'Không xác định',
      ...mapStatus(contract.status),
    }));
  });
  
  // Methods
  const fetchContracts = async () => {
    const payload = {
      page: state.pagination.page,
      limit: state.pagination.limit,
      areaId: state.selectedFilters.areaId,
      status: state.selectedFilters.status,
      year: state.selectedFilters.year,
      month: state.selectedFilters.month,
    };
    await contractBookingStore.get_list(payload);
  };
  
  const handlePageChange = (page) => {
    state.pagination.page = page;
    fetchContracts();
  };
  
  const filterByArea = () => {
    state.pagination.page = 1;
    fetchContracts();
  };
  
  const filterByStatus = () => {
    state.pagination.page = 1;
    fetchContracts();
  };
  
  const filterByDate = () => {
    state.pagination.page = 1;
    fetchContracts();
  };
  
  const editItem = (item) => {
    router.push(`\/contract-booking-admin/detail/${item._id}`);
  };
  
  const mapStatus = (status) => {
    switch (status) {
        case 1: return { status: 'Mới Tạo', backgroundColor: 'lightgray' };
        case 2: return { status: 'Giữ Căn', backgroundColor: 'green' };
        case 3: return { status: 'Đã Xác Nhận', backgroundColor: 'orange' };
        case 4: return { status: 'Đã Hoàn Thành', backgroundColor: 'blue' };
        case 5: return { status: 'Hủy đơn', backgroundColor: 'red' };
        default: return { status: 'Không xác định', backgroundColor: 'gray' };
    }
};
  
  // Fetch Initial Data
  onMounted(() => {
    getAreaList();
    fetchContracts();
  });
  </script>
  <style lang="css">
  button {
    background-color: #facc15 !important; /* Màu vàng */
    color: black !important; /* Chữ màu đen */
}

</style>