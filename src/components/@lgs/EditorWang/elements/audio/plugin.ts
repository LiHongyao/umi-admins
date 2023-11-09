import { DomEditor, IDomEditor, SlateTransforms } from '@wangeditor/editor';
function withAudio<T extends IDomEditor>(editor: T) {
  const { isVoid, normalizeNode } = editor;
  const newEditor = editor;

  // -- 重写isVoid
  newEditor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === 'audio') return true;
    return isVoid(elem);
  };

  // -- 重写normalize
  newEditor.normalizeNode = ([node, path]) => {
    const type = DomEditor.getNodeType(node);
    if (type !== 'audio') {
      // 未命中 audio ，执行默认的 normalizeNode
      return normalizeNode([node, path]);
    }

    // editor 顶级 node
    const topLevelNodes = newEditor.children || [];

    // --------------------- audio 后面必须跟一个 p header blockquote（否则后面无法继续输入文字） ---------------------
    const nextNode = topLevelNodes[path[0] + 1] || {};
    const nextNodeType = DomEditor.getNodeType(nextNode);
    if (
      nextNodeType !== 'paragraph' &&
      nextNodeType !== 'blockquote' &&
      !nextNodeType.startsWith('header')
    ) {
      // audio node 后面不是 p 或 header ，则插入一个空 p
      const p = { type: 'paragraph', children: [{ text: '' }] };
      const insertPath = [path[0] + 1];
      SlateTransforms.insertNodes(newEditor, p, {
        at: insertPath, // 在 audio 后面插入
      });
    }
  };

  return newEditor;
}

export { withAudio };
