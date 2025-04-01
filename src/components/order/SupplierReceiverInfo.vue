<template>
    <div class="p-2 text-sm text-gray-600 w-56 border rounded-md">
        <div class="mb-2 border-l-4 border-[#9B59B6] pl-2 bg-[#EADCF8] rounded-r-md p-1">
            <div class="font-semibold">Nhà Cung Cấp: {{ supplierName }}</div>
            <div>Địa chỉ: {{ supplierAddress }}</div>
            <div>ĐT: {{ supplierPhone }}</div>
        </div>

        <div class="border-l-4 border-[#F1C40F] pl-2 bg-[#FEF4C5] rounded-r-md p-1">
            <div class="font-semibold">Người Nhận: {{ receiverName }}</div>
            <div>Địa chỉ: {{ receiverAddress }}</div>
            <div>ĐT: {{ receiverPhone }}</div>
        </div>
    </div>
</template>

<script setup>
defineProps(["supplierName", "supplierAddress", "supplierPhone", "receiverName", "receiverAddress", "receiverPhone"]);
</script>
