// File: client/src/components/dontDie/HNTDEditLogModal.tsx

import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/dontDie/HNTDConsole.module.css';
import type { HNTDLogEntry } from '../../api/dontDie/HNTDLogAPI';

interface Props {
  log: HNTDLogEntry | null;
  onSave: (title: string, content: string) => Promise<void>;
  onDelete?: () => Promise<void>;
  onClose: () => void;
}

const HNTDEditLogModal: React.FC<Props> = ({ log, onSave, onDelete, onClose }) => {
  const [title,   setTitle]   = useState(log?.title   ?? '');
  const [content, setContent] = useState(log?.content ?? '');
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState('');

  useEffect(() => {
    setTitle(log?.title ?? '');
    setContent(log?.content ?? '');
    setError('');
  }, [log]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) { setError('Title and content are required.'); return; }
    setSaving(true);
    try {
      await onSave(title.trim(), content.trim());
      onClose();
    } catch (err: any) {
      setError(err.message ?? 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    setSaving(true);
    try {
      await onDelete();
      onClose();
    } catch (err: any) {
      setError(err.message ?? 'Delete failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.modalCloseX} onClick={onClose} aria-label="Close">×</button>

        <p className={styles.modalTitle}>{log ? '// EDIT LOG ENTRY' : '// NEW LOG ENTRY'}</p>

        <input
          className={styles.modalInput}
          placeholder="Entry title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className={styles.modalTextarea}
          placeholder="Log content..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        {error && <p className={styles.authError}>{error}</p>}

        <div className={styles.modalActions}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className={styles.modalSaveBtn} onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : '[ Save ]'}
            </button>
            <button className={styles.modalCancelBtn} onClick={onClose}>Cancel</button>
          </div>
          {log && onDelete && (
            <button className={styles.modalDeleteBtn} onClick={handleDelete} disabled={saving}>
              [ Delete ]
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HNTDEditLogModal;
