import {
  Boot,
  IDomEditor,
  SlateDescendant,
  SlateElement,
} from '@wangeditor/editor';

/**
 * 回显
 * 解析 HTML 字符串，生成“附件”元素
 * @param domElem HTML 对应的 DOM Element
 * @param children 子节点
 * @param editor editor 实例
 * @returns “附件”元素，如上文的 myResume
 */
function parseAttachmentHtml(
  domElem: Element,
  children: SlateDescendant[],
  editor: IDomEditor,
): SlateElement {
  const link = domElem.getAttribute('data-link') || '';
  const audioResume = {
    type: 'audioAttachment',
    link,
    children: [{ text: '' }],
  };

  return audioResume;
}

const parseHtmlConf = {
  selector: 'div[data-w-e-type="audioAttachment"]',
  parseElemHtml: parseAttachmentHtml,
};

Boot.registerParseElemHtml(parseHtmlConf);
