<template>
   <div class="bg-white content-dropdown">
      <div class="flex items-center p-3">
         <div class="avatar">
            <div>
               <Icon :type="AVATAR_DEFAULT"></Icon>
            </div>
         </div>
         <div class="pl-5 text-base-semi text-grey-800 break-all">
            {{ username }}
         </div>
      </div>
      <hr class="text-grey-400" />
      <div class="p-3 flex justify-between items-center cursor-pointer" @click="logout">
         <span class="text-base-semi text-grey-800">Logout</span>
         <span><Icon :type="LOGOUT" /> </span>
      </div>
   </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import Icon from '@/components/elements/Icon.vue';
import { AVATAR_DEFAULT, LOGOUT } from '@/utils/constant.ts';
import JwtService from "@/services/jwt.service";
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const { t } = useI18n();

const logout = () => {
   JwtService.destroyToken();
   JwtService.destroyUsername();
   window.location.reload();
   router.push('/login');
   
};

  const username = computed(() => {
    return JwtService.getUsername();
  })
</script>
<style scoped lang="scss">
.content-dropdown {
   border-radius: 0.75rem;
}
</style>
