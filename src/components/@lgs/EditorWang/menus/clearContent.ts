import type { IButtonMenu, IDomEditor } from '@wangeditor/editor';
import { Boot } from '@wangeditor/editor';
import { EventType, Svgs } from '../constants';

class ClearContent implements IButtonMenu {
  title: string;
  tag: string;
  iconSvg?: string | undefined;

  constructor() {
    this.title = '清除内容';
    this.tag = 'button';
    this.iconSvg = Svgs.CLEAR_CONTENT;
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
  exec(editor: IDomEditor, _: string | boolean) {
    if (this.isDisabled(editor)) return;
    editor.emit(EventType.CLEAR_CONTENT);
  }
}

Boot.registerMenu({
  key: 'clearContent',
  factory() {
    return new ClearContent();
  },
});
