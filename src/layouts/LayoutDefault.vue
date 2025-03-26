<template>
   <div class="content min-h-[100vh]">
      <div class="header">
         <Header @toggleSidebar="toggleSidebar"></Header>
      </div>
      <div class="main-content">
         <div class="main-content__sidebar" id="sidebar">
            <Sidebar ref="sidebar" />
         </div>
         <div class="main-content__content">
            <slot></slot>
         </div>
      </div>
   </div>
   <Toasted v-if="toast.isToasted" :content="toast.content"></Toasted>
   <Loading v-if="loading.isLoading"></Loading>
   <BasePopupError v-if="toast.isPopupError" :content="toast.contentError"></BasePopupError>
</template>
<script setup>
import Sidebar from '@/components/layouts/Sidebar.vue';
import Header from '@/components/layouts/Header.vue';
import { computed, ref, watch } from 'vue';
import Toasted from '@/components/elements/Toasted.vue';
import { toastStore } from '@/stores/toasted';
import Loading from '@/components/elements/Loading.vue';
import { loadingStore } from '@/stores/loading';
import BasePopupError from '@/components/elements/BasePopupError.vue';

const sidebar = ref(null);
const toggleSidebar = () => {
   var element = document.getElementById('sidebar');
   element.classList.toggle('main-content__sidebar_sm');
   sidebar.value.openMenu();
};

const toast = toastStore();
const loading = loadingStore();

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
<style lang="scss" scoped>
$height_header: 5rem;

.content {
   @apply bg-secondary;
}

.header {
   height: $height_header;
}

.main-content {
   min-height: calc(100vh - $height_header);
   @apply flex  mt-5;

   &__sidebar {
      transition: width 500ms;
      @apply h-full w-[20rem] p-5 pt-0;
   }

   &__sidebar_sm {
      @apply h-full w-[4rem] p-3;
   }

   &__content {
      @apply rounded-xl w-full  bg-white p-8 mr-5 mb-10;
   }
}
</style>
