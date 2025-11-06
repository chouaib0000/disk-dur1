import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Container from '../components/ui/Container';
import { Button } from '../components/ui/Button';

const NotFound = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page non trouvée</h2>
        <p className="text-gray-600 mb-8">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/">
          <Button icon={<Home size={18} />}>
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;