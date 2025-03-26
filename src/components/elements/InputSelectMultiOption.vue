<template>
    <Field :name="props.name" :rules="props.rules" v-model="value" >
      <SelectMultiOption :options="options" :placeholder="placeholder" :item-text="itemText" :item-value="itemValue"
                         :disable="disable"
                         v-model="value" :search="search" :select_all="select_all" v-bind="$attrs" @getObjects="emit('getObjects',$event)"/>
      <ErrorMessage :name="props.name" class="error-text"/>
    </Field>
  </template>
  
  <script setup>
  import {Field, ErrorMessage} from "vee-validate";
  import {computed} from "vue";
  import SelectMultiOption from "@/components/elements/SelectMultiOption.vue";
  
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
    name: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: ''
    },
    select_all: {
      type: Boolean,
      default: false,
    }
  });
  const emit = defineEmits(['update:modelValue','getObjects']);
  
  const value = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  });
  </script>
  
  