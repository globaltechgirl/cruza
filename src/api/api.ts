import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ApiAuthModes } from "@/types/enums";
import { BASE_URL } from "@/utils/constants";

export const createAxiosApi = (apiAuthMode: ApiAuthModes, token?: string): AxiosInstance => {
  const AxiosApi: AxiosInstance = axios.create({
    baseURL: BASE_URL + "/api",
  });

  AxiosApi.defaults.headers["Content-Type"] = "application/json";
  AxiosApi.defaults.headers["Accept"] = "application/json";

  AxiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (apiAuthMode === ApiAuthModes.BearerToken && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  return AxiosApi;
};

export const useAxiosApi = (apiAuthMode: ApiAuthModes): AxiosInstance => {
  const accessToken = useSelector((state: RootState) => state.auth.token);
  return createAxiosApi(apiAuthMode, accessToken ?? undefined);
};

