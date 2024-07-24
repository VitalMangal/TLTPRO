import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Products from './pages/Products/Products';
import NotFound from './pages/NotFound/NotFound';
import pages from './utils/pages';
import { useAuth } from './hooks';
import './App.css';

//Добавить проверку ролей для доступа
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

  return (
    auth.loggedIn
      ? children
      : <Navigate to={pages.auth} state={{ from: location }} />
  );
};

const MainRoute = () => {
  const location = useLocation();
	const auth = useAuth();

  return (
    auth.loggedIn
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
