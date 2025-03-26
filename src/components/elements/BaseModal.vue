<template>
    <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-96">
        <header class="p-4 border-b font-semibold text-lg">
          <slot name="header"></slot>
        </header>
        <main class="p-4">
          <slot name="body"></slot>
        </main>
        <footer class="p-4 border-t flex justify-end space-x-4">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    emits: ['close'],
  };
  </script>
  
  <style scoped>
  /* Add any custom styles */
  </style>
  