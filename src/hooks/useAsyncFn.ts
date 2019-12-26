import { useState, useCallback, DependencyList } from 'react';
import useRefUnmounted from './useRefUnmounted';

type Fn<R, S extends any[]> = (...args: S) => Promise<R>;

export interface AsyncState<T> {
  loading: boolean;
  error?: Error;
  value?: T;
}

const useAsyncFn = <R, S extends any[]>(
  fn: Fn<R, S>,
  deps: DependencyList = []
): [AsyncState<R>, Fn<R, S>] => {
  const [state, set] = useState<AsyncState<R>>({
    loading: false
  });

  const unmountedRef = useRefUnmounted();

  const callback = useCallback(
    (...args: S) => {
      set(prevState => ({ ...prevState, loading: true, error: undefined }));
      return fn(...args)
        .then(value => {
          if (!unmountedRef.current) {
            set({
              loading: false,
              value
            });
          }
          return value;
        })
        .catch(error => {
          if (!unmountedRef.current) {
            set({
              loading: false,
              error
            });
          }
          throw error;
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

  return [state, callback];
};

export default useAsyncFn;
