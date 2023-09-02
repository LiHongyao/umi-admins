/*
 * @Author: Lee
 * @Date: 2022-10-19 10:09:32
 * @LastEditors: Lee
 * @LastEditTime: 2022-10-19 14:22:45
 * @Description:
 */

import type { IButtonMenu, IDomEditor } from '@wangeditor/editor';
import { Boot } from '@wangeditor/editor';
import EventNames from '../constants/eventNames';

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
