import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import Container from '../ui/Container';
import MobileMenu from './MobileMenu';
import Logo from '../ui/Logo';
import { categories } from '../../data/categories';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleDropdownToggle = (categoryId: string) => {
    if (activeDropdown === categoryId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(categoryId);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white bg-opacity-90 backdrop-blur-md'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="mr-6">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="relative group"
                onMouseEnter={() => !isMobile && setActiveDropdown(category.id)}
                onMouseLeave={() => !isMobile && setActiveDropdown(null)}
              >
                <button
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                  onClick={() => handleDropdownToggle(category.id)}
                >
                  <span className="whitespace-nowrap">{category.name}</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
                
                {activeDropdown === category.id && (
                  <div className="absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg z-10 overflow-hidden">
                    <div className="py-2">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          to={`/categorie/${subcategory.slug}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link 
              to="/recuperation-donnees" 
              className="px-3 py-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors font-medium whitespace-nowrap"
            >
              Récupération de Données
            </Link>
          </nav>

          <div className="flex items-center space-x-1 md:space-x-3">
            {!isTablet && (
              <Link 
                to="/recherche" 
                className="p-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
                aria-label="Rechercher"
              >
                <Search size={20} />
              </Link>
            )}
            <Link 
              to="/panier" 
              className="p-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors relative"
              aria-label="Panier"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </Container>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && <MobileMenu />}
    </header>
  );
};

export default Header;