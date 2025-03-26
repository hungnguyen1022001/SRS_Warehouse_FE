<template>
    <div>
      <Field :name="props.name" :rules="props.rules" v-model="editorValue">
        <Editor v-model="editorValue" :init="init"></Editor>
      </Field>
      <ErrorMessage :name="props.name" class="error-text"></ErrorMessage>
    </div>
  
  
  </template>
  
  <script setup>
  import {reactive, computed, onMounted} from 'vue'
  import {Field, ErrorMessage} from "vee-validate";
  
  import Editor from '@tinymce/tinymce-vue'
  import tinymce from 'tinymce/tinymce'
  
  import 'tinymce/models/dom'
  import 'tinymce/skins/ui/oxide/skin.css'
  import 'tinymce/themes/silver'
  import 'tinymce/icons/default'
  import 'tinymce/plugins/emoticons'
  import 'tinymce/plugins/emoticons/js/emojis.js'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/media'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/code'
  import {useUploadStore} from "@/stores/upload.ts";
  
  const emit = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '500',
    },
    isProduct: {
      type: Boolean,
      default: false,
    }
  })
  
  const editorValue = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value)
    },
  })
  
  const upload = useUploadStore();
  const env = import.meta.env.VITE_BASE_URL;
  
  const uploadFile = (cb) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
  
    input.addEventListener('change', async (e) => {
      const file = e.target.files[0];
  
      const formData = new FormData();
      formData.append('type', 'products');
      formData.append('upload[0]', file);
  
      const data = await upload.uploadImage(formData)
      if (data && data.status == 1) {
        const imageUrl = env + data.data[0].url;
        const name = data.data[0].name
        cb(imageUrl, {title: name});
      }
    });
  
    input.click();
  };
  
  
  const initDefault = reactive({
    license_key: 'gpl',
    height: props.height,
    menubar: false,
    content_css: false,
    skin: false,
    plugins: 'emoticons table image media link lists code',
    toolbar: ' blocks fontfamily fontsize | bold italic underline strikethrough | align bullist numlist  | link table | image media | lineheight outdent indent| forecolor backcolor removeformat | code emoticons',
    branding: false,
    file_picker_callback: uploadFile,
    file_picker_types: 'image',
    content_style: "body { line-height: 1.5; }  a { color: #2f80ed }",
  })
  
  const initProduct = reactive({
    license_key: 'gpl',
    height: props.height,
    menubar: false,
    content_css: false,
    skin: false,
    plugins: 'emoticons table image media link lists code',
    toolbar: 'blocks fontfamily fontsize | bold italic underline strikethrough | align bullist numlist  | link table | image media | lineheight outdent indent| forecolor backcolor removeformat | code emoticons',
    branding: false,
    file_picker_callback: uploadFile,
    file_picker_types: 'image',
    content_style: "body { line-height: 1.5; }  a { color: #2f80ed }",
    font_size_formats: '8px 10px 12px 14px 16px 18px 20px 24px 30px 36px 48px',
    formats: {
      h1: {block: 'h1', styles: {'font-size': '36px'}},
      h2: {block: 'h2', styles: {'font-size': '20px'}},
      h3: {block: 'h3', styles: {'font-size': '16px'}},
      h4: {block: 'h4', styles: {'font-size': '14px'}},
      h5: {block: 'h5', styles: {'font-size': '12px'}},
      h6: {block: 'h6', styles: {'font-size': '10px'}},
    },
    style_formats: [
      {title: 'Header 1', block: 'h1', attributes: {style: 'font-size: 36px;'}},
      {title: 'Header 2', block: 'h2', attributes: {style: 'font-size: 20px;'}},
      {title: 'Header 3', block: 'h3', attributes: {style: 'font-size: 16px;'}},
      {title: 'Header 4', block: 'h4', attributes: {style: 'font-size: 14px;'}},
      {title: 'Header 5', block: 'h5', attributes: {style: 'font-size: 12px;'}},
      {title: 'Header 6', block: 'h6', attributes: {style: 'font-size: 10px;'}}
    ]
  })
  
  const init = props.isProduct ? initProduct : initDefault;
  
  </script>
  <style>
  .tox .tox-edit-area::before {
    border-color: white !important;
  }
  
  .tox-tinymce {
    @apply border border-grey-400 rounded-md ;
  }
  </style>
  
  