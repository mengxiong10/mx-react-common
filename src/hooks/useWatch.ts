import { useEffect, useRef } from 'react';

import usePrevious from './usePrevious';

function useWatch<T>(
  state: T,
  handler: (state: T, prevState?: T) => void,
  options = { immediate: false }
) {
  const prevState = usePrevious(state);
  const initialRef = useRef(true);
  const isInitial = initialRef.current;
  useEffect(() => {
    initialRef.current = false;
  }, []);
  useEffect(() => {
    if ((!isInitial && prevState !== state) || (isInitial && options.immediate)) {
      handler(state, prevState);
    }
  });
}

export default useWatch;
