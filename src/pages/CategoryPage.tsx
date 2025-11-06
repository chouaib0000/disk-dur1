import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Filter, ArrowUpDown, Grid3X3, List, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { getCategoryBySlug } from '../data/categories';
import ProductCard from '../components/products/ProductCard';
import ProductListItem from '../components/products/ProductListItem';
import NotFound from './NotFound';
import { supabase } from '../lib/supabase';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('popularity');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Get category data
  const category = slug ? getCategoryBySlug(slug) : null;

  // Filters state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Check if this is a main category or subcategory
        const isMainCategory = !category.id.includes('-');

        let query = supabase.from('products').select('*');

        if (isMainCategory) {
          // For main categories, get all products whose categoryId starts with the category ID
          // e.g., category '1' should match '1-1', '1-2', etc.
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .like('categoryId', `${category.id}-%`);

          if (error) {
            console.error('Error fetching products:', error);
            throw error;
          }

          setProducts(data || []);
        } else {
          // For subcategories, exact match
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('categoryId', category.id);

          if (error) {
            console.error('Error fetching products:', error);
            throw error;
          }

          setProducts(data || []);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category?.id]); // Add proper dependency

  useEffect(() => {
    // Reset filters when category changes
    setPriceRange([0, 10000]);
    setSelectedBrands([]);
    setSearchQuery('');
    setSortOption('popularity');
  }, [slug]);

  if (!category) {
    return <NotFound />;
  }

  // Get unique brands from products
  const brands = [...new Set(products.map(product => product.brand))];

  // Handle brand filter change
  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Apply price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      // Apply brand filter if any brands are selected
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      
      // Apply search query filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'popularity':
        default:
          return b.reviewCount - a.reviewCount;
      }
    });

  return (
    <>
      <Helmet>
        <title>{category.name} | DisqueDur.ma</title>
        <meta name="description" content={`${category.description} | Achetez en ligne chez DisqueDur.ma avec livraison dans tout le Maroc.`} />
      </Helmet>
      
      <section className="pt-10 pb-6 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <Container>
          <div>
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            <p className="text-blue-100 max-w-2xl">
              {category.description}
            </p>
          </div>
        </Container>
      </section>
      
      <Container className="py-8">
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
            <Card className="sticky top-24">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-lg">Filtres</h2>
              </div>
              
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium mb-3">Recherche</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md pl-9 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
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
                <h3 className="font-medium mb-3">Marques</h3>
                <div className="space-y-2 max-h-44 overflow-y-auto">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="p-4">
                <Button
                  onClick={() => {
                    setPriceRange([0, 10000]);
                    setSelectedBrands([]);
                    setSearchQuery('');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            </Card>
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
                    className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md pl-10 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="popularity">Popularité</option>
                    <option value="price-asc">Prix: croissant</option>
                    <option value="price-desc">Prix: décroissant</option>
                    <option value="newest">Plus récent</option>
                  </select>
                  <ArrowUpDown className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                
                <div className="inline-flex rounded-md shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 border border-gray-300 rounded-l-md ${
                      viewMode === 'grid' ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-600'
                    } hover:bg-gray-50 focus:outline-none focus:z-10 focus:ring-2 focus:ring-blue-500`}
                    aria-label="Vue grille"
                  >
                    <Grid3X3 size={16} />
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
                    setSelectedBrands([]);
                    setSearchQuery('');
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

export default CategoryPage;