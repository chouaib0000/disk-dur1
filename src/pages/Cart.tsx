import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import { Button, LinkButton } from '../components/ui/Button';

// Mock cart data for demo - TODO: Replace with Supabase data
const initialCartItems = [
  {
    productId: '1',
    quantity: 1,
    product: {
      id: '1',
      name: 'SSD 1TB',
      brand: 'Samsung',
      price: 999,
      imageUrl: 'https://images.pexels.com/photos/4792731/pexels-photo-4792731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  },
  {
    productId: '2',
    quantity: 1,
    product: {
      id: '2',
      name: 'HDD 2TB',
      brand: 'Western Digital',
      price: 599,
      imageUrl: 'https://images.pexels.com/photos/4792729/pexels-photo-4792729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };
  
  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 1000 ? 0 : 50;
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.productId === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  const removeItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  return (
    <>
      <Helmet>
        <title>Panier | DisqueDur.ma</title>
        <meta name="description" content="Votre panier d'achats - DisqueDur.ma" />
      </Helmet>
      
      <Container className="py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mon Panier</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Votre panier est vide</h2>
            <p className="text-gray-600 mb-6">
              Vous n'avez aucun article dans votre panier.
            </p>
            <LinkButton 
              to="/"
              size="lg"
            >
              Explorer les produits
            </LinkButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left pb-4 font-medium text-gray-600 text-sm">Produit</th>
                        <th className="text-center pb-4 font-medium text-gray-600 text-sm">Quantité</th>
                        <th className="text-right pb-4 font-medium text-gray-600 text-sm">Prix</th>
                        <th className="text-right pb-4 font-medium text-gray-600 text-sm">Total</th>
                        <th className="pb-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map(item => (
                        <tr key={item.productId} className="border-b border-gray-200">
                          <td className="py-4">
                            <div className="flex items-center">
                              <div className="w-16 h-16 flex-shrink-0 mr-4">
                                <img 
                                  src={item.product.imageUrl} 
                                  alt={item.product.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div>
                                <Link 
                                  to={`/produit/${item.productId}`}
                                  className="text-gray-800 font-medium hover:text-blue-700 transition-colors"
                                >
                                  {item.product.name}
                                </Link>
                                <p className="text-gray-500 text-sm">{item.product.brand}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button 
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                  className="px-3 py-1 text-gray-600 hover:text-gray-900"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                                  min="1"
                                  className="w-12 text-center border-none focus:outline-none focus:ring-0"
                                />
                                <button 
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  className="px-3 py-1 text-gray-600 hover:text-gray-900"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <span className="text-gray-800">{item.product.price.toLocaleString()} DH</span>
                          </td>
                          <td className="py-4 text-right">
                            <span className="font-medium text-gray-900">
                              {(item.product.price * item.quantity).toLocaleString()} DH
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <button 
                              onClick={() => removeItem(item.productId)}
                              className="text-gray-400 hover:text-red-600 transition-colors"
                              aria-label="Supprimer l'article"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex justify-between">
                  <LinkButton 
                    to="/"
                    variant="outline"
                    icon={<ArrowLeft size={16} />}
                  >
                    Continuer vos achats
                  </LinkButton>
                  
                  <Button
                    onClick={() => setCartItems([])}
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Vider le panier
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif de la commande</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <span className="text-gray-600">Sous-total:</span>
                      <span className="font-medium text-gray-900">{calculateSubtotal().toLocaleString()} DH</span>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <span className="text-gray-600">Livraison:</span>
                      {calculateShipping() === 0 ? (
                        <span className="font-medium text-green-600">Gratuite</span>
                      ) : (
                        <span className="font-medium text-gray-900">{calculateShipping().toLocaleString()} DH</span>
                      )}
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-900 font-semibold">Total:</span>
                      <span className="font-bold text-xl text-gray-900">{calculateTotal().toLocaleString()} DH</span>
                    </div>
                    
                    {calculateShipping() === 0 && (
                      <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm">
                        Vous bénéficiez de la livraison gratuite !
                      </div>
                    )}
                    
                    {calculateShipping() > 0 && (
                      <div className="bg-blue-50 text-blue-700 p-3 rounded-md text-sm">
                        Ajoutez {(1000 - calculateSubtotal()).toLocaleString()} DH d'articles pour bénéficier de la livraison gratuite.
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      className="w-full"
                      size="lg"
                      icon={<ArrowRight size={16} />}
                      iconPosition="right"
                    >
                      Passer à la caisse
                    </Button>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-gray-500 text-sm">
                      Nous acceptons toutes les cartes bancaires marocaines, PayPal et le paiement à la livraison
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Besoin d'aide ?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Notre service client est disponible pour vous aider du lundi au vendredi de 9h à 18h.
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full"
                  >
                    Contacter le service client
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default Cart;