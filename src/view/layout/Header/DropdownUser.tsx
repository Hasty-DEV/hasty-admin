import { useState } from 'react';
import { GrSchedules } from 'react-icons/gr';
import { IoIosArrowDown } from 'react-icons/io';
import { MdLogout, MdPerson, MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ClickOutside from '../../components/ClickOutside';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            DIY SEC LAB
          </span>
          <span className="block text-xs">ADMIN</span>
        </span>

        <span className="h-12 w-12 rounded-full overflow-hidden flex justify-center items-center">
          <img
            src="https://www.diyseclab.io/assets/IMG_2724-ClNXIqo0.jpg"
            alt="User"
            className="object-cover h-full w-full"
          />
        </span>

        <IoIosArrowDown />
      </Link>

      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <MdPerson size={24} />
                Meu Perfil
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <GrSchedules size={24} />
                Meus Contatos
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <MdSettings size={24} />
                Configurações
              </Link>
            </li>
          </ul>
          <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
            <MdLogout size={24} />
            Log Out
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
