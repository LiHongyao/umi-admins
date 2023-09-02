import services from '@/services';
import { DeleteOutlined, FormOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, PageContainer, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { App, Button, Space, Tree } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const Access: React.FC = () => {
  // -- APPs
  const { message, modal } = App.useApp();
  // - refs
  const vForm = useRef<ProFormInstance>();

  // - state
  const [treeData, setTreeData] = useState<Array<API.SystemsAccessProps>>([]);
  const [openModal, setOpenModal] = useState(false);

  // - methods
  const getData = async () => {
    const resp = await services.systems.access();
    vForm.current?.resetFields();
    if (resp && resp.code === 200) {
      setTreeData(resp.data);
    }
  };

  // -- effects
  useEffect(() => {
    getData();
  }, []);

  // - events
  const onDelete = (nodeData: API.SystemsAccessProps) => {
    console.log(nodeData);
    modal.confirm({
      content: '您确定要删除该项及其下所有子类么？',
      cancelText: '点错了',
      onOk: async () => {
        message.loading('处理中...', 60 * 1000);
        const resp = await services.systems.accessDelete(nodeData.id);
        message.destroy();
        if (resp && resp.code === 200) {
          getData();
        }
      },
    });
  };

  const onInsert = (nodeData: API.SystemsAccessProps) => {
    vForm.current?.setFieldsValue({
      parentId: nodeData.id,
    });
    setOpenModal(true);
  };

  const onEdit = (nodeData: API.SystemsAccessProps) => {
    vForm.current?.setFieldsValue({
      authId: nodeData.id,
      name: nodeData.name,
      code: nodeData.code,
    });
    setOpenModal(true);
  };
  // -- renders
  return (
    <PageContainer
      subTitle="Tips：您可以在此页面管理权限~"
      header={{
        breadcrumb: {},
        extra: [
          <Button
            type="primary"
            key={'ADD_ACCESS'}
            shape="round"
            onClick={() => {
              vForm.current?.resetFields();
              setOpenModal(true);
            }}
          >
            <PlusOutlined />
            <span>新增权限</span>
          </Button>,
        ],
      }}
    >
      {/* 树形解构 */}
      <Tree
        style={{ padding: 16 }}
        showLine={{ showLeafIcon: false }}
        fieldNames={{ key: 'id' }}
        selectable={false}
        // @ts-ignore
        treeData={treeData}
        // @ts-ignore
        titleRender={(nodeData: API.SystemsAccessProps) => (
          <Space>
            <span>
              {nodeData.name} - {nodeData.code}
            </span>
            <FormOutlined style={{ color: '#4169E1' }} onClick={() => onEdit(nodeData)} />
            <PlusCircleOutlined style={{ color: '#4169E1' }} onClick={() => onInsert(nodeData)} />
            <DeleteOutlined style={{ color: '#DC143C' }} onClick={() => onDelete(nodeData)} />
          </Space>
        )}
      />
      <ModalForm
        formRef={vForm}
        title={!!vForm.current?.getFieldValue('authId') ? '编辑权限' : '新建权限'}
        open={openModal}
        width={400}
        modalProps={{
          forceRender: true,
          onCancel: () => setOpenModal(false),
        }}
        onFinish={async (value) => {
          message.loading('处理中...', 60 * 1000);
          const resp = await services.systems.accessAddOrUpdate(value);
          message.destroy();
          if (resp && resp.code === 200) {
            getData();
            setOpenModal(false);
          }
        }}
      >
        <ProFormText name="parentId" noStyle hidden />
        <ProFormText name="authId" noStyle hidden />
        <ProFormText
          label="权限名称"
          name="name"
          placeholder={'请输入权限名称'}
          rules={[{ required: true }]}
          extra={'Tips：权限名称一般为页面名称或者相应的操作描述'}
        />
        <ProFormText
          label="权限代码"
          name="code"
          placeholder={'请输入权限代码'}
          rules={[{ required: true }]}
          extra={'Tips：权限代码尽量使用标准缩写，见名知意'}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default Access;
