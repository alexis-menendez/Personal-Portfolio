// File: client/src/components/innerOrbit/pageComponents/journal/CreateJournal.tsx

import React, { useState } from 'react';

// Styles
import styles from '../../../../assets/css/innerOrbit/common/IOForm.module.css';
import buttonStyles from '../../../../assets/css/innerOrbit/common/IOButton.module.css';

interface CreateJournalProps {
  onSave: (entry: { title: string; content: string }) => void;
  onCancel: () => void;
}

const CreateJournal: React.FC<CreateJournalProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('neutral');
  const [content, setContent] = useState('');
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, content });
    setTitle('');
    setMood('neutral');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create New Journal Entry</h2>

      <input
        className={styles.input}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className={styles.input}
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={6}
      />

      <button
        type="submit"
        className={`${buttonStyles.button} ${buttonStyles.primary}`}
      >
        Save Entry
      </button>

      <button
        type="button"
        onClick={onCancel}
        className={`${buttonStyles.button} ${buttonStyles.secondary}`}
      >
        Cancel
      </button>
    </form>
  );
};

export default CreateJournal;
