import { useRef, useEffect } from 'react';

const useRefUnmounted = () => {
  const refUnmounted = useRef<boolean>(false);
  useEffect(() => {
    return () => {
      refUnmounted.current = true;
    };
  }, []);
  return refUnmounted;
};

export default useRefUnmounted;
