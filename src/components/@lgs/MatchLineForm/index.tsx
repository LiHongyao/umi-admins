import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import MatchLine, {
  MatchLineAnwsers,
  MatchLineOptions,
} from '@likg/match-line';
import { App, Button, Input, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';

let index__ = 0;

export interface MatchLineFormValue {
  options: MatchLineOptions;
  anwsers?: MatchLineAnwsers;
}

interface IProps {
  type?: 'TEXT' | 'IMAGE';
  frozen?: boolean;
  value?: MatchLineFormValue;
  onChange?: (value: MatchLineFormValue) => void;
}

const MatchLineForm: React.FC<IProps> = React.memo(
  ({ value, type = 'TEXT', frozen = false, onChange }) => {
    const { message } = App.useApp();
    const defaultValue: MatchLineFormValue = {
      options: [
        { leftOption: '', rightOption: '' },
        { leftOption: '', rightOption: '' },
      ],
      anwsers: undefined,
    };

    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const backCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const [matchline, setMatchline] = useState<MatchLine | null>(null);
    const [showAnchor, setShowAnchor] = useState(false);
    const [dataSource, setDataSource] = useState<MatchLineFormValue>(
      value || defaultValue,
    );

    const onPushOption = () => {
      const t = { ...dataSource };
      t.options.push({ leftOption: '', rightOption: '' });
      t.anwsers = undefined;
      setDataSource(t);
      onChange && onChange(t);
    };

    const onDeleteOption = (index: number) => {
      if (dataSource.options.length <= 2) {
        return message.warning('至少需要两组选项');
      }
      const t = { ...dataSource };
      t.options.splice(index, 1);
      t.anwsers = undefined;
      setDataSource(t);
      onChange && onChange(t);
    };

    const onInputChange = (
      value: string,
      index: number,
      key: 'leftOption' | 'rightOption',
    ) => {
      const t = { ...dataSource };
      t.options[index][key] = value;
      t.anwsers = undefined;
      setDataSource(t);
      onChange && onChange(t);
    };

    const onFileChange = (
      files: FileList | null,
      index: number,
      key: 'leftOption' | 'rightOption',
    ) => {
      if (files && files.length > 0) {
        const file = files[0];
        message.loading('图片上传中...', 60 * 1000);
        // -- 模拟图片
        const urls = [
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F351de5f7-9498-40bf-a2a4-50f8a7599acc%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698247010&t=60c3f75d31bfb77d5aa46bc56751c7bc',
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fc77eccc9-5752-4ab5-a777-bc64122a7fc2%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698247010&t=d084e5951792eecace95df293e6c507d',
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F4cecb617-8679-4d3c-bb1b-222334871030%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698247010&t=eadc698ee9de58281d527d7c964bfaa8',
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fa87bd95e-af43-43fb-b9c6-2be9720ae8c4%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698247010&t=4d072c0b9c7d60abf0c2a12b8f24f4c6',
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fbb44dd9b-3e37-4ca6-ae76-4cf845703948%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698247010&t=e152ef9a03b93ab2fd4ae36d478e7ad9',
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fcefc1885-6350-4f70-9af8-a24ec8ff3f3f%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698247010&t=6d7a71d028356c7a5d08e44e5d31b0d4',
        ];
        setTimeout(() => {
          const t = { ...dataSource };
          t.options[index][key] = urls[index__++];
          t.anwsers = undefined;
          setDataSource(t);
          onChange && onChange(t);
          message.destroy();
        }, 500);
      }
    };

    useEffect(() => {
      const { options, anwsers } = dataSource;
      if (anwsers) {
        setShowAnchor(true);
      } else {
        const see: Record<string, boolean> = {};
        let flag = true;
        for (let i = 0; i < options.length; i++) {
          const { leftOption, rightOption } = options[i];
          if (!leftOption || !rightOption) {
            flag = false;
            break;
          }
          if (see[leftOption]) {
            flag = false;
            break;
          }
          see[leftOption] = true;
          if (see[rightOption]) {
            flag = false;
            break;
          }
          see[rightOption] = true;
        }
        setShowAnchor(flag);
      }
    }, [dataSource]);

    useEffect(() => {
      if (canvasRef.current && backCanvasRef.current && containerRef.current) {
        const items = containerRef.current.querySelectorAll('.anchor');
        if (items) {
          const matchline = new MatchLine({
            id: 'a',
            container: containerRef.current,
            items: items as NodeListOf<HTMLElement>,
            canvas: canvasRef.current,
            backCanvas: backCanvasRef.current,
            anwsers: dataSource?.anwsers,
            onChange(anwsers) {
              const t = { ...dataSource };
              t.anwsers = anwsers;
              setDataSource(t);
              onChange && onChange(t);
            },
          });
          setMatchline(matchline);
        }
      }
    }, [
      onChange,
      dataSource,
      showAnchor,
      canvasRef,
      backCanvasRef,
      containerRef,
    ]);

    const renderItems = () => {
      return dataSource.options.map((option, i) => {
        return (
          <div className="row" key={i}>
            <div className="wrap">
              {/* 左侧 */}
              <div className="item leftOption">
                {type === 'TEXT' ? (
                  <Input
                    placeholder="左侧"
                    value={option.leftOption}
                    onChange={(e) =>
                      onInputChange(e.target.value, i, 'leftOption')
                    }
                  />
                ) : (
                  <div
                    className="upload-box"
                    style={{
                      backgroundImage: `url('${option.leftOption}')`,
                    }}
                  >
                    {option.leftOption ? null : (
                      <Space direction={'vertical'} align={'center'}>
                        <UploadOutlined style={{ color: '#C5C5C5' }} />
                      </Space>
                    )}
                    <input
                      type={'file'}
                      onChange={(event) => {
                        onFileChange(event.target.files, i, 'leftOption');
                      }}
                    />
                  </div>
                )}

                {showAnchor && (
                  <div
                    draggable={false}
                    className="anchor"
                    data-value={option.leftOption}
                    data-ownership={'L'}
                    data-checked="0"
                  />
                )}
              </div>
              {/* 右侧 */}
              <div className="item rightOption">
                {showAnchor && (
                  <div
                    draggable={false}
                    className="anchor"
                    data-value={option.rightOption}
                    data-ownership={'R'}
                    data-checked="0"
                  />
                )}
                {type === 'TEXT' ? (
                  <Input
                    placeholder="右侧"
                    value={option.rightOption}
                    onChange={(e) =>
                      onInputChange(e.target.value, i, 'rightOption')
                    }
                  />
                ) : (
                  <div
                    className="upload-box"
                    style={{
                      backgroundImage: `url('${option.rightOption}')`,
                    }}
                  >
                    {option.rightOption ? null : (
                      <Space direction={'vertical'} align={'center'}>
                        <UploadOutlined style={{ color: '#C5C5C5' }} />
                      </Space>
                    )}
                    <input
                      type={'file'}
                      onChange={(event) => {
                        onFileChange(event.target.files, i, 'rightOption');
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* 删除 */}
            {!frozen && (
              <Button
                className="deleteBtn"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  onDeleteOption(i);
                }}
              />
            )}
          </div>
        );
      });
    };
    return (
      <div className="match-line">
        {/* 工具栏 */}
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={() => matchline?.reset()}>重置</Button>
          <Button onClick={() => matchline?.undo()}>撤销</Button>
        </Space>
        {/* 连线容器 */}
        <div
          className="match-line__container"
          ref={containerRef}
          draggable={false}
        >
          {/* 内容 */}
          <div className="match-line__contents">{renderItems()}</div>
          {/* 画板 */}
          <canvas ref={canvasRef}></canvas>
          <canvas ref={backCanvasRef}></canvas>
        </div>
        {/* 操作项 */}
        {!frozen && (
          <Button
            onClick={onPushOption}
            style={{ marginTop: 16, marginBottom: 16 }}
          >
            添加一组数据
          </Button>
        )}
      </div>
    );
  },
);

export default MatchLineForm;
