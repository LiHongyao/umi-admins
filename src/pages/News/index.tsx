import { apiNews } from '@/api/apiServer';
import EditorWang from '@/components/@lgs/EditorWang';
import PhoneModel from '@/components/@lgs/PhoneModel';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { App, Button, Space } from 'antd';
import React, { useRef, useState } from 'react';
const News: React.FC = () => {
  // -- APPs
  const { message, modal } = App.useApp();
  // - refs
  const vTable = useRef<ActionType>();
  const vForm = useRef<ProFormInstance>();

  // -- state
  const [openForm, setOpenForm] = useState(false);
  const [title, setTitle] = useState('');
  const [htmlString, setHtmlString] = useState('');

  // -- columns
  const columns: Array<ProColumns<API.NewsItemProps>> = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 60,
    },
    { title: '新闻标题', dataIndex: 'title' },
    {
      title: '新闻类型',
      dataIndex: 'type',
      valueEnum: {
        1: { text: '案例新闻' },
        2: { text: '动态新闻' },
      },
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      valueEnum: {
        1: { text: '文明实践' },
        2: { text: '爱国卫生月' },
        3: { text: '志愿服务' },
      },
    },
    {
      title: '新闻详情',
      key: 'content',
      hideInSearch: true,
      render: (_, { content, title }) => (
        <a
          onClick={() => {
            setTitle(title);
            setHtmlString(content);
          }}
        >
          <span>查看详情</span>
          <RightOutlined />
        </a>
      ),
    },
    { title: '发布时间', dataIndex: 'date', hideInSearch: true },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              vForm.current?.setFieldsValue({
                ...record,
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
                title: '您确定要删除该条谏言么？',
                cancelText: '点错了',
                onOk: () => {},
              });
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // -- renders
  return (
    <PageContainer pageHeaderRender={() => null}>
      <ProTable<API.NewsItemProps>
        actionRef={vTable}
        headerTitle={'新闻管理'}
        options={false}
        toolBarRender={() => [
          <Button
            onClick={() => {
              vForm.current?.resetFields();
              setOpenForm(true);
            }}
          >
            <PlusOutlined />
            <span>新建</span>
          </Button>,
        ]}
        columns={columns}
        rowKey="id"
        pagination={{
          hideOnSinglePage: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        request={async (params) => {
          const resp = await apiNews.list({
            current: params.current || 1,
            pageSize: params.pageSize || 20,
          });
          return Promise.resolve({
            data: resp.data.list || [],
            success: true,
            totla: resp.data.totalCount,
          });
        }}
      />
      {/* modals */}
      <ModalForm
        formRef={vForm}
        title={!!vForm.current?.getFieldValue('id') ? '编辑新闻' : '新建新闻'}
        open={openForm}
        width={700}
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        modalProps={{
          forceRender: true,
          onCancel() {
            setOpenForm(false);
          },
        }}
        onFinish={async (value) => {
          message.loading('处理中，请稍后...');
          setTimeout(() => {
            message.destroy();
            setOpenForm(false);
            vTable.current?.reload();
          }, 1000);
        }}
      >
        <ProFormText name="id" noStyle hidden />
        <ProFormText
          label="标题"
          placeholder="请输入新闻标题"
          name="title"
          rules={[{ required: true }]}
        />
        <ProFormRadio.Group
          name="type"
          label="类型"
          rules={[{ required: true }]}
          options={[
            {
              label: '案例新闻',
              value: 1,
            },
            {
              label: '动态新闻',
              value: 2,
            },
          ]}
        />
        <ProFormRadio.Group
          name="category"
          label="分类"
          rules={[{ required: true }]}
          options={[
            { label: '文明实践', value: 1 },
            { label: '爱国卫生月', value: 2 },
            { label: '志愿服务', value: 3 },
          ]}
        />
        <ProFormText label="内容" name="content" rules={[{ required: true }]}>
          <EditorWang />
        </ProFormText>
      </ModalForm>

      <PhoneModel
        open={!!htmlString}
        onCancel={() => setHtmlString('')}
        __html={htmlString}
        title={title}
      />
    </PageContainer>
  );
};

export default News;
