<template>
  <Field :name="name" :rules="props.rules" v-model="date">
    <div v-bind="$attrs">
      <VueDatePicker
        v-model="date"
        format="MM/dd/yyyy HH:mm:ss"
        auto-apply
        :enable-time-picker="true"
        :time-picker-options="timePickerOptions"
        :placeholder="props.placeholder"
        class="h-full"
        :class="props.filter ? 'filter' : 'default'"
      ></VueDatePicker>
    </div>
  </Field>
  <ErrorMessage :name="name" class="error-text"></ErrorMessage>
</template>

<script setup lang="ts">
import { computed } from "vue";
import moment from "moment";
import { Field, ErrorMessage } from "vee-validate";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Date,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  filter: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "date",
  },
  rules: {
    type: String,
    default: "",
  },
});

const timePickerOptions = {
  hours12: false, // 24-hour format
  step: 1, // Step in minutes
};

const formatDate = (date: any) => {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

const date = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", formatDate(value)),
});
</script>

<style>
.filter {
  .dp__input {
    border: none !important;
    @apply w-full h-[40px] bg-grey-200 rounded-md;
  }
}

.default {
  .dp__input {
    @apply w-full h-[40px] border border-grey-400 rounded-md;
  }

  .dp__input::placeholder {
    font-style: italic;
  }
}

.dp__input::placeholder {
  color: #abadaf;
  font-weight: 400 !important;
}

.dp__input {
  font-family: "Roboto", sans-serif;
  font-size: 15px !important;
  color: #4d4e50;
}

.dp__input:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
</style>
