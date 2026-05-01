// File: client/src/components/dontDie/HNTDEditLogModal.tsx

// ── Imports ────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/dontDie/HNTDConsole.module.css';
import type { HNTDLogEntry } from '../../api/dontDie/HNTDLogAPI';

// ── Props ──────────────────────────────────────────────────────
interface Props {
  log: HNTDLogEntry | null;
  onSave: (title: string, content: string) => Promise<void>;
  onDelete?: () => Promise<void>;
  onClose: () => void;
  transparentOverlay?: boolean;
  commanderName?: string;
}

// ── Component ──────────────────────────────────────────────────
const HNTDEditLogModal: React.FC<Props> = ({ log, onSave, onDelete, onClose, transparentOverlay, commanderName }) => {
  // ── Local state ────────────────────────────────────────────────
  const [title,   setTitle]   = useState(log?.title   ?? '');
  const [content, setContent] = useState(log?.content ?? '');
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState('');

  // ── Sync fields when the active log changes ────────────────────
  useEffect(() => {
    setTitle(log?.title ?? '');
    setContent(log?.content ?? '');
    setError('');
  }, [log]);

  // ── Save handler — validates then calls parent onSave ──────────
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

  // ── Delete handler — calls parent onDelete then closes ─────────
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

  // ── Display values — fall back gracefully if log not yet saved ─
  const displayedCommander = log?.commanderName ?? commanderName ?? '—';
  const displayedDate = log
    ? new Date(log.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className={styles.modalOverlay} style={transparentOverlay ? { background: 'transparent' } : undefined} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.modalCloseX} onClick={onClose} aria-label="Close">×</button>

        <p className={styles.modalTitle}>{log ? '// EDIT LOG ENTRY' : '// NEW LOG ENTRY'}</p>

        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.3rem' }}>
          <p style={{ fontFamily: 'Courier New', fontSize: '0.7rem', color: 'rgba(0,255,225,0.45)', margin: 0 }}>
            Commander: <span style={{ color: 'rgba(0,255,225,0.75)' }}>{displayedCommander}</span>
          </p>
          <p style={{ fontFamily: 'Courier New', fontSize: '0.7rem', color: 'rgba(0,255,225,0.45)', margin: 0 }}>
            Date: <span style={{ color: 'rgba(0,255,225,0.75)' }}>{displayedDate}</span>
          </p>
        </div>

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
