import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import google from '../assets/google.svg';
import facebook from '../assets/facebook.svg';
import twitter from '../assets/twitter.svg';
import github from '../assets/github.svg';
import envelope from '../assets/envelope.png';
import passwordImg from '../assets/password.svg';
import devchallenges from '../assets/devchallenges.svg';
import lightMode from '../assets/lightMode.svg';
import darkMode from '../assets/darkMode.svg';
import devchallengesLight from '../assets/devchallenges-light.svg';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const { isDarkMode, toggleDarkMode  } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-customDark dark:text-white min-h-screen transition-colors duration-500 px-4">
      <button
        onClick={toggleDarkMode }
        className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-600 rounded-full transition-colors duration-500"
      >
        <img src={isDarkMode ? darkMode : lightMode} alt="toggle mode theme" className='transition-transform duration-500'/>
      </button>
      <h2 className="text-2xl text-center py-6">Login User</h2>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#292326] shadow-md rounded-2xl px-8 pt-6 pb-8 border-[#BDBDBD] dark:border-[#BDBDBD] border-solid border-[1px] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-[473.83px] transition-colors duration-100">
        <img src={isDarkMode ? devchallengesLight : devchallenges} alt="devchallenges" className='pt-5'/>
        <p className='font-semibold py-6 xl:max-w-[318.88px] text-lg'>Login</p>
        <div className="relative w-full">
          <img src={envelope} alt="envelope" className="absolute w-6 left-3 bottom-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 px-4 py-2 pl-10 rounded w-full border-[#BDBDBD] dark:border-gray-600 border-solid border-[1px] outline-none hover:outline-slate-400 dark:bg-gray-600 dark:text-white transition-colors duration-500"
          />
        </div>
        <div className="relative w-full">
          <img src={passwordImg} alt="password" className="absolute w-6 left-3 bottom-3 transform -translate-y-1/2 text-gray-400 " />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 px-4 py-2 pl-10 rounded w-full border-[#BDBDBD] dark:border-gray-600 border-solid border-[1px] outline-none hover:outline-slate-400 dark:bg-gray-600 dark:text-white transition-colors duration-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500 transition-colors duration-500">
          Start coding now 
        </button>
        <div className='flex flex-col items-center'>
          <p className='text-[#828282] dark:text-[#BDBDBD] p-5 pt-7 transition-colors duration-500'>or continue with these social profile</p>
          <ul className='flex gap-6'>
            <li className='border-solid border-[#828282] dark:border-[#BDBDBD] border-2 p-3 rounded-full cursor-pointer hover:shadow-md hover:shadow-indigo-500/40 transition-colors duration-500'><img src={google} alt="google" className='w-[18px]'/></li>
            <li className='border-solid border-[#828282] dark:border-[#BDBDBD] border-2 p-3 rounded-full cursor-pointer hover:shadow-md hover:shadow-indigo-500/40 transition-colors duration-500'><img src={facebook} alt="google" className='w-[18px]'/></li>
            <li className='border-solid border-[#828282] dark:border-[#BDBDBD] border-2 p-3 rounded-full cursor-pointer hover:shadow-md hover:shadow-indigo-500/40 transition-colors duration-500'><img src={twitter} alt="google" className='w-[18px]'/></li>
            <li className='border-solid border-[#828282] dark:border-[#BDBDBD] border-2 p-3 rounded-full cursor-pointer hover:shadow-md hover:shadow-indigo-500/40 transition-colors duration-500'><img src={github} alt="google" className='w-[18px]'/></li>
          </ul>
          <button onClick={handleRegisterRedirect} className='text-[#828282] dark:text-[#BDBDBD] hover:underline hover:underline-offset-2 mt-5 transition-colors duration-500'>Don’t have an account yet? <span className='text-[#2D9CDB] dark:text-[#2D9CDB]'>Register</span></button>
        </div>
      </form>
      <div className='flex justify-between w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-[473.83px]'>
        <p className='text-[#828282] dark:text-[#BDBDBD] text-sm py-3 transition-colors duration-500'>created by <span className='font-semibold'>devHyrum</span></p>
        <p className='text-[#828282] dark:text-[#BDBDBD] text-sm py-3 transition-colors duration-500'>devChallenges.io</p>
      </div>
    </div>
  );
}
