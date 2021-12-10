import { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';
import { Router } from 'vue-router';
import { MessageHandle, MessageParamsTyped } from 'element-plus';

export interface AxiosRequestConfigCustom extends AxiosRequestConfig {
  router?: Router;
  postType?: string;
  skipAuthRefresh?: boolean;
}
export interface AxiosInstanceCustom extends AxiosInstance {
  (config: AxiosRequestConfigCustom): AxiosPromise;
  (url: string, config?: AxiosRequestConfigCustom): AxiosPromise;
}
export interface ElMessageFunc {
  (options?: MessageParamsTyped): MessageHandle
}
