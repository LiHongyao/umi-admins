import type { IButtonMenu, IDomEditor } from '@wangeditor/editor';
import { Boot } from '@wangeditor/editor';
import { EventType, Svgs } from '../constants';

class ReplaceImage implements IButtonMenu {
  title: string;
  tag: string;
  iconSvg?: string | undefined;
  constructor() {
    this.title = '替换图片';
    this.tag = 'button';
    this.iconSvg = Svgs.REPLACE_IMAGE;
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
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'false');
    input.click();
    input.onchange = function (event: Event) {
      const fileInput = event.target as HTMLInputElement;
      const files = fileInput.files;
      if (files && files.length > 0) {
        editor.emit(EventType.REPLACE_IMAGE, files[0]);
      }
    };
  }
}

Boot.registerMenu({
  key: 'replaceImage',
  factory() {
    return new ReplaceImage();
  },
});
