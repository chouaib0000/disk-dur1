import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import DataRecoveryPage from './pages/DataRecoveryPage';
import SearchResults from './pages/SearchResults';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/ProductList';
import ProductForm from './pages/admin/ProductForm';
import DiagnosticRequests from './pages/admin/DiagnosticRequests';
import Customers from './pages/admin/Customers';
import CategoryImages from './pages/admin/CategoryImages';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/products" element={<AdminLayout><ProductList /></AdminLayout>} />
        <Route path="/admin/products/new" element={<AdminLayout><ProductForm /></AdminLayout>} />
        <Route path="/admin/products/:id/edit" element={<AdminLayout><ProductForm /></AdminLayout>} />
        <Route path="/admin/customers" element={<AdminLayout><Customers /></AdminLayout>} />
        <Route path="/admin/diagnostic-requests" element={<AdminLayout><DiagnosticRequests /></AdminLayout>} />
        <Route path="/admin/category-images" element={<AdminLayout><CategoryImages /></AdminLayout>} />
        
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categorie/:slug" element={<CategoryPage />} />
          <Route path="produit/:slug" element={<ProductPage />} />
          <Route path="recuperation-donnees" element={<DataRecoveryPage />} />
          <Route path="recherche" element={<SearchResults />} />
          <Route path="panier" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;