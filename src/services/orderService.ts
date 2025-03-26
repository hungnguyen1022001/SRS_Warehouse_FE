import axiosConfig from "@/services/api.ts";
import { API } from "@/utils/api.ts";
import { useAuthStore } from "@/stores/auth";

const getAuthHeaders = () => {
  const auth = useAuthStore();
  return { Authorization: `Bearer ${auth.accessToken}` };
};

export const getOrderList = async (params: any) => {
  return axiosConfig.get(API.ORDER, { params, headers: getAuthHeaders() });
};

export const getOrderDetail = async (orderId: string) => {
  return axiosConfig.get(`${API.ORDER_DETAIL}/${orderId}`, { headers: getAuthHeaders() });
};

export const createOrder = async (payload: any) => {
  return axiosConfig.post(API.ORDER_CREATE, payload, { headers: getAuthHeaders() });
};
