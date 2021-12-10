/*
 * @Description: 异步请求包装器
 * @Author: tangguowei
 * @Date: 2021-09-30 14:15:56
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-07 10:23:36
 */
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import axiosRetry from 'axios-retry';
import { ElMessage } from 'element-plus';
import { AxiosRequestConfigCustom, AxiosInstanceCustom } from './data.d';
import { initToken, refreshToken } from './token';
import { apiBaseURL } from '@/config/index';

const aiosInstance: AxiosInstanceCustom = axios.create({
  baseURL: apiBaseURL,
  timeout: 10 * 1000,
  withCredentials: false,
});

/**
 * 请求拦截
 *
 * config扩展了以下属性：
 *  skipAuthRefresh: boolean, // 是否跳过登录验证
 *  [postType]: 'file', // post类型，默认为空，“file”为文件以流形式上传
 */
/* eslint-disable no-param-reassign */
aiosInstance.interceptors.request.use(
  (config: AxiosRequestConfigCustom) => {
    config.headers = config.headers || {};
    config.headers['content-type'] = 'application/json';
    // 防止缓存，GET请求默认带_t参数
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        ...{ _t: new Date().getTime() },
      };
    } else if (config.method === 'post' && config.postType === 'file') {
      config.headers['content-type'] = 'multipart/form-data';
      const data = new FormData();
      Object.entries(config.data).map(([key, value]):boolean => {
        data.append(key, (value as string | Blob));
        return false;
      });
      config.data = data;
    }
    if (!config.skipAuthRefresh) {
      config.headers.Authorization = (initToken(config) as string);
    }
    return config;
  },
  (error: Error): Promise<Error> => Promise.reject(error),
);
/* eslint-enable no-param-reassign */

/**
 * 响应拦截
 */
aiosInstance.interceptors.response.use(
  (response) => response,
  (error: any) => {
    const {
      response,
      request,
      message,
    } = error;
    if (response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, headers, data: { message: myMessage } } = response;
      ElMessage.error(status >= 500 ? '服务器错误' : myMessage);
      console.log(headers);
    } else if (request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('请求错误');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', message);
    }
    return Promise.reject(error);
  },
);

// 无痛刷新token（默认状态码401为授权失败）
createAuthRefreshInterceptor(aiosInstance, refreshToken);

// 接口失败重试(默认状态码为5XX重试)
axiosRetry(aiosInstance, {
  retries: 2,
  retryDelay(retryCount):number {
    return retryCount * 1000;
  },
  retryCondition: (axiosError) => {
    const { response } = axiosError;
    return ((response && response.status >= 500) as boolean);
  },
});
export default aiosInstance;
