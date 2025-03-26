<template>
   <BaseDialog v-model="isShow" width="560px" height="auto" @update:modelValue="closePopup">
      <div class="text-center p-4 text-grey-800">
         <div class="text-grey-800 text-lg">{{ t('popup_error.title') }}</div>
         <div class="border-b mt-3 mb-6 border-grey-400"></div>
         <div class="text-grey-800 text-md">{{ props.content }}</div>
         <div class="flex justify-center mt-8">
            <BaseButton :title="t('popup_error.btn_close')" @click="closePopup" class="mx-1" background="bg-primary-800" width="w-[190px]" color="text-white"></BaseButton>
         </div>
      </div>
   </BaseDialog>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import BaseDialog from '@/components/elements/BaseDialog.vue';
import BaseButton from '@/components/elements/BaseButton.vue';
import { toastStore } from '@/stores/toasted.ts';

const props = defineProps({
   content: {
      type: String,
      default: '',
   },
});
const { t } = useI18n();

const isShow = defineModel();
const toast = toastStore();

const closePopup = () => {
   toast.isPopupError = false;
};
</script>
