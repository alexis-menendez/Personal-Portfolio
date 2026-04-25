// File: client/src/pages/taskadelic/TDEditTicket.tsx

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { retrieveTicket, updateTicket } from '../../api/taskadelic/ticketAPI';
import { retrieveUsers } from '../../api/taskadelic/userAPI';
import { TicketData } from '../../interfaces/taskadelic/TicketData';
import { UserData } from '../../interfaces/taskadelic/UserData';
import tdStyles from '../../assets/css/taskadelic/Taskadelic.module.css';

const TDEditTicket = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [ticket, setTicket] = useState<TicketData | undefined>();
  const [users,  setUsers]  = useState<UserData[]>([]);

  useEffect(() => {
    retrieveTicket(state?.id).then(setTicket).catch(console.error);
    retrieveUsers().then(setUsers).catch(console.error);
  }, []);

  const handleText = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTicket(prev => ({ ...prev!, [e.target.name]: e.target.value }));
  };

  const handleUser = (e: ChangeEvent<HTMLSelectElement>) => {
    setTicket(prev => ({ ...prev!, assignedUserId: e.target.value === '' ? null : parseInt(e.target.value) }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (ticket?.id != null) {
      updateTicket(ticket.id, ticket).then(() => navigate('/td-board'));
    }
  };

  if (!ticket) return <div className={tdStyles.container}><p>Loading...</p></div>;

  return (
    <div className={tdStyles.container}>
      <form className={tdStyles.form} onSubmit={handleSubmit}>
        <h1>Edit Ticket</h1>
        <label>Ticket Name</label>
        <textarea name="name" value={ticket.name || ''} onChange={handleText} />
        <label>Status</label>
        <select name="status" value={ticket.status || ''} onChange={handleText}>
          <option value="">Select</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <label>Description</label>
        <textarea name="description" value={ticket.description || ''} onChange={handleText} />
        <label>Assign To</label>
        <select name="assignedUserId" value={ticket.assignedUserId?.toString() || ''} onChange={handleUser}>
          <option value="">Select</option>
          {users.map(u => <option key={u.id} value={String(u.id)}>{u.username}</option>)}
        </select>
        <div style={{ marginTop: '1.5rem' }}>
          <button type="button" onClick={() => navigate('/td-board')} style={{ marginRight: '1rem' }}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default TDEditTicket;
