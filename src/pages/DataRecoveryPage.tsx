import { useState } from 'react';
import { CheckCircle, AlertTriangle, FileQuestion, Send, Shield, Clock, Award, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import { useToaster } from '../components/ui/Toaster';
import Container from '../components/ui/Container';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const DataRecoveryPage = () => {
  const { addToast } = useToaster();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    deviceType: '',
    problemDescription: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.deviceType || !formData.problemDescription) {
      addToast('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('diagnostic_requests')
        .insert([
          {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            device_type: formData.deviceType,
            problem_description: formData.problemDescription,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      addToast('Votre demande a été soumise avec succès. Nous vous contacterons sous peu.', 'success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        deviceType: '',
        problemDescription: '',
      });
    } catch (error) {
      console.error('Error submitting diagnostic request:', error);
      addToast('Erreur lors de l\'envoi de votre demande. Veuillez réessayer.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const recoverySteps = [
    {
      title: "Évaluation Gratuite",
      description: "Nous examinons votre appareil et fournissons un diagnostic détaillé sans frais.",
      icon: <FileQuestion className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Devis Transparent",
      description: "Vous recevez un devis clair avec les coûts et le délai estimé pour la récupération.",
      icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
    },
    {
      title: "Récupération Professionnelle",
      description: "Nos experts utilisent des techniques avancées pour récupérer vos données en toute sécurité.",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Récupération de Données Professionnelle au Maroc | DisqueDur.ma</title>
        <meta name="description" content="Service professionnel de récupération de données pour disques durs, SSD, cartes mémoire et clés USB au Maroc. Diagnostic gratuit et taux de réussite élevé." />
      </Helmet>
      
      <section className="pt-10 pb-6 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <Container>
          <div className="text-center relative">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 opacity-10"></div>
              <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-blue-400 opacity-10"></div>
            </div>
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fadeIn">
                Service de Récupération de Données
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Experts en récupération de données perdues sur tous types de supports.
              </p>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Award className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-blue-100">Taux de réussite</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-green-300" />
                  <div className="text-2xl font-bold">24h</div>
                  <div className="text-sm text-blue-100">Service urgence</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-blue-300" />
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-blue-100">Confidentialité</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-purple-300" />
                  <div className="text-2xl font-bold">10+</div>
                  <div className="text-sm text-blue-100">Années d'expérience</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Pourquoi Choisir Notre Service
                </h2>
                <ul className="space-y-6">
                  <li className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">Laboratoire Spécialisé au Maroc</p>
                      <p className="text-gray-600 mt-1">Équipé des dernières technologies pour la récupération de données.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">Plus de 95% de Taux de Réussite</p>
                      <p className="text-gray-600 mt-1">Nous récupérons des données dans les situations les plus complexes.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">Confidentialité Garantie</p>
                      <p className="text-gray-600 mt-1">Vos données restent privées et sont protégées par un accord de confidentialité.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">Service d'Urgence Disponible</p>
                      <p className="text-gray-600 mt-1">Récupération rapide pour les cas urgents avec priorité de traitement.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">Pas de Récupération, Pas de Frais</p>
                      <p className="text-gray-600 mt-1">Vous ne payez que si nous parvenons à récupérer vos données.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
                  Types de Supports Pris en Charge
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
                    <p className="font-semibold text-gray-900">Disques Durs</p>
                    <p className="text-sm text-gray-600 mt-1">Internes et externes, tous fabricants</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                    <p className="font-semibold text-gray-900">SSD</p>
                    <p className="text-sm text-gray-600 mt-1">SATA, M.2, NVMe, PCIe</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 hover:shadow-md transition-shadow">
                    <p className="font-semibold text-gray-900">Cartes Mémoire</p>
                    <p className="text-sm text-gray-600 mt-1">SD, microSD, CompactFlash</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200 hover:shadow-md transition-shadow">
                    <p className="font-semibold text-gray-900">Clés USB</p>
                    <p className="text-sm text-gray-600 mt-1">Toutes marques et capacités</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200 hover:shadow-md transition-shadow">
                    <p className="font-semibold text-gray-900">NAS et RAID</p>
                    <p className="text-sm text-gray-600 mt-1">Systèmes domestiques et professionnels</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200 hover:shadow-md transition-shadow">
                    <p className="font-semibold text-gray-900">Serveurs</p>
                    <p className="text-sm text-gray-600 mt-1">Solutions pour entreprises</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 shadow-xl">
                <CardContent className="p-6 md:p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileQuestion className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Demande de Diagnostic Gratuit
                    </h2>
                    <p className="text-gray-600">
                      Remplissez ce formulaire pour recevoir une évaluation et un diagnostic gratuit de votre appareil.
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="Votre nom complet"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="votre@email.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                            Téléphone *
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="+212 6XX XXX XXX"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="deviceType" className="block text-sm font-semibold text-gray-700 mb-2">
                          Type d'appareil *
                        </label>
                        <select
                          id="deviceType"
                          name="deviceType"
                          required
                          value={formData.deviceType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        >
                          <option value="">Sélectionnez un type</option>
                          <option value="hdd">Disque Dur (HDD)</option>
                          <option value="ssd">SSD</option>
                          <option value="usb">Clé USB</option>
                          <option value="memory-card">Carte Mémoire</option>
                          <option value="nas">NAS / RAID</option>
                          <option value="other">Autre</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="problemDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                          Description du problème *
                        </label>
                        <textarea
                          id="problemDescription"
                          name="problemDescription"
                          rows={4}
                          required
                          value={formData.problemDescription}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                          placeholder="Décrivez le problème et les symptômes de votre appareil..."
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                      disabled={isSubmitting}
                      icon={<Send size={20} />}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Envoi en cours...
                        </div>
                      ) : (
                        'Envoyer ma demande'
                      )}
                    </Button>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-blue-700 text-center">
                        🔒 En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
                        Vos données sont protégées et ne seront jamais partagées.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>
      
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre Processus de Récupération</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Un processus simple et transparent pour récupérer vos données en toute sécurité.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recoverySteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection line for desktop */}
                {index < recoverySteps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-blue-500 transform translate-x-8 z-0"></div>
                )}
                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative z-10 border border-gray-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                      {step.icon}
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto border border-gray-100">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Prêt à Récupérer Vos Données ?</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Notre équipe d'experts est prête à vous aider. Contactez-nous dès maintenant pour un diagnostic gratuit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Contactez-nous maintenant
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Demander un devis
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      <section className="py-16">
        <Container>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12 shadow-inner">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Questions Fréquentes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Combien coûte le service de récupération de données ?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Le coût dépend de plusieurs facteurs, notamment le type d'appareil et la nature du problème. Nous offrons un diagnostic gratuit pour évaluer votre cas spécifique et vous fournir un devis transparent avant de commencer tout travail.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Combien de temps prend la récupération de données ?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  La durée varie en fonction de la complexité du problème. Les cas standard sont généralement traités en 2-5 jours ouvrables. Pour les urgences, nous proposons un service accéléré avec un délai de 24 à 48 heures.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Puis-je récupérer des données d'un disque dur physiquement endommagé ?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Oui, notre laboratoire spécialisé est équipé pour traiter les dommages physiques sur les disques durs, y compris les problèmes de têtes de lecture, de moteur ou de circuits imprimés. Le taux de succès dépend de l'étendue des dommages.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  Que faire si mon appareil tombe en panne ?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Si votre appareil tombe en panne, arrêtez immédiatement de l'utiliser pour éviter d'aggraver la situation. Ne tentez pas de le réparer vous-même ou d'utiliser des logiciels de récupération, car cela pourrait causer des dommages irréversibles. Contactez-nous dès que possible pour une évaluation professionnelle.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default DataRecoveryPage;