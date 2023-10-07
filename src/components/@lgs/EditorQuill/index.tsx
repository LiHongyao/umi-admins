import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import React, { useEffect, useRef } from 'react';
import toolbarOptions from './configs/toolbarOptions';
import './index.less';

const EditorQuill: React.FC = React.memo(() => {
  const container = useRef<HTMLDivElement | null>(null);
  const editor = useRef<Quill | null>(null);

  useEffect(() => {
    if (container.current) {
      editor.current = new Quill(container.current, {
        // debug: 'info',
        modules: {
          toolbar: toolbarOptions,
          // imageResize: {},
        },
        placeholder: '请输入内容...',
        theme: 'snow',
      });
    }
    // 清理函数，当组件卸载时销毁 Quill 实例
    return () => {
      if (editor.current) {
        editor.current.off('text-change', () => {});
        editor.current = null;
      }
    };
  }, []);

  return <div className="lg-quill-editor" ref={container}></div>;
});

export default EditorQuill;
