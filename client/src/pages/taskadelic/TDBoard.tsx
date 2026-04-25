// File: client/src/pages/taskadelic/TDBoard.tsx

import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { retrieveTickets, deleteTicket, updateTicket } from '../../api/taskadelic/ticketAPI';
import TDSwimlane from '../../components/taskadelic/TDSwimlane';
import { TicketData } from '../../interfaces/taskadelic/TicketData';
import { ApiMessage } from '../../interfaces/taskadelic/ApiMessage';
import auth from '../../utils/taskadelic/auth';
import tdStyles from '../../assets/css/taskadelic/Taskadelic.module.css';

const LANES = ['Todo', 'In Progress', 'Done'];

const TDBoard = () => {
  const [tickets,    setTickets]    = useState<TicketData[]>([]);
  const [loggedIn,   setLoggedIn]   = useState(false);
  const [error,      setError]      = useState(false);

  const checkLogin = () => { if (auth.loggedIn()) setLoggedIn(true); };

  const fetchTickets = async () => {
    try { setTickets(await retrieveTickets()); }
    catch { setError(true); }
  };

  const handleDelete = async (id: number): Promise<ApiMessage> => {
    const msg = await deleteTicket(id);
    fetchTickets();
    return msg;
  };

  const handleMove = async (ticket: TicketData, newStatus: string) => {
    await updateTicket(ticket.id!, { ...ticket, status: newStatus });
    fetchTickets();
  };

  useLayoutEffect(() => { checkLogin(); }, []);
  useEffect(() => { if (loggedIn) fetchTickets(); }, [loggedIn]);

  useEffect(() => {
    const wrapper = document.querySelector('[class*="appWrapper"]') as HTMLElement | null;
    if (wrapper) wrapper.style.backgroundImage = "url('/assets/taskadelic/trippy.dippy.board.svg')";
    return () => {
      if (wrapper) wrapper.style.backgroundImage = "url('/assets/taskadelic/trippy.dippy.deco.2.svg')";
    };
  }, []);

  if (error) return <div className={tdStyles.container}><h2>Error loading tickets.</h2></div>;

  return (
    <>
      {!loggedIn ? (
        <div className={tdStyles.loginNotice}>
          <h1>Login To Create &amp; View Tickets</h1>
        </div>
      ) : (
        <div className={tdStyles.board}>
          <div className={tdStyles.newTicketWrapper}>
            <button type="button" className={tdStyles.newTicketBtn}>
              <Link to="/td-create">New Ticket</Link>
            </button>
            <select
              className={tdStyles.jumpMenu}
              onChange={(e) => {
                const el = document.getElementById(e.target.value);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <option value="">Jump to Section</option>
              <option value="todo">Todo</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className={tdStyles.boardDisplay}>
            {LANES.map(status => (
              <div
                id={status.replace(/\s+/g, '').toLowerCase()}
                key={status}
                className={tdStyles.laneWrapper}
              >
                <TDSwimlane
                  title={status}
                  tickets={tickets.filter(t => t.status === status)}
                  deleteTicket={handleDelete}
                  moveTicket={handleMove}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TDBoard;
