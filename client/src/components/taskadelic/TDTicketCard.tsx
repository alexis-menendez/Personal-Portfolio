// File: client/src/components/taskadelic/TDTicketCard.tsx

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TicketData } from '../../interfaces/taskadelic/TDTicketData';
import { ApiMessage } from '../../interfaces/taskadelic/TDApiMessage';
import { MouseEventHandler } from 'react';
import tdStyles from '../../assets/css/taskadelic/TDTaskadelic.module.css';

const ALL_LANES = ['Todo', 'In Progress', 'Done'];

interface Props {
  ticket: TicketData;
  currentLane: string;
  deleteTicket: (id: number) => Promise<ApiMessage>;
  moveTicket: (ticket: TicketData, newStatus: string) => Promise<void>;
}

const TDTicketCard = ({ ticket, currentLane, deleteTicket, moveTicket }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [confirmLane, setConfirmLane]   = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const otherLanes = ALL_LANES.filter(l => l !== currentLane);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const id = Number(e.currentTarget.value);
    if (!isNaN(id)) await deleteTicket(id);
  };

  const handleConfirmMove = async () => {
    if (confirmLane) {
      await moveTicket(ticket, confirmLane);
      setConfirmLane(null);
    }
  };

  return (
    <>
      <div className={tdStyles.ticketCard}>
        <h3>{ticket.name}</h3>
        <p>{ticket.description}</p>
        <p>{ticket.assignedUser?.username}</p>
        <div className={tdStyles.ticketActions}>
          <Link to="/td-edit" state={{ id: ticket.id }} className={tdStyles.editBtn}>Edit</Link>
          <button type="button" value={String(ticket.id)} onClick={handleDelete} className={tdStyles.deleteBtn}>Delete</button>

          {/* Move button + dropdown */}
          <div className={tdStyles.moveWrapper} ref={dropdownRef}>
            <button
              type="button"
              className={tdStyles.moveBtn}
              onClick={() => setDropdownOpen(prev => !prev)}
            >
              Move
            </button>
            {dropdownOpen && (
              <div className={tdStyles.moveDropdown}>
                {otherLanes.map(lane => (
                  <button
                    key={lane}
                    type="button"
                    className={tdStyles.moveDropdownItem}
                    onClick={() => { setConfirmLane(lane); setDropdownOpen(false); }}
                  >
                    {lane}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      {confirmLane && (
        <div className={tdStyles.moveModalOverlay} onClick={() => setConfirmLane(null)}>
          <div className={tdStyles.moveModalBox} onClick={e => e.stopPropagation()}>
            <p>Move to &ldquo;{confirmLane}&rdquo;?</p>
            <div className={tdStyles.moveModalButtons}>
              <button type="button" className={tdStyles.moveModalYes} onClick={handleConfirmMove}>Yes</button>
              <button type="button" className={tdStyles.moveModalNo}  onClick={() => setConfirmLane(null)}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TDTicketCard;
