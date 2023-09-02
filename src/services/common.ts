import { request } from '@umijs/max';

export async function ossConfig<T>() {
  return request<API.BaseResponse<T>>('/api/upload/getSignForOSS');
}
