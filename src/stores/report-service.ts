import axiosConfig from '@/services/api.ts';
import { API } from '@/utils/api.ts';
import { toastStore } from '@/stores/toasted.ts';
import { ref, computed } from 'vue';

export type ReportType = 'daily' | 'monthly';

export interface Warehouse {
  id: string;
  name: string;
}

export interface DateRange {
  fromDate: string;
  toDate: string;
}

export const useReportService = () => {
  const toast = toastStore();
  const warehouseList = ref<Warehouse[]>([]);
  const selectedWarehouses = ref<string[]>([]);
  const reportType = ref<ReportType>('daily');
  const dateRange = ref<DateRange>({ fromDate: '', toDate: '' });

  const getWarehouses = async (): Promise<Warehouse[]> => {
    try {
      const response = await axiosConfig.get(API.WAREHOUSE_LIST);
      if (response.data.status === 1) {
        warehouseList.value = response.data.data;
        return response.data.data;
      }
      toast.setMessagePopupError("Không thể tải danh sách kho.");
    } catch (error) {
      toast.setMessagePopupError("Lỗi khi lấy danh sách kho.");
      console.error(error);
    }
    return [];
  };

  const daysBetween = computed(() => {
    if (!dateRange.value.fromDate || !dateRange.value.toDate) return 0;
    const from = new Date(dateRange.value.fromDate);
    const to = new Date(dateRange.value.toDate);
    return Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  });

  const monthsBetween = computed(() => {
    if (!dateRange.value.fromDate || !dateRange.value.toDate) return 0;
    const from = new Date(dateRange.value.fromDate);
    const to = new Date(dateRange.value.toDate);
    return (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()) + 1;
  });

  const isValidDateRange = computed(() => {
    if (!dateRange.value.fromDate || !dateRange.value.toDate) return false;
    const from = new Date(dateRange.value.fromDate);
    const to = new Date(dateRange.value.toDate);
    return from <= to && (reportType.value === 'daily' ? daysBetween.value <= 15 : monthsBetween.value <= 12);
  });

  const isValidWarehouseSelection = computed(() => {
    return selectedWarehouses.value.length > 0 && selectedWarehouses.value.length <= 10;
  });

  const exportReport = async (): Promise<boolean> => {
    if (!isValidDateRange.value) {
      toast.setMessagePopupError(reportType.value === 'daily' 
        ? "❌ Khoảng thời gian không được vượt quá 15 ngày!"
        : "❌ Khoảng thời gian không được vượt quá 12 tháng!");
      return false;
    }

    if (!isValidWarehouseSelection.value) {
      toast.setMessagePopupError("❌ Vui lòng chọn từ 1 đến 10 kho!");
      return false;
    }

    try {
      toast.setMessageSuccess("📊 Đang xuất báo cáo...");
      let url = `${API.ORDER}/${reportType.value}?` +
                `fromDate=${dateRange.value.fromDate}&toDate=${dateRange.value.toDate}&` +
                selectedWarehouses.value.map(id => `warehouseIds=${id}`).join('&');
      
      const response = await axiosConfig.get(url, { responseType: 'blob' });
      const fileName = response.headers['content-disposition']?.match(/filename="(.+?)"/)?.[1] ||
                       `Report_${reportType.value}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.setMessageSuccess("✅ Xuất báo cáo thành công!");
      return true;
    } catch (error) {
      toast.setMessagePopupError("❌ Lỗi khi xuất báo cáo!");
      console.error(error);
      return false;
    }
  };

  return {
    warehouseList,
    selectedWarehouses,
    reportType,
    dateRange,
    daysBetween,
    monthsBetween,
    isValidDateRange,
    isValidWarehouseSelection,
    getWarehouses,
    exportReport
  };
};
