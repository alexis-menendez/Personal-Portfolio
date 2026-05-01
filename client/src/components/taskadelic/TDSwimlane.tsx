// File: client/src/components/taskadelic/TDSwimlane.tsx

import TDTicketCard from './TDTicketCard';
import { TicketData } from '../../interfaces/taskadelic/TDTicketData';
import { ApiMessage } from '../../interfaces/taskadelic/TDApiMessage';
import tdStyles from '../../assets/css/taskadelic/TDTaskadelic.module.css';

interface Props {
  title: string;
  tickets: TicketData[];
  deleteTicket: (id: number) => Promise<ApiMessage>;
  moveTicket: (ticket: TicketData, newStatus: string) => Promise<void>;
}

const TDSwimlane = ({ title, tickets, deleteTicket, moveTicket }: Props) => {
  const laneClass = title === 'Todo' ? tdStyles.todo : title === 'In Progress' ? tdStyles.inprogress : tdStyles.done;

  return (
    <div className={`${tdStyles.swimlane} ${tdStyles.swimLane} ${laneClass}`}>
      <h2>{title}</h2>
      {tickets.map(ticket => (
        <TDTicketCard
          key={ticket.id}
          ticket={ticket}
          currentLane={title}
          deleteTicket={deleteTicket}
          moveTicket={moveTicket}
        />
      ))}
    </div>
  );
};

export default TDSwimlane;
