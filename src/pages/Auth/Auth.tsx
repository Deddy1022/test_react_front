import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { Button } from '@/components/ui/button';
import { useCookies } from 'react-cookie';

export default function AuthForm() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [, setCookie] = useCookies(["jwt"]);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="relative w-full max-w-3xl overflow-hidden bg-white rounded-lg shadow-xl" style={{ height: '600px' }}>
        <div className={`absolute w-full h-full flex transition-transform duration-700 ease-in-out ${
          isLoginForm ? 'transform-none' : 'transform -translate-x-1/2'
        }`}>
          
          <Login setCookie={setCookie} />
          <Register />
        </div>
        
        <div 
          className={`absolute top-0 h-full w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center p-10 transition-all duration-700 ease-in-out ${
            isLoginForm ? 'right-0 rounded-l-lg' : 'left-0 rounded-r-lg'
          }`}
        >
          <h2 className="mb-6 text-4xl font-bold">
            {isLoginForm ? 'Nouveau ici ?' : 'Déjà membre ?'}
          </h2>
          <p className="mb-8 text-center">
            {isLoginForm 
              ? "Inscrivez-vous et découvrez notre plateforme!" 
              : "Connectez-vous pour accéder à votre compte!"}
          </p>
          <Button 
            onClick={toggleForm}
            className="px-10 py-2 bg-transparent font-semibold transition-all duration-300 border-2 border-white rounded-full hover:bg-white hover:text-purple-600"
          >
            {isLoginForm ? "S'inscrire" : "Se connecter"}
          </Button>
        </div>
      </div>
    </div>
  );
}