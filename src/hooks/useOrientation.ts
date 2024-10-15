import { useState } from 'react';
import { useEventListener } from '.';

type Orientation = 'portrait' | 'landscape';

export default function useOrientation(): Orientation {
  const getOrientation = (): Orientation => {
    return window.matchMedia('(orientation: portrait)').matches
      ? 'portrait'
      : 'landscape';
  };

  const [orientation, setOrientation] = useState<Orientation>(getOrientation());

  useEventListener(window, 'orientationchange', () => {
    setOrientation(getOrientation());
  });

  return orientation;
}
