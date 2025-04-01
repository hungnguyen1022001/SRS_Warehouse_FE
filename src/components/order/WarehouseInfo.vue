<template>
    <div class="p-2 text-sm text-gray-600 w-40 border rounded-md">
        <div class="mb-2 border-l-4 border-[#6366F1] pl-2 bg-[#EEF2FF] rounded-r-md p-1">
            <div class="font-semibold">Kho: {{ warehouseName }}</div>
        </div>
        <div class="border-l-4 border-[#F59E0B] pl-2 bg-[#FFFBEB] rounded-r-md p-1">
            <div>Ngày nhập: {{ formatDate(storedAt) }}</div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    warehouseName: String,
    storedAt: String
});

const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleDateString('vi-VN') : '-');
</script>
