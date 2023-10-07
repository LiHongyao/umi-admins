import request from '@/api/apiConfig';
export async function addOrUpdate(data: any) {
  return request({
    url: '/api/banners/addOrUpdate',
    method: 'POST',
    data,
  });
}
export async function switchStatus(data: any) {
  return request({
    url: '/api/banners/switchStatus',
    method: 'POST',
    data,
  });
}
export async function list(data: any) {
  return request<API.List<API.BannerItemProps>>({
    url: '/api/banners/list',
    method: 'POST',
    data,
  });
}

export async function getShowLocations() {
  return request<API.BannerLocationProps[]>({ url: '/api/banners/locations' });
}
