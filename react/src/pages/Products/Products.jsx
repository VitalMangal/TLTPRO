import { useAuth } from '../../hooks/useContext.js';
import Sidebar from '../../components/layouts/sidebar.jsx';

const Products = () => {
	const auth = useAuth();
	return (
		<>
			<h1>Products</h1>
			<div>
				<Sidebar />
			</div>
			<button onClick={auth.logOut}>
				logOut
			</button>
		</>

	);
};

export default Products;
