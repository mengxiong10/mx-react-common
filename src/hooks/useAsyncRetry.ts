import { useCallback, useState } from 'react';

import useAsync from './useAsync';

const useAsyncRetry = <T>(fn: () => Promise<T>, args: any[] = [], effect: boolean = true) => {
  const [count, setCount] = useState<number>(0);

  const state = useAsync(fn, [...args, count], effect);

  const retry = useCallback(
    () => {
      if (state.loading) {
        return;
      }
      setCount(c => c + 1);
    },
    [state, setCount]
  );

  return { ...state, retry };
};

export default useAsyncRetry;
