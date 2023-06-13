import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const LevelTwoForLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default LevelTwoForLayout;
