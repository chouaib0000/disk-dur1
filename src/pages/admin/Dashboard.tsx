import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Package, Users, TrendingUp, DollarSign, Phone } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';
import { useToaster } from '../../components/ui/Toaster';

const Dashboard = () => {
  const { addToast } = useToaster();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchSettings();
  }, []);

  const fetchStats = async () => {
    try {
      const { count } = await supabase
        .from('products')
        .select('*', { count: 'exact' });

      setStats(prev => ({
        ...prev,
        totalProducts: count || 0
      }));
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const { data } = await supabase
        .from('settings')
        .select('whatsapp_number')
        .single();
      
      if (data) {
        setWhatsappNumber(data.whatsapp_number);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const saveWhatsappNumber = async () => {
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ 
          id: '1',
          whatsapp_number: whatsappNumber 
        });

      if (error) throw error;

      setIsEditing(false);
      addToast('WhatsApp number updated successfully', 'success');
    } catch (error) {
      console.error('Error saving WhatsApp number:', error);
      addToast('Error updating WhatsApp number', 'error');
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <Package className="h-6 w-6 text-blue-600" />,
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: <Users className="h-6 w-6 text-green-600" />,
      change: '+25%',
      changeType: 'increase'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
      change: '+18%',
      changeType: 'increase'
    },
    {
      title: 'Total Revenue',
      value: `${stats.totalRevenue.toLocaleString()} DH`,
      icon: <DollarSign className="h-6 w-6 text-orange-600" />,
      change: '+15%',
      changeType: 'increase'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard | Admin Panel</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your admin dashboard</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">WhatsApp Contact Number</h3>
              </div>
              {!isEditing && (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
            </div>
            
            {isEditing ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="Enter WhatsApp number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <Button onClick={saveWhatsappNumber}>Save</Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsEditing(false);
                    fetchSettings();
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <p className="text-gray-600">
                {whatsappNumber || 'No WhatsApp number set'}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {stat.icon}
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
              <p className="text-gray-600 text-sm">No orders yet</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Products</h3>
              <p className="text-gray-600 text-sm">No products yet</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;