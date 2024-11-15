import { useState } from 'react';
import { FaBars, FaCaretDown, FaHome, FaTag } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { ROUTES } from '../routes/Routes';

export function DefaultLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCouponsDropdownOpen, setIsCouponsDropdownOpen] = useState(false); // Estado para o dropdown

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCouponsDropdown = () => {
    setIsCouponsDropdownOpen(!isCouponsDropdownOpen);
  };

  return (
    <div className="flex min-h-screen">
      <aside
        className={`transition-all duration-300 bg-slate-800 p-5 ${isSidebarOpen ? 'w-64' : 'w-16'} overflow-hidden`}
      >
        <div className="flex md:hidden justify-between items-center mb-5">
          <button onClick={toggleSidebar} className="text-white text-2xl">
            <FaBars />
          </button>
        </div>
        <nav className="space-y-4">
          <Link
            to={ROUTES.home.call()}
            className="flex items-center space-x-2 text-white hover:text-gray-300"
          >
            <FaHome />
            {isSidebarOpen && <span>Home</span>}
          </Link>
          <div>
            <button
              onClick={toggleCouponsDropdown}
              className="flex items-center space-x-2 text-white hover:text-gray-300 w-full"
            >
              <FaTag />
              {isSidebarOpen && <span>Cupons</span>}
              <FaCaretDown
                className={`ml-2 transition-transform ${isCouponsDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isCouponsDropdownOpen && (
              <div className="ml-6 space-y-2 mt-2 transition-all duration-300 ease-in-out">
                <Link
                  to={ROUTES.coupons.create.call()}
                  className="block text-white hover:text-gray-300"
                >
                  Criar
                </Link>
                <Link
                  to={ROUTES.coupons.listAll.call()}
                  className="block text-white hover:text-gray-300"
                >
                  Listar Todos
                </Link>
              </div>
            )}
          </div>
        </nav>
      </aside>

      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}
