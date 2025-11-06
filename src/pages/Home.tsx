import Hero from '../components/home/Hero';
import CategoryShowcase from '../components/home/CategoryShowcase';
import FeaturedProducts from '../components/home/FeaturedProducts';
import DataRecoveryPromo from '../components/home/DataRecoveryPromo';
import Testimonials from '../components/home/Testimonials';
import Brands from '../components/home/Brands';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>DisqueDur.ma - Solutions de Stockage et Récupération de Données au Maroc</title>
        <meta name="description" content="Votre spécialiste en disques durs, SSD, NAS et récupération de données au Maroc. Livraison dans tout le pays et service client professionnel." />
      </Helmet>
      
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <DataRecoveryPromo />
      <Testimonials />
      <Brands />
    </>
  );
};

export default Home;