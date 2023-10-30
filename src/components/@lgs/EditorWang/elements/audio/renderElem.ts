import { Boot, IDomEditor, SlateElement } from '@wangeditor/editor';
import { VNode, h } from 'snabbdom';

/**
 * 渲染“附件”元素到编辑器
 * @param elem 附件元素，即上文的 myResume
 * @param children 元素子节点，void 元素可忽略
 * @param editor 编辑器实例
 * @returns vnode 节点（通过 snabbdom.js 的 h 函数生成）
 */
function renderAttachment(
  elem: SlateElement & Record<string, any>,
  children: VNode[] | null,
  editor: IDomEditor,
): VNode {
  // 获取“附件”的数据，参考上文 myResume 数据结构
  const { link = '' } = elem;
  const audioVnode = h('audio', {
    props: {
      src: link,
      controls: true,
      preload: 'auto',
    },
    style: { width: '300px' },
  });

  const attachVnode = h(
    'div',
    {
      props: { contentEditable: false },
      style: {
        padding: '16px 8px',
        background:
          'linear-gradient(45deg,#f5f5f5 70%,transparent 0,transparent 80%,#f5f5f5 0,#f5f5f5)',
      },
      on: {
        click() {
          // console.log('clicked', link);
        },
      },
    },
    [audioVnode],
  );

  return attachVnode;
}

const renderElemConf = {
  type: 'audioAttachment', // 新元素 type ，重要！！！
  renderElem: renderAttachment,
};

Boot.registerRenderElem(renderElemConf);
