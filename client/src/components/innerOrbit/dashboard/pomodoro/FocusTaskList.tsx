// File: client/src/components/innerOrbit/dashboard/pomodoro/FocusTaskList.tsx

import React, { useState } from 'react';
import { Task, useTaskStore } from '../../../../../hooks/innerOrbit/useTaskStore';
import styles from '../../../../../assets/css/innerOrbit/dashboard/PomodoroTimer.module.css';
import buttonStyles from '../../../../../assets/css/innerOrbit/common/Button.module.css';

interface FocusTaskListProps {
  onTaskAdd?: () => void; 
}

const FocusTaskList: React.FC<FocusTaskListProps> = ({ onTaskAdd }) => {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    selectedTaskId,
    selectTask,
  } = useTaskStore();

  const [newTask, setNewTask] = useState('');

  return (
    <div className={styles.taskContainer}>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
        />
        <button
          onClick={() => {
            if (newTask.trim() !== '') {
              addTask(newTask);            
              onTaskAdd?.();                
              setNewTask('');              
            }
          }}
          className={buttonStyles.add} 
        >
          Add
        </button>
      </div>

      <div className={styles.taskList}>
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`${styles.taskItem} ${selectedTaskId === task.id ? styles.selected : ''}`}
            onClick={() => selectTask(task.id)}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                toggleTask(task.id);
              }}
              className={task.done ? styles.completed : ''}
            >
              {task.text}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
              }}
              className={buttonStyles.iconButton} 
              title="Delete task"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusTaskList;
