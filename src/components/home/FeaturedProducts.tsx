import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import Container from '../ui/Container';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import type { Product } from '../../types';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bestsellers');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  
  const tabs = [
    { id: 'bestsellers', label: 'Meilleures Ventes' },
    { id: 'new', label: 'Nouveautés' },
    { id: 'promo', label: 'Promotions' }
  ];

  useEffect(() => {
    fetchProducts();
    fetchWhatsappNumber();
  }, [activeTab]);

  const fetchWhatsappNumber = async () => {
    try {
      const { data } = await supabase
        .from('settings')
        .select('whatsapp_number')
        .single();
      
      if (data) {
        setWhatsappNumber(data.whatsapp_number);
      }
    } catch (error) {
      console.error('Error fetching WhatsApp number:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      let query = supabase.from('products').select('*');

      // Filter products based on active tab
      switch (activeTab) {
        case 'promo':
          query = query.gt('discount', 0);
          break;
        case 'new':
          query = query.order('created_at', { ascending: false });
          break;
        case 'bestsellers':
        default:
          query = query.contains('tags', ['bestseller']);
          break;
      }

      const { data, error } = await query.limit(8);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Produits Populaires</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de produits les plus populaires et les dernières nouveautés.
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-5 py-2.5 text-sm font-medium
                    ${activeTab === tab.id 
                      ? 'bg-blue-700 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'}
                    ${tab.id === tabs[0].id ? 'rounded-l-md' : ''}
                    ${tab.id === tabs[tabs.length - 1].id ? 'rounded-r-md' : ''}
                    border border-gray-200
                    focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden group transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <Link to={`/produit/${product.slug}`} className="block relative">
                  {product.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      -{product.discount}%
                    </span>
                  )}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
                
                <div className="p-4">
                  <Link to={`/produit/${product.slug}`} className="block">
                    <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                    <h3 className="text-gray-900 font-medium mb-1 text-sm line-clamp-2 h-10">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < product.rating ? "currentColor" : "none"} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-col">
                      {product.discount > 0 && (
                        <span className="text-xs text-gray-500 line-through">
                          {product.originalPrice.toLocaleString()} DH
                        </span>
                      )}
                      <span className="text-lg font-bold text-gray-900">
                        {product.price.toLocaleString()} DH
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button 
                        aria-label="Ajouter aux favoris"
                        className="p-1.5 text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <Heart size={16} />
                      </button>
                      <button 
                        aria-label="Ajouter au panier"
                        className="p-1.5 text-gray-700 hover:text-white bg-gray-100 hover:bg-blue-700 rounded-full transition-colors"
                      >
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button 
                      fullWidth
                      className="text-sm"
                    >
                      Ajouter au panier
                    </Button>
                    
                    <a 
                      href={`https://wa.me/${whatsappNumber}?text=Je suis intéressé par le produit: ${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm font-medium transition-colors"
                    >
                      Contacter sur WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Button 
            variant="outline"
            size="lg"
            onClick={() => navigate('/recherche')}
          >
            Voir tous les produits
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;