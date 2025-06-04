// File: client/src/components/tracker/MoodCalendar.tsx

import React from 'react';
import styles from '../../assets/css/tracker/Tracker.module.css';

type CalendarMoodEntry = {
  moods: { mood: string; moodColor: string }[];
};

type Props = {
  calendarDays: { date: Date; currentMonth: boolean }[];
  entriesByDate: Record<string, CalendarMoodEntry>;
  handleDayClick: (date: Date) => void;
  hideMoodText?: boolean;
};

const isDarkColor = (color: string): boolean => {
  let r, g, b;

  if (color.startsWith('#')) {
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
  } else if (color.startsWith('rgb')) {
    const rgbValues = color.match(/\d+/g);
    if (!rgbValues || rgbValues.length < 3) return false;
    r = parseInt(rgbValues[0], 10);
    g = parseInt(rgbValues[1], 10);
    b = parseInt(rgbValues[2], 10);
  } else {
    return false;
  }

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 150;
};

const MoodCalendar: React.FC<Props> = ({
  calendarDays,
  entriesByDate,
  handleDayClick,
  hideMoodText
}) => {
  const todayStr = new Date().toDateString();

  const getMoodGradient = (moods: { moodColor: string }[]) => {
    const colors = moods.map(m => m.moodColor);
    if (colors.length === 1) return colors[0];
    if (colors.length === 2)
      return `linear-gradient(180deg, ${colors[0]} 50%, ${colors[1]} 50%)`;
    if (colors.length === 3)
      return `linear-gradient(180deg, ${colors[0]} 33.33%, ${colors[1]} 33.33% 66.66%, ${colors[2]} 66.66%)`;
    return undefined;
  };

  return (
    <div className={styles.calendarGrid}>
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className={styles.dayLabel}>{day}</div>
      ))}

      {calendarDays.map(({ date, currentMonth }, index) => {
        const entry = entriesByDate[date.toDateString()];
        const cellClass = currentMonth ? styles.dayCell : `${styles.dayCell} ${styles.otherMonth}`;
        const isToday = date.toDateString() === todayStr;

        const background = entry?.moods?.length
          ? getMoodGradient(entry.moods)
          : (currentMonth ? 'rgba(76, 29, 149, 0.7)' : 'rgba(31, 41, 55, 0.5)');

        return (
          <div
            key={index}
            onClick={() => handleDayClick(date)}
            className={`${cellClass} ${isToday ? styles.today : ''}`}
            style={{
              background,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              position: 'relative',
              transition: 'all 0.3s ease-in-out',
              cursor: 'pointer',
            }}
          >
            <div className={styles.dayContent}>
              <div className={styles.dayNumber}>{date.getDate()}</div>

              <div className={styles.moodList}>
                {entry?.moods.map((m, i) => {
                  const segmentHeight =
                    entry.moods.length === 1
                      ? '0%'
                      : entry.moods.length === 2
                      ? `${i * 50}%`
                      : `${i * 33.33}%`;

                  const textColor = isDarkColor(m.moodColor) ? '#ffffff' : '#000000';

                  return (
                    <div
                      key={i}
                      className={`${styles.moodItem} ${hideMoodText ? styles.hideMoodText : ''}`}
                      style={{
                        top: segmentHeight,
                        backgroundColor: m.moodColor,
                        color: textColor,
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        transition: 'all 0.3s ease-in-out',
                        cursor: 'pointer',
                      }}
                    >
                      {m.mood}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MoodCalendar;
