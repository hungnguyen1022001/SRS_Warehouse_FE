<template>
    <div v-bind="$attrs">
      <div class="relative w-full text-left" :class="selectContainer" v-click-outside="hide">
        <div class="flex items-center cursor-pointer select-none h-full m-0">
          <div class="flex items-center justify-between w-full md:px-[16px] px-[6px]">
            <div style="width: calc(100% - 40px)" @click="toggle">
              <div
                  class="truncate"
                  :title="itemActive ? itemActive[itemText] : props.placeholder"
                  :class="selectStyle"
              >
                {{ itemActive ? itemActive[itemText] : props.placeholder }}
              </div>
            </div>
            <div>
              <img src="@/assets/icons/close-white.svg" width="20" class="min-w-[20px]"
                   v-if="itemActive &&  itemActive[itemText]" @click="clearItem"/>
              <img :src="iconDown" width="14" class="min-w-[14px]" v-else-if="!isView && !disable" @click="toggle">
            </div>
          </div>
        </div>
        <div v-show="isOpen" :class="{ 'select-hide': !isOpen }" class="items text-input" id="cms-select">
          <div class="px-2">
            <input
                v-model="searchText"
                type="text"
                class="w-full px-1 focus:outline-none border border-grey-400 my-2 h-[32px]  rounded"
                ref="searchInput"
                placeholder="Tìm kiếm ..."
                @input="filterOptions"
                v-if="isSearch"
            />
          </div>
  
          <div
              v-for="(option, i) of filteredOptions"
              :key="i"
              :class="[
            selected && option[itemValue] && selected.toString() === option[itemValue].toString() ? 'active-select' : '',
            props.isChooseCountry ? 'h-auto' : 'h-[42px]',
  
          ]"
              @click="changeValue(option)"
              class="flex items-center hover:text-primaryV2-700"
          >
            <div class="flex items-center px-2 w-full">
              <div :title="option[itemText]" class="truncate">
                <div class="flex justify-center items-center" v-if="props.isChooseCountry">
                  <img width="14" :src="option.icon"> <span class="ml-2">{{ option.name }}</span>
                </div>
                <div v-else class="truncate">{{ option[itemText] }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import iconDown from '@/assets/icons/down.svg'
  import {computed, nextTick, ref, watch} from 'vue';
  
  const props = defineProps({
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    itemText: {
      type: String,
      default: 'name',
    },
    itemValue: {
      type: String,
      default: 'id',
    },
    disable: {
      type: Boolean,
      default: false,
    },
    isChooseCountry: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    isView: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: Boolean,
      default: false
    },
    isSearch: {
      type: Boolean,
      default: true
    },
    itemsSearch: {
      type: String,
      default: ''
    }
  });
  const emit = defineEmits(['update:modelValue', 'getObject']);
  const isOpen = ref(false);
  const searchInput = ref(null);
  
  const selected = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  });
  
  const itemActive = computed(() => {
    if (props.options) {
      return props.options.find((item) => item[props.itemValue] == selected.value);
    }
    return '';
  });
  
  const searchText = ref('');
  
  // remove Vietnamese accent
  const removeVietnameseAccent = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  
  const dataReturn = (list, textSearch) => {
    // have itemsSearch
    if (props.itemsSearch) {
      const itemSearch = props.itemsSearch.split(',');
      return list.filter((option) => {
        return itemSearch.some((item) => {
          const normalizedItem = removeVietnameseAccent(option[item]);
          const normalizedText = removeVietnameseAccent(textSearch);
          return normalizedItem && normalizedItem.toLowerCase().includes(normalizedText);
  
        });
      });
    } else {
      return list.filter((option) =>
          option[props.itemText]?.toLowerCase().includes(textSearch)
      );
    }
  };
  
  const filteredOptions = computed(() => {
    if (!searchText.value) {
      return props.options;
    }
    const searchTerm = searchText.value.toLowerCase();
    return dataReturn(props.options, searchTerm);
  });
  
  const toggle = () => {
    isOpen.value = !isOpen.value;
  };
  
  const hide = () => {
    isOpen.value = false;
  };
  
  
  const changeValue = (option) => {
    isOpen.value = false;
    selected.value = option[props.itemValue];
    emit('getObject', option);
  };
  
  const filterOptions = (event) => {
    searchText.value = event.target.value;
  };
  
  const clearItem = () => {
    selected.value = '';
  }
  
  watch(
      () => isOpen.value,
      (isOpen) => {
        if (isOpen && isOpen == true) {
          nextTick(() => {
            if (searchInput && searchInput.value) searchInput.value.focus()
          });
        }
      },
  );
  
  const selectContainer = computed(() => {
    return {
      'input-disable-text': props.disable, // disable
      'input-text': !props.disable, // default
      'input-border input-box ': !props.filter, // default
      'input-filter-border input-filter-box': props.filter, // filter
    }
  })
  
  const selectStyle = computed(() => {
    return {
      'input-disable-text': props.disable,
      'input-text': itemActive.value,
      'placeholder__text italic': !itemActive.value && props.placeholder && !props.disable && !props.filter,
      'placeholder__text ': !itemActive.value && props.placeholder && !props.disable && props.filter,
    };
  });
  
  const vClickOutside = {
    mounted(el, binding) {
      el.__ClickOutsideHandle__ = (event) => {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event);
        }
      };
      document.body.addEventListener('click', el.__ClickOutsideHandle__);
    },
    unmounted(el) {
      document.body.removeEventListener('click', el.__ClickOutsideHandle__);
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .items {
    @apply max-h-[200px] overflow-x-auto rounded absolute bg-primaryV2-700 w-full ;
    box-shadow: 0px 0px 10px 0px #00000040;
    position: absolute;
    background: #ffffff;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 11;
  }
  
  .items div {
    cursor: pointer;
    user-select: none;
  }
  
  /*custom scroll*/
  .items::-webkit-scrollbar {
    width: 5px;
  }
  
  .items::-webkit-scrollbar-thumb {
    border-radius: 2.5px;
    background-color: #A1A1A1;
  }
  
  .select-hide {
    display: none;
  }
  
  </style>
  