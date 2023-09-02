import { request } from '@umijs/max';

/**********************
 ** 登录相关
 **********************/
export async function login(data: API.LoginWithAccount) {
  return request<API.BaseResponse<API.LoginResult>>('/api/auths/login-admin', {
    method: 'POST',
    data,
  });
}

export async function logout() {
  return request<API.BaseResponse<any>>('/api/auths/logout', {
    method: 'POST',
  });
}

/**********************
 ** 权限管理
 **********************/
export async function access() {
  return request<API.BaseResponse<API.SystemsAccessProps[]>>(
    '/api/systems/access/list',
  );
}

export async function accessAddOrUpdate(data: any) {
  return request<API.BaseResponse<any>>('/api/systems/access/addOrUpdate', {
    method: 'POST',
    data,
  });
}
export async function accessDelete(authId: string) {
  return request<API.BaseResponse<any>>(
    `/api/systems/access/remove/${authId}`,
    {
      method: 'DELETE',
    },
  );
}

/**********************
 ** 角色管理
 **********************/
export async function roles() {
  return request<API.BaseResponse<API.SystemRoleProps[]>>(
    '/api/systems/roles/list',
  );
}
export async function roleDelete(roleId: string) {
  return request<API.BaseResponse<any>>(`/api/systems/roles/remove/${roleId}`, {
    method: 'DELETE',
  });
}

export async function roleAddAndUpdate(data: any) {
  return request<API.BaseResponse<any>>('/api/systems/roles/addOrUpdate', {
    method: 'POST',
    data,
  });
}

/**********************
 ** 系统用户
 **********************/
export async function users(data: any = {}) {
  return request<API.BaseResponse<API.SystemsUserProps[]>>(
    '/api/administrators/list',
    {
      method: 'POST',
      data,
    },
  );
}

export async function userAddAndUpdate(data: any) {
  return request<API.BaseResponse<any>>('/api/administrators/addOrUpdate', {
    method: 'POST',
    data,
  });
}
export async function userSwichStatus(id: string) {
  return request<API.BaseResponse<any>>(
    `/api/administrators/switch-status/${id}`,
    {
      method: 'PUT',
    },
  );
}

export async function userResetPsw(id: string) {
  return request<API.BaseResponse<any>>(`/api/administrators/reset-psw/${id}`, {
    method: 'PUT',
  });
}

export async function changePsw(data: any) {
  return request<API.BaseResponse<any>>('/api/administrators/change-psw', {
    method: 'PUT',
    data,
  });
}
