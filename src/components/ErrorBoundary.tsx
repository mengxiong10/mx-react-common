import React from 'react';

import RowFlex from './RowFlex';

interface ErrorBoundaryProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, any> {
  static getDerivedStateFromError(error: Error) {
    return { appError: error };
  }

  constructor(props: any) {
    super(props);
    this.state = {
      appError: undefined
    };
  }

  public render() {
    const { appError } = this.state;
    const { error, children, ...rest } = this.props;
    const err = appError || error;
    if (err) {
      const msg = err.message || '加载失败';
      return (
        <RowFlex column align="middle" justify="center" {...rest}>
          <span
            style={{
              fontSize: 14,
              color: '#f5222d'
            }}
          >
            {`: ( ${msg}`}
          </span>
        </RowFlex>
      );
    }

    return children;
  }
}
export default ErrorBoundary;
