<template>
   <div class="toasted-alert ">
      <div
         id="toast-success"
         class="flex items-center p-4 mb-4  w-full max-w-xs  rounded-lg shadow"
         :class="props.content.type === 'success' ? 'border-primary-50 bg-primary-10' : 'border-error bg-error1'"
         role="alert"
      >
         <div v-if="props.content.type === 'success'">
            <Icon :type="TOAST_SUCCESS"></Icon>
         </div>
         <div v-else>
            <Icon :type="TOAST_ERROR"></Icon>
         </div>
         <div class="text-md text-grey-800 ml-2.5">{{ t(props.content.message) }}</div>
      </div>
   </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import Icon from '@/components/elements/Icon.vue';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/utils/constant.ts';

const props = defineProps({
   content: {
      type: Object,
      default: {
         type: 'success',
         message: 'Demo',
      },
   },
});
const { t } = useI18n();
</script>
<style lang="scss">
.toasted-alert {
   position: fixed;
   right: 10px;
   top: 10px;
   z-index: 1000000;
}
</style>
