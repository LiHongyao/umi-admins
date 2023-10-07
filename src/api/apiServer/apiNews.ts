import request from '@/api/apiConfig';
export async function list(data: { current: number; pageSize: number }) {
  return request<API.List<API.NewsItemProps>>({
    url: '/admin/news/list',
    method: 'POST',
    data,
  });
}
