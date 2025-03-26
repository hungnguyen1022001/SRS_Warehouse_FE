<template>
   <div class="pagination " v-if="total_pages >= 1">
      <button @click="prev" :disabled="hasFirst" :class="hasFirst ? 'cursor-not-allowed' : ''">
         <img src="@/assets/icons/icon-pre-pagination.svg" alt="pagination_pre" class="icon " />
      </button>
      <div v-for="page in items" :key="page.label">
         <button v-if="page.disable" class="page-link btn">
            ...
         </button>
         <button v-else @click="goto(page.label)" :class="page.active ? 'bg-[#ED1F24] !text-white' : ''">
            {{ page.label }}
         </button>
      </div>
      <button @click="next" :disabled="hasLast" :class="hasLast ? 'cursor-not-allowed' : ''">
         <img src="@/assets/icons/icon-next-pagination.svg" alt="pagination_next" class="icon " />
      </button>
   </div>
</template>

<script setup>
import { computed, onMounted, ref,watchEffect } from 'vue';

const emit = defineEmits(['update:modelValue', 'changePage']);
const props = defineProps({
   currentPage: {
      type: Number,
      default: 1,
   },
   totalItem: {
      type: Object,
      default: () => ({}),
   },
   itemProject: {
      type: Number,
      default: 10,
   },
});

const total = ref(1);
const total_pages = ref(1);

watchEffect(() => {
   console.log('Props Received:', props);
   console.log('Current Page:', props.currentPage);
   console.log('Total Items:', props.totalItem);
   console.log('Items Per Page:', props.itemProject);
   total.value = parseInt(props.totalItem);
   total_pages.value = Math.ceil(total.value / props.itemProject);
   console.log('Total Pages Calculated:', total_pages.value);
});

onMounted(() => {
   if (props.currentPage > total_pages.value) {
      props.currentPage = total_pages.value;
   }
});

const items = computed(() => {
   let valPrev = props.currentPage > 1 ? props.currentPage - 1 : 1;
   let valNext = props.currentPage < total_pages.value ? props.currentPage + 1 : total_pages.value;
   let dotsBefore = valPrev > 3 ? 2 : null;
   let dotsAfter = valNext < total_pages.value - 2 ? total_pages.value - 1 : null;

   let output = [];
   for (let i = 1; i <= total_pages.value; i++) {
      if ([1, total_pages.value, props.currentPage, valPrev, valNext, dotsBefore, dotsAfter].includes(i)) {
         output.push({
            label: i,
            active: props.currentPage == i,
            disable: [dotsBefore, dotsAfter].includes(i),
         });
      }
   }
   return output;
});

const hasFirst = computed(() => props.currentPage == 1);
const hasLast = computed(() => props.currentPage == total_pages.value);

const prev = () => {
   if (!hasFirst.value) {
      emit('changePage', props.currentPage - 1);
   }
};
const next = () => {
   if (!hasLast.value) {
      emit('changePage', props.currentPage + 1);
   }
};

const goto = pageCurrent => {
   window.scrollTo(0, 0);
   emit('changePage', pageCurrent);
};
</script>
<style lang="scss" scoped>
.pagination {
   @apply flex items-center justify-end  gap-x-[5px];
   button {
      @apply h-[32px] w-[32px] flex items-center justify-center text-grey-800 text-[13px] font-semibold rounded-lg border border-grey-300;
      img {
         @apply min-w-[16px]  min-h-[16px];
      }
   }
}
</style>
