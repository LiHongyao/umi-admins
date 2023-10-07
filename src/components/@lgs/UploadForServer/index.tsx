import { apiCommon } from '@/api/apiServer';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { App, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import React, { useState } from 'react';
interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}
const UploadForServer: React.FC<IProps> = React.memo(({ value, onChange }) => {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file: RcFile) => {
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      message.error('文件尺寸不能大于20M');
      return false;
    }
  };

  const uploadFile = async ({ file }: any) => {
    setLoading(true);
    try {
      const resp = await apiCommon.uploadFile(file as unknown as File);
      setLoading(false);
      if (resp && resp.code === 200) {
        const { full_path } = resp.data;
        onChange?.(full_path);
      } else {
        message.error('上传失败');
      }
    } catch {
      message.error('上传失败');
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  );

  return (
    <Upload
      listType="picture-card"
      showUploadList={false}
      beforeUpload={beforeUpload}
      customRequest={uploadFile}
      accept={'image/*'}
    >
      {value && !loading ? (
        <div style={{ width: '100%', height: '100%', padding: 4 }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 6,
              background: `url(${value}) no-repeat center center / cover`,
            }}
          />
        </div>
      ) : (
        uploadButton
      )}
    </Upload>
  );
});

export default UploadForServer;
