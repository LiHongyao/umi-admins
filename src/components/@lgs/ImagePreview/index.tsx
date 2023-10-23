import { Modal } from 'antd';
import React from 'react';
interface IProps {
  url: string;
  onCancel: () => void;
  width?: number;
  name?: string;
}

const ImagePreview: React.FC<IProps> = React.memo(
  ({ url, name, onCancel, width = 600 }) => {
    return (
      <Modal
        title={name || url.slice(url.lastIndexOf('/') + 1)}
        open={!!url}
        onCancel={onCancel}
        maskClosable={false}
        width={width}
        footer={null}
      >
        <img src={url} width={'100%'} />
      </Modal>
    );
  },
);

export default ImagePreview;
