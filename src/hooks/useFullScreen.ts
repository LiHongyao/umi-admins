import { useState } from 'react';
import { useEventListener } from '.';

interface FullScreenHook {
  isFullScreen: boolean;
  enterFullScreen: () => void;
  exitFullScreen: () => void;
}

export default function useFullScreen(): FullScreenHook {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const enterFullScreen = () => {
    const doc = document.documentElement as any;
    if (doc.requestFullscreen) {
      doc.requestFullscreen();
    } else if (doc.mozRequestFullScreen) {
      doc.mozRequestFullScreen();
    } else if (doc.webkitRequestFullscreen) {
      doc.webkitRequestFullscreen();
    } else if (doc.msRequestFullscreen) {
      doc.msRequestFullscreen();
    }
  };
  const exitFullScreen = () => {
    const doc = document as any;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
  };

  const fullscreenChangeHandler = () => {
    setIsFullScreen(!!document.fullscreenElement);
  };

  useEventListener(document, 'fullscreenchange', fullscreenChangeHandler);
  useEventListener(document, 'mozfullscreenchange', fullscreenChangeHandler);
  useEventListener(document, 'webkitfullscreenchange', fullscreenChangeHandler);
  useEventListener(document, 'msfullscreenchange', fullscreenChangeHandler);

  return {
    isFullScreen,
    enterFullScreen,
    exitFullScreen,
  };
}
