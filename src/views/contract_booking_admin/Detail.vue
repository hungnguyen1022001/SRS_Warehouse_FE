<template>
  <Breadcrumb></Breadcrumb>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Contract Information (2/3 width) -->
    <BlockContent class="lg:col-span-2">
      <!-- Contract Details -->
      <div class="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!-- Customer Name -->
        <div>
          <label for="customer_name" class="block text-sm font-medium text-gray-700">Tên khách hàng</label>
          <InputText id="customer_name" v-model="contract.cusName" placeholder="Nhập tên khách hàng"
            class="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled />
        </div>

        <!-- Customer Phone -->
        <div>
          <label for="customer_phone" class="block text-sm font-medium text-gray-700">Số điện thoại</label>
          <InputText id="customer_phone" v-model="contract.cusPhone" placeholder="Nhập số điện thoại"
            class="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled />
        </div>
      </div>

      <!-- Email -->
      <div class="mb-6">
        <label for="customer_email" class="block text-sm font-medium text-gray-700">Email</label>
        <InputText id="customer_email" v-model="contract.cusEmail" placeholder="Nhập email"
          class="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled />
      </div>

      <!-- Area -->
      <div class="mb-6">
        <label for="area_name" class="block text-sm font-medium text-gray-700">Khu vực</label>
        <InputText id="area_name" v-model="contract.areaName" placeholder="Tên khu vực"
          class="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled />
      </div>

      <!-- Danh sách nhà -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-800 mb-2">Danh sách nhà</label>
        <div class="mt-2">
          <ul class="space-y-3">
            <li v-for="house in formattedHouses" :key="house.houseId"
              class="bg-white p-4 rounded-md border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div class="flex items-center divide-x divide-gray-200">
                <div class="pr-4 flex-1">
                  <span class="text-sm font-medium text-gray-900">{{ house.houseName }}</span>
                </div>
                <div class="pl-4 flex-1">
                  <span class="text-sm text-gray-600">Số lượng: {{ house.houseAmount }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Check-in / Check-out -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label for="check_in" class="block text-sm font-medium text-gray-700">Ngày nhận phòng</label>
          <InputDate id="check_in" v-model="contract.checkIn"
            class="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled />
        </div>
        <div>
          <label for="check_out" class="block text-sm font-medium text-gray-700">Ngày trả phòng</label>
          <InputDate id="check_out" v-model="contract.checkOut"
            class="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled />
        </div>
      </div>

      <!-- House Note -->
      <div class="mb-6">
        <label for="house_note" class="block text-sm font-medium text-gray-700">Ghi chú nhà</label>
        <Textarea id="house_note" v-model="contract.houseNote" rows="4" placeholder="Nhập ghi chú nhà"
          class="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled />
      </div>

      <!-- Contract Description -->
      <div class="mb-6">
        <label for="contract_desc" class="block text-sm font-medium text-gray-700">Mô tả hợp đồng</label>
        <Textarea id="contract_desc" v-model="contract.contractDesc" rows="4" placeholder="Mô tả hợp đồng"
          class="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled />
      </div>

      <!-- Payment Note -->
      <div class="mb-6">
        <label for="payment_note" class="block text-sm font-medium text-gray-700">Ghi chú thanh toán</label>
        <Textarea id="payment_note" v-model="contract.paymentNote" rows="4" placeholder="Ghi chú thanh toán"
          class="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled />
      </div>

      <!-- Contract Status -->
      <div class="mb-6">
        <label for="status" class="block text-sm font-medium text-gray-700">Trạng thái</label>
        <InputSelectOption id="status" v-model="contract.status" :options="listStatus" item-text="status"
          item-value="id" placeholder="Chọn trạng thái" required
          class="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div v-if="contract.status === 4" class="mb-6">
        <label for="contractFee" class="block text-sm font-medium text-gray-700">Chi phí hợp đồng</label>
        <InputText id="contractFee" v-model="contract.contractFee" placeholder="Nhập phí hợp đồng"
          class="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
    </BlockContent>

    <!-- Partner Information (1/3 width) -->
    <BlockContent class="lg:col-span-1 border border-gray-300 rounded-md p-4 shadow-sm h-[320px]">
      <div class="mb-6">
        <label for="partner_name" class="block text-sm font-medium text-gray-700">Tên nhân viên</label>
        <InputText id="partner_name" v-model="contract.partnerName" placeholder="Tên đối tác"
          class="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled />
      </div>

      <div class="mb-6">
        <label for="partner_email" class="block text-sm font-medium text-gray-700">Email nhân viên</label>
        <InputText id="partner_email" v-model="contract.partnerEmail" placeholder="Email đối tác"
          class="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled />
      </div>

      <div class="mb-6">
        <label for="partner_phone" class="block text-sm font-medium text-gray-700">Số điện thoại nhân viên</label>
        <InputText id="partner_phone" v-model="contract.partnerPhone" placeholder="Số điện thoại đối tác"
          class="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled />
      </div>
    </BlockContent>

  </div>
</template>


<script setup>
import { reactive, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BlockContent from '@/components/elements/BlockContent.vue';
import Breadcrumb from '@/components/layouts/Breadcrumb.vue';
import InputSelectOption from '@/components/elements/InputSelectOption.vue';
import InputText from '@/components/elements/InputText.vue';
import Textarea from '@/components/elements/Textarea.vue';

import InputDate from '@/components/elements/InputDate.vue';
import { useContractBookingAd } from '@/stores/contract-booking-admin';
import { toastStore } from '@/stores/toasted';
import { breadcrumbsStore } from '@/stores/breadcrumb';

const route = useRoute();
const toast = toastStore();
const contractBookingAdStore = useContractBookingAd();
const breadcrumb = breadcrumbsStore();
const title = 'Chi tiết hợp đồng';
const listBreadcrumb = reactive([
  { title: 'Dashboard', src: '/' },
  { title: 'Danh sách hợp đồng', src: '/contract-booking-admin' },
  { title: 'Chi tiết hợp đồng', src: '/contract-booking-admin/detail' },
]);
breadcrumb.setBreadcrumb(title, listBreadcrumb);

const listStatus = [
  { id: 1, status: 'Mới Tạo' },
  { id: 2, status: 'Giữ căn' },
  { id: 3, status: 'Chốt đơn' },
  { id: 4, status: 'Đã hoàn thành' },
  { id: 5, status: 'Đã hủy' },
];

const contract = reactive({
  cusName: '',
  cusPhone: '',
  cusEmail: '',
  areaName: '',
  houses: [], // Raw house data
  checkIn: '',
  checkOut: '',
  houseNote: '',
  contractDesc: '',
  paymentNote: '',
  partnerName: '',
  partnerEmail: '',
  partnerPhone: '',
  contractFee: 0,
  status: '',
});

// Computed property for contract status name


// Computed property for formatted houses with status
const formattedHouses = computed(() => {
  return contract.houses.map((house) => {
    const houseStatus = listStatus.find((s) => s.id === house.status);
    return {
      ...house,
      statusName: houseStatus ? houseStatus.status : 'Không xác định',
    };
  });
});

const fetchContractDetails = async () => {
  try {
    const response = await contractBookingAdStore.detail(route.params.id);
    const data = response.contractBooking;

    Object.assign(contract, {
      cusName: data.cusName || '',
      cusPhone: data.cusPhone || '',
      cusEmail: data.cusEmail || '',
      areaName: data.areaName || '',
      houses: data.houses || [],
      checkIn: data.checkIn || '',
      checkOut: data.checkOut || '',
      houseNote: data.houseNote || '',
      contractDesc: data.contractDesc || '',
      paymentNote: data.paymentNote || '',
      partnerName: data.partnerName || '',
      partnerEmail: data.partnerEmail || '',
      partnerPhone: data.partnerPhone || '',
      contractFee: data.contractFee || 0,
      status: data.status || '',
    });
  } catch (error) {
    toast.setMessageError('Đã có lỗi xảy ra khi tải hợp đồng');
    console.error('Error fetching contract details:', error);
  }
};

onMounted(() => {
  fetchContractDetails();
});
</script>
