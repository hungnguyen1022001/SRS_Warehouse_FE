<template>
    <div class="relative" :class="disable ? 'input-disable-text':'input-text'">
      <Field :name="props.name ? props.name : 'file'"
             :type="props.type" :placeholder="props.placeholder ? props.placeholder : ''"
             class="py-[14px] input-text focus:outline-none  input-border textarea-box"
             v-model="value"
             :rules="props.rules ? props.rules : ''"
             as="textarea"
             :rows="props.rows"
      >
      </Field>
    </div>
    <ErrorMessage :name="props.name ? props.name : 'file'" class="error-text"/>
  </template>
  <script setup>
  import {Field, ErrorMessage} from "vee-validate";
  import {computed, reactive} from "vue";
  
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 5
    }
  });
  
  
  const emit = defineEmits(['update:modelValue'])
  
  const value = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })
  
  </script>
  <style lang="scss" scoped>
  textarea {
    resize: none;
  }
  </style>
  