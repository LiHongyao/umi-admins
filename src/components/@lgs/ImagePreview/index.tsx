import { Image, Modal } from 'antd';
import React, { memo } from 'react';
interface IProps {
  url: string;
  onCancel: () => void;
  width?: number;
  name?: string;
}

const ImagePreview: React.FC<IProps> = ({
  url,
  name,
  onCancel,
  width = 600,
}) => {
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
