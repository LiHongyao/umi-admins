import { useState } from 'react';
import { useEventListener } from '.';

interface FullScreenHook {
  isFullScreen: boolean;
  enterFullScreen: () => void;
  exitFullScreen: () => void;
}

/**
 * 全屏切换
 * @returns
 */
export default function useFullScreen(): FullScreenHook {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const enterFullScreen = () => {
    const doc = document.documentElement as any;
    if (doc.requestFullscreen) doc.requestFullscreen();
    else if (doc.mozRequestFullScreen) doc.mozRequestFullScreen();
    else if (doc.webkitRequestFullscreen) doc.webkitRequestFullscreen();
    else if (doc.msRequestFullscreen) doc.msRequestFullscreen();
  };

  const exitFullScreen = () => {
    const doc = document as any;
    if (doc.exitFullscreen) doc.exitFullscreen();
    else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
    else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
    else if (doc.msExitFullscreen) doc.msExitFullscreen();
  };

  const fullscreenChangeHandler = () => {
    const fullscreenElement =
      (document as any).fullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement ||
      (document as any).webkitCurrentFullScreenElement;
    setIsFullScreen(!!fullscreenElement);
  };

  // @ts-ignore
  useEventListener(document, 'fullscreenchange', fullscreenChangeHandler);
  // @ts-ignore
  useEventListener(document, 'mozfullscreenchange', fullscreenChangeHandler);
  // @ts-ignore
  useEventListener(document, 'webkitfullscreenchange', fullscreenChangeHandler);
  // @ts-ignore
  useEventListener(document, 'msfullscreenchange', fullscreenChangeHandler);

  return {
    isFullScreen,
    enterFullScreen,
    exitFullScreen,
  };
}
