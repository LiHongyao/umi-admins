import { useCallback } from 'react';
import { useEventListener } from '.';

/**
 * 禁止网页通过 Ctrl+/Ctrl- 和 Ctrl+滚轮 缩放
 */
export default function usePreventZoom() {
  // 处理键盘事件，阻止 Ctrl + 或 Ctrl - 缩放
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      (event.key === '+' || event.key === '-' || event.key === '=')
    ) {
      event.preventDefault(); // 阻止默认的缩放行为
    }
  }, []);

  // 处理鼠标滚轮事件，阻止 Ctrl + 滚轮 缩放
  const handleWheel = useCallback((event: WheelEvent) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault(); // 阻止默认的缩放行为
    }
  }, []);

  // 使用 useEventListener Hook 监听键盘和滚轮事件
  useEventListener(window, 'keydown', handleKeyDown);
  useEventListener(window, 'wheel', handleWheel, { passive: false });
}
