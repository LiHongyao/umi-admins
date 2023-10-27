import { Boot, SlateElement } from '@wangeditor/editor';

/**
 * 生成“附件”元素的 HTML
 * @param elem 附件元素，即上文的 myResume
 * @param childrenHtml 子节点的 HTML 代码，void 元素可忽略
 * @returns “附件”元素的 HTML 字符串
 */
function attachmentToHtml(
  elem: SlateElement & Record<string, any>,
  childrenHtml: string,
): string {
  const { link = '' } = elem;
  const html = `<div
        data-w-e-type="audioAttachment"
        data-w-e-is-void
        data-w-e-is-inline
        data-link="${link}"
    >
      <audio src="${link}" controls />
    </div>`;
  return html;
}

const elemToHtmlConf = {
  type: 'audioAttachment',
  elemToHtml: attachmentToHtml,
};

Boot.registerElemToHtml(elemToHtmlConf);
