import { request } from '@umijs/max';

export async function addOrUpdate(data: any) {
  return request<API.BaseResponse<any>>('/api/banners/addOrUpdate', {
    method: 'POST',
    data,
  });
}
export async function switchStatus(data: any) {
  return request<API.BaseResponse<any>>('/api/banners/switchStatus', {
    method: 'POST',
    data,
  });
}
export async function list(data: any) {
  return request<API.BaseResponse<API.Page<API.BannerItemProps>>>(
    '/api/banners/list',
    {
      method: 'POST',
      data,
    },
  );
}

export async function getShowLocations() {
  return request<API.BaseResponse<API.BannerLocationProps[]>>(
    '/api/banners/locations',
  );
}
