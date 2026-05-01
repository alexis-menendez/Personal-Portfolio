// File: client/src/components/taskadelic/TaskadelicLayout.tsx

import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TDNavbar from './TDNavbar';
import ReturnToPortfolio from '../innerOrbit/common/IOReturnToPortfolio';
import TDInfoTab from './TDInfoTab';
import tdStyles from '../../assets/css/taskadelic/TDTaskadelic.module.css';

const TaskadelicLayout = () => {
  const { pathname } = useLocation();
  const isNarrowPage = ['/td-home', '/td-create', '/td-edit'].includes(pathname);

  useEffect(() => {
    document.documentElement.setAttribute('data-scrollbar', 'taskadelic');
    return () => document.documentElement.removeAttribute('data-scrollbar');
  }, []);

  return (
    <div className={tdStyles.appWrapper}>
      <TDNavbar narrow={isNarrowPage} hideLogin={pathname === '/td-home'} />
      <main className={tdStyles.main}>
        <Outlet />
      </main>
      {pathname === '/td-home' && (
        <TDInfoTab content={
          <>
            <strong style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.01em' }}>What's happening behind the scenes?</strong>
            Credentials are verified against a PostgreSQL database hosted on Neon.
            Passwords are hashed with bcrypt. On success, a signed JWT is stored
            locally and used to authorize all board operations.
          </>
        } />
      )}

      {pathname === '/td-create' && (
        <TDInfoTab content={
          <>
            <strong style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.01em' }}>What's happening behind the scenes?</strong>
            Submitting this form sends a POST request to the Express server with your JWT in the header.
            The server verifies the token, then writes the new ticket to the PostgreSQL database on Neon.
            You are then redirected back to the board, which re-fetches all tickets to reflect the change.
          </>
        } />
      )}

      {pathname === '/td-board' && (
        <TDInfoTab content={
          <>
            <strong style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.01em' }}>What's happening behind the scenes?</strong>
            On load, the board sends a request to the Express server with your JWT in the header.
            The server validates the token, then queries a PostgreSQL database on Neon for all tickets.
            Creating, editing, moving, or deleting a ticket each fire a REST API call.
            The board re-fetches automatically after every change to stay in sync.
          </>
        } />
      )}
      <ReturnToPortfolio />
    </div>
  );
};

export default TaskadelicLayout;
