// https://blog.csdn.net/wgh2820777641/article/details/129086408

import { message } from '@/components/@lgs/GlobalMessage';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResult,
} from 'axios';
import axiosRetry from 'axios-retry';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.HOST,
  timeout: 1000,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

// @ts-ignore
axiosRetry(axiosInstance, {
  // 设置自动发送请求次数
  retries: 3,
  // 重置超时时间
  retryDelay: () => 3000,
  // 重置超时时间
  shouldResetTimeout: true,
  retryCondition: (error) => {
    if (error.message.includes('timeout')) return true;
  },
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    // -- GET请求拼接随机值
    if (/GET/i.test(config.method || '')) {
      const t = Math.random().toString(36).slice(2, 9);
      config.params = { ...config.params, t };
    }
    // -- 拼接token
    const token = localStorage.getItem('APP_TOKEN');
    config.headers = {
      // Authorization: token ? `Bearer ${token}` : '',
      ...config.headers,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    // -- 二进制流数据
    if (response.request.responseType === 'blob') {
      return { code: 200, data: response.data, msg: 'success' };
    }

    const { code, msg } = response.data as unknown as AxiosResult;
    if (code !== 200) {
      message.warning(msg);
      return Promise.reject();
    }
    return response.data;
  },
  (error: AxiosError) => {
    console.log('[request error] > ', error);
    let errorMsg = '';
    if (error.message === 'Request aborted') {
      errorMsg = '请求取消';
    } else if (error.message === 'Network Error') {
      errorMsg = '请求错误';
    } else if (/timeout/.test(error.message)) {
      errorMsg = '请求超时';
    }

    switch (error.response?.status) {
      case 400:
        errorMsg = '账号或密码错误';
        break;
      case 404:
        errorMsg = '调用接口不存在';
        break;
      case 405:
        errorMsg = '请求方法不支持';
        break;
      case 500:
        errorMsg = '服务器异常';
        break;
    }
    message.error(errorMsg);
    return Promise.reject(error);
  },
);

const request = <R = any>(
  options: AxiosRequestConfig,
): Promise<AxiosResult<R>> => {
  return axiosInstance(options);
};

export default request;
