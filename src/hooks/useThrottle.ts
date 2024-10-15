import { useCallback, useEffect, useRef } from 'react';

/**
 * 节流
 * @param callback
 * @param delay
 * @param deps
 * @returns
 */
export default function useThrottle(
  callback: (...args: any) => void,
  delay: number,
  deps: any[] = [],
) {
  const callbackRef = useRef(callback);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 当回调函数变化时更新回调引用
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // 在组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: any[]) => {
      if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          timerRef.current = null; // 在延迟后重置定时器
          callbackRef.current(...args);
        }, delay);
      }
    },
    [delay, ...deps],
  );
}
