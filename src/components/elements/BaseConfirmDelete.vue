<template>
   <BaseDialog v-model="isShow" width="350px" height="auto">
      <div class="text-center p-4 text-grey-800">
         <div class="uppercase">{{ title }}</div>
         <div class="border border-dashed my-3 border-secondary"></div>
         <div class="mt-3 mb-5">{{ description }}</div>
         <div class="flex">
            <BaseButton title="Hủy" @click="cancel" class="mx-1" background="bg-grey-300" color="text-grey-800"></BaseButton>
            <BaseButton title="Xóa" @click="submit" class="mx-1"></BaseButton>
         </div>
      </div>
   </BaseDialog>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import BaseButton from './BaseButton.vue';
import BaseDialog from './BaseDialog.vue';
import { ref } from 'vue';

const isShow = defineModel();
const props = defineProps({
   title: {
      type: String,
      default: 'CONFIRM',
   },
   description: {
      type: String,
      default: 'Are you sure you want to delete this item?',
   },
});
const { t } = useI18n();

const emit = defineEmits(['cancel', 'submit']);
const cancel = () => {
   isShow.value = false;
};
const submit = () => {
   emit('submit');
};
</script>
