<template>
   <div class="flex justify-between items-center p-5">
      <div class="flex items-center">
         <div class="logo pl-6">
            <img :src="Logo" width="100" height="70" />
         </div>
      </div>
      <div>
         <div v-click-outside="closeDropdown" class="test">
            <div class="flex items-center">
               <div>
                  <Icon :type="AVATAR_DEFAULT"></Icon>
               </div>
               <span class="mx-2 text-base-m">
                  {{ username }}
               </span>
               <div @click="showDropdown" class="cursor-pointer">
                  <Icon :type="ARROW_DOWN"></Icon>
               </div>
            </div>
            <div class="dropdown" v-if="isShow">
               <DropdownProfile />
            </div>
         </div>
      </div>
   </div>
</template>
<script setup>
import Icon from '@/components/elements/Icon.vue';
import DropdownProfile from '@/components/layouts/DropdownProfile.vue';
import { ARROW_DOWN, AVATAR_DEFAULT } from '@/utils/constant.ts';
import Logo from '@/assets/images/logo.png';
import { vClickOutside } from '@/composables/clickOutside.ts';
import { computed, ref } from 'vue';
import JwtService from '@/services/jwt.service.ts';

const isShow = ref(false);

const emit = defineEmits(['toggleSidebar']);

const toggleSidebar = () => {
   emit('toggleSidebar');
};
const showDropdown = () => {
   isShow.value = !isShow.value;
};
const closeDropdown = () => {
   isShow.value = false;
};

const username = computed(() => {
   return JwtService.getUsername();
});
</script>
<style lang="scss">
.dropdown {
   z-index: 107;
   margin: 0;
   position: fixed;
   inset: 0 0 auto auto;
   transform: translate(-29px, 68px);
   box-shadow: 0px 0px 50px 0px rgba(82, 63, 105, 0.15);
   border-radius: 0.75rem;
   width: 275px;
}
</style>
