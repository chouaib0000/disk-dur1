import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { categories } from '../../data/categories';

const MobileMenu = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  return (
    <div className="md:hidden bg-white border-t border-gray-200 overflow-hidden">
      <div className="py-2">
        {categories.map((category) => (
          <div key={category.id} className="border-b border-gray-100 last:border-0">
            <button
              className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-50"
              onClick={() => toggleCategory(category.id)}
            >
              <span className="font-medium">{category.name}</span>
              {expandedCategory === category.id ? (
                <ChevronDown size={18} className="text-gray-500" />
              ) : (
                <ChevronRight size={18} className="text-gray-500" />
              )}
            </button>
            
            {expandedCategory === category.id && (
              <div className="bg-gray-50 py-1">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    to={`/categorie/${subcategory.slug}`}
                    className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link 
          to="/recuperation-donnees" 
          className="block px-4 py-3 text-blue-700 font-medium hover:bg-blue-50"
        >
          Récupération de Données
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;