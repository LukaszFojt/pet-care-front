import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { motion } from 'framer-motion';
import { SectionWrapper } from './ho_components';
import { menu, close, logoNew } from '../assets';
import { useTranslation } from "../TranslationContext";
import { BetterSelect } from "./elements";

const Navbar = () => {
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useContext(UserContext);
  const { t, language, setLanguage } = useTranslation();

  const navLinks = [
    { id: 'about', key: '/about', label: t('About us') },
  ];

  const languages = [
    { label: t('English'), value: 'en' },
    { label: t('Polish'), value: 'pl' }
  ]

  const AnimatedLogo = () => (
    <motion.img
      animate={{ rotate: [0, 360, 0] }}
      transition={{ duration: 5, repeat: Infinity, repeatType: 'loop' }}
      src={logoNew}
      alt="logo"
      className="w-8 h-8 md:w-16 md:h-16 ml-2 cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    />
  );

  const toggleTheme = () => {
    document.body.classList.toggle("dark-theme", !darkMode);
    document.body.classList.toggle("light-theme", darkMode);
    setDarkMode(!darkMode);
  };

  const UserLinks = () => (
    <li className="flex gap-5 text-[18px] font-light">
      {user ? (
        <Link to="/account">{user.userName}</Link>
      ) : (
        <>
          <Link to="/login">{t("Login")}</Link>
          <Link to="/register">{t("Register")}</Link>
        </>
      )}
    </li>
  );

  const NavItems = ({ onClick }) => (
    <>
      {navLinks.map(({ id, key, label }) => (
        <li key={id} className={`${active === label ? "text-light" : "text-secondary"} text-[18px] font-light`}>
          <Link to={key}
            onClick={() => {
              setActive(label);
              onClick && onClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white"
          >
            {t(label)}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <nav className="w-full sticky z-50 flex justify-between items-center bg-slate-300 bg-opacity-10">
      <div className="flex items-center gap-5">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-2">
          <AnimatedLogo />
          <p className="text-xl md:text-2xl">Pet Care</p>
        </Link>

        {/* Theme */}
        <button id="toggle-btn" className={`w-6 h-6 md:w-8 md:h-8 rounded-full bg-cover ${darkMode ? "light-icon" : "dark-icon"}`} onClick={toggleTheme} />
        
        {/* Languages */}
        <BetterSelect 
          options={languages}
          value={language}
          onChange={(val) => setLanguage(val)}
        />
      </div>

      {/* Mobile Navbar */}
      <div className="flex lg:hidden p-5">
        <img
          src={menuOpen ? close : menu}
          alt="menu"
          className="w-7 md:w-10 h-7 md:h-10 cursor-pointer hover:scale-110"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && (
          <motion.ul
            animate={{ y: [ -100, 0 ] }}
            transition={{ duration: 0.5 }}
            className="absolute right-14 bg-orange-300 bg-opacity-10 flex flex-col p-4 gap-2"
          >
            <UserLinks />
            <NavItems onClick={() => setMenuOpen(false)} />
          </motion.ul>
        )}
      </div>

      {/* Desktop Navbar */}
      <ul className="hidden lg:flex gap-5 p-5 items-center">
        <UserLinks />
        <NavItems />
      </ul>
    </nav>
  );
};

export default SectionWrapper(Navbar, "");
