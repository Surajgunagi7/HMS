import LoadingSpinner from './LoadingSpinner';

const LoadingOverlay = ({ isLoading, children, message = "Loading..." }) => {
  if (!isLoading) return children;

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 glass-dark rounded-lg flex flex-col items-center justify-center z-50">
        <LoadingSpinner size="lg" color="white" />
        <p className="text-white mt-4 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;