import { useState, useMemo, PropsWithChildren } from 'react';
import AuthContext from './AuthContext.ts';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/localStorageFunctions.js';
import { LogInUserDataType } from '../types';

const AuthProvider = ({ children }: PropsWithChildren) => {
  // либо заменить на "as string"
  const userData = JSON.parse(getStorageItem() || '{}');
  const [loggedIn, setLoggedIn] = useState<boolean>(userData ? userData.userLoggedIn : false);

  const useLogIn = (data: LogInUserDataType) => {
    setStorageItem(data);
    setLoggedIn(true);
  };

  const useLogOut = () => {
    removeStorageItem();
    setLoggedIn(false);
  };

  const props = useMemo(() => ({ loggedIn, logIn: useLogIn, logOut: useLogOut }), [loggedIn]);
  return (
    <AuthContext.Provider value={props}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
