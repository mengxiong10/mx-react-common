import React, { useEffect, useRef, useState, useCallback } from 'react';
import classnames from 'classnames';

export interface OverflowTooltipProps {
  title: string;
  width?: number | string;
  style?: React.CSSProperties;
  className?: string;
}

function isEllipsisActive(element: HTMLElement) {
  return element.offsetWidth < element.scrollWidth;
}

function OverflowTooltip(props: OverflowTooltipProps) {
  const { width, title, style, className, ...rest } = props;
  const [overflow, set] = useState(false);

  const el = useRef(null);

  const handleMouseEnter = useCallback(() => {
    set(isEllipsisActive(el.current!));
  }, []);

  useEffect(
    () => {
      set(isEllipsisActive(el.current!));
    },
    [title, width]
  );

  const innerClasses = classnames('truncate', className);
  const innerStyle = { width, ...style };
  return (
    <div
      ref={el}
      className={innerClasses}
      style={innerStyle}
      title={overflow ? title : undefined}
      onMouseEnter={handleMouseEnter}
      {...rest}
    >
      {title}
    </div>
  );
}

export default React.memo(OverflowTooltip);
