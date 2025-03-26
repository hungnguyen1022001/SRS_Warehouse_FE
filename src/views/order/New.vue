<template>
  <Breadcrumb />

  <div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold text-gray-800">Thêm Mới Đơn Hàng</h2>
  </div>

  <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
    <form @submit.prevent="submitForm">
      <fieldset class="mb-6 border border-gray-300 p-4 rounded-lg">
        <legend class="text-lg font-semibold text-gray-800 px-2">🏢 Nhà Cung Cấp</legend>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Tên Nhà Cung Cấp</label>
            <InputText v-model="form.supplier.name" placeholder="Nhập tên nhà cung cấp" />
            <p v-if="errors.supplier.name" class="text-red-500 text-sm">{{ errors.supplier.name }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Số Điện Thoại</label>
            <InputText v-model="form.supplier.phone" placeholder="Nhập số điện thoại" />
            <p v-if="errors.supplier.phone" class="text-red-500 text-sm">{{ errors.supplier.phone }}</p>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Địa Chỉ</label>
          <Textarea v-model="form.supplier.address" placeholder="Nhập địa chỉ" />
          <p v-if="errors.supplier.address" class="text-red-500 text-sm">{{ errors.supplier.address }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Vĩ Độ & Kinh Độ</label>
            <div class="flex gap-2">
              <InputText v-model="form.supplier.latitude" type="number" placeholder="Vĩ độ" class="w-1/2" />
              <InputText v-model="form.supplier.longitude" type="number" placeholder="Kinh độ" class="w-1/2" />
            </div>
            <p v-if="errors.supplier.latitude" class="text-red-500 text-sm">{{ errors.supplier.latitude }}</p>
            <p v-if="errors.supplier.longitude" class="text-red-500 text-sm">{{ errors.supplier.longitude }}</p>
          </div>
        </div>
      </fieldset>

      <fieldset class="mb-6 border border-gray-300 p-4 rounded-lg">
        <legend class="text-lg font-semibold text-gray-800 px-2">📦 Người Nhận</legend>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Tên Người Nhận</label>
            <InputText v-model="form.receiver.name" placeholder="Nhập tên người nhận" />
            <p v-if="errors.receiver.name" class="text-red-500 text-sm">{{ errors.receiver.name }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Số Điện Thoại</label>
            <InputText v-model="form.receiver.phone" placeholder="Nhập số điện thoại" />
            <p v-if="errors.receiver.phone" class="text-red-500 text-sm">{{ errors.receiver.phone }}</p>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Địa Chỉ</label>
          <Textarea v-model="form.receiver.address" placeholder="Nhập địa chỉ" />
          <p v-if="errors.receiver.address" class="text-red-500 text-sm">{{ errors.receiver.address }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Vĩ Độ & Kinh Độ</label>
            <div class="flex gap-2">
              <InputText v-model="form.receiver.latitude" type="number" placeholder="Vĩ độ" class="w-1/2" />
              <InputText v-model="form.receiver.longitude" type="number" placeholder="Kinh độ" class="w-1/2" />
            </div>
            <p v-if="errors.receiver.latitude" class="text-red-500 text-sm">{{ errors.receiver.latitude }}</p>
            <p v-if="errors.receiver.longitude" class="text-red-500 text-sm">{{ errors.receiver.longitude }}</p>
          </div>
        </div>
      </fieldset>

      <button type="submit" class="w-full bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
        🚀 Thêm Mới Đơn Hàng
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { toastStore } from "@/stores/toasted";
import { useOrder } from "@/stores/order";
import Breadcrumb from "@/components/layouts/Breadcrumb.vue";
import InputText from "@/components/elements/InputText.vue";
import Textarea from "@/components/elements/Textarea.vue";

const router = useRouter();
const toast = toastStore();
const order = useOrder();

const form = reactive({
  supplier: { name: "", address: "", phone: "", email: "", latitude: "", longitude: "" },
  receiver: { name: "", address: "", phone: "", email: "", latitude: "", longitude: "" },
});

const errors = reactive({
  supplier: { name: "", address: "", phone: "", latitude: "", longitude: "" },
  receiver: { name: "", address: "", phone: "", latitude: "", longitude: "" },
});

const validateForm = () => {
  errors.supplier.name = form.supplier.name ? "" : "Tên nhà cung cấp không được để trống";
  errors.supplier.phone = /^[0-9]{10,11}$/.test(form.supplier.phone) ? "" : "Số điện thoại không hợp lệ";
  errors.supplier.address = form.supplier.address ? "" : "Địa chỉ không được để trống";
  errors.supplier.latitude = form.supplier.latitude ? "" : "Vĩ độ không được để trống";
  errors.supplier.longitude = form.supplier.longitude ? "" : "Kinh độ không được để trống";
  
  errors.receiver.name = form.receiver.name ? "" : "Tên người nhận không được để trống";
  errors.receiver.phone = /^[0-9]{10,11}$/.test(form.receiver.phone) ? "" : "Số điện thoại không hợp lệ";
  errors.receiver.address = form.receiver.address ? "" : "Địa chỉ không được để trống";
  errors.receiver.latitude = form.receiver.latitude ? "" : "Vĩ độ không được để trống";
  errors.receiver.longitude = form.receiver.longitude ? "" : "Kinh độ không được để trống";

  return Object.values(errors.supplier).every(e => e === "") && Object.values(errors.receiver).every(e => e === "");
};

const submitForm = async () => {
  if (!validateForm()) return;

  const response = await order.create(form);

  if (response.status === 1) {
    toast.setMessageSuccess(response.message);
    router.push("/");
  } else {
    toast.setMessagePopupError(response.message);
  }
};

</script>
