<template>
    <div class="flex items-center " :class="disable ? 'pointer-events-none':''">
      <input type="checkbox"  v-model="selected" :id="idCheckBox ? idCheckBox : uniqueId"
             :class="disable ? 'input-disable' :' input-default'"
             true-value="1" false-value="0">
      <label :id="idCheckBox ? idCheckBox : uniqueId" class="text-label">{{ label }}</label>
    </div>
  </template>
  
  <script setup>
  import {computed, ref} from "vue";
  
  const emit = defineEmits(['update:modelValue']);
  
  const props = defineProps({
    modelValue: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    },
    idCheckBox: {
      type: [String,Number],
      default: ''
    }
  });
  
  const selected = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', Number(value))
  })
  
  const uniqueId = ref(`radio-${Math.random().toString(36).substring(7)}`);
  
  </script>
  
  <style scoped lang="scss">
  .input-default {
    @apply accent-primaryV2-700 w-[24px] h-[24px] rounded cursor-pointer;
  }
  
  .input-disable {
    @apply w-[24px] h-[24px] relative;
    appearance: none;
  
  }
  
  .input-disable:after {
    @apply w-[24px] h-[24px] absolute bg-grey-400 rounded cursor-pointer;
    top: calc(100% - 24px)/2;
    left: calc(100% - 24px)/2;
    content: '';
  }
  
  .input-disable:checked:after {
    @apply w-[24px] h-[24px] absolute rounded cursor-pointer;
    top: calc(100% - 24px)/2;
    left: calc(100% - 24px)/2;
    content: url("@/assets/icons/checked-disable.svg");
  
  }
  
  .text-label {
    @apply text-base text-grey-800 pl-2.5;
  }
  </style>