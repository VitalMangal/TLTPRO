import { createContext } from 'react';
import { AuthContextType } from '../types';

//Желательно поменять вид значения по умолчанию
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
