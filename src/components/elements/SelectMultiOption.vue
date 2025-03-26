<template>
    <div v-bind="$attrs">
      <div class="relative w-full text-left" :class="selectContainer" v-click-outside="hide">
        <div class="flex items-center cursor-pointer select-none h-full m-0" @click="toggle">
          <div class="flex items-center justify-between w-full md:px-[16px] px-[6px]">
            <div style="width: calc(100% - 40px)">
              <div class="truncate" :class="selectStyle">
                {{ label ? label : props.placeholder }}
              </div>
            </div>
            <img :src="iconDown" width="14" class="min-w-[14px]" v-if="!disable">
          </div>
  
        </div>
        <div v-show="open" :class="{ 'select-hide': !open }" class="items input__text"
             v-if="options && options.length > 0">
          <div class="px-2">
            <input
                v-if="search"
                v-model="searchText"
                type="text"
                class="search-input"
                ref="searchInput"
                @input="filterOptions"
                placeholder="Tìm kiếm ... "
            />
          </div>
          <div class="p-2" v-if="props.select_all">
            <div class="flex items-center">
              <Checkbox @update:modelValue="selectedAll($event)" v-model="checkAll"></Checkbox>
              <div>Select all</div>
            </div>
          </div>
          <div
              v-for="(option, i) of filteredOptions"
              :key="i"
              class="p-2"
          >
            <div class="flex items-center ">
              <Checkbox @update:modelValue="changeValue($event,option)" v-model="option.checked"></Checkbox>
              <div> {{ option[itemText] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  
  import {computed, nextTick, ref, watch, watchEffect} from "vue";
  import iconDown from "@/assets/icons/down.svg";
  import Checkbox from "@/components/elements/Checkbox.vue";
  
  const emit = defineEmits(['update:modelValue', 'getObjects']);
  const props = defineProps({
    options: {
      type: Array,
      default: [],
    },
    modelValue: {
      type: Array || Number,
      default: null,
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
    placeholder: {
      type: String,
      default: ''
    },
    search: {
      type: Boolean,
      default: false,
    },
    select_all: {
      type: Boolean,
      default: false,
    }
  });
  
  const open = ref(false);
  const listOptions = ref([]);
  const searchText = ref('');
  const searchInput = ref(null);
  const label = ref('');
  let checkAll = 0;
  const resultObject = ref([])
  
  const selected = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })
  
  const isCheckAll = () => {
    checkAll = selected.value?.length === listOptions.value.length ? 1 : 0
  }
  
  const selectedLabel = () => {
    if (selected.value) {
      if (selected.value.length > 0) {
        const listTitle = listOptions.value.filter(item => selected.value.includes(item[props.itemValue]))
        label.value = listTitle.map(u => u.name).join(', ')
      } else {
        label.value = ''
      }
    }
  }
  
  watchEffect(() => {
    listOptions.value = props.options.map(item => ({
      ...item,
      checked: selected.value?.includes(item[props.itemValue]) ? 1 : 0,
    }));
    isCheckAll()
    selectedLabel()
  });
  
  /*check all*/
  const selectedAll = (event) => {
    checkAll = event;
    const result = event ? listOptions.value.map(item => item[props.itemValue]) : [];
    listOptions.value.forEach((item) => {
      item.checked = event;
    });
    if (checkAll == 1) {
      selected.value = Object.assign(selected.value, result)
    } else {
      selected.value?.splice(0, selected.value.length);
    }
    emit('getObjects', selected.value);
    emit('update:modelValue', result);
  };
  
  /*get each value*/
  const changeValue = (event, option) => {
    const result = []
    option.checked = event;
    if (event == 1) {
      selected.value.push(option[props.itemValue])
      resultObject.value.push(option)
    } else {
      const index = selected.value.indexOf(option[props.itemValue]);
      selected.value?.splice(index, 1);
      resultObject.value.splice(index, 1);
    }
    isCheckAll();
    selected.value.forEach(id => result.push(id))
    selectedLabel();
    emit('update:modelValue', result);
    emit('getObjects', resultObject.value);
  }
  
  
  /*action related to search*/
  watch(
      () => open.value,
      (open) => {
        if (open && open == true) {
          nextTick(() => {
            if (searchInput && searchInput.value) searchInput.value.focus()
          });
        }
      },
  );
  
  const filterOptions = (event) => {
    searchText.value = event.target.value;
  };
  
  const filteredOptions = computed(() => {
    const searchTerm = searchText.value.toLowerCase();
  
    if (!searchText.value) {
      return listOptions.value;
    }
  
    return listOptions.value.filter(option =>
        option[props.itemText].toLowerCase().includes(searchTerm)
    );
  });
  
  
  /*action close or open*/
  const vClickOutside = {
    mounted(el, binding) {
      el.__ClickOutsideHandle__ = (event) => {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event)
        }
  
      }
      document.body.addEventListener('click', el.__ClickOutsideHandle__)
    },
    unmounted(el) {
      document.body.removeEventListener('click', el.__ClickOutsideHandle__)
    }
  }
  const toggle = () => {
    open.value = !open.value;
  }
  const hide = () => {
    open.value = false;
  }
  
  const selectContainer = computed(() => {
    return {
      'input-disable-text ': props.disable, // disable
      'input-text': !props.disable, // default
      'input-box input-border': !props.filter, // default
    }
  })
  
  const selectStyle = computed(() => {
    return {
      'input-disable-text': props.disable,
      'input-text': label.value,
      'placeholder__text italic': selected.value?.length == 0 && props.placeholder && !props.disable,
      'placeholder__text ': selected.value?.length == 0 && props.placeholder && !props.disable,
    };
  });
  
  </script>
  <style lang="scss" scoped>
  .items {
    @apply max-h-[200px] overflow-x-auto rounded absolute w-full ;
    box-shadow: 0px 0px 10px 0px #00000040;
    position: absolute;
    background: #ffffff;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 11;
  
    .search-input {
      @apply w-full px-1 focus:outline-none border border-grey-400 my-2 h-[32px]  rounded;
    }
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
  