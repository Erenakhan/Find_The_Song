import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contex';
import axios from 'axios';

export default function Index() {
    const { name, setName ,accessToken, setAccessToken} = useContext(UserContext); 
    const [direction, setDirection] = useState(false);
    const navigate = useNavigate();

    const CLIENT_ID ="a63f424649704702a835a37e61a7b13c"
    const CLIENT_SECRET="1bcce9dd426e4a978edbf4ed82c45524"

useEffect(() => {
// API Access Token
var authParameters = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
}

fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
    .catch(error => console.error('Error fetching token:', error)); // Add error handling
}, []);

useEffect(() => {
    async function sendAccessToken() {
        try {
            await axios.post('https://find-the-song.vercel.app/api/acsessToken', { accessToken });
        } catch (error) {
            console.error('Error sending access token:', error);
        }
    }
    sendAccessToken();
}, [accessToken]);

    useEffect(() => {
       if (direction && name) {
          
            const redirectTimeout = setTimeout(() => {
                navigate('/type');
            });

            return () => clearTimeout(redirectTimeout);
        }
    }, [direction, navigate]);

    const handleStartClick = () => {
        setDirection(true);
    };

    

    return (
        <div className='w-screen h-screen flex flex-col justify-center bg-gradient-to-tr from-gray-800 via-gray-600 to-green-800 '>
            <h1 className='p-2 md:p-0 text-3xl md:text-4xl text-center text-white mx-auto'>Please Enter Your Name</h1>
            <input  className='shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-transparent text-white text-3xl w-[250px] mx-auto my-40 rounded-md border-2 border-black opacity-60 focus:opacity-100 px-4 py-2'  type="text" value={name} placeholder="John Doe" onChange={e => setName(e.target.value)} 
            required
            />
            {!name ? <button className='w-10 hidden text-3xl mx-auto text-white hover:scale-110' onClick={handleStartClick}>Next</button>
                : <button className=' w-10 text-3xl mx-auto text-white hover:scale-110' onClick={handleStartClick}>Next</button>
            }
        </div>
    );
}
