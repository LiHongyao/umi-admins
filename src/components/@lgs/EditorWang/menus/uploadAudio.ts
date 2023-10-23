import { Boot, IButtonMenu, IDomEditor } from '@wangeditor/editor';
import { EventType, Svgs } from '../constants';
class UploadAudio implements IButtonMenu {
  tag: string;
  title: string;
  iconSvg?: string | undefined;
  constructor() {
    this.title = '插入音频';
    this.tag = 'button';
    this.iconSvg = Svgs.UPLOAD_AUDIO;
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
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.mp3');
    input.setAttribute('multiple', 'false');
    input.click();
    input.onchange = function (event: Event) {
      const fileInput = event.target as HTMLInputElement;
      const files = fileInput.files;
      if (files && files.length > 0) {
        editor.emit(EventType.UPLOAD_AUDIO, files[0]);
      }
    };
  }
}

Boot.registerMenu({
  key: 'uploadAudio',
  factory() {
    return new UploadAudio();
  },
});
