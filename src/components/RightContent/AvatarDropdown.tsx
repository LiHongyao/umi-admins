import { apiSystems } from '@/api/apiServer';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { App, Spin } from 'antd';
import { stringify } from 'querystring';
import React, { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from './HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return (
    <span className="anticon" style={{ color: '#FFF' }}>
      {currentUser?.nickname || '管理员'}
    </span>
  );
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({
  children,
}) => {
  // -- state
  const [openForm, setOpenForm] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { message, modal } = App.useApp();

  // -- methods
  const loginOut = async () => {
    // await outLogin();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/login' && !redirect) {
      history.replace({
        pathname: '/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };
  const jumpToLoginPages = () => {
    localStorage.removeItem('XXX_ACCOUNT_INFO');
    localStorage.removeItem('XXX_USERINFOs');
    localStorage.removeItem('XXX_TOKEN');
    history.push('/login');
  };

  // -- styles
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  // -- events
  const onMenuClick = useCallback(
    ({ key }: { key: string }) => {
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        return;
      }
      if (key === 'changepsw') {
        setOpenForm(true);
      }
    },
    [setInitialState],
  );

  // -- layouts
  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.nickname) {
    return loading;
  }

  const menuItems = [
    { key: 'changepsw', icon: <UserOutlined />, label: '修改密码' },
    { type: 'divider' as const },
    { key: 'logout', icon: <LogoutOutlined />, label: '退出登录' },
  ];

  return (
    <>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        {children}
      </HeaderDropdown>
      <ModalForm
        title={'修改密码'}
        layout={'horizontal'}
        open={openForm}
        width={400}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setOpenForm(false),
        }}
        onFinish={async (value) => {
          const { oldPassword, newPassword, confirmPassword } = value;
          if (newPassword !== confirmPassword) {
            return message.error('新密码和确认密码不一致');
          }
          message.loading('处理中...');
          const resp = await apiSystems.changePsw({
            oldPassword,
            newPassword,
          });
          message.destroy();
          if (resp && resp.code === 200) {
            setOpenForm(false);
            modal.info({
              title: '温馨提示',
              content: '密码已修改，需重新登录',
              okText: '立即登录',
              mask: true,
              maskClosable: false,
              onOk: () => {
                jumpToLoginPages();
              },
            });
          }
        }}
      >
        <ProFormText.Password
          label="原始密码"
          name="oldPassword"
          placeholder={'请输入原始密码'}
          fieldProps={{ size: 'large' }}
          rules={[{ required: true }]}
          allowClear
        />
        <ProFormText.Password
          label="新的密码"
          name="newPassword"
          placeholder={'请输入新的密码'}
          fieldProps={{ size: 'large' }}
          rules={[{ required: true }]}
          allowClear
        />
        <ProFormText.Password
          label="确认密码"
          name="confirmPassword"
          placeholder={'请输入确认密码'}
          fieldProps={{ size: 'large' }}
          rules={[{ required: true }]}
          allowClear
        />
      </ModalForm>
    </>
  );
};
