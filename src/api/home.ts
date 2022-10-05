import { apiUrl } from "@/const/api";
import axiosInstance from "@/uitls/request";

export const getTest = (params?: any) => {
  return axiosInstance.get(apiUrl.TEST_PROXY, { params: params || {} });
};
export const getSymbolTrend = (params?: any): Promise<any> => {
  return axiosInstance.get("/market/symbol-thumb-trend", {
    params: params || {},
  });
};
