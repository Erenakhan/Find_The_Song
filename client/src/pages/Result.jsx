import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contex';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Result() {
    const { name, setMongooseType , mongooseType, point ,setPoint,songType,setSongType,setShowingButton} = useContext(UserContext);
    const [data, setData] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [startGame, setStartGame] = useState(false);

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            await axios.post("https://find-song-backend.onrender.com/addPoint", { name, mongooseType, point });
            const response = await axios.get("https://find-song-backend.onrender.com/getPoint");
            setData(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (point && !fetched) {
            fetchData();
            setFetched(true);
        }
    }, [point, fetched]);

    const sortedData = [...data].sort((a, b) => b.point - a.point);

    const firstFiveItems = sortedData.slice(0, 5); 

    
    const start = ()=>{
      setSongType()
      setMongooseType("");
      setPoint(0)
      setStartGame(true);
      setShowingButton(false);
  } 

    useEffect(() => {
      if (startGame) {
          setMongooseType("");
          setPoint(0)
          setSongType()
          navigate('/');
      }
  }, [startGame, navigate]);




    return (
        <div className='w-screen min-h-screen flex flex-col  justify-center  md:flex-row bg-gradient-to-b from-gray-800 via-gray-500 to-gray-400'>
            <div className='md:w-1/2 ml-0 flex flex-col justify-center items-center'>
                <div className='shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] flex flex-col gap-2 px-3 py-2 md:gap-8 border-2 md:px-8 md:py-5 rounded-md bg-gradient-to-r from-gray-800 to-gray-500'>
                    <div>
                        <div className={`text-white text-xl md:text-5xl ${point > 0 ? 'text-yellow-300' : ''}`}>
                            <span className='text-yellow-300'>{point > 0 ? 'Congratulations' : 'Nice Try'}</span> {name && name}
                        </div>
                    </div>
                    <div className='text-white text-md md:text-4xl border-b-2 border-yellow-300'>Your Score: {point && point} </div>
                    <div className='text-white text-md md:text-4xl  border-b-2 border-yellow-300'>Category: {mongooseType && mongooseType}</div>
                </div>
              <button onClick={start} className='hidden md:block text-md md:text-3xl border-2 bg-yellow-300  px-2 py-1 md:px-6 md:py-3 rounded-md text-gray-800  hover:scale-105 mt-20'>Play  Again</button>
            </div>
            <div className='md:w-1/2 mr-0 flex flex-col justify-center items-center'>
                <h2 className='text-xl  md:text-5xl font-semibold font-mono text-yellow-300 pt-8 pb-2  md:p-5  md:pt-0 '>Best of 5 User</h2>
                    <table className='shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] table-auto bg-gradient-to-r from-gray-800 to-gray-500  rounded-md md:p-6 p-4 '>
                      <thead>
                          <tr  className='border-b-2'>
                              <th className=' text-lg md:text-4xl text-gray-100 p-1 md:p-5'>User</th>
                              <th className=' text-lg md:text-4xl text-gray-100 p-1 md:p-5'>Music Type</th>
                              <th className=' text-lg md:text-4xl text-gray-100 p-1 md:p-5'>Score</th>
                          </tr>
                      </thead>
                    <tbody>
                    {firstFiveItems.map((item, index) => (
                      <tr key={item._id}>
                          <td className={`text-md md:text-4xl ${index === 0 ? 'text-yellow-300' : 'text-white'} m-1 md:m-4 border-y-2 p-2 md:p-5`}>
                              {item.name}
                          </td>
                          <td className={`text-md md:text-4xl ${index === 0 ? 'text-yellow-300' : 'text-white'} m-1 md:m-4 border-y-2 p-2 md:p-5`}>
                              {item.mongooseType}
                          </td>
                          <td className={`text-md md:text-4xl ${index === 0 ? 'text-yellow-300' : 'text-white'} m-1 md:m-4 border-y-2 p-2 md:p-5`}>
                              {item.point}
                          </td>
                      </tr>
                  ))}

                    </tbody>
                </table>
                <button onClick={start} className='md:hidden text-md md:text-3xl border-2 bg-yellow-300  px-2 py-1 md:px-6 md:py-3 rounded-md text-gray-800  hover:scale-105 mt-20'>Play  Again</button>
            </div>
        </div>
    );
}
