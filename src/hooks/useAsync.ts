import { useCallback, useEffect, useState } from 'react';

export interface AsyncState<T> {
  loading: boolean;
  error?: Error;
  value?: T;
}
const useAsync = <T>(fn: () => Promise<T>, args: any[] = [], effect: boolean = true) => {
  const [state, set] = useState<AsyncState<T>>({
    loading: effect
  });

  const memoized = useCallback(fn, args);

  useEffect(
    () => {
      let mounted = true;
      if (effect) {
        set(prevState => ({ ...prevState, loading: true, error: undefined }));
        const promise = memoized();

        promise.then(
          (value: T) => {
            if (mounted) {
              set({
                loading: false,
                value
              });
            }
          },
          (error: Error) => {
            if (mounted) {
              set({
                loading: false,
                error
              });
            }
          }
        );
      }

      return () => {
        mounted = false;
      };
    },
    [memoized, effect]
  );

  return state;
};

export default useAsync;
