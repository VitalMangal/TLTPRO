import { ReactNode, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Products from './components/Products/Products';
import NotFound from './components/NotFound/NotFound';
import pages from './utils/pages';
//import { useAuth } from './hooks';
import './App.css';

import authContext from './context/AuthContext';

//Добавить проверку ролей для доступа
type PrivateRouteProps = {
  children: ReactNode
}

//Возможно слишком широкий список видов на выходе из функции
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();
	const { loggedIn } = useContext(authContext);

  return (
    loggedIn
      ? children
      : <Navigate to={pages.auth} state={{ from: location }} />
  );
};

const MainRoute = () => {
  const location = useLocation();
	const { loggedIn } = useContext(authContext);


  return (
    loggedIn
      ? <Navigate to={pages.products} state={{ from: location }} />
			: <Navigate to={pages.auth} state={{ from: location }} />
  );
};

function App() {
	return (
		<Router>
			<Routes>
				<Route path={pages.auth} element={<Auth />} />
				<Route path={pages.main} element={<MainRoute />} />
				<Route path={pages.products} element={
					<PrivateRoute>
						<Products />
					</PrivateRoute>
				} />
				<Route path={pages.notFound} element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
