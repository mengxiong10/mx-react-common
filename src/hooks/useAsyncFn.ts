import { useState } from 'react';
import useRefUnmounted from './useRefUnmounted';

type Fn<R, S extends any[]> = (...args: S) => Promise<R>;

export interface AsyncState<T> {
  loading: boolean;
  error?: Error;
  value?: T;
}

const useAsyncFn = <R, S extends any[]>(fn: Fn<R, S>): [Fn<R, S>, AsyncState<R>] => {
  const [state, set] = useState<AsyncState<R>>({
    loading: false
  });

  const unmountedRef = useRefUnmounted();

  const request = (...args: S) => {
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
  };

  return [request, state];
};

export default useAsyncFn;
