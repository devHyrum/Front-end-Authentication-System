// Register.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx'; // Importar el contexto de tema
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

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasPasswordChanged, setHasPasswordChanged] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { isDarkMode, toggleDarkMode } = useTheme(); // Usar el contexto de tema
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 8 || !/[A-Z]/.test(password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres y una letra mayúscula.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  useEffect(() => {
    if (hasPasswordChanged) {
      validatePassword(password);
    }
  }, [password, hasPasswordChanged]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setHasPasswordChanged(true);
  };

  const checkEmailUnique = async (email) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/check-email', { email });
      if (response.data.exists) {
        setEmailError('El correo electrónico ya está registrado.');
      } else {
        setEmailError('');
      }
    } catch (error) {
      console.error('Error al verificar correo electrónico:', error);
    }
  };

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setEmail(email);
    if (email) {
      await checkEmailUnique(email);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword(password) && !emailError) {
      try {
        await axios.post('http://localhost:3000/api/auth/register', { email, password });
        navigate('/login');
      } catch (error) {
        console.error('Error al registrarse:', error);
      }
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const isFormValid = email && password && !passwordError && !emailError;

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-customDark dark:text-white transition-colors duration-500 px-4">
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-600 rounded-full transition-colors duration-500"
      >
        <img src={isDarkMode ? darkMode : lightMode} alt="toggle mode theme" className='transition-transform duration-500'/>
      </button>
      <h2 className="text-2xl text-center py-6">Register User</h2>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#292326] shadow-md rounded-2xl px-8 pt-6 pb-8 border-[#BDBDBD] dark:border-[#BDBDBD] border-solid border-[1px] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-[473.83px] transition-colors duration-100">
        <img src={isDarkMode ? devchallengesLight : devchallenges} alt="devchallenges" className='py-5'/>
        <p className="font-semibold pb-2 xl:max-w-[318.88px] text-lg">Join thousands of learners from around the world</p>
        <p className="xl:max-w-[318.88px] pb-7 text-base">Master web development by making real-life projects. There are multiple paths for you to choose</p>
        <div className="relative w-full">
          <img src={envelope} alt="envelope" className="absolute w-6 left-3 bottom-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="mb-4 px-4 py-2 pl-10 rounded w-full border-[#BDBDBD] dark:border-gray-600 border-solid border-[1px] outline-none hover:outline-slate-400 dark:bg-gray-600 dark:text-white transition-colors duration-500"
          />
          {emailError && <p className="absolute top-10 text-red-500 text-xs px-1 pt-1 w-full flex justify-end">{emailError}</p>}
        </div>
        <div className="relative w-full">
          <img src={passwordImg} alt="password" className="absolute w-6 left-3 bottom-8 transform -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 mb-9 px-4 py-2 pl-10 rounded w-full border-[#BDBDBD] dark:border-gray-600 border-solid border-[1px] outline-none hover:outline-slate-400 dark:bg-gray-600 dark:text-white transition-colors duration-500"
          />
          {hasPasswordChanged && passwordError && <p className="absolute top-10 lg:top-10 lg:left-0 text-red-500 text-xs px-1 pt-2 w-full flex justify-end text-end">{passwordError}</p>}
        </div>
        <button
          type="submit"
          className={`w-full text-white py-2 rounded transition-colors duration-500 ${
            isFormValid ? 'bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500' : 'bg-[#828282]'
          }`}
          disabled={!isFormValid}
        >
          Start coding now
        </button>
        <div className="flex flex-col items-center">
          <p className="text-[#828282] dark:text-[#BDBDBD] p-5 pt-7 transition-colors duration-500">or continue with these social profile</p>
          <ul className="flex gap-6">
            <li className="border-solid border-[#828282] dark:border-[#BDBDBD] border-2 p-3 rounded-full cursor-pointer hover:shadow-md hover:shadow-indigo-500/40 transition-colors duration-500"><img src={google} alt="google" className="w-[18px]" /></li>
            <li className="border-solid border-[#828282] dark:border-[#BDBDBD] border-2 p-3 rounded-full cursor-pointer hover:shadow-md hover:shadow-indigo-500/40 transition-colors duration-500"><img src={facebook} alt="google" className="w-[18px]" /></li>
            <li className="border-solid border-[#828282] dark:border-[#BDBDBD] border-2 p-3 rounded-full cursor-pointer hover:shadow-md hover:shadow-indigo-500/40 transition-colors duration-500"><img src={twitter} alt="google" className="w-[18px]" /></li>
            <li className="border-solid border-[#828282] dark:border-[#BDBDBD] border-2 p-3 rounded-full cursor-pointer hover:shadow-md hover:shadow-indigo-500/40 transition-colors duration-500"><img src={github} alt="google" className="w-[18px]" /></li>
          </ul>
          <button onClick={handleLoginRedirect} className='text-[#828282] dark:text-[#BDBDBD] hover:underline hover:underline-offset-2 mt-5 transition-colors duration-500'>Adready a member? <span className='text-[#2D9CDB] dark:text-[#2D9CDB]'>Login</span></button>
        </div>
      </form>
      <div className='flex justify-between w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-[473.83px]'>
        <p className='text-[#828282] dark:text-[#BDBDBD] text-sm py-3 transition-colors duration-500'>created by <span className='font-semibold'>devHyrum</span></p>
        <p className='text-[#828282] dark:text-[#BDBDBD] text-sm py-3 transition-colors duration-500'>devChallenges.io</p>
      </div>
    </div>
  );
}
