// File: client/src/components/taskadelic/TDSwimlane.tsx

import TDTicketCard from './TDTicketCard';
import { TicketData } from '../../interfaces/taskadelic/TicketData';
import { ApiMessage } from '../../interfaces/taskadelic/ApiMessage';
import tdStyles from '../../assets/css/taskadelic/Taskadelic.module.css';

interface Props {
  title: string;
  tickets: TicketData[];
  deleteTicket: (id: number) => Promise<ApiMessage>;
}

const TDSwimlane = ({ title, tickets, deleteTicket }: Props) => {
  const laneClass = title === 'Todo' ? tdStyles.todo : title === 'In Progress' ? tdStyles.inprogress : tdStyles.done;

  return (
    <div className={`${tdStyles.swimlane} ${tdStyles.swimLane} ${laneClass}`}>
      <h2>{title}</h2>
      {tickets.map(ticket => (
        <TDTicketCard key={ticket.id} ticket={ticket} deleteTicket={deleteTicket} />
      ))}
    </div>
  );
};

export default TDSwimlane;
