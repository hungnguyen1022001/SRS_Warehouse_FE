<template>
    <div :class="[width]" class="h-[40px]">
      <div class="border border-grey-400  rounded w-full h-full">
        <div class="w-full h-full relative"
             @dragenter="dragging = true" @dragleave="dragging = false">
          <div class="w-full h-full flex items-center  pl-2 pr-4 gap-x-2" @drag="onChange">
            <img src="@/assets/icons/camera.svg" alt="camera">
            <div class="text-grey-500 text-base italic ">Upload Image</div>
          </div>
          <input type="file" @change="onChange" class="absolute top-0 right-0 left-0 bottom-0 w-full h-full opacity-0"
                 ref="inputFile" multiple :accept="accept">
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import {computed, ref} from "vue";
  import {useUploadStore} from "@/stores/upload.ts";
  import {toastStore} from "@/stores/toasted.ts";
  import {loadingStore} from "@/stores/loading.ts";
  
  const dragging = ref(false);
  const emit = defineEmits(['update:modelValue', 'objectImage']);
  const props = defineProps({
    modelValue: {
      type: [Blob, MediaSource, String, Array],
      default: ''
    },
  
    width: {
      type: String,
      default: 'w-full'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    type: {
      type: String,
      default: 'categories'
    },
    isProduct: {
      type: Boolean,
      default: false
    }
  })
  
  const inputFile = ref(null)
  const upload = useUploadStore();
  const toast = toastStore();
  const loading = loadingStore();
  
  
  const files = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })
  
  
  const onChange = async (e) => {
    loading.setLoading(true)
    let filesLocal = e.target.files || e.dataTransfer.files;
    dragging.value = false;
    if (!filesLocal.length) {
      return;
    }
    e.preventDefault()
  
    const formData = new FormData();
  
    if (props.multiple) {
      formData.append('type', props.type);
      for (let i = 0; i < filesLocal.length; i++) {
        formData.append(`upload[${i}]`, filesLocal[i]);
      }
    } else {
      formData.append('type', props.type);
      formData.append('upload[0]', filesLocal[0]);
    }
  
    const data = await upload.uploadImage(formData)
    loading.setLoading(false)
    if (data && data.status == 1) {
      toast.setMessageSuccess("Upload ảnh thành công")
      if (data.data && data.data.length == 1) {
        if (props.isProduct) {
          files.value.push({...data.data[0], isPhotoUrl: 0})
        } else {
          files.value = data.data[0].path;
        }
        emit('urlImage', data.data[0].url)
      } else {
        if (props.isProduct) {
          data.data.forEach(item => {
            files.value.push({...item, isPhotoUrl: 0})
          })
        } else {
          files.value.push(...data.data)
        }
        emit('objectImage', data.data)
      }
    }
    const fileInput = e.target;
    fileInput.value = null;
    fileInput.files = null;
  };
  
  </script>
  
  <style scoped></style>
  