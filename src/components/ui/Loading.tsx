'use client';

import { Loader2, Church } from 'lucide-react';

interface LoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'church';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  fullScreen?: boolean;
}

export default function Loading({ 
  variant = 'spinner', 
  size = 'md', 
  text, 
  fullScreen = false 
}: LoadingProps) {
  
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const containerClass = fullScreen 
    ? 'fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50'
    : 'flex items-center justify-center p-4';

  const renderSpinner = () => {
    switch (variant) {
      case 'church':
        return (
          <div className="flex flex-col items-center space-y-4">
            <Church className={`${sizeClasses[size]} text-blue-600 animate-pulse`} />
            {text && <p className="text-gray-600 font-medium">{text}</p>}
          </div>
        );
      
      case 'dots':
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            {text && <p className="text-gray-600 font-medium">{text}</p>}
          </div>
        );
      
      case 'pulse':
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-ping`}></div>
            {text && <p className="text-gray-600 font-medium">{text}</p>}
          </div>
        );
      
      default: // spinner
        return (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className={`${sizeClasses[size]} text-blue-600 animate-spin`} />
            {text && <p className="text-gray-600 font-medium">{text}</p>}
          </div>
        );
    }
  };

  return (
    <div className={containerClass}>
      {renderSpinner()}
    </div>
  );
}

// Componente especializado para páginas completas
export function PageLoading() {
  return (
    <Loading 
      variant="church" 
      size="xl" 
      text="Cargando..." 
      fullScreen 
    />
  );
}

// Componente para botones
export function ButtonLoading({ text = "Cargando..." }: { text?: string }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
      <span>{text}</span>
    </div>
  );
}

// Componente para secciones
export function SectionLoading({ text }: { text?: string }) {
  return (
    <div className="py-16 bg-gray-50 flex items-center justify-center">
      <Loading variant="church" size="lg" text={text} />
    </div>
  );
}