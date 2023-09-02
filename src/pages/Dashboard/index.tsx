import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Divider } from 'antd';
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <PageContainer>
      <ProCard>
        <h1
          style={{
            color: '#EEEEEE',
            textAlign: 'center',
            margin: 0,
            fontSize: 46,
            letterSpacing: 2,
          }}
        >
          <Divider />
          — 后台管理系统模板 —
          <Divider />
        </h1>
      </ProCard>
    </PageContainer>
  );
};

export default Dashboard;
