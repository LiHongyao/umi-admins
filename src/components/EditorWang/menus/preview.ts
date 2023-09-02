/*
 * @Author: Lee
 * @Date: 2022-10-19 10:36:46
 * @LastEditors: Lee
 * @LastEditTime: 2022-10-19 14:30:19
 * @Description:
 */
import type { IButtonMenu, IDomEditor } from '@wangeditor/editor';
import { Boot } from '@wangeditor/editor';
import EventNames from '../constants/eventNames';

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
