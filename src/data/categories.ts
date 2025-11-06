import { Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Stockage Interne',
    slug: 'stockage-interne',
    description: 'Disques durs internes HDD et SSD pour PC de bureau et ordinateurs portables.',
    imageUrl: 'https://images.pexels.com/photos/4390447/pexels-photo-4390447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subcategories: [
      {
        id: '1-1',
        name: 'Disques Durs Internes HDD',
        slug: 'disques-durs-internes-hdd',
        parentId: '1'
      },
      {
        id: '1-2',
        name: 'SSD Internes',
        slug: 'ssd-internes',
        parentId: '1'
      }
    ]
  },
  {
    id: '2',
    name: 'Stockage Externe',
    slug: 'stockage-externe',
    description: 'Solutions de stockage portables: disques durs externes, SSD externes et clés USB.',
    imageUrl: 'https://images.pexels.com/photos/7232455/pexels-photo-7232455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subcategories: [
      {
        id: '2-1',
        name: 'Disques Durs Externes',
        slug: 'disques-durs-externes',
        parentId: '2'
      },
      {
        id: '2-2',
        name: 'SSD Externes Portables',
        slug: 'ssd-externes-portables',
        parentId: '2'
      },
      {
        id: '2-3',
        name: 'Clés USB',
        slug: 'cles-usb',
        parentId: '2'
      }
    ]
  },
  {
    id: '3',
    name: 'Cartes Mémoire',
    slug: 'cartes-memoire',
    description: 'Cartes SD, microSD et CompactFlash pour appareils photo, smartphones et autres périphériques.',
    imageUrl: 'https://images.pexels.com/photos/6069556/pexels-photo-6069556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subcategories: [
      {
        id: '3-1',
        name: 'Cartes SD et SDXC',
        slug: 'cartes-sd-sdxc',
        parentId: '3'
      },
      {
        id: '3-2',
        name: 'Cartes MicroSD',
        slug: 'cartes-microsd',
        parentId: '3'
      }
    ]
  },
  {
    id: '4',
    name: 'NAS & Stockage Réseau',
    slug: 'nas-stockage-reseau',
    description: 'Serveurs NAS pour particuliers et entreprises avec disques compatibles.',
    imageUrl: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subcategories: [
      {
        id: '4-1',
        name: 'NAS pour Particuliers',
        slug: 'nas-particuliers',
        parentId: '4'
      },
      {
        id: '4-2',
        name: 'NAS Professionnels',
        slug: 'nas-professionnels',
        parentId: '4'
      },
      {
        id: '4-3',
        name: 'Disques pour NAS',
        slug: 'disques-pour-nas',
        parentId: '4'
      }
    ]
  },
  {
    id: '5',
    name: 'Mémoire Vive (RAM)',
    slug: 'memoire-vive-ram',
    description: 'Modules de mémoire DDR4 et DDR5 pour PC de bureau, portables et serveurs.',
    imageUrl: 'https://images.pexels.com/photos/163125/board-printed-circuit-board-computer-163125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subcategories: [
      {
        id: '5-1',
        name: 'RAM pour PC Bureau',
        slug: 'ram-pc-bureau',
        parentId: '5'
      },
      {
        id: '5-2',
        name: 'RAM pour PC Portable',
        slug: 'ram-pc-portable',
        parentId: '5'
      }
    ]
  },
  {
    id: '6',
    name: 'Accessoires de Stockage',
    slug: 'accessoires-stockage',
    description: 'Boîtiers externes, stations d\'accueil, câbles et adaptateurs pour vos périphériques de stockage.',
    imageUrl: 'https://images.pexels.com/photos/5969/wood-pc-computer-writing.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subcategories: [
      {
        id: '6-1',
        name: 'Boîtiers & Stations',
        slug: 'boitiers-stations',
        parentId: '6'
      },
      {
        id: '6-2',
        name: 'Câbles et Adaptateurs',
        slug: 'cables-adaptateurs',
        parentId: '6'
      }
    ]
  },
  {
    id: '7',
    name: 'Solutions Entreprise',
    slug: 'solutions-entreprise',
    description: 'Stockage professionnel pour data centers et environnements d\'entreprise.',
    imageUrl: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subcategories: [
      {
        id: '7-1',
        name: 'Disques Entreprise',
        slug: 'disques-entreprise',
        parentId: '7'
      },
      {
        id: '7-2',
        name: 'SSD pour Serveurs',
        slug: 'ssd-serveurs',
        parentId: '7'
      }
    ]
  },
  {
    id: '8',
    name: 'Promos & Reconditionnés',
    slug: 'promos-reconditionnes',
    description: 'Offres spéciales et matériel reconditionné certifié avec garantie.',
    imageUrl: 'https://images.pexels.com/photos/3943903/pexels-photo-3943903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subcategories: [
      {
        id: '8-1',
        name: 'Produits en Promotion',
        slug: 'produits-promotion',
        parentId: '8'
      },
      {
        id: '8-2',
        name: 'Stockage Reconditionné',
        slug: 'stockage-reconditionne',
        parentId: '8'
      }
    ]
  }
];

// Helper function to get a category by slug
export const getCategoryBySlug = (slug: string): Category | undefined => {
  // First check main categories
  const mainCategory = categories.find(category => category.slug === slug);
  if (mainCategory) return mainCategory;
  
  // Then check subcategories
  for (const category of categories) {
    const subcategory = category.subcategories.find(sub => sub.slug === slug);
    if (subcategory) {
      // Return a combined category with parent info
      return {
        ...subcategory,
        description: `${subcategory.name} - ${category.description}`,
        imageUrl: category.imageUrl,
        subcategories: [],
      };
    }
  }
  
  return undefined;
};