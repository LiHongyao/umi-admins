import type { IButtonMenu, IDomEditor } from '@wangeditor/editor';
import { Boot } from '@wangeditor/editor';
import EventNames from '../constants';

class ClearContent implements IButtonMenu {
  title: string;
  tag: string;
  constructor() {
    this.title = '清除内容';
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
    editor.emit(EventNames.TAP_CLEAR_CONTENT);
  }
}

const _ = {
  key: 'clearContent',
  factory() {
    return new ClearContent();
  },
};

Boot.registerMenu(_);
