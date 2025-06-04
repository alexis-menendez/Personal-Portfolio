// File: client/src/components/innerOrbit/pageComponents/journal/Constellation.tsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// Auth
import { useAuth } from '../../../context/authContext';

// GraphQL
import { GET_JOURNAL_ENTRIES } from '../../../graphql/queries';

// Components
import { CONSTELLATIONS } from './ConstellationLogic';
import StarBackground from '../common/StarBackground';

// Styles
import styles from '../../../../assets/css/innerOrbit/common/Stars.module.css';
import buttonStyles from '../../../../assets/css/innerOrbit/common/IOButton.module.css';


const Constellation: React.FC = () => {
  const { index } = useParams<{ index: string }>();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { user } = useAuth();
  const { data } = useQuery(GET_JOURNAL_ENTRIES, {
    variables: { userId: user?.id },
    skip: !user,
    fetchPolicy: 'cache-and-network',
  });

  const entries = data?.getJournalEntries?.entries || [];

  const constellationIndex = Number(index);
  const isValidIndex =
    index !== undefined &&
    !isNaN(constellationIndex) &&
    constellationIndex >= 0 &&
    constellationIndex < CONSTELLATIONS.length;

  if (!isValidIndex) {
    return <div className={styles.sky}>Constellation not found</div>;
  }

  const constellation = CONSTELLATIONS[constellationIndex];

  const baseEntryIndex = CONSTELLATIONS.slice(0, constellationIndex)
    .reduce((acc, c) => acc + c.stars.length, 0);

  const entriesInConstellation = entries.slice(
    baseEntryIndex,
    baseEntryIndex + constellation.stars.length
  );

  const activeStars = constellation.stars.slice(0, entriesInConstellation.length);
  const minY = Math.min(...activeStars.map(star => star.y));
  const maxY = Math.max(...activeStars.map(star => star.y));
  const viewBoxTop = Math.max(0, minY - 20); // Extra top padding
  const viewBoxHeight = Math.ceil(maxY - viewBoxTop + 10);

  return (
    <div className={styles.sky}>
      <StarBackground starCount={80} />

      {/* Title and Back Button */}
      <div className="w-full flex flex-col items-center pt-10">
        <div className={`${buttonStyles.createButtonWrapper} z-10`}>
          <button
            onClick={() => navigate(-1)}
            className={`${buttonStyles.button} ${buttonStyles.secondary} ${buttonStyles.spaced}`}
          >
            ← Back to Galaxy
          </button>
        </div>
        <h2 style={{ color: 'white', textAlign: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
          {entriesInConstellation.length === constellation.stars.length ? constellation.name : '???'}
        </h2>
      </div>

      {/* SVG Constellation */}
      <div className="flex flex-col items-center w-full min-h-[calc(100vh-6rem)] px-4 pb-10 relative z-0">
        <svg
          className={styles.constellationSVG}
          viewBox={`0 ${viewBoxTop} 100 ${viewBoxHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="blueGlow" x="-75%" y="-75%" width="300%" height="300%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
              <feFlood flood-color="#3b82f6" flood-opacity="1" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="whiteGlow" x="-75%" y="-75%" width="300%" height="300%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
              <feFlood flood-color="white" flood-opacity="0.8" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {constellation.connections.map(([start, end], idx) => {
            if (
              start < entriesInConstellation.length &&
              end < entriesInConstellation.length
            ) {
              const a = constellation.stars[start];
              const b = constellation.stars[end];
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
            }
            return null;
          })}

          {entriesInConstellation.map((entry: { title: string }, i: number) => {
            const star = constellation.stars[i];
            return (
              <g key={`star-group-${i}`}>
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={star.size ?? 1}
                  className={`${styles.star} ${hoveredIndex === i ? styles['star-hover'] : ''}`}
                  filter={hoveredIndex === i ? 'url(#blueGlow)' : 'url(#whiteGlow)'}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => navigate(`/journal/entry/${index}-${i}`)}
                  style={{
                    pointerEvents: 'all',
                    animationDelay: `${Math.random() * 2.5}s`,
                  }}
                />
              </g>
            );
          })}

          {hoveredIndex !== null && (() => {
            const star = constellation.stars[hoveredIndex];
            const entry = entriesInConstellation[hoveredIndex];
            return (
              <foreignObject
                x={Math.min(star.x + 1, 85)}
                y={Math.max(star.y - 5, 0)}
                width={40}
                height={80}
                style={{ overflow: 'visible', pointerEvents: 'none' }}
              >
                <div
                  style={{
                    fontSize: '4px',
                    color: 'white',
                    background: 'rgba(60, 20, 80, 0.9)',
                    padding: '1px 2px',
                    borderRadius: '0.5vw',
                    wordWrap: 'break-word',
                    maxWidth: '50%',
                    lineHeight: '1.2',
                    zIndex: 10,
                    position: 'relative',
                  }}
                >
                  {entry.title}
                </div>
              </foreignObject>
            );
          })()}
        </svg>
      </div>
    </div>
  );
};

export default Constellation;
