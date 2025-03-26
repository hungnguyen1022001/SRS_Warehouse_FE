import {defineStore} from "pinia";
import axiosConfig from "../services/api.js";
import { API } from "@/utils/api.ts";

interface contract_booking {
    list_contract_booking : any ;
    detail_contract_booking: any,
    total: any
}

export const useContractBooking = defineStore('contract_booking',{
    state: () : contract_booking => {
        return {
            list_contract_booking:[],
            detail_contract_booking: {},
            total: 0
        }
    },
    actions : {
        async get_list(payload: any, userId: any) {
            const {data}= await axiosConfig.post (`${API.CONTRACT_BOOKING_LIST}/${userId}`, payload)
            console.log(data)
            if (data && data.status == 1) {
               this.list_contract_booking = data;
               this.total = data.total
            }
            return data
        },
        async create(payload: any) {
            try {
              const { data } = await axiosConfig.post(`${API.ADD_BOOKING}`, payload);
              return data;
            } catch (error) {
              console.error('Error creating booking:', error);
              throw error; 
            }
          },
          

        async update(payload: any, id: any){
            const {data} = await axiosConfig.post (`${API.UPDATE_BOOKING}/${id}`, payload)
            return data
        },

        async detail(id: any){
            const {data} = await axiosConfig.get (`${API.CONTRACT_BOOKING_DETAIL}/${id}`)
            console.log(data);
            if(data && data.status == 1){
                this.detail_contract_booking = data
            }
            return data
        },

    }
} )