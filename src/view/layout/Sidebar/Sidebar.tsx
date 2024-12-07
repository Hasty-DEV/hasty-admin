import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { MdArrowBack } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo/Logo.svg';
import { ROUTES } from '../../routes/Routes';
import { SidebarLinkGroup } from './SidebarLinkGroup';

type Item = {
  type: 'link';
  icon: React.ReactNode;
  label: string;
  path: string;
};

type DropItem = {
  path: string;
  label: string;
};

type DropdownItem = {
  type: 'dropdown';
  icon: React.ReactNode;
  label: string;
  activeCondition: boolean;
  dropItems: DropItem[];
};

type SidebarItems = (Item | DropdownItem)[];

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  items: SidebarItems;
};

export function Sidebar({ sidebarOpen, setSidebarOpen, items }: SidebarProps) {
  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLElement | null>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;

      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={classNames(
        'absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark',
        'lg:static lg:translate-x-0',
        sidebarOpen && 'translate-x-0',
        !sidebarOpen && '-translate-x-full',
      )}
    >
      <div className="flex items-center justify-between gap-2 px-6 pt-6 lg:pt-8">
        <NavLink to={ROUTES.home.call()}>
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <MdArrowBack size={24} />
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear pt-2">
        <nav className="py-4 px-4 lg:px-6">
          <div>
            <h3 className="text-sm font-semibold text-bodydark2">MENU</h3>

            <ul className="flex flex-col gap-1.5">
              {items.map((item) => {
                if (item.type === 'link') {
                  return (
                    <li key={item.label}>
                      <NavLink
                        to={item.path}
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                      >
                        {item.icon}
                        {item.label}
                      </NavLink>
                    </li>
                  );
                }

                if (item.type === 'dropdown') {
                  return (
                    <SidebarLinkGroup activeCondition={item.activeCondition}>
                      {(handleClick, open) => {
                        return (
                          <>
                            <NavLink
                              to="#"
                              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                item.activeCondition &&
                                'bg-graydark dark:bg-meta-4'
                              }`}
                              onClick={(e) => {
                                e.preventDefault();

                                if (sidebarExpanded) {
                                  handleClick();
                                } else {
                                  setSidebarExpanded(true);
                                }
                              }}
                            >
                              {item.icon}
                              {item.label}
                              <IoIosArrowDown
                                size={18}
                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                  open && 'rotate-180'
                                }`}
                              />
                            </NavLink>
                            <div
                              className={`translate transform overflow-hidden ${
                                !open && 'hidden'
                              }`}
                            >
                              <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                {item.dropItems.map((dropitem) => (
                                  <li>
                                    <NavLink
                                      to={dropitem.path}
                                      className={({ isActive }) =>
                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                        (isActive && '!text-white')
                                      }
                                    >
                                      {dropitem.label}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        );
                      }}
                    </SidebarLinkGroup>
                  );
                }

                return null;
              })}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}
