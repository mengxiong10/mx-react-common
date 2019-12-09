import React, { useCallback, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { Select, Spin } from 'antd';
import { SelectProps } from 'antd/lib/select';

export interface SearchSelectProps extends SelectProps {
  showTitle?: boolean;
  defaultData?: any[];
  value?: any;
  searchData: (value: string) => Promise<any[]>;
  keyValue?: string;
  keyTitle?: string;
}

export interface FetchState<T> {
  loading: boolean;
  error?: Error;
  data?: T;
}

function isObject(value: any) {
  return value !== null && typeof value === 'object';
}

function useDebounceFetch<T>(fn: (...args: any[]) => Promise<T>, wait: number = 800) {
  const [state, set] = useState<FetchState<T>>({
    loading: false
  });

  const fetchData = useMemo(
    () => {
      let lastFetchId = 0;
      return debounce((...args: any[]) => {
        const fetchId = ++lastFetchId;
        set({ loading: true });
        fn(...args)
          .then(data => {
            if (fetchId !== lastFetchId) {
              return;
            }
            set({ loading: false, data });
          })
          .catch((error: Error) => {
            set({ loading: false, error });
          });
      }, wait);
    },
    [fn, wait]
  );

  return { ...state, fetchData };
}

function SearchSelect(props: SearchSelectProps) {
  const {
    value,
    keyValue = 'key',
    keyTitle = 'label',
    searchData,
    defaultData = [],
    showTitle = false,
    ...rest
  } = props;

  const { data, loading, error, fetchData } = useDebounceFetch<any[]>(searchData);
  const handleSearch = useCallback(
    (text: string) => {
      text = text && text.trim();
      if (text) {
        fetchData(text);
      }
    },
    [fetchData]
  );

  const options = loading ? [] : data || defaultData;
  let notFoundContent: React.ReactNode = '无匹配结果';
  if (loading) {
    notFoundContent = <Spin size="small" />;
  } else if (error) {
    notFoundContent = error.message;
  }
  return (
    <Select
      style={{ width: '100%' }}
      labelInValue
      {...rest}
      showSearch
      value={value}
      notFoundContent={notFoundContent}
      filterOption={false}
      onSearch={handleSearch}
    >
      {options.map(v => {
        const item = isObject(v) ? v : { [keyValue]: v, [keyTitle]: v };
        const val = item[keyValue];
        const label = item[keyTitle];
        return (
          <Select.Option key={val} value={val} title={showTitle ? label : undefined}>
            {label}
          </Select.Option>
        );
      })}
    </Select>
  );
}

export default SearchSelect;
