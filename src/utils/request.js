import axios from 'axios';
import { ElMessage as Message } from 'element-plus';
import { initToken, refreshToken } from './token';
import { getSettings } from '../config';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import axiosRetry from 'axios-retry';

let http;
export default function request() {
  if (http) return http;
  const { api_origin, api_pathname } = getSettings();
  http = axios.create({
    baseURL: `${api_origin}${api_pathname}`,
    timeout: 10 * 1000,
    withCredentials: false,
  });

  function getTipsText(method = '') {
    let tipsText = '';
    switch (method) {
      case 'put':
      case 'patch':
        tipsText = '更新';
        break;
      case 'delete':
        tipsText = '删除';
        break;
      default:
    }
    return tipsText;
  }

  let loadingMessage;
  /**
   * 请求拦截
   */
  http.interceptors.request.use(
    (config) => {
      // 非get,post请求错误处理
      let tipsText = getTipsText(config.method);
      if (tipsText) {
        loadingMessage = Message({
          message: `正在${tipsText}`,
          iconClass: 'el-icon-loading',
        });
      }

      config.headers['content-type'] = 'application/json' || '';
      // 防止缓存，GET请求默认带_t参数
      if (config.method === 'get') {
        config.params = {
          ...config.params,
          ...{ _t: new Date().getTime() },
        };
      }
      if (!config.skipAuthRefresh) {
        initToken(config);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**
   * 响应拦截
   */
  http.interceptors.response.use(
    (response) => {
      // 非get请求错误处理
      let tipsText = getTipsText(response.config.method);
      if (tipsText) {
        loadingMessage.close();
        if (response.status === 200) {
          Message.success(`${tipsText}成功`);
        } else {
          Message.error(`${tipsText}失败请重试！`);
        }
      }

      return response;
    },
    (error) => {
      const { response, request, message, config } = error;
      // 非get,post请求错误处理
      let tipsText = getTipsText(config.method);
      if (tipsText) {
        loadingMessage.close();
        if (!response || response.status === 400 || response.status === 403) {
          Message.error(`${tipsText}失败请重试！`);
        }
      }

      if (response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, headers, data } = response;
        // token过期重新登录
        switch (status) {
          case 400:
          case 403:
            Message.error(data.message);
            break;
          case 422:
            console.error('参数校验失败');
            break;
          default:
        }
        if (status >= 500) {
          console.error('服务器错误');
        }
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
    }
  );

  // 无痛刷新token（默认状态码401为授权失败）
  createAuthRefreshInterceptor(http, refreshToken);

  // 接口失败重试(默认状态码为5XX重试)
  axiosRetry(http, {
    retries: 2,
    retryDelay: (retryCount) => {
      return retryCount * 1000;
    },
    retryCondition: (axiosError) => {
      const { response } = axiosError;
      if (response && response.status >= 500) {
        return true;
      }
    },
  });
  return http;
}
