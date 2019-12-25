import { useCallback, useEffect, useState } from 'react';

export interface AsyncState<T> {
  loading: boolean;
  error?: Error;
  value?: T;
}
const useAsync = <T>(
  fn: () => Promise<T>,
  deps: any[] = [],
  initialState: AsyncState<T> = { loading: false }
) => {
  const [state, set] = useState<AsyncState<T>>(initialState);

  const memoized = useCallback(fn, deps);

  useEffect(
    () => {
      let mounted = true;
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

      return () => {
        mounted = false;
      };
    },
    [memoized]
  );

  return state;
};

export default useAsync;
