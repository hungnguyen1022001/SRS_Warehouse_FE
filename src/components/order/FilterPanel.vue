<template>
    <div>
        <div class="flex items-center gap-x-4 mb-4">
            <div class="flex items-center">
                <label class="font-semibold text-gray-700 text-sm mr-2">Kho hàng:</label>
                <select v-model="filters.warehouseId" @change="applyFilter"
                    class="p-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Tất cả kho hàng</option>
                    <option v-for="warehouse in warehouseList" :key="warehouse" :value="warehouse">
                        {{ warehouse }}
                    </option>
                </select>
            </div>

            <div class="flex items-center">
                <label class="font-semibold text-gray-700 text-sm mr-2">Trạng thái:</label>
                <select v-model="filters.status" @change="applyFilter"
                    class="p-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Tất cả trạng thái</option>
                    <option v-for="(status, key) in statusMap" :key="key" :value="key">
                        {{ status.text }}
                    </option>
                </select>
            </div>
        </div>

        <div class="flex items-center gap-x-4 mb-4">
            <div class="flex items-center">
                <label class="font-semibold text-gray-700 text-sm mr-2">Mã Đơn:</label>
                <input v-model="searchFilters.orderId" class="p-2 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-56"
                    placeholder="Nhập mã đơn hàng">
            </div>

            <div class="flex items-center">
                <label class="font-semibold text-gray-700 text-sm mr-2">Số Điện Thoại:</label>
                <input v-model="searchFilters.phone" class="p-2 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-56"
                    placeholder="Nhập số điện thoại">
            </div>

            <button @click="applySearchFilters"
                class="px-4 py-2 bg-[#D0E8FF] text-black font-semibold border border-[#B0D8FF] rounded-md hover:bg-[#B0D8FF] focus:outline-none transition duration-200">
                Tìm Kiếm
            </button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    warehouseList: Array,
    filters: Object,
    searchFilters: Object,
    statusMap: Object
});

const emit = defineEmits(['update:filters', 'search']);

const applyFilter = () => emit('update:filters', props.filters);
const applySearchFilters = () => emit('search', props.searchFilters);
</script>
