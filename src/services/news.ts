import { request } from '@umijs/max';

export async function list(data: { current: number; pageSize: number }) {
  return request<API.BaseResponse<API.Page<API.NewsItemProps>>>(
    '/admin/news/list',
    {
      method: 'POST',
      data,
    },
  );
}
