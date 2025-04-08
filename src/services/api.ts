//Import Axios Library and Auth0
import axios from 'axios';

import { toastStore } from '../stores/toasted.ts';
import JwtService from './jwt.service.ts';

//Create instance of axios
const instance = axios.create({
   baseURL: import.meta.env.VITE_URL_API,
   withCredentials: true
});


// Create a request interceptor for my instance and get accessToken on the fly
instance.interceptors.request.use(
   async (config: any) => {
      const accessToken = JwtService.getToken();
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      if (!config.headers["Content-Type"]) {
         config.headers["Content-Type"] = "application/json";
      }

      return config;
   },
   (error: any) => {
      return Promise.reject(error);
   },
);

instance.interceptors.response.use(
   async (response: any) => {
      const method = response.config.method;
      let { status, errors } = response.data;
      const toast = toastStore();
      const apiSupportSeo = '/admin/configPage/checkSEOKeyword';

      if (method !== 'get') {
         if (status == 0) {
            if (response.data && response.data.status == 0 && response.config.url != apiSupportSeo) {
               if (errors && errors.length > 0) {
                  const message = errors.join(' \n');
                  toast.setMessagePopupError(message);
               } else {
                  toast.setMessagePopupError(response.data.message);
               }
            }
         }
      }
      return response;
   },
   (error: any) => {
      if (error.response?.status === 401) {
         JwtService.destroyToken();
         window.location.href = '/login';
      } else if (error.response?.status === 404) {
         // window.location.href = '/error';
      }
      return error.response;
   },
);

export default instance;
