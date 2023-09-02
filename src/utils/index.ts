import { message } from 'antd';

/**
 * 检查权限 -- 功能权限
 * @param code
 * @returns
 */
export const checkAccessForFunc = (code: string) => {
  const loc = localStorage.getItem('XXX_USERINFOs') ?? '{}';
  const access = (JSON.parse(loc).access ?? []) as Array<string>;
  return new Promise((resolve) => {
    if (access.includes(code)) {
      resolve(null);
    } else {
      message.info('您当前没有权限哟~');
    }
  });
};
