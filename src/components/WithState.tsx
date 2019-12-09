import React, { forwardRef } from 'react';
import { Spin } from 'antd';
import classNames from 'classnames';

import EmptyBlock, { EmptyBlockProps } from './EmptyBlock';
import ErrorBoundary from './ErrorBoundary';
import './WithState.scss';

export interface WithStateProps extends React.HTMLAttributes<HTMLElement> {
  loading: boolean;
  error?: Error;
  children?: React.ReactNode;
  isEmpty?: (value: any) => boolean;
  empty?: EmptyBlockProps;
  value?: any;
}

const isDefaultEmpty = (value: any) => {
  return value === undefined || (Array.isArray(value) && value.length === 0);
};

function WithState(props: WithStateProps, ref: React.RefObject<HTMLDivElement>) {
  const {
    error,
    loading,
    children,
    isEmpty = isDefaultEmpty,
    empty,
    value,
    className,
    ...restProps
  } = props;

  const placeholder = !loading && isEmpty(value || children) && <EmptyBlock {...empty} />;
  const classes = classNames('with-state-container', className);

  return (
    <div className={classes} ref={ref} {...restProps}>
      <ErrorBoundary error={error}>
        <Spin spinning={loading} delay={200} tip="玩命加载中...">
          {placeholder || children}
        </Spin>
      </ErrorBoundary>
    </div>
  );
}

export default forwardRef(WithState);
