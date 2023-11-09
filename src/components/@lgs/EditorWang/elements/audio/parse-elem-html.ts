import { IDomEditor, SlateDescendant, SlateElement } from '@wangeditor/editor';
import { AudioElement } from './custom-types';

function parseHtml(
  domElem: Element,
  children: SlateDescendant[],
  editor: IDomEditor,
): SlateElement {
  const src = domElem.getAttribute('data-src') || '';

  return {
    type: 'audio',
    src,
    children: [{ text: '' }],
  } as AudioElement;
}

export const parseHtmlConf = {
  selector: 'div[data-w-e-type="audio"]',
  parseElemHtml: parseHtml,
};
