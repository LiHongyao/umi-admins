import { useEffect } from 'react';

type EventTarget = HTMLElement | Document | Window;

interface EventOptions {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

type EventHandler = (event: Event) => void;

export default function useEventListener(
  target: EventTarget,
  eventName: string,
  handler: EventHandler,
  options?: EventOptions,
): void {
  useEffect(() => {
    const eventListenerOptions = options || false;
    target.addEventListener(eventName, handler, eventListenerOptions);
    return () => {
      target.removeEventListener(eventName, handler, eventListenerOptions);
    };
  }, [target, eventName, handler, options]);
}
