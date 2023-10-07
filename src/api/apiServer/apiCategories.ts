import request from '@/api/apiConfig';
export async function list() {
  return request<any[]>({ url: '/api/categories/list' });
}

export async function addOrUpdate(data: any) {
  return request({
    url: '/api/categories/addOrUpdate',
    method: 'POST',
    data,
  });
}

export async function remove(id: string) {
  return request({
    url: `/api/categories/remove/${id}`,
    method: 'DELETE',
  });
}
