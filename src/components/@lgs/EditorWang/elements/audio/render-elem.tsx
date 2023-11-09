import { DomEditor, IDomEditor, SlateElement } from '@wangeditor/editor';
import { VNode, h } from 'snabbdom';
import { AudioElement } from './custom-types';

function renderAudio(
  elem: SlateElement,
  children: VNode[] | null,
  editor: IDomEditor,
): VNode {
  const { src = '' } = elem as AudioElement;
  const selected = DomEditor.isNodeSelected(editor, elem);

  const audioVnode = h('audio', {
    props: {
      src,
      controls: true,
      preload: 'auto',
    },
    style: { width: '300px' },
  });

  const containerVnode = h(
    'div',
    {
      props: { contentEditable: false },
      style: {
        padding: '16px 8px',
        background:
          'linear-gradient(45deg,#f5f5f5 70%,transparent 0,transparent 80%,#f5f5f5 0,#f5f5f5)',
      },
      on: {
        mousedown: (e) => e.preventDefault(),
        keydown: (e) => e.preventDefault(),
      },
    },
    [audioVnode],
  );
  return containerVnode;
}

const renderAudioConf = {
  type: 'audio',
  renderElem: renderAudio,
};
export { renderAudioConf };
