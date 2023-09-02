/*
 * @Author: Lee
 * @Date: 2022-10-12 10:06:00
 * @LastEditors: Lee
 * @LastEditTime: 2022-10-12 10:46:45
 * @Description:
 */
import classNames from 'classnames';
import React, { memo, useState } from 'react';
import './index.less';

interface IProps {
  /** 容器宽度 */
  width?: number;
  /** 容器高度 */
  height?: number;
  /** 内容元素（自定义） */
  children: JSX.Element[];
}
const HCollapse: React.FC<IProps> = ({ width = 250, height = 500, children }) => {
  // - state
  const [open, setOpen] = useState(true);
  return (
    <div className="lg-collapse" style={{ height }}>
      <div
        className={classNames(['lg-collapse__wrapper', { close: !open }])}
        style={{ width: open ? width : 0 }}
      >
        <div className="lg-collapse__top">推荐模板</div>
        <div className="lg-collapse__contents">{children}</div>
      </div>
      <div className="lg-collapse__thumb" onClick={() => setOpen(!open)}>
        <span>收</span>
        <span>起</span>
      </div>
    </div>
  );
};

export default memo(HCollapse);
