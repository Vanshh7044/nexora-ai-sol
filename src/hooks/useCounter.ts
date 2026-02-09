import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export const useCounter = (
  end: number,
  duration: number = 2000,
  startOnView: boolean = true
) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (startOnView && !isInView) return;
    if (hasStarted) return;

    setHasStarted(true);
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [end, duration, isInView, hasStarted, startOnView]);

  return { count, ref };
};

