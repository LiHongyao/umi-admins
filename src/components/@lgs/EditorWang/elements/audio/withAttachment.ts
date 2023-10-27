import { Boot, DomEditor, IDomEditor } from '@wangeditor/editor';
function withAttachment<T extends IDomEditor>(editor: T) {
  const { isInline, isVoid } = editor;
  const newEditor = editor;

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === 'audioAttachment') return true; // 针对 type: attachment ，设置为 inline
    return isInline(elem);
  };

  newEditor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === 'audioAttachment') return true; // 针对 type: attachment ，设置为 void
    return isVoid(elem);
  };

  return newEditor; // 返回 newEditor ，重要！！！
}

Boot.registerPlugin(withAttachment);
