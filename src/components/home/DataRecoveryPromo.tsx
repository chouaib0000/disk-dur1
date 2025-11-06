import { CheckCircle, ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import { LinkButton } from '../ui/Button';

const DataRecoveryPromo = () => {
  const benefits = [
    "Récupération de tous types de supports",
    "Laboratoire spécialisé au Maroc",
    "Plus de 95% de taux de réussite",
    "Diagnostic gratuit",
    "Service d'urgence disponible",
    "Confidentialité garantie"
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <Container>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img
              src="https://images.pexels.com/photos/3888149/pexels-photo-3888149.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Service de récupération de données"
              className="rounded-lg shadow-xl max-w-full md:max-w-lg mx-auto"
            />
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg border border-white border-opacity-20 animate-fadeIn">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-orange-500 text-white mb-4">
                Service Professionnel
              </span>
              <h2 className="text-3xl font-bold mb-4">
                Récupération de Données Perdues
              </h2>
              <p className="text-blue-100 mb-6">
                Ne perdez plus jamais vos données précieuses. Notre équipe d'experts peut récupérer des données de pratiquement n'importe quel support endommagé.
              </p>
              
              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <LinkButton
                  to="/recuperation-donnees"
                  variant="primary"
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 border-none"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  En savoir plus
                </LinkButton>
                <LinkButton
                  to="/contact"
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:bg-opacity-10"
                >
                  Demander un devis
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DataRecoveryPromo;