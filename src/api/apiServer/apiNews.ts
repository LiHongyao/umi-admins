import request from '@/api/apiConfig';
export async function list(data: any) {
  return request<API.List<API.NewsItemProps>>({
    url: '/admin/news/list',
    method: 'POST',
    data,
  });
}
