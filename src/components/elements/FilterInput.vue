<template>
    <div class="flex items-center">
      <label :for="id" class="font-semibold text-gray-700 text-sm mr-2">{{ label }}:</label>
      <input :id="id" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="p-2 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-56"
        :placeholder="placeholder">
    </div>
  </template>
  
  <script setup>
  defineProps({
    label: String,
    modelValue: String,
    placeholder: { type: String, default: "Nhập dữ liệu" },
  });
  defineEmits(["update:modelValue"]);
  </script>
  