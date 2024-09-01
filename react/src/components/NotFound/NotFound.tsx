import { Link } from 'react-router-dom';
import pages from '../../utils/pages';

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl">Страница не найдена</h1>
        <p>
          <Link className="text-blue-600 text-xl no-underline hover:underline" to={pages.main}>Главная страница</Link>
        </p>
    </div>

  );
};

export default NotFound;
