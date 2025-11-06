import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div className={`px-4 sm:px-6 lg:px-8 mx-auto max-w-[1400px] ${className}`}>
      {children}
    </div>
  );
};

export default Container;