import { FileImageOutlined } from '@ant-design/icons';
import { App, Popconfirm, Tooltip } from 'antd';
import React, { useState } from 'react';
import ImagePreview from '../ImagePreview';
import './index.less';
interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}
const UploadOption: React.FC<IProps> = React.memo(({ value, onChange }) => {
  const { message } = App.useApp();
  const [previewUrl, setPreviseUrl] = useState('');

  const onFileChange = async (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const maxSize = 10 * 1024 * 1024; // 10MB 的大小限制
      if (file.size > maxSize) {
        return message.error('文件尺寸不能大于10M');
      }
      try {
        message.loading('文件上传中，请稍后...');
        // const resp = await apiCommon.uploadFile(file);
        // if (resp && resp.code === 200) {
        //   onChange && onChange(resp.data.full_path);
        // }
      } catch (error) {}
    }
  };

  return (
    <div className="lg-upload-option">
      {/* 图片上传区域 */}
      <Tooltip title={'上传图片'}>
        <div className="upload-box">
          <FileImageOutlined />
          <input
            type={'file'}
            accept="image/*"
            multiple={false}
            onChange={(event) => onFileChange(event.target.files)}
          />
        </div>
      </Tooltip>
      {/* 图片显示区域 */}
      {value && value?.length > 0 && (
        <Popconfirm
          title={'选择操作'}
          cancelText="删除"
          okText="查看大图"
          onConfirm={() => setPreviseUrl(value)}
          onCancel={() => {
            onChange && onChange('');
          }}
        >
          <img
            src={value}
            height={30}
            width={30}
            style={{ cursor: 'pointer', borderRadius: 4 }}
          />
        </Popconfirm>
      )}
      {/* 图片预览区域 */}
      <ImagePreview url={previewUrl} onCancel={() => setPreviseUrl('')} />
    </div>
  );
});

export default UploadOption;
