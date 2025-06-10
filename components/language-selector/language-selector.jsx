import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Menu, MenuItem } from './menu.jsx';
import './styles.css';
import { useState } from 'react';

const menu = {
  closed: {
    scale: 0,
    transition: {
      delay: 0.15,
    },
  },

  open: {
    scale: 1,
    transition: {
      type: 'spring',
      duration: 0.4,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
};

const item = {
  variants: {
    closed: { x: -16, opacity: 0 },
    open: { x: 0, opacity: 1 },
  },

  transition: { opacity: { duration: 0.2 } },
};

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Get language from localStorage on component mount
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      changeLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Update document direction based on language
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    // Update lang attribute
    document.documentElement.lang = lng;
    // Save language to localStorage
    localStorage.setItem('language', lng);
  };

  return (
    <div>
      <Menu
        label={i18n.language === 'en' ? 'English' : 'العربيه'}
        open={open}
        setOpen={setOpen}
        animate={open ? 'open' : 'closed'}
        initial="closed"
        exit="closed"
        variants={menu}
      >
        <MenuItem {...item} onClick={() => changeLanguage('en')}>
          English
        </MenuItem>
        <MenuItem {...item} onClick={() => changeLanguage('ar')}>
          العربيه
        </MenuItem>
      </Menu>
    </div>
  );
}
