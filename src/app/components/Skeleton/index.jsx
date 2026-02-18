import React from 'react';

const SkeletonBase = ({ className = "" }) => (
  <div className={`bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-md ${className}`} />
);

const SkeletonCircle = ({ size = "w-12 h-12", className = "" }) => (
  <SkeletonBase className={`${size} rounded-full ${className}`} />
);

const SkeletonRectangle = ({ width = "w-full", height = "h-4", className = "" }) => (
  <SkeletonBase className={`${width} ${height} ${className}`} />
);

// Ana bileşeni ve alt bileşenleri dışa aktarıyoruz
const Skeleton = Object.assign(SkeletonBase, {
  Circle: SkeletonCircle,
  Rectangle: SkeletonRectangle,
});

export default Skeleton;