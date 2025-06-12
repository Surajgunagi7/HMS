// eslint-disable-next-line react/prop-types
const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
      <div className="relative p-10 rounded-3xl liquid-glass-popup">
        <div className={`spinner-liquid ${sizeClasses[size]} ${className}`}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;