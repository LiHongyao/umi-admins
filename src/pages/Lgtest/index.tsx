import EditorWang from '@/components/@lgs/EditorWang';
import { PageContainer } from '@ant-design/pro-components';
import React, { useState } from 'react';

const Lgtest: React.FC = () => {
  const [htmlString, setHtmlString] = useState(
    `<p>111111</p><p>22222222222</p>`,
  );
  return (
    <PageContainer>
      <EditorWang
        value={htmlString}
        onChange={(v) => {
          setHtmlString(v);
        }}
        onUploadFile={async ({ type, file, next }) => {
          if (type === 'AUDIO') {
            next(
              'https://xingzhe-web-test.s3.cn-northwest-1.amazonaws.com.cn/temp/test/%E5%A4%A7%E6%B0%94%E5%AE%A3%E4%BC%A0%20%E5%A3%AE%E5%BF%97%E5%87%8C%E4%BA%91.mp3',
            );
          }
          if (type === 'IMAGE') {
          }
          if (type === 'VIDEO') {
            next(
              'https://xingzhe-web-test.s3.cn-northwest-1.amazonaws.com.cn/temp/test/0cbe1425ae054dd0957d68d4f8f7fb0b.mp4',
            );
          }
        }}
      />
      <p style={{ marginTop: 30 }}>{htmlString}</p>
    </PageContainer>
  );
};

export default Lgtest;
