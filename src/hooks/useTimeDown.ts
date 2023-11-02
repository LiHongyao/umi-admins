import { useEffect, useRef, useState } from 'react';

interface TimeDownOptions {
  // 时间戳
  timeStamp: number;
  // 返回格式 → DD HH:mm:ss ms，不传则返回元组类型[天,时,分,秒,毫秒]
  format?: string;
  // 倒计时类型：default/秒制 ms/毫秒制
  type?: 'default' | 'ms';
  // 是否显示天，默认为true，当为true时，超过24小时天数+1，当为false时，超过24小时累计小时值
  showDay?: boolean;
  // 倒计时结束回调
  onFinish?: () => void;
}

type CountTimeFormat = 'DD' | 'HH' | 'mm' | 'ss' | 'ms';
const formatNum = (n: number) => String(n).padStart(2, '0');
const formatTime = (time: number, showDay: boolean, format?: string) => {
  const days = showDay ? formatNum(Math.floor(time / 1000 / 60 / 60 / 24)) : '';
  const hours = showDay
    ? formatNum(Math.floor((time / 1000 / 60 / 60) % 24))
    : formatNum(Math.floor(time / 1000 / 60 / 60));
  const minutes = formatNum(Math.floor((time / 1000 / 60) % 60));
  const seconds = formatNum(Math.floor((time / 1000) % 60));
  const milliseconds = formatNum(Math.floor((time % 1000) / 100));
  const placeholders: Record<CountTimeFormat, string> = {
    DD: days,
    HH: hours,
    mm: minutes,
    ss: seconds,
    ms: milliseconds,
  };
  if (format) {
    return format.replace(
      /DD|HH|mm|ss|ms/g,
      (match) => placeholders[match as CountTimeFormat],
    );
  }
  return [days, hours, minutes, seconds, milliseconds];
};

const useTimeDown = ({
  timeStamp,
  format,
  type = 'default',
  showDay = true,
  onFinish,
}: TimeDownOptions) => {
  const [counter, setCounter] = useState<number>(timeStamp);
  const [isEnd, setIsEnd] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (counter <= 0) {
      setIsEnd(true);
      clearInterval(timerRef.current);
      onFinish && onFinish();
    } else {
      const interval = type === 'default' ? 1000 : 100;
      timerRef.current = setInterval(() => {
        setCounter((prev) => prev - interval);
      }, interval);
    }
    return () => clearInterval(timerRef.current);
  }, [counter, onFinish, type]);

  return {
    timeRemaining: formatTime(counter, showDay, format),
    isEnd,
  };
};

export default useTimeDown;
