export const vClickOutside = {
   mounted(el: any, binding: any) {
      el.__ClickOutsideHandle__ = (event: any) => {
         if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
         }
      };
      document.body.addEventListener('click', el.__ClickOutsideHandle__);
   },
   unmounted(el: any) {
      document.body.removeEventListener('click', el.__ClickOutsideHandle__);
   },
};
