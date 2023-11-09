import { SlateElement } from '@wangeditor/editor';
import { AudioElement } from './custom-types';

function audioToHtml(elem: SlateElement, childrenHtml: string): string {
  const { src = '' } = elem as AudioElement;
  const html = `<div
        data-w-e-type="audio"
        data-w-e-is-void
        data-src=${src}
        style="padding: 16px 8px; background:linear-gradient(45deg,#f5f5f5 70%,transparent 0,transparent 80%,#f5f5f5 0,#f5f5f5);"
    >\n
      <audio controls preload="auto" src="${src}" />
    </div>\n`;
  return html;
}

const audioToHtmlConf = {
  type: 'audio',
  elemToHtml: audioToHtml,
};

export { audioToHtmlConf };
