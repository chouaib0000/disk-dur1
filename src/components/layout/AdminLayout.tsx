import { ReactNode, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Settings, LogOut, Stethoscope, Image } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Container from '../ui/Container';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/admin' },
    { icon: <Package size={20} />, label: 'Products', href: '/admin/products' },
    { icon: <Users size={20} />, label: 'Customers', href: '/admin/customers' },
    { icon: <Stethoscope size={20} />, label: 'Diagnostic Requests', href: '/admin/diagnostic-requests' },
    { icon: <Image size={20} />, label: 'Category Images', href: '/admin/category-images' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <Container>
          <div className="h-16 flex items-center justify-between">
            <Link to="/admin" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">Admin Panel</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut size={20} className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </Container>
      </nav>

      <Container className="py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm">
              <div className="p-4 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </Container>
    </div>
  );
};

export default AdminLayout;