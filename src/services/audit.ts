import { request } from '@umijs/max';

export async function list(data: { current: number; pageSize: number }) {
  return request<API.BaseResponse<API.Page<API.AuditItemProps>>>(
    '/api/audit/list',
    {
      method: 'POST',
      data,
    },
  );
}
