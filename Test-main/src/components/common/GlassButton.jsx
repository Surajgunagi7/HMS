import LoadingSpinner from './LoadingSpinner';

const GlassButton = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  loading = false, 
  disabled = false,
  className = "",
  type = "button",
  ...props 
}) => {
  const baseClasses = "btn-glass rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2";
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const variantClasses = {
    primary: "text-black hover:bg-white/40",
    secondary: "text-gray-700 bg-white/80 hover:bg-white/90 ",
    success: "text-black bg-green-500/80 hover:bg-green-500",
    danger: "text-white bg-red-500/80 hover:bg-red-500/90",
    warning: "text-white bg-yellow-500/80 hover:bg-yellow-500/90",
    searching: "text-white bg-blue-500 hover:bg-blue-800"
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${isDisabled ? 'opacity-80 cursor-not-allowed' : 'hover:scale-105'}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" color="white" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default GlassButton;