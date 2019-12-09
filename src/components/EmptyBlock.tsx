import React from 'react';

import RowFlex from './RowFlex';

export interface EmptyBlockProps {
  height?: number | string;
  image?: string;
  placeholder?: string;
}

export default function EmptyBlock(props: EmptyBlockProps) {
  const { height = '100%', image } = props;
  return (
    <RowFlex
      column
      align="middle"
      justify="center"
      style={{ height, left: 0, right: 0, position: 'absolute', minHeight: 60 }}
    >
      {image && <img style={{ marginBottom: 16 }} src={image} alt="" />}
      <span
        style={{
          fontSize: 14,
          color: '#c0c4cc'
        }}
      >
        {props.placeholder || '暂无数据'}
      </span>
    </RowFlex>
  );
}
