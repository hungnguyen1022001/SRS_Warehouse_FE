<template>
  <div class="text-center">
    <div class="my-10 uppercase text-lg text-grey-800">
      {{ t("login.title") }}
    </div>
  </div>

  <Form @submit="login" :validation-schema="validationSchema" v-slot="{ errors }">
    <div class="mb-4">
      <InputText 
        v-model="formData.username" 
        :placeholder="t('Nhập username')" 
        name="username"
      />
      <span v-if="errors.username" class="text-red-500 text-sm">
        {{ errors.username }}
      </span>
    </div>

    <div class="mb-3">
      <InputPassword 
        v-model="formData.password" 
        name="password" 
        :placeholder="t('Nhập mật khẩu')"
      />
      <span v-if="errors.password" class="text-red-500 text-sm">
        {{ errors.password }}
      </span>
    </div>

    <div class="mb-4">
      <InputText 
        v-model="formData.warehouseId" 
        :placeholder="t('Nhập mã kho hàng')" 
        name="warehouseId"
      />
      <span v-if="errors.warehouseId" class="text-red-500 text-sm">
        {{ errors.warehouseId }}
      </span>
    </div>

    <div class="flex justify-center mt-6">
      <BaseButton 
        class="w-full max-w-xs" 
        height="h-[48px]" 
        :title="t('login.title')" 
        type="submit"
        background="bg-primary-500"
        :disabled="loading.isLoading"
      />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import { Form } from "vee-validate";
import * as yup from "yup"; 
import InputText from "@/components/elements/InputText.vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import InputPassword from "@/components/elements/InputPassword.vue";
import { loadingStore } from "@/stores/loading.ts";
import { useAuthStore } from "@/stores/auth.ts";
import { useRouter } from "vue-router";
import { toastStore } from "@/stores/toasted.ts"; 

const { t } = useI18n();
const loading = loadingStore();
const auth = useAuthStore();
const router = useRouter();
const toast = toastStore();


const validationSchema = yup.object({
  username: yup
    .string()
    .required(t("Vui lòng nhập username"))
    .min(3, t("Username phải có ít nhất 3 ký tự")),

  password: yup
    .string()
    .required(t("Vui lòng nhập mật khẩu"))
    .min(6, t("Mật khẩu phải có ít nhất 6 ký tự")),

  warehouseId: yup
    .string()
    .required(t("Vui lòng nhập mã kho hàng"))

});

// 🔥 State reactive để lưu dữ liệu form
const formData = reactive({
  username: "",
  password: "",
  warehouseId: "",
});

const login = async (values: any) => {
  loading.setLoading(true);
  try {
    const data = await auth.login(values, router);
    loading.setLoading(false);

    console.log("🚀 API Response:", data);

    if (data?.status === 1) {
      toast.setMessageSuccess(data.message); 
    } else {
      toast.setMessagePopupError(data.message); 
    }
  } catch (error: any) {
    loading.setLoading(false);
    const errorMsg = error?.response?.data?.message ?? t("login.api_error");
    toast.setMessagePopupError(errorMsg); 
  }
};

</script>
