import { useRef, useCallback } from 'react';

export function useDebounceFn<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
) {
  const timer = useRef<number | null>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay],
  );

  return debouncedFn;
}
