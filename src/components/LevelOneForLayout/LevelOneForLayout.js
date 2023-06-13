import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const LevelOneForLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default LevelOneForLayout;
