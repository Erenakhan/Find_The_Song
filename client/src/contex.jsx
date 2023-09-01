import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [name, setName] = useState("");
  const [songType, setSongType] = useState()
  const [mongooseType, setMongooseType] = useState()
  const [songTr, setSongTr] = useState([]);
  const [songGlobal, setSongGlobal] = useState([]);
  const [songTr90, setSongTr90] = useState([]);
  const [songGlobal20, setSongGlobal20] = useState([]); // Initial value for name state
  const [point, setPoint] = useState(0); // Initial value for name state
  
  return (
    <UserContext.Provider value={{ name, setName,songType,setSongType,songTr,setSongTr,songGlobal,setSongGlobal,point,setPoint,mongooseType, setMongooseType,songTr90, setSongTr90,songGlobal20, setSongGlobal20 }}>
      {children}  
    </UserContext.Provider>
  );
}
