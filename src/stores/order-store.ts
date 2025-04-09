import { defineStore } from 'pinia';
import { ref } from 'vue';
import axiosConfig from '@/services/api';
import { API } from '@/utils/api';
import { toastStore } from '@/stores/toasted';

export const useOrderExportStore = defineStore('order-export', () => {
  const toast = toastStore();

  const showExportModal = ref(false);
  const orderList = ref<string[]>([]);

  const showExportReportModal = ref(false);
  const warehouseList = ref<string[]>([]);

  const fetchWarehouses = async () => {
    try {
      const response = await axiosConfig.get(API.WAREHOUSE_LIST);
      if (response.data.status === 1) {
        warehouseList.value = response.data.data;
      }
    } catch (e) {
      toast.setMessagePopupError("Không thể tải danh sách kho.");
    }
  };

  const openExportModal = async () => {
    try {
      const response = await axiosConfig.get(API.ORDER_LIST);
      if (response.data.status === 1) {
        orderList.value = response.data.data;
        showExportModal.value = true;
      } else {
        toast.setMessagePopupError("Không thể tải danh sách đơn hàng.");
      }
    } catch (error) {
      toast.setMessagePopupError("Lỗi khi lấy danh sách đơn hàng.");
      console.error(error);
    }
  };

  const exportOrders = async (selectedOrders: string[]) => {
    try {
      toast.setMessageSuccess("📤 Đang xuất nhãn đơn hàng...");

      const response = await axiosConfig.post(API.ORDER_LABEL, selectedOrders, {
        responseType: 'blob',
      });

      const contentDisposition = response.headers['content-disposition'];
      const match = contentDisposition?.match(/filename="(.+?)"/);
      const fileName = match ? match[1] : `Labels_${new Date().toISOString().slice(0, 10)}.xlsx`;

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.setMessageSuccess("✅ Xuất nhãn đơn hàng thành công!");
    } catch (error) {
      toast.setMessagePopupError("❌ Lỗi khi xuất nhãn đơn hàng!");
      console.error(error);
    } finally {
      showExportModal.value = false;
    }
  };

  const exportReport = async ({
    type,
    fromDate,
    toDate,
    warehouseIds,
  }: {
    type: 'daily' | 'monthly';
    fromDate: string;
    toDate: string;
    warehouseIds: string[];
  }) => {
    if (!warehouseIds.length) {
      toast.setMessagePopupError('Vui lòng chọn ít nhất một kho!');
      return;
    }

    const params = new URLSearchParams();
    warehouseIds.forEach(id => params.append('warehouseIds', id));
    params.append('fromDate', fromDate);
    params.append('toDate', toDate);

    try {
      toast.setMessageSuccess("📊 Đang xuất thống kê...");

      const response = await axiosConfig.post(
        `${API.ORDER_REPORT}/${type}?${params.toString()}`,
        {},
        {
          responseType: 'blob',
        }
      );

      const contentDisposition = response.headers['content-disposition'];
      const match = contentDisposition?.match(/filename="?([^"]+)"?/);
      const fileName = match
        ? decodeURIComponent(match[1])
        : `Report_${type}_${new Date().toISOString().slice(0, 10)}.xlsx`;

      const blob = new Blob([response.data], {
        type: 'application/octet-stream',
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.setMessageSuccess("✅ Xuất thống kê thành công!");
    } catch (error) {
      toast.setMessagePopupError('❌ Lỗi khi xuất thống kê!');
      console.error(error);
    } finally {
      showExportReportModal.value = false;
    }
  };

  const dispatchOrders = async () => {
    try {
      toast.setMessageSuccess("Đang điều phối đơn hàng...");
      const response = await axiosConfig.post(API.ORDER_DISPATCH);

      if (response.data.status === 1) {
        toast.setMessageSuccess(response.data.message || "Điều phối đơn hàng thành công!");
      } else {
        toast.setMessagePopupError(response.data.message || "Điều phối đơn hàng thất bại!");
      }
    } catch (error) {
      toast.setMessagePopupError("Lỗi khi điều phối đơn hàng!");
      console.error(error);
    }
  };

  return {
    showExportModal,
    orderList,
    showExportReportModal,
    warehouseList,
    fetchWarehouses,
    openExportModal,
    exportOrders,
    exportReport,
    dispatchOrders,
  };
});
