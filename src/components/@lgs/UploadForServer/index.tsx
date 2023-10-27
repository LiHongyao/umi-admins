import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { App, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import React, { useState } from 'react';
interface IProps {
  accept?: string;
  maxSize?: number; // 单位MB
  value?: string;
  onChange?: (value: string) => void;
}
const UploadForServer: React.FC<IProps> = React.memo((props) => {
  const { value, accept = 'image/*', maxSize = 20, onChange } = props;
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  const getFileExtension = (filename: string) => {
    const index = filename.lastIndexOf('.');
    if (index === -1) {
      return '';
    }
    return filename.slice(index);
  };
  const beforeUpload = (file: RcFile) => {
    // 校验文件类型
    const extension = getFileExtension(file.name);
    const acceptArr = accept.split(',').map((item) => item.trim());
    if (!/\*/.test(accept) && !acceptArr.includes(extension)) {
      message.error(`仅支持格式为 ${accept} 的文件`);
      return false;
    }
    // 校验文件限制
    if (file.size > maxSize * 1024 * 1024) {
      message.error(`文件尺寸不能大于${maxSize}MB`);
      return false;
    }
  };

  const uploadFile = async ({ file }: any) => {
    setLoading(true);
    try {
      // const resp = await apiCommon.uploadImg(file as unknown as File);
      // setLoading(false);
      // if (resp && resp.code === 200) {
      //   const { full_path } = resp.data;
      //   onChange?.(full_path);
      // } else {
      //   message.error('上传失败');
      // }
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
      accept={accept}
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
