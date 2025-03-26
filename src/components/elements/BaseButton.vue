<template>
   <button :class="['base-btn px-3', color, background, height, width, classStyle]" :disabled="disabled" :type="type" @click="$emit('onClick')" v-bind="$attrs">
      <div class="flex items-center">
         <img src="@/assets/icons/btn_search.svg" alt="icon search" v-if="props.search" />
         <slot>
            {{ props.title }}
         </slot>
      </div>
   </button>
</template>
<script setup>
const props = defineProps({
   disabled: {
      type: Boolean,
      default: false,
   },
   title: {
      type: String,
      default: '',
   },
   width: {
      type: String,
      default: 'w-full',
   },
   color: {
      type: String,
      default: 'text-white',
   },
   background: {
      type: String,
      default: 'bg-primaryV2-700',
   },
   height: {
      type: String,
      default: 'h-[40px]',
   },
   type: {
      type: String,
      default: 'button',
   },
   classStyle: {
      type: String,
      default: '',
   },
   add: {
      type: Boolean,
      default: false,
   },
   search: {
      type: Boolean,
      default: false,
   },
});
</script>
<style lang="scss" scoped>
.base-btn {
   @apply text-base-semi flex justify-center items-center rounded-md focus:outline-none;
}
</style>
