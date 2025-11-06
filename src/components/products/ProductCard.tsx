import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { Button } from '../ui/Button';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-transform hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/produit/${product.slug}`} className="block relative">
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
              disabled={product.stock <= 0}
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button 
            fullWidth
            className="text-sm"
            disabled={product.stock <= 0}
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
  );
};

export default ProductCard;