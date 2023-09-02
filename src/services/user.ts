import { request } from '@umijs/max';

export async function login(data: API.LoginWithAccount) {
  return request<API.BaseResponse<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    data,
  });
}

export async function sendCaptcha(phone: string) {
  return request<API.BaseResponse<API.LoginResult>>('/api/users/sendCaptcha', {
    method: 'POST',
    data: { phone },
  });
}
export async function list(data: any) {
  return request<API.BaseResponse<API.Page<API.UserProps>>>('/api/users/list', {
    method: 'POST',
    data,
  });
}

export async function feedbacks(data: any) {
  return request<API.BaseResponse<API.Page<API.FeedbackItemProps>>>(
    '/api/feedback/list',
    {
      method: 'POST',
      data,
    },
  );
}
