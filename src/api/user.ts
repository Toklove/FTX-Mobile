import axiosInstance, { qsPost } from "@/uitls/request";


export const login = (params?: any): Promise<any> => {
  return qsPost("/uc/login", params);
};

export const wallet = (): Promise<any> => {
  return axiosInstance.post("/uc/asset/wallet");
};
export const check = (): Promise<any> => {
  return axiosInstance.post("/uc/check/login");
};