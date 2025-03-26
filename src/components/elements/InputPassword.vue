<template>
   <div class="h-[40px] w-full" v-bind="$attrs">
      <div class="relative">
         <img :src="iconPW" class="image-pw" />
         <Field
            :name="props.name ? props.name : 'password'"
            :type="type"
            as="input"
            :placeholder="props.placeholder ? props.placeholder : ''"
            class="py-[10px] pr-[16px] pl-16 focus:outline-none w-full  mt-1  input-auth-box input-border input-text"
            type="password"
            v-model="value"
            :rules="props.rules ? props.rules : ''"
            @keydown="preventKeyboard"
         />
         <img :src="iconHiddenPw" class="image_eye" @click="displayPw('show')" v-show="!isHidden" />
         <img :src="iconDisplayPw" class="image_eye_show" @click="displayPw('hidden')" v-show="isHidden" />
      </div>
   </div>
   <div class="pt-4">
      <ErrorMessage :name="props.name ? props.name : 'password'" class="error-text" />
   </div>
</template>
<script setup>
import { Field, ErrorMessage } from 'vee-validate';
import { computed, ref } from 'vue';
import iconHiddenPw from '@/assets/icons/hidden_pwd.svg';
import iconDisplayPw from '@/assets/icons/display_pwd.svg';
import iconPW from '@/assets/icons/password.svg';

const props = defineProps({
   modelValue: {
      type: String,
      default: '',
   },

   rules: {
      type: String,
      default: '',
   },
   fieldName: {
      type: String,
      default: 'email',
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
});

const emit = defineEmits(['update:modelValue']);
const type = ref('password');

const value = computed({
   get: () => props.modelValue,
   set: value => emit('update:modelValue', value),
});

const isHidden = ref(false);

const displayPw = text => {
   if (text === 'hidden') {
      isHidden.value = false;
      type.value = 'password';
   } else if (text === 'show') {
      isHidden.value = true;
      type.value = 'text';
   }
};

const preventKeyboard = e => {
   const keyCode = e.keyCode || e.which;
   const isEnter = keyCode == 32;
   if (isEnter) {
      e.preventDefault();
   }
};
</script>
<style lang="scss" scoped>
.image_eye {
   top: calc((100% - 16px) / 2);
   width: 20px;
   @apply absolute right-4 cursor-pointer;
}

.image_eye_show {
   top: calc((100% - 16px) / 2);
   width: 20px;
   @apply absolute right-4 cursor-pointer;
}

.image-pw {
   top: calc((100% - 16px) / 2);
   @apply absolute left-4 cursor-pointer border-r border-grey-500 pr-3;
}
</style>
