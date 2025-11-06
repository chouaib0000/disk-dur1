import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, GridIcon, List } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import ProductCard from '../components/products/ProductCard';
import ProductListItem from '../components/products/ProductListItem';
import { supabase } from '../lib/supabase';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let queryBuilder = supabase
          .from('products')
          .select('*');
          
        if (query) {
          queryBuilder = queryBuilder.ilike('name', `%${query}%`);
        }
        
        const { data, error } = await queryBuilder;
        
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [query]);
  
  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesPrice;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'rating':
          return b.rating - a.rating;
        default: // relevance
          return 0;
      }
    });

  return (
    <>
      <Helmet>
        <title>{query ? `Recherche: ${query}` : 'Recherche'} | DisqueDur.ma</title>
        <meta name="description" content={`Résultats de recherche pour "${query}" - DisqueDur.ma`} />
      </Helmet>
      
      <Container className="py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {query 
              ? `Résultats de recherche pour "${query}"`
              : 'Tous les produits'
            }
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} produits trouvés
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar - Mobile Toggle */}
          <div className="md:hidden mb-4">
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              variant="secondary"
              className="w-full"
              icon={<Filter size={16} />}
            >
              {isFilterOpen ? 'Masquer les filtres' : 'Afficher les filtres'}
            </Button>
          </div>
          
          {/* Filters Sidebar */}
          <div className={`md:w-1/4 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-lg">Filtres</h2>
              </div>
              
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium mb-3">Prix</h3>
                <div className="mb-4">
                  <label className="text-sm text-gray-600 block mb-1">Fourchette de prix</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={e => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      min={priceRange[0]}
                      value={priceRange[1]}
                      onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Prix max: {priceRange[1]} DH</label>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium mb-3">Disponibilité</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">En stock uniquement</span>
                  </label>
                </div>
              </div>
              
              <div className="p-4">
                <Button
                  onClick={() => {
                    setPriceRange([0, 10000]);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            </div>
          </div>
          
          {/* Products Area */}
          <div className="md:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <p className="text-gray-600">
                  Affichage de <span className="font-medium">{filteredProducts.length}</span> produits
                </p>
              </div>
              
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0">
                  <select
                    value={sortOption}
                    onChange={e => setSortOption(e.target.value)}
                    className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="relevance">Pertinence</option>
                    <option value="price-asc">Prix: croissant</option>
                    <option value="price-desc">Prix: décroissant</option>
                    <option value="newest">Plus récent</option>
                    <option value="rating">Mieux noté</option>
                  </select>
                </div>
                
                <div className="inline-flex rounded-md shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 border border-gray-300 rounded-l-md ${
                      viewMode === 'grid' ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-600'
                    } hover:bg-gray-50 focus:outline-none focus:z-10 focus:ring-2 focus:ring-blue-500`}
                    aria-label="Vue grille"
                  >
                    <GridIcon size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 border border-gray-300 border-l-0 rounded-r-md ${
                      viewMode === 'list' ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-600'
                    } hover:bg-gray-50 focus:outline-none focus:z-10 focus:ring-2 focus:ring-blue-500`}
                    aria-label="Vue liste"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
                <p className="mt-4 text-gray-600">Chargement des produits...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">Aucun produit ne correspond à vos critères de recherche.</p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setPriceRange([0, 10000]);
                    setSortOption('relevance');
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map(product => (
                    <ProductListItem key={product.id} product={product} />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default SearchResults;