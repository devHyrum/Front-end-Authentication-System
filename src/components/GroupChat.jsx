import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Construction from '../assets/construction.svg';
import lightMode from '../assets/lightMode.svg';
import darkMode from '../assets/darkMode.svg';

export default function GroupChat() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center bg-gray-100 dark:bg-customDark dark:text-white min-h-screen transition-colors duration-500'>
      <button
        onClick={handleDarkModeToggle}
        className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-600 rounded-full transition-colors duration-500"
      >
        <img src={isDarkMode ? darkMode : lightMode} alt="toggle mode theme" className='transition-transform duration-500'/>
      </button>
      <div className='text-3xl py-5 font-medium'>Construction website!</div>
      <img src={Construction} alt="Construction" className='w-[200px]'/>
      <p className='text-sm text-[#828282] dark:text-[#BDBDBD] py-3 pb-6 transition-colors duration-500'>Busy workers, come back another day please</p>
      <p className='text-[#2F80ED] dark:text-[#2F80ED] cursor-pointer hover:underline hover:underline-offset-2' onClick={() => navigate('/profile')}>Return to profile page</p>
    </div>
  );
}
