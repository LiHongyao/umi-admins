import request from '@/api/apiConfig';

export async function list(data: { current: number; pageSize: number }) {
  return request<API.List<API.AuditItemProps>>({
    url: '/api/audit/list',
    method: 'POST',
    data,
  });
}
