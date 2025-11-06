import Container from '../ui/Container';
import { HardDrive, Server, Database, Monitor, Cpu, MemoryStick } from 'lucide-react';

const Brands = () => {
  // Using Lucide icons as brand placeholders, in a real scenario we would use actual brand logos
  const brandIcons = [
    { icon: <HardDrive size={40} className="text-gray-700" />, name: "WesternDigital" },
    { icon: <Server size={40} className="text-gray-700" />, name: "Seagate" },
    { icon: <Database size={40} className="text-gray-700" />, name: "Samsung" },
    { icon: <Monitor size={40} className="text-gray-700" />, name: "SanDisk" },
    { icon: <Cpu size={40} className="text-gray-700" />, name: "Kingston" },
    { icon: <MemoryStick size={40} className="text-gray-700" />, name: "Crucial" },
  ];

  return (
    <section className="py-12 border-t border-gray-200">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Marques Partenaires</h2>
          <p className="text-gray-600">
            Nous collaborons avec les meilleures marques du marché.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {brandIcons.map((brand, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              {brand.icon}
              <span className="mt-2 text-sm font-medium text-gray-700">{brand.name}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Brands;