<template>
   <div class="relative" :class="input__text" v-bind="$attrs">
      <img :src="user" v-if="props.email" class="image-email" />
      <Field
         :name="props.name ? props.name : 'file'"
         :type="props.type"
         as="input"
         :placeholder="props.placeholder ? props.placeholder : ''"
         class="py-[14px] focus:outline-none"
         :class="[input__box, icon__padding, input__text]"
         v-model="value"
         :rules="props.rules ? props.rules : ''"
         type="text"
         @keydown="preventKeyboard"
      />
   </div>
   <ErrorMessage :name="props.name ? props.name : 'file'" class="error-text" />
</template>
<script setup>
import { Field, ErrorMessage } from 'vee-validate';
import { computed } from 'vue';
import user from '@/assets/icons/user.svg';

const props = defineProps({
   modelValue: {
      type: String,
      default: '',
   },
   rules: {
      type: String,
      default: '',
   },
   type: {
      type: String,
      default: 'text',
   },
   name: {
      type: String,
      default: '',
   },
   placeholder: {
      type: String,
      default: '',
   },
   disable: {
      type: Boolean,
      default: false,
   },
   filter: {
      type: Boolean,
      default: false,
   },
   email: {
      type: Boolean,
      default: false,
   },
   otp: {
      type: Boolean,
      default: false,
   },
});

const preventKeyboard = e => {
   const ruleNumber = ['numeric', 'float'];
   const keyCode = e.keyCode || e.which;
   const isAlphabet = (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122);
   const isNumericKey = (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
   const isShortcutKey = e.shiftKey || e.ctrlKey || e.altKey || e.metaKey;

   if (ruleNumber.some(rule => props.rules.includes(rule)) && isAlphabet && !isNumericKey && !isShortcutKey) {
      e.preventDefault();
   }
};

const emit = defineEmits(['update:modelValue']);

const value = computed({
   get: () => props.modelValue,
   set: value => emit('update:modelValue', value),
});

const icon__padding = computed(() => {
   return {
      'pr-[16px] pl-16': props.email,
      'px-[16px]': !props.email,
   };
});

const input__box = computed(() => {
   return {
      'input-border input-box': !props.filter, // default
      'input-filter-border input-filter-box ': props.filter, // filter
      'input-border input-auth-box ': !props.filter && props.email, //email
   };
});

const input__text = computed(() => {
   return {
      'input-disable-text': props.disable,
      'input-text': !props.disable,
   };
});
</script>
<style lang="scss" scoped>
.image-email {
   top: calc((100% - 24px) / 2);
   @apply absolute left-4 cursor-pointer border-r border-grey-500 pr-3;
}
</style>
