<template>
   <!-- arrow down -->
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" v-if="props.type === ARROW_DOWN">
      <path
         d="M18 10L13.0606 14.5932C12.4773 15.1356 11.5227 15.1356 10.9394 14.5932L6 10"
         :stroke="COLOR.primary"
         stroke-width="1.5"
         stroke-miterlimit="10"
         stroke-linecap="round"
         stroke-linejoin="round"
      />
   </svg>
   <!-- next breadcrumb -->
   <svg width="4" height="9" viewBox="0 0 4 9" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="props.type === NEXT_BREADCRUMB">
      <path
         d="M0.663692 8.49996C0.749076 8.50025 0.83344 8.48141 0.910584 8.44483C0.987729 8.40824 1.05569 8.35484 1.10949 8.28855L3.86998 4.8603C3.95405 4.75807 4 4.62983 4 4.49748C4 4.36514 3.95405 4.2369 3.86998 4.13466L1.01233 0.70641C0.915315 0.589726 0.775912 0.516348 0.624784 0.502418C0.473656 0.488488 0.323183 0.535147 0.206467 0.632132C0.0897505 0.729116 0.0163522 0.868481 0.00241828 1.01957C-0.0115156 1.17065 0.0351567 1.32109 0.132168 1.43777L2.68691 4.50034L0.217898 7.56291C0.148009 7.64678 0.103614 7.7489 0.0899663 7.85721C0.0763183 7.96551 0.0939882 8.07546 0.140886 8.17403C0.187783 8.27261 0.261945 8.3557 0.354596 8.41346C0.447248 8.47122 0.55451 8.50124 0.663692 8.49996Z"
         fill="#A1A1A1"
      />
   </svg>
   <!--logout-->
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="props.type === LOGOUT">
      <path
         d="M15.1001 7.55999C14.7901 3.95999 12.9401 2.48999 8.8901 2.48999H8.7601C4.2901 2.48999 2.5001 4.27999 2.5001 8.74999V15.27C2.5001 19.74 4.2901 21.53 8.7601 21.53H8.8901C12.9101 21.53 14.7601 20.08 15.0901 16.54"
         stroke="#A1A1A1"
         stroke-width="1.5"
         stroke-linecap="round"
         stroke-linejoin="round"
      />
      <path d="M8.99988 12H20.3799" stroke="#A1A1A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M18.15 8.6499L21.5 11.9999L18.15 15.3499" stroke="#A1A1A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
   </svg>
   <!--Toast success -->
   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="props.type === TOAST_SUCCESS">
      <g clip-path="url(#clip0_219_1476)">
         <path
            d="M18.3337 9.2333V9.99997C18.3326 11.797 17.7507 13.5455 16.6748 14.9848C15.5988 16.4241 14.0864 17.477 12.3631 17.9866C10.6399 18.4961 8.79804 18.4349 7.11238 17.8121C5.42673 17.1894 3.98754 16.0384 3.00946 14.5309C2.03138 13.0233 1.56682 11.24 1.68506 9.4469C1.80329 7.65377 2.498 5.94691 3.66556 4.58086C4.83312 3.21482 6.41098 2.26279 8.16382 1.86676C9.91665 1.47073 11.7505 1.65192 13.392 2.3833"
            stroke="#439F6E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
         <path d="M18.3333 3.33325L10 11.6749L7.5 9.17492" stroke="#439F6E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
         <clipPath id="clip0_219_1476">
            <rect width="20" height="20" fill="white" />
         </clipPath>
      </defs>
   </svg>

   <!--toast error-->
   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="props.type === TOAST_ERROR">
      <path
         d="M8.57465 3.21659L1.51632 14.9999C1.37079 15.2519 1.29379 15.5377 1.29298 15.8287C1.29216 16.1197 1.36756 16.4059 1.51167 16.6587C1.65579 16.9115 1.86359 17.1222 2.11441 17.2698C2.36523 17.4174 2.65032 17.4967 2.94132 17.4999H17.058C17.349 17.4967 17.6341 17.4174 17.8849 17.2698C18.1357 17.1222 18.3435 16.9115 18.4876 16.6587C18.6317 16.4059 18.7071 16.1197 18.7063 15.8287C18.7055 15.5377 18.6285 15.2519 18.483 14.9999L11.4247 3.21659C11.2761 2.97168 11.0669 2.76919 10.8173 2.62866C10.5677 2.48813 10.2861 2.41431 9.99965 2.41431C9.71321 2.41431 9.43159 2.48813 9.18199 2.62866C8.93238 2.76919 8.72321 2.97168 8.57465 3.21659V3.21659Z"
         stroke="#CF0D3C"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round"
      />
      <path d="M10 7.5V10.8333" stroke="#CF0D3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10 14.1667H10.0083" stroke="#CF0D3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
   </svg>

   <!--  avatar default -->
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="props.type === AVATAR_DEFAULT">
      <path
         d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.72 11.28 8.72 9.50998C8.72 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
         :stroke="COLOR.primary"
         stroke-width="1.5"
         stroke-linecap="round"
         stroke-linejoin="round"
      />
      <path
         d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.4 22.0001 7.04 21.0101 5.26 19.3801C5.36 18.4401 5.96 17.5201 7.03 16.8001C9.77 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
         :stroke="COLOR.primary"
         stroke-width="1.5"
         stroke-linecap="round"
         stroke-linejoin="round"
      />
      <path
         d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
         :stroke="COLOR.primary"
         stroke-width="1.5"
         stroke-linecap="round"
         stroke-linejoin="round"
      />
   </svg>
   <!-- pen -->
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="props.type === PENCIL">
      <path
         d="M12.9493 5.12701L6.79017 11.9325C6.5576 12.191 6.33254 12.7 6.28753 13.0524L6.00995 15.5898C5.91243 16.5061 6.5426 17.1326 7.41284 16.976L9.82849 16.5453C10.1661 16.4826 10.6387 16.2242 10.8713 15.9579L17.0305 9.15237C18.0957 7.97766 18.5759 6.63848 16.9179 5.00171C15.2675 3.3806 14.0146 3.95229 12.9493 5.12701Z"
         stroke="#A1A1A1"
         stroke-width="1.5"
         stroke-miterlimit="10"
         stroke-linecap="round"
         stroke-linejoin="round"
      />
      <path d="M12 7C12.3156 8.60777 13.9596 9.83689 16 10" stroke="#A1A1A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M5 20H19" stroke="#A1A1A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
   </svg>

   <!-- delete -->
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="props.type === DELETE">
      <path d="M20 6C17.04 6 14.0622 6 11.0933 6C9.33333 6 7.57333 6 5.81333 6H4" stroke="#A1A1A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path
         d="M9 5L9.18857 4.11785C9.32571 3.47811 9.42857 3 10.8771 3H13.1229C14.5714 3 14.6829 3.50505 14.8114 4.12458L15 5"
         stroke="#A1A1A1"
         stroke-width="1.5"
         stroke-linecap="round"
         stroke-linejoin="round"
      />
      <path
         d="M18 10L17.4307 18.6135C17.3343 19.9565 17.2555 21 14.8117 21H9.18832C6.74453 21 6.66569 19.9565 6.56934 18.6135L6 10"
         stroke="#A1A1A1"
         stroke-width="1.5"
         stroke-linecap="round"
         stroke-linejoin="round"
      />
      <path d="M10.3301 16.5H13.6601" stroke="#A1A1A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10 12H14" stroke="#A1A1A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
   </svg>
   <!-- page management  -->
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="props.type === PAGE">
      <path
         d="M16 8H8V6H16V8ZM16 10H8V12H16V10ZM20 4V16L14 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21071 5.46957 2 6 2H18C18.5304 2 19.0391 2.21071 19.4142 2.58579C19.7893 2.96086 20 3.46957 20 4ZM18 14V4H6V20H12V16C12 15.4696 12.2107 14.9609 12.5858 14.5858C12.9609 14.2107 13.4696 14 14 14H18Z"
         :fill="props.active ? COLOR.primary : COLOR.gray"
      />
   </svg>
   <!--image-->
   <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666" v-if="props.type === IMAGE">
  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/>
