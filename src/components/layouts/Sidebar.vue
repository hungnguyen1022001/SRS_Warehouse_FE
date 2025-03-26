<template>
   <div>
      <div v-for="(menu, i) in menus" :key="i" class="my-5 w-full text-[#4D4E50]">
         <!-- Parent Menu -->
         <div
            class="flex items-center justify-between pl-2 cursor-pointer item-menu text-[16px] font-medium"
            :class="getClassActive(menu)"
            @click="toggleMenu(menu)"
         >
            <div class="flex items-center">
               <Icon :type="menu.icon" :active="menu.active" />
               <span class="pl-2" v-if="isShowAll">{{ t(menu.title) }}</span>
            </div>
            <div v-if="menu?.child && menu.child.length > 0 && isShowAll">
               <Icon :type="ARROW_DOWN" :active="menu.active" />
            </div>
         </div>

         <!-- Child Menus -->
         <div v-show="menu.active && isShowAll" class="pl-4">
            <div
               v-for="(child, j) in menu.child"
               :key="j"
               class="pl-6 my-5 item-menu"
               :class="{ 'active-child': child.active }"
               @click.stop="goToPage(child)"
            >
               <div class="flex items-center cursor-pointer">
                  <Icon :type="child.icon" :active="child.active" />
                  <span class="pl-2">{{ t(child.title) }}</span>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

---

### **Script Section**

```javascript
<script setup>
import { useI18n } from 'vue-i18n';
import Icon from '../elements/Icon.vue';
import { useRoute, useRouter } from 'vue-router';
import { watchEffect, ref, computed } from 'vue';
import { getFilteredMenu } from '@/utils/menu.ts';
import { ACTIVE, INACTIVE, ARROW_DOWN } from '@/utils/constant.ts';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const isShowAll = ref(true);

// Dynamically filtered menus
const menus = ref(getFilteredMenu());

watchEffect(() => {
   menus.value.forEach(menu => {
      menu.active = menu.key === route.meta?.key ? ACTIVE : INACTIVE;

      menu.child?.forEach(child => {
         child.active = child.key === route.meta?.key ? ACTIVE : INACTIVE;
         if (child.active) {
            menu.active = ACTIVE; // Parent menu becomes active if any child is active
         }
      });
   });
});

const toggleMenu = menu => {
   if (menu.child && menu.child.length > 0) {
      menu.active = !menu.active; // Toggle parent menu visibility
   } else {
      goToPage(menu); // Navigate for leaf menus
   }
};

const goToPage = item => {
   if (item.path) {
      router.push(item.path); // Navigate to the route
   }
};

const getClassActive = menu => {
   if (menu.active && menu.child && menu.child.length > 0) {
      return 'active'; // Style for active parent menus
   }
   if (menu.active) {
      return 'active-child'; // Style for active child menus
   }
   return ''; // Default style
};

const openMenu = () => {
   isShowAll.value = !isShowAll.value; // Toggle menu visibility
};

defineExpose({ openMenu });
</script>
<style scoped lang="scss">
.active {
   @apply text-primary-500;
}

.active-child {
   @apply rounded-xl bg-white text-primary-500 py-2;
}

.item-menu {
   transition: height 500ms;

   :hover {
      @apply text-primary-500;
   }
}
</style>
