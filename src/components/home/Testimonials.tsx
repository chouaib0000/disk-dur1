import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Container from '../ui/Container';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  imageUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Mohammed Lamrani',
    role: 'Directeur IT',
    company: 'TechMaroc',
    content: 'Grâce au service de récupération de données de DisqueDur.ma, nous avons pu récupérer des fichiers critiques après une panne serveur. Un service professionnel et efficace qui nous a sauvé d\'une situation catastrophique.',
    rating: 5,
    imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    name: 'Laila Berrada',
    role: 'Photographe',
    company: 'Indépendante',
    content: 'J\'ai perdu toutes mes photos de mariage quand mon disque dur externe a cessé de fonctionner. L\'équipe de DisqueDur.ma a récupéré 100% de mes données. Je ne peux que recommander leurs services !',
    rating: 5,
    imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    name: 'Karim Alaoui',
    role: 'Gérant',
    company: 'Cyber Café Medina',
    content: 'Nous achetons régulièrement notre matériel chez DisqueDur.ma. Les prix sont compétitifs et la qualité des produits est au rendez-vous. Le service client est également excellent.',
    rating: 4,
    imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ils Nous Font Confiance</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez ce que nos clients disent de nos produits et services.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-lg shadow-lg p-8 md:p-10">
                    <div className="flex items-center mb-6">
                      <img 
                        src={testimonial.imageUrl} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-600 text-sm">{testimonial.role}, {testimonial.company}</p>
                        <div className="flex text-amber-400 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              fill={i < testimonial.rating ? "currentColor" : "none"} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.content}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100"
            onClick={prevTestimonial}
            aria-label="Témoignage précédent"
          >
            <ChevronLeft size={20} />
          </button>

          <button 
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100"
            onClick={nextTestimonial}
            aria-label="Témoignage suivant"
          >
            <ChevronRight size={20} />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-blue-700' : 'bg-gray-300'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;