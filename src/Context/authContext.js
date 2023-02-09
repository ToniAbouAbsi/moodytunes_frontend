import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  //Current user
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  //Login function
  const login = async (inputs) => {
    const res = await axios.post(
      'http://localhost:8800/api/auth/login',
      inputs
    );
    setCurrentUser(res.data);
  };

  //Update function
  const update = async (input) => {
    console.log(input);
    const res = await axios.get('http://localhost:8800/api/auth/update', input);
    console.log(res);
    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  //sending props
  return (
    <AuthContext.Provider
      value={{
        setCurrentUser,
        login,
        setUserName,
        update,
        userName,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
