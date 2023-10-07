import type { IButtonMenu, IDomEditor } from '@wangeditor/editor';
import { Boot } from '@wangeditor/editor';
import EventNames from '../constants';

class ReplaceImage implements IButtonMenu {
  title: string;
  tag: string;
  constructor() {
    this.title = '替换图片';
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
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = function () {
      // @ts-ignore
      editor.emit(EventNames.TAP_REPLACE_IMAGE, this.files[0] as File);
    };
  }
}

const _ = {
  key: 'replaceImage',
  factory() {
    return new ReplaceImage();
  },
};

Boot.registerMenu(_);
