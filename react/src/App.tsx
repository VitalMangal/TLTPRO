import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Products from './components/Products/Products';
import NotFound from './components/NotFound/NotFound';
import pages from './utils/pages';

import authContext from './context/AuthContext';
import { PrivateRouteProps } from './types';
import { ToastContainer } from 'react-toastify';

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
		<>
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
			<ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
		</>		
	);
}

export default App;
