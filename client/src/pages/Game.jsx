import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contex';
import { useNavigate } from 'react-router-dom';


export default function Game() {
  const [audioSource, setAudioSource] = useState(""); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({}); 
  const [audioPlayer, setAudioPlayer] = useState(new Audio()); 
  const [songReady, setSongReady] = useState(false); 
  const [playedSong, setPlayedSong] = useState([]);
  const [startCount,setStartCount]=useState(60);
  const[count,setCount]=useState(10);
  const [mixedSong,setMixedSong]=useState([]);
  const [gameFinished,setGameFinised]=useState(false);
  const [selected,setSelected]=useState();
  const [target,setTarget]=useState(false);

  const navigate = useNavigate();

  const {songType,point,setPoint,name,mongooseType,showingButton} = useContext(UserContext);

  useEffect(()=>{
    if (!songType || !name) {
      navigate('/');
      return;
    }
  },[])

  const playRandomSong = () => {
    try {
      let randomIndex;
      do {
        randomIndex = getRandomNumber(songType.items.length);
      } while (
        playedSong.includes(randomIndex) ||
        !songType.items[randomIndex].track.preview_url
      );
  
      setPlayedSong((prevPlayedSong) => [...prevPlayedSong, randomIndex]);
  
      let randomIndex2 = getRandomNumber(songType.items.length);
      let randomIndex3 = getRandomNumber(songType.items.length);
      let randomIndex4 = getRandomNumber(songType.items.length);
  
      do {
        randomIndex2 = getRandomNumber(songType.items.length);
      } while (randomIndex2 === randomIndex);
  
      do {
        randomIndex3 = getRandomNumber(songType.items.length);
      } while (randomIndex3 === randomIndex || randomIndex3 === randomIndex2);
  
      do {
        randomIndex4 = getRandomNumber(songType.items.length);
      } while (
        randomIndex4 === randomIndex ||
        randomIndex4 === randomIndex2 ||
        randomIndex4 === randomIndex3
      );
  
      const newSong2 = songType.items[randomIndex2].track;
      const newSong3 = songType.items[randomIndex3].track;
      const newSong4 = songType.items[randomIndex4].track;
  
      playAudio(songType.items[randomIndex].track.preview_url);
      setCurrentSong(songType.items[randomIndex].track);
      const updatedMixedSong = [
        songType.items[randomIndex].track,
        newSong2,
        newSong3,
        newSong4,
      ];
  
      const shuffleArray = (array) => {
        const copyArray = [...array];
        for (let i = copyArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
        }
        return copyArray;
      };
      const shuffledArray = shuffleArray(updatedMixedSong);
      setMixedSong(shuffledArray);
    } catch (error) {
      console.error("Error in playRandomSong:", error);
    }
  };
  
  
  
  const playAudio = (source) => {
    if (isPlaying) {
      audioPlayer.pause();
      setSongReady(false);
      setIsPlaying(false);
      audioPlayer.src = source;
      setSongReady(true);
      audioPlayer.play();
      setIsPlaying(true);
      setCurrentSong(source);
    } else {
      audioPlayer.src = source;
      setSongReady(true);
      audioPlayer.play();
      setIsPlaying(true);
      setAudioSource(source);
      setCurrentSong(source);
    }
  };
 
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    
      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      const interval2 = setInterval(() => {
        setStartCount((prevCount2) => prevCount2 - 1);
      }, 1000);
      return () => {
        clearInterval(interval2);
      };
    }
  }, [isPlaying]);

  function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }
  let  trueCurrentPoint =  count * 19; 
  const check = (song) => {
    if (song === currentSong) {
      setSelected(song)
      setTarget(true);
      setPoint(point + trueCurrentPoint ); 
    } else {
      setTarget(true);
      setSelected(song);
      setPoint(point - 50); 
    }
    setCount(60);
    setTimeout(() => {
      setSelected();
      setTarget(false);
      playRandomSong(songType);

    }, 1000); 
  };

  useEffect(() => {
    if (count < 0) {
      setSelected();
      setTarget(false)
      playRandomSong();
      setCount(10);
      setPoint(point - 55);
    }
  }, [count], 1000);

  if (startCount < 0 ) {
    audioPlayer.pause();
    setCurrentSong()
    navigate('/result');
  }
 
  return (
    <div className='w-screen min-h-screen flex flex-col  bg-gradient-to-tr from-gray-800 via-gray-600 to-green-800 relative '>
     {isPlaying &&   <div >
      {gameFinished && <div className="absolute w-full h-full text-5xl text-white" 
       > your point is {point}  </div>}

        <span className='text-white absolute left-5 top-5 text-md md:text-3xl'>Game is finishing in {startCount} sec.</span>
      
      <span className='text-white absolute right-5 top-5 text-md md:text-3xl'>Point: {point}</span>
       </div>}
      {!isPlaying &&  <div className='absolute w-full h-full flex flex-col justify-center items-center px-6 md:px-0'>
      <div className="text-center mb-7 md:mb-20 text-white shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] flex flex-col gap-4 md:gap-8 border-2 px-3 py-3 md:px-8 md:py-5 rounded-md bg-gradient-to-r from-gray-800 to-gray-500">
        <h1 className="text-3xl md:text-6xl font-semibold ">Instructions</h1>
        <div className="text-left mx-auto max-w-md">
          <h2 className="mb-2">
            <span className="text-xl md:text-4xl text-white font-semibold"></span>
            Every song must be answered within 10 seconds.
          </h2>
          <h2 className="mb-2">
            <span className="text-xl md:text-4xl text-white font-semibold"> </span>
            The faster you answer, the more points you earn.
          </h2>
          <h2 className="mb-2">
            <span className="text-xl md:text-4xl text-white font-semibold"> </span>
            You have a total of 60 seconds for the game.
          </h2>
          <h2 className="mb-2">
            <span className="text-xl md:text-4xl text-white font-semibold"> </span>
            Answering incorrectly will result in a deduction of points.
          </h2>
        </div>
      </div>

        <div>
        {showingButton &&
          <button className="shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] p-4 text-4xl border-black border-2 w-[200px] text-white bg-transparent opacity-60 px-4 py-2 hover:opacity-100 mx-auto rounded-md" 
          onClick={() => playRandomSong()}>Start</button>
        }
        </div>
        
        </div>} 
       <div  className='h-full w-full'> {mixedSong.length && songReady > 0 ? (
          <div className=' h-fitt w-full gap-2 md:gap-[20px] flex flex-col mt-8 px-5 md:px-0 md:mt-0 pt-[120px] md:pt-[120px] mx-auto'>
              <span className="countdown font-mono text-3xl md:text-5xl w-full text-center flex justify-center text-white">
            <span style={{ '--value': count }}>{count}</span>
              </span>
                {mixedSong.map((song, index) => (
              <div 
                value={song.name}
                key={index}
                onClick={() => check(song)}
                className={`shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] my-2 cursor-pointer p-4 text-2xl border-black border-2 md:w-[450px] w-[330px]  text-white ${target ? "opacity-100" : "opacity-70"}  px-4 py-2 hover:opacity-100 mx-auto rounded-xl
                  ${target && song === currentSong ? 'bg-green-600 ' : 
                  (selected == song && !(song === currentSong)) ? 'bg-red-600 ' : 
                  " "
                  }
                `}>
                  <div className='flex gap-6  px-8'>
                  < img className='object-cover  w-20 h-20 ' src={song.album.images[0].url} />
                <span className="font-semibold h-20 w-full  flex items-center  justify-center overflow-y-auto"> {song.name ? song.name : "-"}{" "}</span>
                  </div>
                </div>
              ))}
            </div>
        ) : (
          ""
        )}

       </div>
    </div>
  );
}

