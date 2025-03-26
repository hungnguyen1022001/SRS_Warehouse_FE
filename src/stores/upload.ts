import {defineStore} from "pinia";
// @ts-ignore

import axiosConfig from "@/services/api.js";
import {API} from "@/utils/api.ts";



export const useUploadStore = defineStore("Upload", {
    actions: {
        async uploadImage(payload: any) {
            const {data} = await axiosConfig.post(API.UPLOAD, payload);
            return data;
        },
    },
});
