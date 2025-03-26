<template>
    <div class="flex gap-x-[34px] mb-10">
      <div v-for="(item,index) in props.listTab " :key="index" class="text-[18px] font-medium cursor-pointer">
        <div @click="changeTab(item.components,index)"
             :class="tabActive == item.components ? 'text-primary-500 underline decoration-4 underline-offset-8':'text-grey-800'">
          {{ item.name }}
        </div>
      </div>
    </div>
    <KeepAlive>
      <component :is="tabActive"></component>
    </KeepAlive>
  </template>
  
  <script setup>
  import {shallowRef, watchEffect} from "vue";
  import {useRoute} from "vue-router";
  
  const emits = defineEmits(['changeTab']);
  const props = defineProps({
    listTab: {
      type: Array,
      default: () => []
    }
  })
  
  const route = useRoute();
  
  const tabActive = shallowRef('');
  const tabRouteQuery = route.query.tab ?? ''
  
  watchEffect(() => {
    if (props.listTab && props.listTab.length > 0) {
      if (tabRouteQuery) {
        const index = Number(tabRouteQuery)
        tabActive.value = props.listTab[index]?.components
      } else {
        tabActive.value = props.listTab[0]?.components
      }
    }
  })
  
  const changeTab = (tab, index) => {
    tabActive.value = tab
    emits('changeTab', index)
  }
  </script>
  
  <style scoped lang="scss">
  
  </style>