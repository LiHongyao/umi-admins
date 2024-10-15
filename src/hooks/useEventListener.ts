import { useEffect } from 'react';

// 定义目标元素的类型
type EventTarget = HTMLElement | Document | Window;
// 定义事件选项的类型
type EventOptions = boolean | AddEventListenerOptions;

/**
 * 事件监听器 Hook
 * @param target - 事件目标
 * @param type - 事件类型
 * @param listener - 事件处理函数
 * @param options - 事件选项
 */
export default function useEventListener<K extends keyof WindowEventMap>(
  target: Window,
  type: K,
  listener: (event: WindowEventMap[K]) => void,
  options?: EventOptions,
): void;
export default function useEventListener<K extends keyof DocumentEventMap>(
  target: Document,
  type: K,
  listener: (event: DocumentEventMap[K]) => void,
  options?: EventOptions,
): void;
export default function useEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: EventOptions,
): void;
export default function useEventListener(
  target: EventTarget,
  type: string,
  listener: EventListener,
  options?: EventOptions,
): void {
  useEffect(() => {
    const eventListenerOptions = options || false;
    target.addEventListener(type, listener, eventListenerOptions);
    return () => {
      target.removeEventListener(type, listener, eventListenerOptions);
    };
  }, [target, type, listener, options]);
}
