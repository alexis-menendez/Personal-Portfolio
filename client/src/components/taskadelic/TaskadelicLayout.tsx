// File: client/src/components/taskadelic/TaskadelicLayout.tsx

import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TDNavbar from './TDNavbar';
import ReturnToPortfolio from '../innerOrbit/common/ReturnToPortfolio';
import tdStyles from '../../assets/css/taskadelic/Taskadelic.module.css';

const TaskadelicLayout = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/td-home';

  useEffect(() => {
    document.documentElement.setAttribute('data-scrollbar', 'taskadelic');
    return () => document.documentElement.removeAttribute('data-scrollbar');
  }, []);

  return (
    <div className={tdStyles.appWrapper}>
      <TDNavbar narrow={isLoginPage} />
      <main className={tdStyles.main}>
        <Outlet />
      </main>
      <ReturnToPortfolio />
    </div>
  );
};

export default TaskadelicLayout;
