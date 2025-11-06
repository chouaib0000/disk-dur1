import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import Container from '../ui/Container';
import { categories } from '../../data/categories';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">DisqueDur.ma</h3>
            <p className="text-sm mb-4">
              Votre spécialiste en solutions de stockage et récupération de données au Maroc.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/categorie/${category.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/recuperation-donnees"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Récupération de Données
                </Link>
              </li>
              <li>
                <Link 
                  to="/service/conseil"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Conseil Technique
                </Link>
              </li>
              <li>
                <Link 
                  to="/service/installation"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Installation
                </Link>
              </li>
              <li>
                <Link 
                  to="/service/maintenance"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Maintenance
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin size={18} className="mr-2 flex-shrink-0 text-blue-500" />
                <span className="text-sm">123 Avenue Mohammed V, Casablanca, Maroc</span>
              </li>
              <li className="flex">
                <Phone size={18} className="mr-2 flex-shrink-0 text-blue-500" />
                <a 
                  href="tel:+212522123456" 
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  +212 522 123 456
                </a>
              </li>
              <li className="flex">
                <Mail size={18} className="mr-2 flex-shrink-0 text-blue-500" />
                <a 
                  href="mailto:contact@disquedur.ma" 
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  contact@disquedur.ma
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="py-4 border-t border-gray-800 text-sm text-center text-gray-500">
          <p>&copy; {year} DisqueDur.ma - Tous droits réservés</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;