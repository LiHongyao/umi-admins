/*
 * @Author: Lee
 * @Date: 2022-06-25 12:31:41
 * @LastEditors: Lee
 * @LastEditTime: 2022-09-22 11:51:36
 * @Description:
 */
import React, { memo } from 'react';
import { Image, Modal } from 'antd';
interface IProps {
  url: string;
  onCancel: () => void;
  width?: number;
  name?: string;
}

const ImagePreview: React.FC<IProps> = ({ url, name, onCancel, width = 600 }) => {
  return (
    <Modal
      title={name || url.slice(url.lastIndexOf('/') + 1)}
      open={!!url}
      onCancel={onCancel}
      maskClosable={false}
      width={width}
      footer={null}
      bodyStyle={{ textAlign: 'center' }}
    >
      <Image src={url} preview={false} />
    </Modal>
  );
};

export default memo(ImagePreview);
