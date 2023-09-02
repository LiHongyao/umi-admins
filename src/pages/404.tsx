/*
 * @Author: Lee
 * @Date: 2023-09-01 21:06:35
 * @LastEditors: Lee
 * @LastEditTime: 2023-09-01 21:10:33
 * @Description:
 */
import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Back Home
        </Button>
      }
    />
  );
};
export default NoFoundPage;
