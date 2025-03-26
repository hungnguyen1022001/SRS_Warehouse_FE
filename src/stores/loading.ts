import { defineStore } from 'pinia';

interface Loading {
   isLoading: boolean;
}

export const loadingStore = defineStore('loading', {
   state: (): Loading => {
      return {
         isLoading: false,
      };
   },
   actions: {
      setLoading(status: boolean): void {
         this.isLoading = status;
      },
   },
});
