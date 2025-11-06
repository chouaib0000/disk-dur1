import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import { categories } from '../../data/categories';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const CategoryShowcase = () => {
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>({});
  
  // Take only the main categories
  const mainCategories = categories.slice(0, 6);

  useEffect(() => {
    const fetchCategoryImages = async () => {
      try {
        const { data: files } = await supabase.storage
          .from('products')
          .list('categories');

        if (files) {
          const images: Record<string, string> = {};
          for (const file of files) {
            const categoryId = file.name.split('.')[0];
            const { data: { publicUrl } } = supabase.storage
              .from('products')
              .getPublicUrl(`categories/${file.name}`);
            images[categoryId] = publicUrl;
          }
          setCategoryImages(images);
        }
      } catch (error) {
        console.error('Error fetching category images:', error);
      }
    };

    fetchCategoryImages();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Catégories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète de solutions de stockage pour tous vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainCategories.map((category) => (
            <Link 
              key={category.id} 
              to={`/categorie/${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={categoryImages[category.id] || category.imageUrl} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  <div className="flex items-center text-blue-700 font-medium">
                    <span>Voir les produits</span>
                    <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoryShowcase;