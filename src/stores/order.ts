import { defineStore } from "pinia";
import axiosConfig from "../services/api.ts";
import { API } from "@/utils/api.ts";
import { useAuthStore } from "@/stores/auth";

interface OrderState {
  list_order: any[];
  detail_order: any;
  total: number;
  errorMessage: string | null;
  lastCreatedOrder: string | null;
}

export const useOrder = defineStore("order", {
  state: (): OrderState => ({
    list_order: [],
    detail_order: {},
    total: 0,
    errorMessage: null,
    lastCreatedOrder: null,
  }),

  actions: {
    getAuthHeaders() {
      const auth = useAuthStore();
      return { Authorization: `Bearer ${auth.accessToken}` };
    },

    async get_list(params: any) {
      try {
        const { data } = await axiosConfig.get(API.ORDER, {
          params,
          headers: this.getAuthHeaders(),
        });

        if (data.status === 1) {
          this.list_order = data.data.orders;
          this.total = data.data.total;
          this.errorMessage = null;
        } else {
          this.list_order = [];
          this.total = 0;
          this.errorMessage = data.message;
        }
        return data;
      } catch (error) {
        this.errorMessage = "Có lỗi xảy ra khi lấy danh sách đơn hàng.";
        throw error;
      }
    },

    async get_detail(orderId: string) {
      try {
        const { data } = await axiosConfig.get(`${API.ORDER_DETAIL}/${orderId}`, {
          headers: this.getAuthHeaders(),
        });

        this.detail_order = data.status === 1 ? data.data : {};
        this.errorMessage = data.status === 1 ? null : data.message;
        return data;
      } catch (error) {
        this.errorMessage = "Có lỗi xảy ra khi lấy chi tiết đơn hàng.";
        throw error;
      }
    },

    async create(payload: any) {
      try {
        const { data } = await axiosConfig.post(API.ORDER_CREATE, payload, {
          headers: this.getAuthHeaders(),
        });

        this.lastCreatedOrder = data.status === 1 ? data.data : null;
        this.errorMessage = data.status === 1 ? null : data.message;
        return { status: data.status, message: data.message || "Có lỗi xảy ra!" };
      } catch (error) {
        this.errorMessage = "Có lỗi xảy ra khi tạo đơn hàng.";
        throw error;
      }
    },
  },
});
