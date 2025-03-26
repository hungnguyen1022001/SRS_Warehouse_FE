<template>
    <div class="flex items-center">
      <label :for="id" class="font-semibold text-gray-700 text-sm mr-2">{{ label }}:</label>
      <select :id="id" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)"
        class="p-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
        <option value="">{{ placeholder }}</option>
        <option v-for="option in options" :key="option[optionKey]" :value="option[optionKey]">
          {{ option[optionLabel] }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup>
  defineProps({
    label: String,
    modelValue: String, // Không thể sử dụng v-model trực tiếp ở đây
    placeholder: { type: String, default: "Tất cả" },
    options: Array,
    optionKey: { type: String, default: "value" },
    optionLabel: { type: String, default: "label" },
  });
  defineEmits(["update:modelValue"]); // Lắng nghe sự kiện cập nhật
  </script>
  