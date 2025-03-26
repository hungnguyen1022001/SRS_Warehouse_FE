<template>
    <div :class="[props.width,props.height]" v-if="src">
      <div
          class="relative h-full w-full"
          @mouseenter="isCloseHovered = true"
          @mouseleave="isCloseHovered = false"
      >
        <img :src="src"
             :alt="src"
             class="object-contain hover:opacity-40 hover:brightness-75"
             :class="[props.width,props.height,{'hover-effect':isCloseHovered}]"
             v-if="src">
        <img
            src="@/assets/icons/close-white.svg"
            class="absolute top-0 right-0 cursor-pointer" @click="emits('deleteImage')">
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import {computed, ref} from "vue";
  
  const emits = defineEmits(["update:modelValue", 'deleteImage']);
  const props = defineProps({
    modelValue: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "w-fit",
    },
    height: {
      type: String,
      default: "h-full",
    }
  });
  
  const src = computed({
    get: () => props.modelValue,
    set: (value) => emits("update:modelValue", value),
  });
  
  const isCloseHovered = ref(false);
  
  </script>
  
  <style scoped lang="scss">
  .hover-effect {
    opacity: 0.4;
    filter: brightness(0.5);
    transition: opacity 0.3s ease, filter 0.3s ease;
  }
  </style>