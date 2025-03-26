<template>
    <Field :name="props.name" :rules="props.rules" v-model="value" type="text">
      <SelectOption :options="options" :placeholder="placeholder" :item-text="itemText" :item-value="itemValue"
                    :disable="disable" :is-choose-country="isChooseCountry" :is-view="isView" :isSearch="isSearch"
                    :itemsSearch="itemsSearch"
                    :filter="filter" v-model="value" v-bind="$attrs" @getObject="emit('getObject',$event)"/>
      <ErrorMessage :name="props.name" class="error-text"/>
    </Field>
  
  </template>
  
  <script setup>
  import {Field, ErrorMessage, defineRule} from "vee-validate";
  import {computed} from "vue";
  import SelectOption from "@/components/elements/SelectOption.vue";
  import {required} from "@vee-validate/rules";
  
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
    rules: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'file'
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
  
  const value = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  });
  
  defineRule("required", required);
  
  </script>
  
  