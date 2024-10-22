import { Spinner } from './spinner';

export const CenteredLoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Spinner size="lg" />
    </div>
  );
};
