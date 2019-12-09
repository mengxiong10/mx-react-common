import { useCallback, useState } from 'react';

export type UseBoolean = (
  state: boolean
) => [
  boolean, // state
  (nextValue?: any) => void // eBoolean
];

const useBoolean: UseBoolean = state => {
  const [value, setValue] = useState<boolean>(state);

  const toggle = useCallback(
    (nextValue?: any) => {
      if (typeof nextValue === 'boolean') {
        setValue(nextValue);
        return;
      }

      setValue(v => !v);
    },
    [setValue]
  );

  return [value, toggle];
};

export default useBoolean;
