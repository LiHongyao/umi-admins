import React from 'react';
import './index.less';
interface IProps {
  text: string;
  gap?: number;
  width?: number;
}
const JustifyLabel: React.FC<IProps> = React.memo(
  ({ text, width = 60, gap = 20 }) => {
    return (
      <div className="lg-justify-label" style={{ width, marginRight: gap }}>
        <div className="chs">
          {text
            .trim()
            .split('')
            .map((ch, index) => (
              <span className="ch" key={index}>
                {ch}
              </span>
            ))}
        </div>
        <span>:</span>
      </div>
    );
  },
);

export default JustifyLabel;
