import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              Gestion des Employés Simplifiée
            </h1>
            <p className="text-lg lg:text-xl mb-6">
              Un outil moderne pour gérer efficacement vos employés et optimiser
              vos processus RH.
            </p>
            <Link to='/auth'>
              <Button className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-100 transition">
                Découvrir
              </Button>
            </Link>
          </div>
          <img
            src="https://via.placeholder.com/500x300"
            alt="Gestion des employés"
            className="mt-8 lg:mt-0 w-full max-w-md"
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Gestion des profils",
                description: "Ajoutez, mettez à jour et supprimez les informations des employés facilement."
              },
              {
                title: "Suivi des performances",
                description: "Évaluez les performances des employés avec des rapports détaillés."
              },
              {
                title: "Notifications automatisées",
                description: "Recevez des rappels pour les événements importants comme les anniversaires et les échéances."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à améliorer votre gestion des employés ?
          </h2>
          <p className="text-lg mb-6">
            Rejoignez des centaines d'entreprises qui utilisent notre outil pour
            simplifier leur gestion RH.
          </p>
          <Link to='/auth'>
            <Button className="bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition">
              Commencez dès maintenant
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; 2025 Gestion des Employés. Tous droits réservés.</p>
          <div className="mt-4 sm:mt-0 flex gap-4">
            <a href="#" className="hover:text-white">Politique de confidentialité</a>
            <a href="#" className="hover:text-white">Conditions d'utilisation</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
