<template>
   <div class="fixed flex justify-center items-center  top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden content-dialog   h-full scroll" v-if="isShow" id="dialog">
      <div class="relative bg-white rounded-lg p-4 overflow-auto" v-click-outside="closePopup" :class="[width, height]">
         <div @click="closePopup" v-if="displayClose" class="flex justify-end cursor-pointer">
            <Icon :type="ICON_CLOSE"></Icon>
         </div>
         <slot></slot>
      </div>
   </div>
</template>
<script setup>
import { computed } from 'vue';
import Icon from '@/components/elements/Icon.vue';
import { ICON_CLOSE } from '@/utils/constant.ts';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
   modelValue: {
      type: Boolean,
      default: '',
   },
   height: {
      type: String,
      default: 'h-auto',
   },
   width: {
      type: String,
      default: 'w-auto',
   },
   isCloseOnOutside: {
      type: Boolean,
      default: true,
   },
   displayClose: {
      type: Boolean,
      default: false,
   },
});
const vClickOutside = {
   mounted(el, binding) {
      el.__ClickOutsideHandle__ = event => {
         if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
         }
      };
      const dialog = document.getElementById('dialog');
      if (dialog) {
         dialog.addEventListener('click', el.__ClickOutsideHandle__);
      }
   },
   unmounted(el) {
      const dialog = document.getElementById('dialog');
      if (dialog) {
         dialog.removeEventListener('click', el.__ClickOutsideHandle__);
      }
   },
};

const isShow = computed({
   get: () => props.modelValue,
   set: value => emit('update:modelValue', value),
});

const closePopup = () => {
   if (props.isCloseOnOutside) {
      emit('update:modelValue', false);
   }
};
</script>
<style lang="scss" scoped>
.content-dialog {
   background: rgba(0, 0, 0, 0.5);
}
.scroll::-webkit-scrollbar {
   width: 5px;
}

.scroll::-webkit-scrollbar-thumb {
   border-radius: 2.5px;
   background-color: #a1a1a1;
}
</style>
