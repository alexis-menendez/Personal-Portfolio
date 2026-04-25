// File: client/src/components/taskadelic/TDTicketCard.tsx

import { Link } from 'react-router-dom';
import { TicketData } from '../../interfaces/taskadelic/TicketData';
import { ApiMessage } from '../../interfaces/taskadelic/ApiMessage';
import { MouseEventHandler } from 'react';
import tdStyles from '../../assets/css/taskadelic/Taskadelic.module.css';

interface Props {
  ticket: TicketData;
  deleteTicket: (id: number) => Promise<ApiMessage>;
}

const TDTicketCard = ({ ticket, deleteTicket }: Props) => {
  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const id = Number(e.currentTarget.value);
    if (!isNaN(id)) await deleteTicket(id);
  };

  return (
    <div className={tdStyles.ticketCard}>
      <h3>{ticket.name}</h3>
      <p>{ticket.description}</p>
      <p>{ticket.assignedUser?.username}</p>
      <Link to="/td-edit" state={{ id: ticket.id }} className={tdStyles.editBtn}>Edit</Link>
      <button type="button" value={String(ticket.id)} onClick={handleDelete} className={tdStyles.deleteBtn}>Delete</button>
    </div>
  );
};

export default TDTicketCard;
