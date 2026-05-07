import { useState, useEffect, useRef } from 'react';

export function useTyping(roles: string[]): string {
  const [displayed, setDisplayed] = useState('');
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const current = roles[roleIdx.current];

      if (!deleting.current) {
        charIdx.current += 1;
        setDisplayed(current.slice(0, charIdx.current));
        if (charIdx.current === current.length) {
          deleting.current = true;
          timeout = setTimeout(tick, 1600);
          return;
        }
        timeout = setTimeout(tick, 65);
      } else {
        charIdx.current -= 1;
        setDisplayed(current.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          roleIdx.current = (roleIdx.current + 1) % roles.length;
          timeout = setTimeout(tick, 400);
          return;
        }
        timeout = setTimeout(tick, 35);
      }
    }

    timeout = setTimeout(tick, 1200);
    return () => clearTimeout(timeout);
  }, []);

  return displayed;
}
