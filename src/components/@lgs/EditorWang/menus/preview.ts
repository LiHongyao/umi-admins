import type { IButtonMenu, IDomEditor } from '@wangeditor/editor';
import { Boot } from '@wangeditor/editor';
import { EventType, Svgs } from '../constants';

class Preview implements IButtonMenu {
  title: string;
  tag: string;
  iconSvg?: string | undefined;
  constructor() {
    this.title = '手机预览';
    this.tag = 'button';
    this.iconSvg = Svgs.PREVIEW;
  }
  getValue(_: IDomEditor): string | boolean {
    return '';
  }
  isActive(_: IDomEditor): boolean {
    return false;
  }
  isDisabled(_: IDomEditor): boolean {
    return false;
  }
  exec(editor: IDomEditor) {
    if (this.isDisabled(editor)) return;
    editor.emit(EventType.PREVIEW);
  }
}

Boot.registerMenu({
  key: 'preview',
  factory() {
    return new Preview();
  },
});
