import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const LevelWrap = ({ loggedIn }) => {
  const location = useLocation();

  return (
    <>
      <Header loggedIn={loggedIn} />
      <Outlet />
      {location.pathname !== '/profile' && <Footer />}
    </>
  );
};

export default LevelWrap;
