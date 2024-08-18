import React from 'react';
import AnimatedDots from './AnimatedDots';
import { getScreenDimensions } from '@/app/(videoPlayer)/core/utils';

const Snow = () => {
  const { width, height } = getScreenDimensions();
  const dots = Array(50)
    .fill(0)
    .map((_, i) => (
      <AnimatedDots
        key={i}
        startPos={{ x: Math.random() * width, y: Math.random() * height }}
      />
    ));
  return dots;
};

export default Snow;
