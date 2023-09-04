import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contex';
import axios from 'axios';


export default function Type() {
    const { name ,songType,setSongType,songTr,setSongTr,songGlobal,setSongGlobal,setMongooseType,mongooseType,songTr90,setSongTr90,songGlobal20,setSongGlobal20,setShowingButton} = useContext(UserContext);
    const navigate = useNavigate();


    useEffect(() => {
      if (songType&&mongooseType) {
        navigate('/game');
      }
    }, [songType, mongooseType]);
    
    // İsteği yapacak genel bir işlev oluşturun

    const fetchData = async (url, setData, setType, errorType, timeoutDuration = 5000) => {
  const source = axios.CancelToken.source();

  // İstek zaman aşımını yönetmek için bir zamanlayıcı ayarla
  const timeout = setTimeout(() => {
    source.cancel('API isteği zaman aşımına uğradı');
  }, timeoutDuration);

  try {
    // API isteği gönderme ve isteği iptal etme yeteneği ekleyerek yapılıyor
    const response = await axios.get(url, {
      cancelToken: source.token,
    });

    // Zaman aşımı zamanlayıcısını temizle
    clearTimeout(timeout);

    // Veriyi güncelle
    setData(response.data);
    setType(response.data);
    setShowingButton(true);
  } catch (error) {
    if (axios.isCancel(error)) {
      setType();
      setData();
      navigate('/');
      console.log('API isteği iptal edildi:', error.message);
    } else {
      console.error(`Error fetching ${errorType}:`, error);
      navigate('/');
    }
  }
}

    
    
// useEffect içinde fetchData işlevini kullanın
useEffect(() => {
  if (songType === songTr) {
    fetchData('https://find-song-backend.onrender.com/songTr', setSongTr, setSongType, 'songTr');
  }
}, [songType, songTr]);

useEffect(() => {
  if (songType === songGlobal) {
    fetchData('https://find-song-backend.onrender.com/songGlobal', setSongGlobal, setSongType, 'songGlobal');
  }
}, [songType, songGlobal]);

useEffect(() => {
  if (songType === songTr90) {
    fetchData('https://find-song-backend.onrender.com/songTr90', setSongTr90, setSongType, 'songTr90');
  }
}, [songType, songTr90]);

useEffect(() => {
  if (songType === songGlobal20) {
    fetchData('https://find-song-backend.onrender.com/songGlobal20', setSongGlobal20, setSongType, 'songGlobal20');
  }
}, [songType, songGlobal20]);

// Düğme işlevlerini kullanarak songType'ı ve mongooseType'ı ayarlayabilirsiniz
const handleButtonClick = (type, mongooseType) => {
  setSongType(type);
  setMongooseType(mongooseType);
};

// Örnek düğme işlevlerini kullanma
const handleButtonClickGl = () => {
  handleButtonClick(songGlobal, "Hot Hits Global");
};

const handleButtonClickTr = () => {
  handleButtonClick(songTr, "Hot Hits Turkey");
};

const handleButtonClickGl20 = () => {
  handleButtonClick(songGlobal20, "20's Hot Hits Global");
};

const handleButtonClickTr90 = () => {
  handleButtonClick(songTr90, "90's Hot Hits Turkey");
};

 

    return (
        <div className='w-screen h-screen flex flex-col justify-center bg-gradient-to-tr from-gray-800 via-gray-600 to-green-800 '>
            <h1 className='text-center w-full flex justify-center text-3xl md:text-5xl font-semibold text-white'>Select your music type {name}</h1>
        <div className='w-full flex flex-col  md:flex-row  md:justify-around  mt-[150px] px-[60px] gap-2'>
        <button className=' mx-auto shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] p-4 bg-green-100 opacity-70 hover:opacity-100  w-[250px] rounded-md border-black border-2' onClick={handleButtonClickTr}>Hot Hits Turkey</button>
        <button className='mx-auto shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] p-4 bg-green-100 opacity-70 hover:opacity-90  w-[250px] rounded-md border-black border-2' onClick={handleButtonClickGl}>Hot Hits Global</button>
        <button className='mx-auto shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] p-4 bg-green-100 opacity-70 hover:opacity-100  w-[250px] rounded-md border-black border-2' onClick={handleButtonClickTr90}>90's Hot Hits Turkey</button>
        <button className='mx-auto shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] p-4 bg-green-100 opacity-70 hover:opacity-90  w-[250px] rounded-md border-black border-2' onClick={handleButtonClickGl20}>20's Hot Hits Global</button>

        </div>
        </div>
    );
}