import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import clsx from 'clsx';
import React, { useState } from 'react';
import './index.less';
interface IProps {
  value: string;
  onChange: (newValue: string, oldValue: string) => void;
}
const EditSpan: React.FC<IProps> = React.memo(({ value, onChange }) => {
  // - state
  const [editable, setEditable] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [tempValue, setTempValue] = useState('');
  // - events
  const onTapedEditIcon = () => {
    setTempValue(currentValue);
    setEditable(true);
  };
  const onTapedCloseIcon = () => {
    setCurrentValue(tempValue);
    setEditable(false);
  };
  const onTapedCheckIcon = () => {
    setEditable(false);
    if (currentValue === tempValue) return;
    onChange(currentValue, tempValue);
  };
  // -- render
  return (
    <div className={clsx(['lg-edit-span', { 'un-edit': !editable }])}>
      {editable ? (
        <>
          <Input.TextArea
            size="small"
            value={currentValue}
            style={{ flex: 1 }}
            onChange={({ target }) => {
              setCurrentValue(target.value);
            }}
          />
          <div className="lg-edit-span__action">
            <CloseOutlined
              className="lg-edit-span__action_close"
              onClick={onTapedCloseIcon}
            />
            <CheckOutlined
              className="lg-edit-span__action_check"
              onClick={onTapedCheckIcon}
            />
          </div>
        </>
      ) : (
        <>
          <div className="lg-edit-span__place">{currentValue}</div>
          <div className="lg-edit-span__edit" onClick={onTapedEditIcon}>
            <EditOutlined className="lg-edit-span__edit_icon" />
          </div>
        </>
      )}
    </div>
  );
});

export default EditSpan;
