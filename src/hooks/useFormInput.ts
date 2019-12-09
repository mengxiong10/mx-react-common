import { useCallback, useState } from 'react';

export type UseFormInput = <T>(
  initialValue?: any
) => [
  T, // state
  (evt?: any) => void
];

const isObject = (o: any) => {
  return typeof o === 'object' && o !== null;
};

const getValue = (evt: any) => {
  if (!isObject(evt) || !isObject(evt.target)) {
    return evt;
  }
  const { target } = evt;
  return target.type === 'checkbox' ? target.checked : target.value;
};

const useFormInput: UseFormInput = <T>(initialValue?: any) => {
  const [value, setValue] = useState<T>(initialValue);
  const handleChange = useCallback(
    (evt: any) => {
      setValue(getValue(evt));
    },
    [setValue]
  );
  return [value, handleChange];
};

export default useFormInput;
