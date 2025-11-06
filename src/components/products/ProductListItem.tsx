import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Check, ChevronRight } from 'lucide-react';
import { Product } from '../../types';
import { Button } from '../ui/Button';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface ProductListItemProps {
  product: Product;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    fetchWhatsappNumber();
  }, []);

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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row">
        <Link 
          to={`/produit/${product.slug}`} 
          className="sm:w-1/4 flex-shrink-0 relative"
        >
          {product.discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              -{product.discount}%
            </span>
          )}
          {product.stock <= 0 && (
            <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              En rupture
            </span>
          )}
          <div className="h-48 sm:h-full overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-contain sm:object-cover"
            />
          </div>
        </Link>
        
        <div className="p-4 flex-1 flex flex-col">
          <div>
            <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
            <Link to={`/produit/${product.slug}`} className="block mb-2">
              <h3 className="text-gray-900 font-medium text-lg">
                {product.name}
              </h3>
            </Link>
            
            <div className="flex items-center mb-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < product.rating ? "currentColor" : "none"} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
            </div>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            
            {product.stock > 0 ? (
              <div className="flex items-center text-green-600 text-sm mb-3">
                <Check size={16} className="mr-1" />
                <span>En stock</span>
              </div>
            ) : (
              <div className="text-gray-500 text-sm mb-3">
                <span>Rupture de stock</span>
              </div>
            )}
          </div>
          
          <div className="mt-auto pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex flex-col mb-3 sm:mb-0">
              {product.discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice.toLocaleString()} DH
                </span>
              )}
              <span className="text-xl font-bold text-gray-900">
                {product.price.toLocaleString()} DH
              </span>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <button 
                aria-label="Ajouter aux favoris"
                className="p-2 text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <Heart size={18} />
              </button>
              
              {product.stock > 0 ? (
                <Button 
                  className="flex-1 sm:flex-none"
                  icon={<ShoppingCart size={18} />}
                >
                  Ajouter au panier
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="flex-1 sm:flex-none border-gray-300 text-gray-500 hover:bg-gray-50"
                  disabled
                >
                  Rupture de stock
                </Button>
              )}
              
              <a 
                href={`https://wa.me/${whatsappNumber}?text=Je suis intéressé par le produit: ${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center justify-center transition-colors"
                aria-label="Contacter sur WhatsApp"
              >
                <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;