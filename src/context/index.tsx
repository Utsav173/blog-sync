'use client';
import { onAuthStateChanged } from 'firebase/auth';
import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';
import { auth } from './firebase';
const MyContext = createContext<any | undefined>(undefined);

export const MyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const checkItLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('is Loogedin');
        Cookies.set('userId', user.uid);
        Cookies.set('userData', JSON.stringify(user));
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  };
  useEffect(() => {
    checkItLoggedIn();
  }, []);

  return (
    <MyContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
