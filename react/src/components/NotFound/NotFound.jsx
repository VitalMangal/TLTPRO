import { Link } from 'react-router-dom';
import pages from '../../utils/pages';

// Нужны классы, стилизация
const NotFound = () => {
  return (
    <>
      <h1>Страница не найдена</h1>
        <p>
          <Link to={pages.main}>Главная страница</Link>
        </p>
    </>

  );
};

export default NotFound;
