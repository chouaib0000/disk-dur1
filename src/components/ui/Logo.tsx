import { HardDrive } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <HardDrive className="h-8 w-8 text-blue-700" />
      <span className="ml-2 text-xl font-bold text-gray-900">
        Disque<span className="text-blue-700">Dur</span>.ma
      </span>
    </div>
  );
};

export default Logo;