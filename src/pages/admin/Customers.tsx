import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin } from 'lucide-react';
import Container from '../../components/ui/Container';
import { supabase } from '../../lib/supabase';
import { useToaster } from '../../components/ui/Toaster';

interface Customer {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
  raw_user_meta_data: {
    name?: string;
    phone?: string;
    address?: string;
  };
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToaster();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data: { users }, error } = await supabase.auth.admin.listUsers();
      
      if (error) throw error;
      setCustomers(users.filter(user => !user.raw_user_meta_data?.role || user.raw_user_meta_data.role !== 'admin'));
    } catch (error) {
      console.error('Error fetching customers:', error);
      addToast('Error fetching customers', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Customers | Admin Dashboard</title>
      </Helmet>

      <Container className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : customers.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No customers found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customers.map((customer) => (
              <div key={customer.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-xl">
                    {(customer.raw_user_meta_data?.name?.[0] || customer.email[0]).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {customer.raw_user_meta_data?.name || 'No name provided'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Customer since {new Date(customer.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>{customer.email}</span>
                  </div>
                  
                  {customer.raw_user_meta_data?.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-5 w-5 mr-2" />
                      <span>{customer.raw_user_meta_data.phone}</span>
                    </div>
                  )}
                  
                  {customer.raw_user_meta_data?.address && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{customer.raw_user_meta_data.address}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Last login: {customer.last_sign_in_at 
                      ? new Date(customer.last_sign_in_at).toLocaleDateString()
                      : 'Never'
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default Customers;