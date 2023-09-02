import { request } from '@umijs/max';

export async function list() {
  return request<API.BaseResponse<any[]>>('/api/categories/list');
}

export async function addOrUpdate(data: any) {
  return request<API.BaseResponse<any>>('/api/categories/addOrUpdate', {
    method: 'POST',
    data,
  });
}

export async function remove(id: string) {
  return request<API.BaseResponse<any>>(`/api/categories/remove/${id}`, {
    method: 'DELETE',
  });
}
