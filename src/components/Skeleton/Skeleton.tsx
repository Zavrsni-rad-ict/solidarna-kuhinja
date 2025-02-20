export const Skeleton = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-5 bg-gray-300 rounded w-48"></div>
    </div>
  );
};

Skeleton.displayName = 'Skeleton';
