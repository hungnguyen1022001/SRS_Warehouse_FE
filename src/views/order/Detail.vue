<template>
    <Breadcrumb></Breadcrumb>
  
    <!-- Tiêu đề -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">📦 Chi Tiết Đơn Hàng</h2>
    </div>
  
    <!-- Hiển thị chi tiết đơn hàng -->
    <div v-if="order" class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      
      <!-- Thông tin chung -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-700">Thông Tin Đơn Hàng</h3>
        <p><strong>Mã đơn:</strong> {{ order.orderId }}</p>
        <p v-if="order.createdAt"><strong>Ngày tạo:</strong> {{ formatDate(order.createdAt) }}</p>
        <p v-if="order.createdBy"><strong>Người tạo:</strong> {{ order.createdBy }}</p>
        <p><strong>Trạng thái:</strong> <span :class="statusClass(order.status)">{{ statusText(order.status) }}</span></p>
      </div>
  
      <!-- Thông tin nhà cung cấp -->
      <fieldset v-if="order.supplier" class="mb-6 border border-gray-300 p-4 rounded-lg">
        <legend class="text-lg font-semibold text-gray-800 px-2">🏢 Nhà Cung Cấp</legend>
        <p v-if="order.supplier.name"><strong>Tên:</strong> {{ order.supplier.name }}</p>
        <p v-if="order.supplier.address"><strong>Địa chỉ:</strong> {{ order.supplier.address }}</p>
        <p v-if="order.supplier.phone"><strong>Điện thoại:</strong> {{ order.supplier.phone }}</p>
        <p v-if="order.supplier.email"><strong>Email:</strong> {{ order.supplier.email }}</p>
      </fieldset>
  
      <!-- Thông tin người nhận -->
      <fieldset v-if="order.receiver" class="mb-6 border border-gray-300 p-4 rounded-lg">
        <legend class="text-lg font-semibold text-gray-800 px-2">📦 Người Nhận</legend>
        <p v-if="order.receiver.name"><strong>Tên:</strong> {{ order.receiver.name }}</p>
        <p v-if="order.receiver.address"><strong>Địa chỉ:</strong> {{ order.receiver.address }}</p>
        <p v-if="order.receiver.phone"><strong>Điện thoại:</strong> {{ order.receiver.phone }}</p>
        <p v-if="order.receiver.email"><strong>Email:</strong> {{ order.receiver.email }}</p>
      </fieldset>
  
      <!-- Lịch sử đơn hàng -->
      <fieldset v-if="order.orderHistories && order.orderHistories.length > 0" class="border border-gray-300 p-4 rounded-lg">
        <legend class="text-lg font-semibold text-gray-800 px-2">📜 Lịch Sử Đơn Hàng</legend>
        <table class="w-full border-collapse border border-gray-200 mt-2">
          <thead class="bg-gray-100">
            <tr>
              <th class="border p-2">Thời Gian</th>
              <th class="border p-2">Trạng Thái</th>
              <th class="border p-2">Lý Do (nếu có)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="history in order.orderHistories" :key="history.performedAt">
              <td class="border p-2">{{ formatDate(history.performedAt) }}</td>
              <td class="border p-2">{{ statusText(history.status) }}</td>
              <td class="border p-2">{{ history.failureReason || "-" }}</td>
            </tr>
          </tbody>
        </table>
      </fieldset>
  
    </div>
  
    <div v-else class="text-center text-gray-500">Đang tải dữ liệu...</div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useOrder } from "@/stores/order";
  import Breadcrumb from "@/components/layouts/Breadcrumb.vue";
  
  const route = useRoute();
  const orderStore = useOrder();
  const order = ref(null);
  
  onMounted(async () => {
    const orderId = route.params.id;
    try {
      const response = await orderStore.get_detail(orderId);
      order.value = response.data; // Lưu dữ liệu vào biến `order`
    } catch (error) {
      console.error("Lỗi khi tải chi tiết đơn hàng:", error);
    }
  });
  
  // Định dạng ngày tháng
  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleString("vi-VN") : "-";
  
  // Hiển thị trạng thái đơn hàng
  const statusText = (status) => {
    const statusMap = {
      0: "Mới tạo",
      1: "Đã lưu kho",
      2: "Thành công",
      3: "Thất bại",
      4: "Hoàn hàng",
    };
    return statusMap[status] || "Không xác định";
  };
  
  // Thêm màu cho trạng thái
  const statusClass = (status) => {
    const classMap = {
      0: "bg-gray-300 text-black px-2 py-1 rounded",
      1: "bg-blue-300 text-black px-2 py-1 rounded",
      2: "bg-green-300 text-black px-2 py-1 rounded",
      3: "bg-red-300 text-black px-2 py-1 rounded",
      4: "bg-orange-300 text-black px-2 py-1 rounded",
    };
    return classMap[status] || "bg-gray-300 text-black px-2 py-1 rounded";
  };
  </script>
  