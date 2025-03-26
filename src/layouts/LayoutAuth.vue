<template>
   <div class="flex items-center justify-center">
      <div class="w-[800px] mt-[150px]">
         <div class="content items-center justify-center flex">
            <div class="w-[70%] lg:w-[60%] xl:w-[50%]">
               <div class="flex justify-center w-full mb-3">
                  <img :src="Background" />
               </div>
               <slot></slot>
            </div>
         </div>
      </div>
   </div>
   <Toasted v-if="toast.isToasted" :content="toast.content"></Toasted>
   <Loading v-if="loading.isLoading"></Loading>
   <BasePopupError v-if="toast.isPopupError" :content="toast.contentError"></BasePopupError>
</template>
<script setup>
import Background from '@/assets/images/logo.png';
import { toastStore } from '@/stores/toasted';
import { computed, watch } from 'vue';
import Toasted from '@/components/elements/Toasted.vue';
import Loading from '@/components/elements/Loading.vue';
import { loadingStore } from '@/stores/loading';
import BasePopupError from '@/components/elements/BasePopupError.vue';

const loading = loadingStore();
const toast = toastStore();
const statusToast = computed(() => toast.isToasted);

watch(
   statusToast,
   newValue => {
      if (newValue) {
         setTimeout(() => {
            toast.closeToast();
         }, 3000);
      }
   },
   {
      immediate: true,
      deep: true,
   },
);
</script>
<style scoped lang="scss">
.background-base {
   background-size: cover;
   background-repeat: no-repeat;
   background-position: center center;
}
</style>
