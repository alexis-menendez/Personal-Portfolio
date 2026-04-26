// File: client/src/pages/dontDie/HNTDPersonalLogs.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { useHNTDAuth } from '../../context/HNTDAuthContext';
import HNTDNavigation from '../../components/dontDie/HNTDNavigation';
import HNTDEditLogModal from '../../components/dontDie/HNTDEditLogModal';
import ReturnToPortfolio from '../../components/innerOrbit/common/ReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDConsole.module.css';
import { fetchLogs, createLog, updateLog, deleteLog } from '../../api/dontDie/HNTDLogAPI';
import type { HNTDLogEntry } from '../../api/dontDie/HNTDLogAPI';

const HNTDPersonalLogs: React.FC = () => {
  const { token } = useHNTDAuth();
  const [logs,        setLogs]        = useState<HNTDLogEntry[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [activeLog,   setActiveLog]   = useState<HNTDLogEntry | null>(null);

  const loadLogs = useCallback(async () => {
    if (!token) return;
    try {
      const data = await fetchLogs(token);
      setLogs(data);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { loadLogs(); }, [loadLogs]);

  const openNew  = () => { setActiveLog(null); setModalOpen(true); };
  const openEdit = (log: HNTDLogEntry) => { setActiveLog(log); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  const handleSave = async (title: string, content: string) => {
    if (!token) return;
    if (activeLog) {
      const updated = await updateLog(token, activeLog.id, title, content);
      setLogs(prev => prev.map(l => (l.id === updated.id ? updated : l)));
    } else {
      const created = await createLog(token, title, content);
      setLogs(prev => [created, ...prev]);
    }
  };

  const handleDelete = async () => {
    if (!token || !activeLog) return;
    await deleteLog(token, activeLog.id);
    setLogs(prev => prev.filter(l => l.id !== activeLog.id));
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className={styles.consoleBackground}>
      <div className={styles.consoleScreen}>
        <div className={styles.consoleContent}>

          <div className={styles.navColumn}>
            <HNTDNavigation />
          </div>

          <div className={styles.logsPageContent}>
            <div className={styles.logsHeader}>
              <p className={styles.logsTitle}>// PERSONAL LOGS</p>
              <button className={styles.newLogBtn} onClick={openNew}>+ New Entry</button>
            </div>

            {loading ? (
              <p className={styles.emptyLogs}>Loading transmissions...</p>
            ) : logs.length === 0 ? (
              <p className={styles.emptyLogs}>
                No log entries found.<br />
                Begin recording, Commander.
              </p>
            ) : (
              <div className={styles.logsList}>
                {logs.map(log => (
                  <div key={log.id} className={styles.logCard} onClick={() => openEdit(log)}>
                    <p className={styles.logCardTitle}>{log.title}</p>
                    <p className={styles.logCardMeta}>{formatDate(log.createdAt)}</p>
                    <p className={styles.logCardSnippet}>{log.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {modalOpen && (
        <HNTDEditLogModal
          log={activeLog}
          onSave={handleSave}
          onDelete={activeLog ? handleDelete : undefined}
          onClose={closeModal}
        />
      )}

      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDPersonalLogs;
