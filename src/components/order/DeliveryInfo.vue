<template>
    <div class="p-2 text-sm w-56 border rounded-md bg-gray-50">
        <!-- Giao hàng thành công -->
        <div v-if="deliveredAt" class="mb-2 p-2 bg-[#D1F2C9] rounded border-l-4 border-[#4CAF50]">
            <div class="flex items-center text-green-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600 mr-1" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="font-medium">Đã giao hàng:</span>
            </div>
            <div class="pl-5 text-green-700">{{ formatDate(deliveredAt) }}</div>
        </div>

        <!-- Giao hàng thất bại -->
        <div v-if="failedDeliveries > 0" class="mb-2 p-2 bg-[#FAD2D2] rounded border-l-4 border-[#E53935]">
            <div class="flex items-center text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-600 mr-1" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span class="font-medium">Thất bại:</span>
            </div>
            <div class="pl-5 text-red-700">{{ failedDeliveries }} lần</div>
        </div>

        <!-- Đơn hoàn trả -->
        <div v-if="returnAt" class="mb-2 p-2 bg-[#FFE5B4] rounded border-l-4 border-[#FF9800]">
            <div class="flex items-center text-orange-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-600 mr-1" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                <span class="font-medium">Hoàn hàng:</span>
            </div>
            <div class="pl-5 text-orange-700">{{ formatDate(returnAt) }}</div>
        </div>

        <!-- Đơn chưa giao -->
        <div v-if="!deliveredAt && failedDeliveries === 0 && !returnAt"
            class="p-2 bg-gray-100 rounded border-l-4 border-gray-400">
            <div class="flex items-center text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 mr-1" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-medium">Đang chờ giao hàng</span>
            </div>
            <div class="pl-5 text-gray-700">Chưa có thông tin giao hàng</div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    deliveredAt: String,       // Ngày giao hàng thành công
    failedDeliveries: Number,  // Số lần giao hàng thất bại
    returnAt: String           // Ngày hoàn trả hàng (nếu có)
});

const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('vi-VN') : "Chưa có";
</script>
