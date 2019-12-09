import React from 'react';

import RowFlex from './RowFlex';

interface ErrorBoundaryProps {
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
    const { error, children } = this.props;
    const err = appError || error;
    if (err) {
      const msg = err.message || ': ( 加载失败';
      return (
        <RowFlex column align="middle" justify="center" style={{ width: '100%' }}>
          <span
            style={{
              fontSize: 14,
              color: '#f5222d'
            }}
          >
            : ( {msg}
          </span>
        </RowFlex>
      );
    }

    return children;
  }
}
export default ErrorBoundary;
