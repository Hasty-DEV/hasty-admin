import { useState } from 'react';
import { CiMail } from 'react-icons/ci';
import { FaHome, FaTag } from 'react-icons/fa';
import { Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes/Routes';
import Header from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

export function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          items={[
            {
              type: 'link',
              icon: <FaHome />,
              path: ROUTES.home.call(),
              label: 'Home',
            },
            {
              type: 'dropdown',
              icon: <FaTag />,
              label: 'Cupons',
              activeCondition: pathname === '/' || pathname.includes('coupons'),
              dropItems: [
                {
                  path: ROUTES.coupons.create.call(),
                  label: 'Criar',
                },
                {
                  path: ROUTES.coupons.listAll.call(),
                  label: 'Listar Todos',
                },
              ],
            },
            {
              type: 'dropdown',
              icon: <CiMail />,
              label: 'Newsletter',
              activeCondition: pathname.includes('newsletter'),
              dropItems: [
                {
                  path: ROUTES.newsletter.listAll.call(),
                  label: 'Listar Todos',
                },
              ],
            },
          ]}
        />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
