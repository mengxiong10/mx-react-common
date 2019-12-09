import React from 'react';
import cx from 'classnames';

import './SvgIcon.scss';

export interface SvgIconProps extends React.HTMLAttributes<Element> {
  type: string;
}

export default function SvgIcon(props: SvgIconProps) {
  const { type, className, ...prop } = props;
  const classes = cx('svg-icon', className);
  return (
    <svg {...prop} className={classes} aria-hidden="true">
      <use xlinkHref={`#svg-${type}`} />
    </svg>
  );
}
