import { defineStore } from "pinia";

interface Content {
   type: string;
   message: string;
   isMultiLanguage?: boolean;
}

interface Toasted {
   isToasted: boolean;
   content: Content;
   isPopupError: boolean;
   contentError: string;
}

export const toastStore = defineStore("toast", {
   state: (): Toasted => ({
      isToasted: false,
      isPopupError: false,
      content: {
         type: "",
         message: "",
      },
      contentError: "",
   }),
   actions: {
      setMessageSuccess(message: string, isMultiLanguage: boolean = true) {
         this.isToasted = true; // ✅ Hiển thị Toasted
         this.isPopupError = false; // ❌ Đảm bảo popup không hiển thị
         this.content = { type: "success", message, isMultiLanguage };
         this.resetToast();
      },
      setMessagePopupError(message: string) {
         this.isPopupError = true; // ✅ Hiển thị popup lỗi
         this.isToasted = false; // ❌ Đảm bảo Toasted không hiển thị
         this.contentError = message;
      },
      closeToast() {
         this.isToasted = false;
      },
      closePopupError() {
         this.isPopupError = false;
         this.contentError = "";
      },
      resetToast() {
         setTimeout(() => {
            this.isToasted = false;
         }, 3000); // Ẩn toast sau 3 giây
      },
   },
});
