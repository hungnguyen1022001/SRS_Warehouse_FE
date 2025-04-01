<template>
    <div :style="{ backgroundColor: color, color: 'black' }"
        class="text-center py-1 px-3 font-semibold rounded-md text-sm w-24 h-10 flex items-center justify-center">
        {{ statusText }}
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    statusText: String,
    color: String
});
</script>
