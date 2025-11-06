import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Share2, Check, ChevronRight, Truck, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import NotFound from './NotFound';
import ProductCard from '../components/products/ProductCard';
import type { Product } from '../types';

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  
  useEffect(() => {
    fetchProduct();
    fetchWhatsappNumber();
  }, [slug]);

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

  const fetchProduct = async () => {
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;

      if (product) {
        setProduct(product);
        
        // Fetch related products
        const { data: related } = await supabase
          .from('products')
          .select('*')
          .neq('id', product.id)
          .eq('categoryId', product.categoryId)
          .limit(4);

        setRelatedProducts(related || []);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  if (!product) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | DisqueDur.ma</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <Container className="py-8">
        <div className="mb-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-500 hover:text-blue-700">
                  Accueil
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight size={14} className="text-gray-400" />
                  <Link to={`/categorie/${product.categoryId.split('-')[0]}`} className="ml-1 text-gray-500 hover:text-blue-700">
                    {product.categoryId.includes('-') ? 'Catégorie' : 'Produits'}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight size={14} className="text-gray-400" />
                  <span className="ml-1 text-gray-700 font-medium truncate">
                    {product.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6">
            {/* Product Images - Left Column */}
            <div className="lg:col-span-2">
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 mb-4">
                <div className="relative pt-[100%]">
                  {product.discount > 0 && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full z-10">
                      -{product.discount}%
                    </span>
                  )}
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain p-4"
                  />
                </div>
              </div>
              
              {/* Thumbnails would go here in a real implementation */}
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, index) => (
                  <button 
                    key={index}
                    className={`border rounded-md overflow-hidden ${index === 0 ? 'border-blue-500' : 'border-gray-200'}`}
                  >
                    <div className="aspect-square">
                      <img 
                        src={product.imageUrl} 
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info - Right Column */}
            <div className="lg:col-span-3">
              <div>
                <div className="mb-2 flex items-center">
                  <span className="text-sm text-gray-500 mr-3">{product.brand}</span>
                  <div className="flex items-center">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < product.rating ? "currentColor" : "none"} 
                        />
                      ))}
                    </div>
                    <Link to="#reviews" className="text-sm text-blue-700 ml-1">
                      ({product.reviewCount} avis)
                    </Link>
                  </div>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                
                <div className="flex items-baseline mb-4">
                  <div className="flex flex-col">
                    {product.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString()} DH
                      </span>
                    )}
                    <span className="text-3xl font-bold text-gray-900">
                      {product.price.toLocaleString()} DH
                    </span>
                  </div>
                  
                  {product.discount > 0 && (
                    <span className="ml-3 text-sm font-medium text-green-600">
                      Économisez {(product.originalPrice - product.price).toLocaleString()} DH ({product.discount}%)
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6">
                  {product.description}
                </p>
                
                <div className="border-t border-b border-gray-200 py-4 mb-6">
                  <div className="flex items-center mb-4">
                    <span className="text-gray-700 font-medium mr-3">Disponibilité:</span>
                    {product.stock > 0 ? (
                      <span className="text-green-600 flex items-center">
                        <Check size={16} className="mr-1" />
                        En stock ({product.stock} unités)
                      </span>
                    ) : (
                      <span className="text-red-600">
                        Rupture de stock
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium mr-3">Catégorie:</span>
                    <Link to={`/categorie/${product.categoryId}`} className="text-blue-700 hover:underline">
                      {product.categoryId.includes('ssd') ? 'SSD' : 'Disque dur'}
                    </Link>
                  </div>
                </div>
                
                <div className="mb-6">
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=Je suis intéressé par le produit: ${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md text-base font-medium transition-colors"
                  >
                    Contacter sur WhatsApp
                  </a>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-blue-700 mr-2" />
                    <span className="text-sm text-gray-600">Livraison gratuite dès 1000 DH</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-blue-700 mr-2" />
                    <span className="text-sm text-gray-600">Garantie 24 mois</span>
                  </div>
                  <div className="flex items-center">
                    <Share2 className="h-5 w-5 text-blue-700 mr-2" />
                    <span className="text-sm text-gray-600">Partager</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-3 px-4 font-medium text-sm ${
                  activeTab === 'description' 
                    ? 'text-blue-700 border-b-2 border-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-3 px-4 font-medium text-sm ${
                  activeTab === 'specifications' 
                    ? 'text-blue-700 border-b-2 border-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Spécifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-3 px-4 font-medium text-sm ${
                  activeTab === 'reviews' 
                    ? 'text-blue-700 border-b-2 border-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Avis Clients ({product.reviewCount})
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Description du produit</h2>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Spécifications techniques</h2>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 text-sm text-gray-600 bg-gray-50 font-medium">Marque</td>
                          <td className="py-3 px-4 text-sm text-gray-800">{product.brand}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 text-sm text-gray-600 bg-gray-50 font-medium">Capacité</td>
                          <td className="py-3 px-4 text-sm text-gray-800">1TB</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 text-sm text-gray-600 bg-gray-50 font-medium">Interface</td>
                          <td className="py-3 px-4 text-sm text-gray-800">SATA III 6Gb/s</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 text-sm text-gray-600 bg-gray-50 font-medium">Facteur de forme</td>
                          <td className="py-3 px-4 text-sm text-gray-800">2.5 pouces</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 text-sm text-gray-600 bg-gray-50 font-medium">Lecture séquentielle</td>
                          <td className="py-3 px-4 text-sm text-gray-800">560 MB/s</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm text-gray-600 bg-gray-50 font-medium">Écriture séquentielle</td>
                          <td className="py-3 px-4 text-sm text-gray-800">530 MB/s</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Avis clients</h2>
                  <div className="flex items-center mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <div className="flex text-amber-400 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={24} 
                              fill={i < Math.round(product.rating) ? "currentColor" : "none"} 
                            />
                          ))}
                        </div>
                        <span className="text-lg font-semibold text-gray-900">{product.rating.toFixed(1)}/5</span>
                      </div>
                      <p className="text-gray-600">Basé sur {product.reviewCount} avis</p>
                    </div>
                    <div>
                      <Button>Écrire un avis</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Example reviews */}
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h4 className="font-medium text-gray-900 mr-2">Khalid M.</h4>
                            <span className="text-sm text-gray-500">il y a 3 jours</span>
                          </div>
                          <div className="flex text-amber-400 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                fill={i < 5 ? "currentColor" : "none"} 
                              />
                            ))}
                          </div>
                          <h5 className="font-medium text-gray-900 mb-2">Excellent produit, livraison rapide</h5>
                          <p className="text-gray-600">
                            J'ai acheté ce SSD pour remplacer un vieux disque dur dans mon PC. L'installation a été très simple et les performances sont impressionnantes. Mon ordinateur démarre maintenant en quelques secondes. Je recommande vivement ce produit!
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h4 className="font-medium text-gray-900 mr-2">Sarah B.</h4>
                            <span className="text-sm text-gray-500">il y a 1 semaine</span>
                          </div>
                          <div className="flex text-amber-400 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                fill={i < 4 ? "currentColor" : "none"} 
                              />
                            ))}
                          </div>
                          <h5 className="font-medium text-gray-900 mb-2">Très satisfaite</h5>
                          <p className="text-gray-600">
                            Produit reçu rapidement et bien emballé. Il fonctionne parfaitement et a considérablement amélioré les performances de mon ordinateur portable. Je retire une étoile car le manuel d'installation aurait pu être plus détaillé.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Button variant="outline" className="w-full">
                        Voir tous les avis
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <div key={product.id} onClick={() => navigate(`/produit/${product.slug}`)} className="cursor-pointer">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductPage;