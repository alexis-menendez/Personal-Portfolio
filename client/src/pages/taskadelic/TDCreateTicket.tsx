// File: client/src/pages/taskadelic/TDCreateTicket.tsx

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../../api/taskadelic/ticketAPI';
import { retrieveUsers } from '../../api/taskadelic/userAPI';
import { TicketData } from '../../interfaces/taskadelic/TicketData';
import { UserData } from '../../interfaces/taskadelic/UserData';
import tdStyles from '../../assets/css/taskadelic/Taskadelic.module.css';

const TDCreateTicket = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([]);
  const [ticket, setTicket] = useState<TicketData>({
    id: 0, name: '', description: '', status: '', assignedUserId: null, assignedUser: null,
  });

  useEffect(() => { retrieveUsers().then(setUsers).catch(console.error); }, []);

  const handleText = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTicket(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUser = (e: ChangeEvent<HTMLSelectElement>) => {
    setTicket(prev => ({ ...prev, assignedUserId: e.target.value === '' ? null : parseInt(e.target.value) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!ticket.name || !ticket.description || !ticket.status || !ticket.assignedUserId) {
      alert('Please complete all fields.'); return;
    }
    await createTicket(ticket);
    navigate('/td-board');
  };

  return (
    <div className={tdStyles.container}>
      <form className={tdStyles.form} onSubmit={handleSubmit}>
        <h1>Create Ticket</h1>
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
          <button type="submit" style={{ marginRight: '1rem' }}>Create</button>
          <button type="button" onClick={() => navigate('/td-board')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TDCreateTicket;
