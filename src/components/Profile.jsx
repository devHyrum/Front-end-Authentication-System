import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import photoUser from '../assets/photoUser.svg';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
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
        setEmail(response.data);
        setBio(response.data);
        setPhoneNumber(response.data);

        // Check if there's a photo URL
        if (response.data.photoUser) {
          // Fetch the image blob and create a URL
          const imageResponse = await axios.get(`http://localhost:3000/api/auth/image/${response.data.photoUser}`, {
            responseType: 'blob',
            headers: { Authorization: `Bearer ${token}` }
          });
          const imageBlob = new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] });
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageUrl(imageUrl);
        } else {
          // Use default photoUser if no image is available
          setImageUrl(photoUser);
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleEditUserRedirect = () => {
    navigate('/editUser');
  };

  if (!user) return <div className="text-center bg-gray-100 dark:bg-customDark dark:text-white">Cargando...</div>;

  return (
    <>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} /> {/* Usar el componente Header */}

      <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-customDark min-h-screen transition-colors duration-500">

        <h2 className="text-3xl mb-3 text-center dark:text-white">Personal info</h2>
        <p className='text-lg dark:text-white'>Basic info, like your name and photo</p>
        <div className="bg-white dark:bg-[#292326] dark:text-white shadow-md rounded-2xl mt-6 border-[#BDBDBD] dark:border-white border-solid border-[1px] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-[845.91px] transition-colors duration-500">
          <div className="flex justify-between items-center px-4 lg:px-8 py-6 border-solid border-b-[1px] border-[#BDBDBD] dark:border-white">
            <div className='transition-colors duration-100'>
              <p className='text-2xl dark:text-white'>Profile</p>
              <p className='text-xs lg:text-sm font-medium text-[#828282] dark:text-[#BDBDBD]'>Some info may be visible to other people</p>
            </div>
            <button onClick={handleEditUserRedirect} className="w-[95.34px] font-medium border-solid border-[1px] border-[#828282] dark:border-[#BDBDBD] text-[#828282] dark:text-[#BDBDBD] py-2 rounded-xl hover:bg-[#e6e6e6] dark:hover:bg-[#3b3b3b] transition-colors">Edit</button>
          </div>
          <div className="flex items-center px-4 lg:px-8 py-1  border-solid border-b-[1px] border-[#BDBDBD] dark:border-white">
            <p className='text-[#BDBDBD] dark:text-[#828282] font-medium w-[68px]'>PHOTO</p>
            <img 
              src={imageUrl} 
              alt="photoUser" 
              className='relative left-8 xl:max-left-[170px] w-[72px] p-0 m-0 rounded-lg' 
            />
          </div>
          <div className="flex items-center px-4 lg:px-8 py-6  border-solid border-b-[1px] border-[#BDBDBD] dark:border-white">
            <p className='text-[#BDBDBD] dark:text-[#828282] font-medium w-[68px]'>NAME</p>
            <p className='relative left-10 xl:max-left-[180px] font-medium lg:text-lg overflow-x-auto whitespace-nowrap w-[170px] lg:w-full'>{user.nombre}</p>
          </div>
          <div className="flex items-center px-4 lg:px-8 py-6 border-solid border-b-[1px] border-[#BDBDBD]">
            <p className='text-[#BDBDBD] dark:text-[#828282] font-medium w-[68px]'>BIO</p>
            <p className='relative left-10 xl:max-left-[180px] font-medium lg:text-lg w-[180px] lg:w-full overflow-y-auto max-h-[100px]'>{bio.bio}</p>
          </div>
          <div className="flex items-center px-4 lg:px-8 py-6 border-solid border-b-[1px] border-[#BDBDBD]">
            <p className='text-[#BDBDBD] dark:text-[#828282] font-medium w-[68px]'>PHONE</p>
            <p className='relative left-10 xl:max-left-[180px] font-medium text-lg'>{phoneNumber.phoneNumber}</p>
          </div>
          <div className="flex items-center px-4 lg:px-8 py-6 border-solid border-b-[1px] border-[#BDBDBD]">
            <p className='text-[#BDBDBD] dark:text-[#828282] font-medium w-[68px]'>EMAIL</p>
            <p className='relative left-10 xl:max-left-[180px] font-medium text-lg text-ellipsis overflow-hidden whitespace-nowrap w-[170px] lg:w-full'>{email.email}</p>
          </div>
          <div className="flex items-center px-4 lg:px-8 py-6 mb-2">
            <p className='text-[#BDBDBD] dark:text-[#828282] font-medium w-[68px]'>PASSWORD</p>
            <p className='relative left-10 xl:max-left-[180px] font-medium text-lg'>**********</p>
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
