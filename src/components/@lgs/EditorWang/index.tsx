import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  SlateTransforms,
} from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css';
import { App } from 'antd';
import React, { memo, useEffect, useImperativeHandle, useState } from 'react';
import hoverbarKeys from './configs/hoverbarKeys';
import { fontSize } from './configs/menuConfs';
import toolbarKeys from './configs/toolbarKeys';
import { EventType } from './constants';
import './elements';
import './index.less';
import './menus';
// https://blog.csdn.net/QiZi_Zpl/article/details/130402877

export interface UploadProps {
  type: 'AUDIO' | 'VIDEO' | 'IMAGE';
  file: File;
  next: (url: string) => void;
}

interface IProps {
  /** 默认值 */
  value?: string;
  /** 提示信息 */
  placeholder?: string;
  onChange?: (value: string) => void;
  /** 手机预览 */
  onPreview?: (htmlString: string) => void;
  /** 文件上传 */
  onUploadFile?: (options: UploadProps) => void;
}
export interface EditorWangRefs {
  /** 清空 */
  clear: () => void;
  /** 设置内容 */
  setContent: (htmlString: string) => void;
  /** 获取文本 */
  getText: () => string;
}

type InsertImageFnType = (url: string, alt: string, href: string) => void;
type InsertVideoFnType = (url: string, poster: string) => void;

const EditorWang = React.forwardRef<EditorWangRefs | undefined, IProps>(
  (props, refs) => {
    const {
      value,
      placeholder = '请输入内容...',
      onChange,
      onPreview,
      onUploadFile,
    } = props;
    const { message, modal } = App.useApp();

    // -- state
    const [editor, setEditor] = useState<IDomEditor | null>(null);

    // -- refs
    useImperativeHandle(refs, () => ({
      clear: () => {
        editor?.clear();
      },
      setContent: (htmlString: string) => {
        editor?.setHtml(htmlString);
      },
      getText: () => {
        return editor?.getText() || '';
      },
    }));

    // -- events
    const __onClearContent = (editor: IDomEditor) => {
      modal.confirm({
        title: '是否确定清空内容?',
        content: '清空后内容将无法恢复，请自行保存内容!',
        cancelText: '取消',
        okText: '取消',
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
      if (onUploadFile) {
        onUploadFile({
          type: 'IMAGE',
          file,
          next: (url: string) => {
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
          },
        });
      }
    };
    const __onUploadAudio = (editor: IDomEditor, file: File) => {
      if (onUploadFile) {
        onUploadFile({
          type: 'AUDIO',
          file,
          next(url) {
            const audioResume = {
              type: 'audioAttachment',
              link: url,
              children: [{ text: '' }],
            };
            editor.insertNode(audioResume);
          },
        });
      }
    };

    // -- 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {
      toolbarKeys,
    };

    // -- 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
      placeholder,
      autoFocus: false,
      maxLength: 1000,
      scroll: true,
      hoverbarKeys,
      MENU_CONF: {
        fontSize,
        uploadImage: {
          async customUpload(file: File, insertFn: InsertImageFnType) {
            if (onUploadFile) {
              onUploadFile({
                type: 'IMAGE',
                file,
                next: (url: string) => {
                  insertFn(url, 'alt', 'href');
                },
              });
            }
          },
        },
        uploadVideo: {
          async customUpload(file: File, insertFn: InsertVideoFnType) {
            if (onUploadFile) {
              onUploadFile({
                type: 'VIDEO',
                file,
                next: (url: string) => {
                  insertFn(url, '');
                },
              });
            }
          },
        },
      },
    };

    // 及时销毁 editor ，重要！
    useEffect(() => {
      return () => {
        if (editor == null) return;
        editor.destroy();
        setEditor(null);
      };
    }, [editor]);

    /**********************
     ** 布局
     **********************/
    return (
      <div className="lg-editor-wang">
        {/* 工具栏 */}
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        {/* 编辑器 */}

        <Editor
          defaultConfig={editorConfig}
          value={value}
          mode="default"
          style={{ overflowY: 'hidden', height: 300 }}
          onCreated={(editor: IDomEditor) => {
            setEditor(editor);
            // console.log(editor.getAllMenuKeys());
            // -- 自定义事件
            editor.on(EventType.PREVIEW, () => __onPreview(editor));
            editor.on(EventType.CLEAR_CONTENT, () => __onClearContent(editor));
            editor.on(EventType.REPLACE_IMAGE, (file) =>
              __onReplaceImage(editor, file),
            );
            editor.on(EventType.UPLOAD_AUDIO, (file) =>
              __onUploadAudio(editor, file),
            );
          }}
          onChange={(editor: IDomEditor) => {
            const htmlString = editor.getHtml();
            onChange && onChange(htmlString);
          }}
        />
      </div>
    );
  },
);

export default memo(EditorWang);
