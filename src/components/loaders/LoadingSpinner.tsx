import { useTranslations } from "next-intl";

interface LoadingSpinnerProps {
  textKey: string;
  namespace?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ 
  textKey, 
  namespace = 'common', 
  size = 'md' 
}: LoadingSpinnerProps) {
  const t = useTranslations(namespace);
  
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className="flex items-center justify-center py-4">
      <div className={`animate-spin rounded-full border-b-2 border-blue-500 ${sizeClasses[size]}`}></div>
      <span className="ml-2 animate-pulse text-gray-500">{t(textKey)}</span>
    </div>
  );
} 