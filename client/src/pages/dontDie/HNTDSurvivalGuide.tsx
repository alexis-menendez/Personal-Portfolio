// File: client/src/pages/dontDie/HNTDSurvivalGuide.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { useHNTDAuth } from '../../context/HNTDAuthContext';
import HNTDNavigation from '../../components/dontDie/HNTDNavigation';
import HNTDEditLogModal from '../../components/dontDie/HNTDEditLogModal';
import ReturnToPortfolio from '../../components/innerOrbit/common/ReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDConsole.module.css';
import { fetchTips, createTip, voteTip, deleteTip } from '../../api/dontDie/HNTDSurvivalAPI';
import type { HNTDTip } from '../../api/dontDie/HNTDSurvivalAPI';

const HNTDSurvivalGuide: React.FC = () => {
  const { token, user } = useHNTDAuth();
  const [tips,       setTips]       = useState<HNTDTip[]>([]);
  const [votedIds,   setVotedIds]   = useState<Set<number>>(new Set());
  const [loading,    setLoading]    = useState(true);
  const [modalOpen,  setModalOpen]  = useState(false);

  const loadTips = useCallback(async () => {
    try {
      const data = await fetchTips();
      setTips(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTips(); }, [loadTips]);

  const handleSaveTip = async (title: string, content: string) => {
    if (!token) return;
    const created = await createTip(token, title, content);
    setTips(prev => [created, ...prev]);
  };

  const handleVote = async (id: number) => {
    if (!token) return;
    const { upvotes, voted } = await voteTip(token, id);
    setTips(prev => prev.map(t => t.id === id ? { ...t, upvotes } : t));
    setVotedIds(prev => {
      const next = new Set(prev);
      voted ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    await deleteTip(token, id);
    setTips(prev => prev.filter(t => t.id !== id));
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

          <div className={styles.survivalPageContent}>
            <div className={styles.logsHeader}>
              <p className={styles.logsTitle}>// SURVIVAL GUIDE</p>
              <button className={styles.newLogBtn} onClick={() => setModalOpen(true)}>+ Submit Tip</button>
            </div>

            {loading ? (
              <p className={styles.emptyLogs}>Retrieving field data...</p>
            ) : tips.length === 0 ? (
              <p className={styles.emptyLogs}>
                No survival tips logged yet.<br />
                Be the first to contribute, Commander.
              </p>
            ) : (
              <div className={styles.logsList}>
                {tips.map(tip => (
                  <div key={tip.id} className={styles.tipCard}>
                    <div className={styles.tipVote}>
                      <button
                        className={`${styles.tipVoteBtn} ${votedIds.has(tip.id) ? styles.tipVoteBtnActive : ''}`}
                        onClick={() => handleVote(tip.id)}
                        title={votedIds.has(tip.id) ? 'Remove vote' : 'Upvote'}
                      >
                        ▲
                      </button>
                      <span className={styles.tipVoteCount}>{tip.upvotes}</span>
                    </div>

                    <div className={styles.tipBody}>
                      <p className={styles.tipTitle}>{tip.title}</p>
                      <p className={styles.tipContent}>{tip.content}</p>
                      <p className={styles.tipMeta}>
                        {tip.username} · {formatDate(tip.createdAt)}
                      </p>
                    </div>

                    {user?.id === tip.userId && (
                      <button
                        className={styles.tipDeleteBtn}
                        onClick={() => handleDelete(tip.id)}
                        title="Delete"
                      >
                        [x]
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {modalOpen && (
        <HNTDEditLogModal
          log={null}
          onSave={handleSaveTip}
          onClose={() => setModalOpen(false)}
        />
      )}

      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDSurvivalGuide;
