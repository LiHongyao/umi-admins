import { ProFormUploadButton } from '@ant-design/pro-components';
import { UploadListType } from 'antd/es/upload/interface';
import React from 'react';
interface IProps {
  max?: number;
  listType?: UploadListType;
}
const UploadFile: React.FC<IProps> = React.memo((props) => {
  const { max = 5 } = props;
  return <ProFormUploadButton listType="text" />;
});

export default UploadFile;
