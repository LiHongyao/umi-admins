import '@/components/EditorWang/menus';
import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor/editor';
import { SlateTransforms } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css';
import { App } from 'antd';
import React, { memo, useEffect, useImperativeHandle, useState } from 'react';
import hoverbarKeys from './configs/hoverbarKeys';
import { fontSize } from './configs/menuConfs';
import toolbarKeys from './configs/toolbarKeys';
import EventNames from './constants/eventNames';
import './index.less';

interface IProps {
  /** 默认值 */
  value?: string;
  /** 提示信息 */
  placeholder?: string;
  /** 尺寸 */
  size?: {
    width: number | string;
    height: number | string;
  };
  onChange?: (value: string) => void;
  onPreview?: (htmlString: string) => void;
  onUploadImage?: (file: File, next: (url: string) => void) => void;
}
export interface EditorWangRefs {
  clear: () => void;
  /** 设置内容 */
  setContent: (htmlString: string) => void;
}

type InsertFnType = (url: string, alt: string, href: string) => void;

const __size = {
  width: '100%',
  height: 320,
};
const EditorWang = React.forwardRef<EditorWangRefs | undefined, IProps>(
  (props, refs) => {
    // -- 解构参数
    const {
      value,
      placeholder = '请输入内容',
      size = Object.assign({}, __size, props.size || {}),
      onChange,
      onPreview,
      onUploadImage,
    } = props;
    const { message, modal } = App.useApp();
    // -- state
    const [instance, setInstance] = useState<IDomEditor | null>(null);
    // -- refs
    useImperativeHandle(refs, () => ({
      clear: () => {
        instance?.clear();
      },
      setContent: (htmlString: string) => {
        instance?.setHtml(htmlString);
      },
    }));

    // -- events
    const __onClearContent = (editor: IDomEditor) => {
      modal.confirm({
        title: '是否确定清空内容?',
        content: '清空后内容将无法恢复，请自行保存内容!',
        onOk: () => editor.clear(),
      });
    };
    const __onPreview = (editor: IDomEditor) => {
      if (!editor.getText()) {
        message.info('文本内容为空，无法预览');
        return;
      }
      if (onPreview) {
        onPreview(editor.getHtml());
      }
    };
    const __onReplaceImage = (editor: IDomEditor, file: File) => {
      if (onUploadImage) {
        onUploadImage(file, (url: string) => {
          // -- 移除当前选中的节点
          SlateTransforms.removeNodes(editor);
          // -- 插入新节点
          const node = {
            type: 'paragraph',
            children: [
              { text: '' },
              {
                type: 'image',
                src: url,
                href: 'href',
                alt: 'alt',
                style: {},
                children: [{ text: '' }],
              },
              { text: '' },
            ],
          };
          editor.insertNode(node);
        });
      }
    };

    // -- 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {
      toolbarKeys,
    };

    // -- 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
      placeholder, // 占位符
      hoverbarKeys, // 悬浮菜单
      autoFocus: false,
      MENU_CONF: {
        fontSize,
        uploadImage: {
          // 自定义上传
          async customUpload(file: File, insertFn: InsertFnType) {
            if (onUploadImage) {
              onUploadImage(file, (url: string) => {
                insertFn(url, 'alt', 'href');
              });
            }
          },
        },
      },
    };

    // 及时销毁 editor ，重要！
    useEffect(() => {
      return () => {
        if (instance == null) return;
        instance.destroy();
        setInstance(null);
      };
    }, [instance]);

    // -- render
    return (
      <div className="lg-editor-wang" style={{ width: size.width }}>
        {/* 工具栏 */}
        <Toolbar
          editor={instance}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #d9d9d9', paddingBottom: 4 }}
        />
        {/* 编辑器 */}
        <Editor
          defaultConfig={editorConfig}
          value={value}
          onCreated={(editor: IDomEditor) => {
            setInstance(editor);
            // -- 自定义事件
            editor.on(EventNames.TAP_PREVIEW, () => __onPreview(editor));
            editor.on(EventNames.TAP_CLEAR_CONTENT, () =>
              __onClearContent(editor),
            );
            editor.on(EventNames.TAP_REPLACE_IMAGE, (file) =>
              __onReplaceImage(editor, file),
            );
          }}
          onChange={(_editor) => {
            const htmlString = _editor.getHtml();
            if (onChange) {
              onChange(htmlString);
            }
          }}
          mode="default"
          style={{ height: size.height, overflowY: 'hidden' }}
        />
      </div>
    );
  },
);

export default memo(EditorWang);
