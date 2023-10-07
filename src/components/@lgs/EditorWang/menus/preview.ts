import type { IButtonMenu, IDomEditor } from '@wangeditor/editor';
import { Boot } from '@wangeditor/editor';
import EventNames from '../constants';

class Preview implements IButtonMenu {
  title: string;
  tag: string;
  constructor() {
    this.title = '手机预览';
    this.tag = 'button';
  }
  getValue(): string | boolean {
    return '';
  }
  isActive(): boolean {
    return false;
  }
  isDisabled(): boolean {
    return false;
  }
  exec(editor: IDomEditor) {
    editor.emit(EventNames.TAP_PREVIEW);
  }
}

const _ = {
  key: 'preview',
  factory() {
    return new Preview();
  },
};

Boot.registerMenu(_);
