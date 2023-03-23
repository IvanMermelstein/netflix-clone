import Image from 'next/image';
import NavbarItem from './NavbarItem';
import {
  BsBell,
  BsChevronDown, BsSearch
} from 'react-icons/bs';
import MobileMenu from './MobileMenu';
import {
  useState, useCallback, useEffect
} from 'react';
import AccountMenu from './AccountMenu';

const navLabels = ['Home', 'Series', 'Films', 'New & Popular', 'My List', 'Browse by languages'];
const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed x-40">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition
        duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
        <Image src="/images/logo.png" alt="Logo" className='w-24 lg:w-32' width={640} height={173} />
        <div className='flex-row ml-8 gap-6 hidden lg:flex'>
          {
            navLabels.map((label: string) => (
              <NavbarItem key={label} label={label} />
            ))
          }
        </div>
        <div
          onClick={toggleMobileMenu}
          className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'
        >
          <p className='text-white text-sm'>Browse</p>
          <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} labels={navLabels} />
        </div>
        <div className='flex flex-row ml-auto gap-6 items-center'>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsSearch />
          </div>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsBell />
          </div>
          <div
            className='flex flex-row items-center gap-2 cursor-pointer relative'
            onClick={toggleAccountMenu}
          >
            <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
              <Image src="/images/default-blue.png" alt="Profile avatar" width={180} height={50} />
            </div>
            <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;