</svg>

<!--statistical-->
<!-- <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke-width="1.5" 
    stroke="currentColor" 
    class="size-6" 
    v-if="STATISTICAL"
>
    <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" 
    />
</svg> -->
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666" v-if ="props.type === FACILITY">
  <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666" v-if ="props.type === REVIEWS">
  <path d="m363-390 117-71 117 71-31-133 104-90-137-11-53-126-53 126-137 11 104 90-31 133ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666" v-if ="props.type === ROOMS">
  <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666" v-if ="props.type === SEND">
   <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
   <svg xmlns="http://www.w3.org/2000/svg" 
     height="24px" 
     viewBox="0 -960 960 960" 
     width="24px" 
     fill="#666666" v-if ="props.type === CONTRACT">
  <path d="M240-80q-50 0-85-35t-35-85v-120h120v-560h600v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-600H320v480h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h360v80H360Zm0 120v-80h360v80H360ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm0 0h-40 400-360Z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" 
     height="24px" 
     viewBox="0 -960 960 960" 
     width="24px" 
     fill="#666666" v-if = 'props.type === HUMAN'>
  <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" 
     height="24px" 
     viewBox="0 -960 960 960" 
     width="24px" 
     fill="#666666" v-if ='props.type === VILLA'>
  <path d="M120-120v-520l520-200v360h40q0-33 23.5-56.5T760-560q33 0 56.5 23.5T840-480v360H120Zm80-80h160v-280h200v-244L200-585v385Zm240 0h120v-120h80v120h120v-200H440v200ZM280-560Zm320 360Zm0-20Z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666" v-if ='props.type === TASK'><path d="m438-240 226-226-58-58-169 169-84-84-57 57 142 142ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
</template>
<script setup lang="ts">
import { COLOR } from '@/utils/theme.ts';
import {TASK,VILLA,HUMAN,CONTRACT,SEND,ROOMS,REVIEWS,FACILITY,IMAGE,PAGE, ARROW_DOWN, AVATAR_DEFAULT, LOGOUT, NEXT_BREADCRUMB, DELETE, PENCIL, TOAST_ERROR, TOAST_SUCCESS } from '@/utils/constant.ts';
const props = defineProps({
   active: {
      type: Boolean,
      default: false,
   },
   type: {
      type: String,
      required: true,
   },
   color: {
      type: String,
      default: '#FFFFFF',
   },
});
</script>
