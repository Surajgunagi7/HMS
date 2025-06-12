import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const GlassInput = forwardRef(({ 
  icon: Icon, 
  label, 
  error, 
  className = "",
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
            <Icon size={18} className="drop-shadow-none bg-transparent" />
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full 
            ${Icon ? 'pl-10' : 'pl-4'} 
            pr-4 py-3 
            input-glass 
            rounded-xl 
            placeholder-gray-600 
            text-gray-700
            border border-blue-600
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500/80
            ${error ? 'border-red-300 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
});

export default GlassInput;
