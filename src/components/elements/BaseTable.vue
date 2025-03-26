<template>
   <div id="baseTable">
      <div :class="[!truncate ? 'pb-[100px]' : '', 'container-table']" id="hiddenScroll">
         <table class="table-auto w-full text-sm text-left overflow-auto divide-y divide-dashed divide-secondary ">
            <thead>
               <tr>
                  <th
                     scope="col"
                     class="py-3 px-3 text-sm font-bold whitespace-nowrap text-center text-[#6F6F71]"
                     v-for="(header, i) in headers"
                     :key="i"
                     :class="[header && header.align, header && header.width]"
                  >
                     <div :class="['whitespace-break-spaces', header && header.width, header.align ?? 'text-left']">
                        <slot :name="`header_${header.key}`" :index="i" :title="header.title" :class="header && header.width">
                           <div class="title uppercase">{{ header.title }}</div>
                        </slot>
                     </div>
                  </th>
               </tr>
            </thead>
            <tbody v-if="items.length > 0" class="divide-y divide-dashed divide-secondary">
               <tr v-for="(item, i) in items" :key="i">
                  <td
                     class="py-4 px-4 text-sm-normal text-[#68696D] whitespace-nowrap"
                     v-for="(header, j) in headers"
                     :key="j"
                     :class="[header && header.padding ? header.padding : 'mx-3', header.class, truncate ? 'truncate' : '', header && header.width]"
                  >
                     <div :class="['whitespace-break-spaces', header.align ?? 'text-left']">
                        <slot :name="header.key" :item="item" :index="i" :class="header && header.width">
                           <div class="title">
                              {{ item[header.key] ? (typeof item[header.key] == 'number' && item[header.key] > 0 ? item[header.key] : item[header.key]) : ' - ' }}
                           </div>
                        </slot>
                     </div>
                  </td>
               </tr>
            </tbody>
            <tbody v-else class="divide-y divide-gray_01 divide-dashed">
               <tr>
                  <td class="text-center py-4 px-4 text-base text-grey-800 whitespace-nowrap" :colspan="headers.length">
                     {{ $t('no_data_in_table') }}
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
      <div v-if="!disablePagination" class="mt-6">
         <pagination
            :pagination="{
               per_page: 1,
               totalPage: pagination.totalPage,
            }"
            :current-page="pagination.currentPage"
            @changePage="onPageChange"
         />
      </div>
   </div>
</template>
<script setup>
import Pagination from '@/components/elements/Pagination.vue';
import { onMounted, ref } from 'vue';

const emit = defineEmits(['onPageChange', 'scrollFunction']);
const props = defineProps({
   headers: {
      type: Array,
      default: '',
   },
   items: {
      type: { Array, String },
      default: '',
   },
   pagination: {
      type: Object,
      default: () => ({}),
   },
   disablePagination: {
      type: Boolean,
      default: false,
   },
   traditional: {
      type: Boolean,
      default: false,
   },
   showMore: {
      type: Boolean,
      default: true,
   },
   truncate: {
      type: Boolean,
      default: true,
   },
});

const header_mobiles = ref([]);

const onPageChange = page => {
   emit('onPageChange', page);
};

onMounted(async () => {
   const hiddenScroll = document.getElementById('hiddenScroll');
   if (hiddenScroll) {
      let isDown = false;
      let startX;
      let scrollLeft;

      hiddenScroll.addEventListener('mousedown', function(e) {
         isDown = true;
         startX = e.pageX - hiddenScroll.offsetLeft;
         scrollLeft = hiddenScroll.scrollLeft;
      });

      hiddenScroll.addEventListener('mouseleave', function() {
         isDown = false;
      });

      hiddenScroll.addEventListener('mouseup', function() {
         isDown = false;
      });

      hiddenScroll.addEventListener('mousemove', function(e) {
         if (!isDown) return;
         e.preventDefault();
         const x = e.pageX - hiddenScroll.offsetLeft;
         const walk = (x - startX) * 3;
         hiddenScroll.scrollLeft = scrollLeft - walk;
      });
   }
   header_mobiles.value = await props.headers.filter(el => el.isShowMobile);
});
</script>
<style></style>
<style lang="scss">
#baseTable {
   .container-table-scroll {
      @apply relative  overflow-auto rounded-xl mx-[2px];
      height: calc(70vh - 20px);
   }

   .container-table {
      @apply relative  overflow-x-auto rounded-xl mx-[2px];
   }

   /*custom scroll*/
   .container-table-scroll::-webkit-scrollbar {
      width: 5px;
   }

   .container-table-scroll::-webkit-scrollbar-thumb {
      border-radius: 2.5px;
      background-color: #a1a1a1;
   }

   thead {
      position: sticky;
      top: 0;
      background-color: white;
      z-index: 1;
   }
}
</style>
