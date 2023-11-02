import { useCallback, useEffect, useRef } from 'react';

export default function useDebounce(
  callback: (...args: any) => void,
  delay: number,
  deps: any[] = [],
) {
  const { current } = useRef<{
    callback: (...args: any) => void;
    timer: NodeJS.Timeout | null;
  }>({ callback, timer: null });

  useEffect(() => {
    current.callback = callback;
  }, [callback]);

  return useCallback(
    (...args: any[]) => {
      if (current.timer) {
        clearTimeout(current.timer);
      }
      current.timer = setTimeout(() => {
        current.callback(...args);
      }, delay);
    },
    [delay, ...deps],
  );
}
