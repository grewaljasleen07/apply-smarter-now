import { useCallback, useEffect, useRef, useState } from "react";

export type Stage = { label: string; ms: number };

/**
 * Drives a staged "AI is working" experience. Frontend-only for phase 1; the
 * same interface will later be fed by streamed progress from the AI service.
 */
export function useStagedProcess(stages: Stage[]) {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [current, setCurrent] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clear, [clear]);

  const start = useCallback(
    (onComplete?: () => void) => {
      clear();
      setRunning(true);
      setDone(false);
      setCurrent(0);
      let elapsed = 0;
      stages.forEach((stage, index) => {
        elapsed += stage.ms;
        timers.current.push(
          setTimeout(() => {
            if (index === stages.length - 1) {
              setCurrent(stages.length);
              setRunning(false);
              setDone(true);
              onComplete?.();
            } else {
              setCurrent(index + 1);
            }
          }, elapsed),
        );
      });
    },
    [clear, stages],
  );

  const reset = useCallback(() => {
    clear();
    setRunning(false);
    setDone(false);
    setCurrent(-1);
  }, [clear]);

  return { running, done, current, start, reset, total: stages.length };
}
