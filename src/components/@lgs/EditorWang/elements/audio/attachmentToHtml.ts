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
        data-w-e-is-block
        data-link="${link}"
        style="padding: 16px 8px; background:linear-gradient(45deg,#f5f5f5 70%,transparent 0,transparent 80%,#f5f5f5 0,#f5f5f5);"
    >
      <audio src="${link}" controls  preload="auto"  />
    </div>`;
  return html;
}

const elemToHtmlConf = {
  type: 'audioAttachment',
  elemToHtml: attachmentToHtml,
};

Boot.registerElemToHtml(elemToHtmlConf);
