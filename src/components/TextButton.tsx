import React from 'react';
import classNames from 'classnames';

import './TextButton.scss';

export interface TextButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  children: any;
}

export default function TextButton(props: TextButtonProps) {
  const { className, disabled, children, ...otherProps } = props;
  const classes = classNames(
    {
      'btn-text': true,
      'is-disabled': disabled
    },
    className
  );
  return (
    <button type="button" className={classes} disabled={disabled} {...otherProps}>
      {children}
    </button>
  );
}
