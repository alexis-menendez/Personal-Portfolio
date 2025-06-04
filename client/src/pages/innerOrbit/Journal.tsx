// File: client/src/pages/innerOrbit/Journal.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

// Auth
import { useAuth } from '../../context/authContext';

// GraphQL
import { useQuery, useMutation } from '@apollo/client';
import { GET_JOURNAL_ENTRIES } from '../../graphql/queries';
import { CREATE_JOURNAL } from '../../graphql/mutations';
import {
  getConstellationForEntryCount,
  CONSTELLATIONS,
  StarPoint,
  Constellation,
} from '../../components/innerOrbit/pageComponents/journal/ConstellationLogic';

// Components
import StarBackground from '../../components/innerOrbit/common/StarBackground';
import CreateJournal from '../../components/innerOrbit/pageComponents/journal/CreateJournal';

// Styles
import styles from '../../assets/css/innerOrbit/common/Stars.module.css';
import buttonStyles from '../../assets/css/innerOrbit/common/IOButton.module.css';

const Journal: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); 
  const [showForm, setShowForm] = useState(false);
  const [unlockedData, setUnlockedData] = useState<
    { constellation: Constellation; stars: StarPoint[]; connections: [number, number][] }[]
  >([]);

  const { data, loading, error, refetch } = useQuery(GET_JOURNAL_ENTRIES, {
    variables: { userId: user?.id },
    skip: !user,
    fetchPolicy: 'cache-and-network',
  });

  const [createJournal] = useMutation(CREATE_JOURNAL);

  useEffect(() => {
    if (!loading && data?.getJournalEntries) {
      const entryCount = data.getJournalEntries.entries.length;
      let remaining = entryCount;
      const unlocked: { constellation: Constellation; stars: StarPoint[]; connections: [number, number][] }[] = [];

      for (const constellation of CONSTELLATIONS) {
        const totalStars = constellation.stars.length;

        if (remaining >= totalStars) {
          unlocked.push({
            constellation,
            stars: constellation.stars,
            connections: constellation.connections,
          });
          remaining -= totalStars;
        } else if (remaining > 0) {
          const visibleStars = constellation.stars.slice(0, remaining);
          const visibleIndexes = new Set(visibleStars.map((_, i) => i));
          const filteredConnections = constellation.connections.filter(
            ([a, b]) => a < remaining && b < remaining
          );
          unlocked.push({
            constellation,
            stars: visibleStars,
            connections: filteredConnections,
          });
          break;
        } else {
          break;
        }
      }

      setUnlockedData(unlocked);
    }
  }, [data, loading]);

  const handleSave = async ({ title, content }: { title: string; content: string }) => {
    try {
      await createJournal({
        variables: {
          input: {
            userId: user?.id,
            title,
            content,
            mood: 'neutral',
          },
        },
      });
      await refetch();
      setShowForm(false);
    } catch (err) {
      console.error("Failed to create journal entry:", err);
    }
  };

  if (!user) return <div className={styles.sky}>Please log in to view your journal.</div>;
  if (loading) return <div className={styles.sky}>Loading...</div>;
  if (error) return <div className={styles.sky}>Error loading entries.</div>;

  return (
    <div className={styles.sky}>
      <StarBackground starCount={60} />

{!showForm && (
  <div className={buttonStyles.createButtonWrapper}>
    <button
      onClick={() => setShowForm(true)}
      className={`${buttonStyles.button} ${buttonStyles.secondary} ${buttonStyles.spaced}`}
    >
      + Create Journal Entry
    </button>
  </div>
)}

      {/* Wrap form in centered overlay */}
      {showForm && (
        <div className={styles.formOverlay}>
          <CreateJournal onSave={handleSave} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <div className={styles.gridContainer}>
        {unlockedData.map(({ constellation, stars, connections }, index) => (
          <div
            key={index}
            className={styles.gridCell}
            onClick={() =>
              navigate(`/journal/constellation/${index}`, {
                state: { entries: data.getJournalEntries.entries }
              })
            }
            style={{ cursor: 'pointer' }}
          >
            <svg
              className={styles.constellationSVG}
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="whiteGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {connections.map(([start, end], idx) => {
                const a = stars[start];
                const b = stars[end];
                if (!a || !b) return null;
                return (
                  <line
                    key={`line-${idx}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="white"
                    strokeWidth="0.3"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}

              {stars.map((star, i) => (
                <circle
                  key={`star-${i}`}
                  cx={star.x}
                  cy={star.y}
                  r={star.size ?? 1}
                  className={styles.star}
                  filter="url(#whiteGlow)"
                  style={{ 
                    pointerEvents: 'all', 
                    animationDelay: `${Math.random() * 2.5}s` }}
                />
              ))}
            </svg>
            <div className={styles.label}>
              {stars.length === constellation.stars.length ? constellation.name : "???"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
