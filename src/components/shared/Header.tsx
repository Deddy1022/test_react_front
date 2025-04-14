import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [, ,  removeCookie] = useCookies()

  const navLinks = [
    { path: '/dashboard/employees', label: 'Gestion des employé(e)s' },
    { path: '/dashboard/users', label: 'Utilisateurs' },
  ];

  const handleLogout = () => {
    removeCookie("jwt");
    navigate('/auth');
  };

  return (
    <header className="w-full bg-blue-600 text-white py-4 px-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Employés</h1>

        <button
          className="block md:hidden bg-blue-500 text-white px-3 py-2 rounded-md"
          onClick={() => {
            const nav = document.getElementById('nav-menu');
            if (nav) {
              nav.classList.toggle('hidden');
            }
          }}
        >
          Menu
        </button>

        <nav
          id="nav-menu"
          className="hidden md:flex flex-col md:flex-row gap-4 md:gap-6 items-center mt-4 md:mt-0"
        >
          {navLinks.map((navigation, index) => (
            <button
              key={index}
              onClick={() => navigate(navigation.path)}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100"
            >
              {navigation.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
          >
            Déconnexion
          </button>
        </nav>
      </div>
    </header>
  );
}
