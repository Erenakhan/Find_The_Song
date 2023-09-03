import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contex';
import axios from 'axios';

export default function Type() {
    const { name ,songType,setSongType,songTr,setSongTr,songGlobal,setSongGlobal,setMongooseType,mongooseType,songTr90,setSongTr90,songGlobal20,setSongGlobal20} = useContext(UserContext);
    const navigate = useNavigate();


    useEffect(() => {
      if (songType&&mongooseType) {
        navigate('/game');
      }
    }, [songType, mongooseType]);
  
  useEffect(() => {
    // Check if songType matches songTr
    if (songType === songTr) {
      axios.get('https://find-song-backend.onrender.com/songTr')
        .then(response => {
          // Update the state with the fetched data
          setSongTr(response.data);
          setSongType(response.data)
        })
        .catch(error => {
          // Handle and log any errors that occur during the request
          console.error('Error fetching songTr:', error);
        });
    }
  }, [songType, songTr]);

  useEffect(() => {
    // Check if songType matches songGlobal
    if (songType === songGlobal) {
      axios.get('https://find-song-backend.onrender.com/songGlobal')
        .then(response => {
          // Update the state with the fetched data
          setSongGlobal(response.data);
          setSongType(response.data)
        })
        .catch(error => {
          // Handle and log any errors that occur during the request
          console.error('Error fetching songGlobal:', error);
        });
    }
  }, [songType, songGlobal]);

    useEffect(() => {
      // Check if songType matches songTr90
      if (songType === songTr90) {
        axios.get('https://find-song-backend.onrender.com/songTr90')
          .then(response => {
            // Update the state with the fetched data
            setSongTr90(response.data);
            setSongType(response.data)
          })
          .catch(error => {
            // Handle and log any errors that occur during the request
            console.error('Error fetching songTr90:', error);
          });
      }
    }, [songType, songTr90]);


    useEffect(() => {
      // Check if songType matches songGlobal20
      if (songType === songGlobal20) {
        axios.get('https://find-song-backend.onrender.com/songGlobal20')
          .then(response => {
            // Update the state with the fetched data
            setSongGlobal20(response.data);
            setSongType(response.data)
          })
          .catch(error => {
            // Handle and log any errors that occur during the request
            console.error('Error fetching songGlobal20:', error);
          });
      }
    }, [songType, songGlobal20]);
    
      const handleButtonClickGl = () => {
        setSongType(songGlobal);
        setMongooseType("Hot Hits Global");
      };
      const handleButtonClickTr = () => {
        setSongType(songTr);
        setMongooseType("Hot Hits Turkey");
      };
      const handleButtonClickGl20 = () => {
        setSongType(songGlobal20);
        setMongooseType("20's Hot Hits Global");
      };
      const handleButtonClickTr90 = () => {
        setSongType(songTr90);
        setMongooseType("90's Hot Hits Turkey");

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
