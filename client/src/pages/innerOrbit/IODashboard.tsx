// File: client/src/pages/innerOrbit/IODashboard.tsx

// React
import React, { useState } from "react";

// Subcomponents
import WeeklyMoodReview from "../../components/innerOrbit/pageComponents/dashboard/weekly/WeeklyMoodCalendar";
import PomodoroTimer from "../../components/innerOrbit/pageComponents/dashboard/pomodoro/PomodoroTimer";
import FocusTaskList from "../../components/innerOrbit/pageComponents/dashboard/pomodoro/FocusTaskList";

// Styles
import pageStyles from "../../assets/css/innerOrbit/pageStyles/dashboard/IODashboard.module.css";


type MoodEntry = {
  id: string;
  label: string;
  date: string;
  color: string;
};

const Dashboard: React.FC = () => {
  const [weeklyMoods, setWeeklyMoods] = useState<Record<string, MoodEntry>>({});

  return (
    <div className={`flex flex-col items-center px-4 py-8 gap-8 relative z-10 ${pageStyles.dashboardPage}`}>

      {/* Weekly Mood Summary */}
      <div className="w-full cosmic-panel">
        <div className={pageStyles.subtitle}>
          <h2>Weekly Review</h2>
        </div>
        <div className={pageStyles.weeklyReviewRow}>
          <WeeklyMoodReview horizontal />
        </div>
      </div>

      {/* Focus App Panel */}
      <div className="w-full sm:w-1/2">
        <div className={pageStyles.subtitle}>
          <h2>Task Timer</h2>
        </div>
        <FocusTaskList onTaskAdd={() => {
        }} />
      </div>

      {/* Pomodoro + Break Triggers */}
      <div className="flex flex-col sm:flex-row justify-center gap-8 p-4 w-full">
        <div className="w-full sm:w-1/2">
          <PomodoroTimer
            onPomodoroStart={() => {
            }}
            onPomodoroEnd={() => {
            }}
            onBreakStart={() => {
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
