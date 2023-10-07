import { Tooltip } from 'antd';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import './index.less';

interface IProps {
  icon: ReactNode;
  size?: number;
  disabled?: boolean;
  tooltip?: string;
  onClick?: () => void;
}
const IconButton: React.FC<IProps> = React.memo(
  ({ icon, size = 16, disabled = false, tooltip, onClick }) => {
    return (
      <Tooltip title={tooltip}>
        <div
          className={classNames(['lg-icon-btn', { disabled }])}
          style={{ fontSize: size }}
          onClick={() => {
            if (!disabled) {
              onClick && onClick();
            }
          }}
        >
          {icon}
        </div>
      </Tooltip>
    );
  },
);

export default IconButton;
