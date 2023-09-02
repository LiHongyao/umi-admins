import { Image } from 'antd';
import React, { memo } from 'react';
import './index.less';
interface IProps {
  width?: string | number;
  height?: string | number;
  spacing?: number /** 相框间距 */;
  src?: string;
  caption?: string;
  desc?: string;
}
const ImageBox: React.FC<IProps> = ({
  width = 100,
  height = 100,
  src,
  spacing = 4,
  caption = '',
  desc = '',
}) => {
  return (
    <div className="lg-image-box" style={{ width }}>
      <div className="top-wrap" style={{ width, height, padding: spacing }}>
        <div className="wrap">
          <Image src={src} />
          <div
            className="spacing-img"
            style={{
              background: `url(${src}) no-repeat center center / cover`,
            }}
          />
        </div>
      </div>
      {caption ? <div className="caption">{caption}</div> : null}
      {desc ? <div className="desc">{desc}</div> : null}
    </div>
  );
};

export default memo(ImageBox);
