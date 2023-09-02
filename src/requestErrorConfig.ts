import type { RequestOptions } from '@@/plugin-request/request';
import { history, type RequestConfig } from '@umijs/max';
import { message } from 'antd';

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  timeout: 60 * 1000,
  baseURL: process.env.HOST,
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const { code, message: msg } = res as unknown as API.BaseResponse;
      if (code !== 200) {
        const error: any = new Error(msg);
        error.name = 'BizError';
        error.info = { msg };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },

  // 👉 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      if (config.method && /get/i.test(config.method)) {
        config.params = { ...config.params, timeState: Date.now() };
      }
      const token = localStorage.getItem('XXX_TOKEN') || '';
      return {
        ...config,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...config.headers,
        },
      };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // -- 获取响应头里面的token
      /*const token = response.headers.get('token');
      if (token) {
        Storage.set('ZYLC_TOKEN', token);
      }*/

      // 拦截响应数据，进行个性化处理
      const { code, message: msg } =
        response.data as unknown as API.BaseResponse;
      console.log(code, '------');
      if (code === 401) {
        history.push('/login');
      }

      if (code !== 200 && !/login/.test(response.config.url || '')) {
        message.error(msg);
      }
      return response;
    },
  ],
};
