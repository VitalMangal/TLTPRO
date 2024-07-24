import { useContext } from 'react';
import authContext from '../context/AuthContext';

const useAuth = () => useContext(authContext);

export { useAuth };
