import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Divider } from 'antd';
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <PageContainer title={false}>
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
          — Umi Admins —
          <Divider />
        </h1>
      </ProCard>
    </PageContainer>
  );
};

export default Dashboard;
