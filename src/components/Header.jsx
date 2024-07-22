import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import arrowDown from '../assets/arrowDown.svg';
import photoUser from '../assets/photoUser.svg';
import group from '../assets/group.svg';
import logout from '../assets/logout.svg';
import profile from '../assets/profile.png';
import devchallenges from '../assets/devchallenges.svg';
import lightMode from '../assets/lightMode.svg';
import darkMode from '../assets/darkMode.svg';
import devchallengesLight from '../assets/devchallenges-light.svg';
import arrowDownDarkMode from '../assets/arrowDownDarkMode.svg';

export default function Header({ isDarkMode, setIsDarkMode }) {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(photoUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:3000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);


        if (response.data.photoUser) {

          const imageResponse = await axios.get(`http://localhost:3000/api/auth/image/${response.data.photoUser}`, {
            responseType: 'blob',
            headers: { Authorization: `Bearer ${token}` }
          });
          const imageBlob = new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] });
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageUrl(imageUrl);
        } else {

          setImageUrl(photoUser);
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleHeaderClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleNavClick = () => {
    if (!isNavOpen) {
      setIsNavOpen(true);
      setIsAnimating(true);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setIsNavOpen(false);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleOutNavClick = (event) => {
    if(navRef.current && !navRef.current.contains(event.target)){
      setIsNavOpen(false);
    }
  }

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target) && headerRef.current && !headerRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

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

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('mousedown', handleOutNavClick); 

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.addEventListener('mousedown', handleOutNavClick); 

    };
  }, [setIsDarkMode]);

  if (!user) return <div className="text-center bg-gray-100 dark:bg-customDark dark:text-white">Cargando...</div>;

  return (
    <>
      <header className='w-full px-4 sm:px-8 flex justify-between items-center bg-gray-100 dark:bg-customDark dark:text-white transition-colors duration-500'>
        <img src={isDarkMode ? devchallengesLight : devchallenges} alt="devchallenges" className='py-5 mt-2'/>
        <div className='flex md:hidden'>
          <div ref={headerRef} onClick={handleNavClick} className='flex cursor-pointer items-center'>
            <img src={imageUrl} alt="photoUser" className='w-[35px] md:w-auto rounded-lg'/>
          </div>
        </div>
        <div className='hidden md:flex'>
          <div ref={headerRef} onClick={handleHeaderClick} className='flex cursor-pointer items-center mr-5'>
            <img src={imageUrl} alt="photoUser" className='w-[35px] rounded-lg'/>
            <p className='text-xs font-bold text-[#333333] dark:text-[#BDBDBD] p-4'>{user.nombre}</p>
            <img src={isDarkMode ? arrowDownDarkMode : arrowDown} alt="arrowDown" className={`w-2 transition-transform ${isModalOpen ? 'transform rotate-180' : ''}`} />
          </div>
          <button
            onClick={handleDarkModeToggle}
            className="p-3 bg-gray-200 dark:bg-gray-600 rounded-full transition-colors duration-500"
          >
            <img src={isDarkMode ? darkMode : lightMode} alt="toggle mode theme" className='transition-transform duration-500'/>
          </button>
        </div>
      </header>
      {isModalOpen && (
        <div ref={modalRef} className="fixed top-16 right-4 bg-white dark:bg-[#292523] dark:border-white dark:border-solid dark:border-[1px] dark:text-white shadow-md rounded-xl p-4 w-[188px] h-[174px]">
          <ul>
            <li className="flex cursor-pointer p-2 rounded-lg h-[39.15px] text-xs font-medium hover:bg-gray-200 dark:hover:bg-[#3b393e] items-center" onClick={() => navigate('/profile')}><img src={profile} alt="profile" className='w-[23px] h-[23px] mr-2'/>My Profile</li>
            <li className="flex cursor-pointer p-2 rounded-lg h-[39.15px] text-xs font-medium hover:bg-gray-200 dark:hover:bg-[#3b393e] items-center" onClick={() => navigate('/group-chat')}><img src={group} alt="group" className='w-[20px] mr-3'/>Group Chat</li>
            <li className="flex cursor-pointer p-2 my-4 border-solid border-t-[1px] border-[#E0E0E0] dark:border-gray-600 rounded-lg h-[39.15px] text-xs font-medium hover:bg-gray-200 dark:hover:bg-[#3b393e] text-[#EB5757] items-center" onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}><img src={logout} alt="logout" className='w-[20px] mr-2'/>Logout</li>
          </ul>
        </div>
      )}
      {isNavOpen && (
        <div className="fixed inset-0 bg-[#252329] bg-opacity-80 flex justify-end z-20 transition-opacity duration-300">
          <div ref={navRef} className={`bg-white dark:bg-[#292523] dark:text-white shadow-md w-75 p-4 ${isAnimating ? (isNavOpen ? 'slide-in' : 'slide-out') : ''}`}>
            <div className='flex items-center mb-4'>
              <img src={imageUrl} alt="photoUser" className='w-10 h-10 rounded-full'/>
              <p className='text-sm font-bold text-[#333333] dark:text-[#BDBDBD] ml-4 text-ellipsis overflow-hidden whitespace-nowrap w-[110px]'>{user.nombre}</p>
            </div>
            <ul>
              <li className="flex cursor-pointer p-2 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-[#3b393e] items-center" onClick={() => navigate('/profile')}><img src={profile} alt="profile" className='w-[23px] h-[23px] mr-2'/>My Profile</li>
              <li className="flex cursor-pointer p-2 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-[#3b393e] items-center" onClick={() => navigate('/group-chat')}><img src={group} alt="group" className='w-[20px] mr-3'/>Group Chat</li>
              <li className="flex cursor-pointer p-2 my-4 border-solid border-t-[1px] border-[#E0E0E0] dark:border-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-[#3b393e] text-[#EB5757] items-center" onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}><img src={logout} alt="logout" className='w-[20px] mr-2'/>Logout</li>
              <li className="flex cursor-pointer p-2 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-[#3b393e] items-center" onClick={handleDarkModeToggle}><img src={isDarkMode ? lightMode : darkMode} alt="toggle mode theme" className='w-[20px] mr-2'/>Change Theme</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
