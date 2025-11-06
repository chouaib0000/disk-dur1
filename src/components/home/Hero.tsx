import { ChevronRight } from 'lucide-react';
import { LinkButton } from '../ui/Button';
import Container from '../ui/Container';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-blue-400"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-blue-600"></div>
      </div>
      
      <Container>
        <div className="relative py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Solutions de Stockage Professionnelles au Maroc
            </h1>
            <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-lg">
              Disques durs, SSD, NAS et services de récupération de données pour particuliers et professionnels.
            </p>
            <div className="flex flex-wrap gap-4">
              <LinkButton
                to="/categorie/stockage-interne"
                variant="outline"
                size="lg"
                className="bg-white bg-opacity-10 border-white text-white hover:bg-opacity-20"
              >
                Découvrir nos produits
              </LinkButton>
              <LinkButton
                to="/recuperation-donnees"
                variant="primary"
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 border-none"
                icon={<ChevronRight size={18} />}
                iconPosition="right"
              >
                Service de récupération
              </LinkButton>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src="https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Solutions de stockage"
              className="rounded-lg shadow-2xl max-w-full h-auto object-cover md:max-w-md"
              style={{ 
                maxHeight: '400px',
                transform: 'perspective(1000px) rotateY(-10deg)',
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;