import axiosConfig from '@/services/api.ts';
import { API } from '@/utils/api.ts';
import { toastStore } from '@/stores/toasted.ts';
import { ref } from 'vue';

export const useOrderService = () => {
  const toast = toastStore();
  const orderList = ref<string[]>([]);
  const selectedOrders = ref<string[]>([]);

  /**
   * Lấy danh sách đơn hàng
   * @returns Danh sách đơn hàng
   */
  const getOrderList = async (): Promise<string[]> => {
    try {
      const response = await axiosConfig.get(`${API.ORDER_LIST}`);
      if (response.data.status === 1) {
        orderList.value = response.data.data;
        return response.data.data;
      } else {
        toast.setMessagePopupError("Không thể tải danh sách đơn hàng.");
        return [];
      }
    } catch (error) {
      toast.setMessagePopupError("Lỗi khi lấy danh sách đơn hàng.");
      console.error(error);
      return [];
    }
  };

  /**
   * Xuất nhãn đơn hàng
   * @param orderIds Danh sách mã đơn hàng cần xuất
   */
  const exportOrderLabels = async (orderIds: string[]): Promise<boolean> => {
    if (orderIds.length === 0) {
      toast.setMessagePopupError("❌ Vui lòng chọn ít nhất 1 đơn hàng để xuất!");
      return false;
    }

    try {
      toast.setMessageSuccess("📤 Đang xuất nhãn đơn hàng...");

      const response = await axiosConfig.post(`${API.ORDER_LABEL}`, orderIds, {
        responseType: 'blob',
      });

      const contentDisposition = response.headers['content-disposition'];
      const match = contentDisposition?.match(/filename="(.+?)"/);
      const fileName = match ? match[1] : `Labels_${new Date().toISOString().slice(0, 10)}.xlsx`;

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.setMessageSuccess("✅ Xuất nhãn đơn hàng thành công!");
      return true;
    } catch (error) {
      toast.setMessagePopupError("❌ Lỗi khi xuất nhãn đơn hàng!");
      console.error(error);
      return false;
    }
  };

  /**
   * Import đơn hàng từ file Excel
   * @param file File Excel cần import
   */
  const importOrders = async (file: File): Promise<boolean> => {
    if (!file) return false;

    const formData = new FormData();
    formData.append('file', file);

    try {
      toast.setMessageSuccess("Đang tải lên...");
      const response = await axiosConfig.post(`${API.ORDER_IMPORT}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status === 1) {
        toast.setMessageSuccess(response.data.message || 'Import thành công!');
        return true;
      } else {
        toast.setMessagePopupError(response.data.message || 'Import thất bại!');
        return false;
      }
    } catch (error) {
      toast.setMessagePopupError('Lỗi khi import file!');
      console.error(error);
      return false;
    }
  };

  /**
   * Điều phối đơn hàng
   */
  const dispatchOrders = async (): Promise<boolean> => {
    try {
      toast.setMessageSuccess("Đang điều phối đơn hàng...");
      const response = await axiosConfig.post(`${API.ORDER_DISPATCH}`);

      if (response.data.status === 1) {
        toast.setMessageSuccess(response.data.message || "Điều phối đơn hàng thành công!");
        return true;
      } else {
        toast.setMessagePopupError(response.data.message || "Điều phối đơn hàng thất bại!");
        return false;
      }
    } catch (error) {
      toast.setMessagePopupError("Lỗi khi điều phối đơn hàng!");
      console.error(error);
      return false;
    }
  };

  return {
    orderList,
    selectedOrders,
    getOrderList,
    exportOrderLabels,
    importOrders,
    dispatchOrders
  };
};