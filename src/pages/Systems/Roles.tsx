import { apiSystems } from '@/api/apiServer';
import AccessTree from '@/components/@lgs/AccessTree';

import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormInstance,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { App, Button, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const Roles: React.FC = () => {
  // -- APPs
  const { message, modal } = App.useApp();
  // - refs
  const vTable = useRef<ActionType>();
  const vForm = useRef<ProFormInstance>();

  // -- state
  const [openForm, setOpenForm] = useState(false);
  const [auths, setAuths] = useState<API.SystemsAccessProps[]>([]);
  const [tips, setTips] = useState('');

  // - methods
  const recursive = (arr: API.SystemsAccessProps[]): any => {
    return arr.map((item) => ({
      title: item.name,
      key: item.id,
      children: item.children ? recursive(item.children) : undefined,
    }));
  };
  // - effects
  useEffect(() => {
    apiSystems.access().then((resp) => {
      if (resp && resp.code === 200) {
        setAuths(resp.data);
      }
    });
  }, []);

  // -- columns
  const columns: ProColumns<API.SystemRoleProps>[] = [
    { title: '角色名称', dataIndex: 'roleName', hideInSearch: true },
    { title: '创建人', dataIndex: 'createBy', hideInSearch: true },
    { title: '创建时间', dataIndex: 'createDate', hideInSearch: true },
    { title: '更新人', dataIndex: 'updateBy', hideInSearch: true },
    { title: '更新时间', dataIndex: 'updateDate', hideInSearch: true },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              vForm.current?.setFieldsValue({
                roleId: record.id,
                roleName: record.roleName,
                authIds: record.authIds,
              });
              setOpenForm(true);
            }}
          >
            编辑
          </Button>
          <Button
            danger
            onClick={() => {
              modal.confirm({
                content: '您确定要删除该角色么？',
                cancelText: '点错了',
                onOk: async () => {
                  message.loading('处理中...', 0);
                  const resp = await apiSystems.roleDelete(record.id);
                  message.destroy();
                  if (resp && resp.code === 200) {
                    setTips('角色删除成功');
                    vTable.current?.reloadAndRest!();
                  }
                },
              });
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer pageHeaderRender={false}>
      <ProTable<API.SystemRoleProps>
        actionRef={vTable}
        headerTitle={'角色管理'}
        columns={columns}
        rowKey="id"
        search={false}
        options={false}
        toolBarRender={() => [
          <Button
            type={'primary'}
            shape={'round'}
            onClick={() => {
              vForm.current?.resetFields();
              setOpenForm(true);
            }}
          >
            <PlusOutlined />
            <span>新建角色</span>
          </Button>,
        ]}
        pagination={{
          hideOnSinglePage: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        postData={(data: Array<API.SystemRoleProps>) => {
          tips && message.success(tips);
          setTips('');
          return data;
        }}
        request={async () => {
          const resp = await apiSystems.roles();
          return Promise.resolve({
            data: resp.data,
            success: true,
            totla: resp.data.length,
          });
        }}
      />
      {/* modals */}
      <ModalForm
        formRef={vForm}
        title={
          !!vForm.current?.getFieldValue('roleId') ? '编辑角色信息' : '新建角色'
        }
        open={openForm}
        width={500}
        layout="horizontal"
        modalProps={{
          forceRender: true,
          onCancel: () => setOpenForm(false),
        }}
        onFinish={async (value) => {
          message.loading('处理中...', 0);
          const resp = await apiSystems.roleAddAndUpdate(value);
          message.destroy();
          if (resp && resp.code === 200) {
            setTips('添加成功');
            setOpenForm(false);
            vTable.current?.reloadAndRest!();
          }
        }}
      >
        <ProFormText name="roleId" noStyle hidden />
        <ProFormText
          label="角色名称"
          name="roleName"
          placeholder={'请输入角色名称'}
          rules={[{ required: true }]}
        />
        <ProFormText
          label="角色权限"
          name="authIds"
          rules={[{ required: true, message: '请分配角色权限' }]}
        >
          <AccessTree treeData={recursive(auths)} />
        </ProFormText>
      </ModalForm>
    </PageContainer>
  );
};

export default Roles;
