/**
 * 自定义音频元素
 * @see https://www.wangeditor.com/v5/development.html#%E5%AE%9A%E4%B9%89%E6%96%B0%E5%85%83%E7%B4%A0
 */
import { Boot } from '@wangeditor/editor';
import { audioToHtmlConf } from './elem-to-html';
import { parseHtmlConf } from './parse-elem-html';
import { withAudio } from './plugin';
import { renderAudioConf } from './render-elem';

function initAudioNode() {
  Boot.registerRenderElem(renderAudioConf);
  Boot.registerElemToHtml(audioToHtmlConf);
  Boot.registerParseElemHtml(parseHtmlConf);
  Boot.registerPlugin(withAudio);
}
initAudioNode();
export default initAudioNode;
