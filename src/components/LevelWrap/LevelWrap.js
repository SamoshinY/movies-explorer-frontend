import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const LevelWrap = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <Outlet />
      {location.pathname !== '/profile' && <Footer />}
    </>
  );
};

export default LevelWrap;
