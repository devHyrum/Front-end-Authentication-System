import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import arrowLeft from '../assets/arrowLeft.svg';
import oculto from '../assets/oculto.svg';
import visible from '../assets/visible.svg';
import camera from '../assets/camera.svg';
import photoUser from '../assets/photoUser.svg';
import Header from './Header';
import arrowLeftDarkMode from '../assets/arrowLeftDarkMode.svg';

export default function EditUser() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imagen, setImagen] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [photoLabel, setPhotoLabel] = useState('CHANGE PHOTO');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setPhotoLabel('UPLOADED IMAGE!');
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('bio', bio);
      formData.append('phoneNumber', phoneNumber);
      if (imagen) {
        formData.append('imagen', imagen);
      }

      await axios.put('http://localhost:3000/api/auth/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/profile');
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  return (
    <>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="flex flex-col items-center place-content-start bg-gray-100 dark:bg-customDark min-h-screen transition-colors duration-500">
        <div className='flex place-content-start w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-[845.91px]'>
          <img src={isDarkMode ? arrowLeftDarkMode : arrowLeft} alt="arrowLeft" className='cursor-pointer' onClick={() => navigate('/profile')} />
          <h2 className=" text-[#2D9CDB] text-lg cursor-pointer hover:underline hover:underline-offset-2 dark:text-white" onClick={() => navigate('/profile')}>Back</h2>
        </div>

        <div className="bg-white shadow-md rounded-2xl mt-6 border-[#BDBDBD] border-solid border-[1px] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-[845.91px] dark:bg-[#292326] transition-colors duration-500">
          <div className="flex flex-col items-start px-8 py-6 dark:text-white">
            <div>
              <p className='text-2xl'>Change Info</p>
              <p className='text-sm font-medium text-[#828282] pt-2 '>Changes will be reflected to every services</p>
            </div>
            <div className='relative flex items-center py-4'>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="fileInput"
                onChange={handleFileChange}
              />
              <img src={photoUser} alt="photoUser" className='w-[72px] cursor-pointer hover:opacity-25 transition-opacity z-10' onClick={() => document.getElementById('fileInput').click()} />
              <img src={camera} alt="camera" className='w-[24px] cursor-pointer absolute top-1/2 left-[36px] transform -translate-x-1/2 -translate-y-1/2 z-0' onClick={() => document.getElementById('fileInput').click()} />
              <h1 className='text-[#828282] font-medium ml-4 '>{photoLabel}</h1>
            </div>

            <p className='pb-1 relative left-1'>Name</p>
            <input
              type="text"
              placeholder="Enter your name..."
              className='w-full lg:w-[416.93px] p-3 rounded-xl outline-none border-[#828282] border-solid border-[1px] dark:bg-[#3b393e] transition-colors duration-500'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <p className='pb-1 pt-6 relative left-1'>Bio</p>
            <textarea
              placeholder="Enter your bio..."
              className='w-full lg:w-[416.93px] p-3 rounded-xl outline-none border-[#828282] border-solid border-[1px] h-[91.58px] resize-none overflow-y-auto dark:bg-[#3b393e] dark:text-white transition-colors duration-500'
              maxLength={300}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <p className='pb-1 pt-6 relative left-1'>Phone</p>
            <input
              type="number"
              placeholder="Enter your phone..."
              className='w-full lg:w-[416.93px] p-3 rounded-xl outline-none border-[#828282] border-solid border-[1px] dark:bg-[#3b393e] dark:text-white transition-colors duration-500'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <p className='pb-1 pt-6 relative left-1'>Email</p>
            <input
              type="email"
              placeholder="Enter your email..."
              className='w-full lg:w-[416.93px] p-3 rounded-xl outline-none border-[#828282] border-solid border-[1px] dark:bg-[#3b393e] dark:text-white transition-colors duration-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className='pb-1 pt-6 relative left-1'>Password</p>
            <div className="relative w-full lg:w-min">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your new password..."
                className='w-full lg:w-[416.93px] p-3 rounded-xl outline-none border-[#828282] border-solid border-[1px] dark:bg-[#3b393e] dark:text-white transition-colors duration-500'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                <img src={passwordVisible ? visible : oculto} alt="toggle visibility" />
              </button>
            </div>
            <button
              className='mt-6 rounded-lg bg-[#2F80ED] w-[82px] h-[38px] text-white font-medium hover:bg-blue-700 transition-colors dark:border-solid dark:border-[1px] dark:border-white dark:bg-[#292326] dark:hover:bg-[#3b3b3b]'
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
        <div className='flex justify-between w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-[845.91px]'>
          <p className='text-[#828282] text-sm py-3'>created by <span className='font-semibold'>devHyrum</span></p>
          <p className='text-[#828282] text-sm py-3'>devChallenges.io</p>
        </div>
      </div>
    </>
  );
}
