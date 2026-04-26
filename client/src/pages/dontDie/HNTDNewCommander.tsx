// File: client/src/pages/dontDie/HNTDNewCommander.tsx

import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useHNTDAuth } from '../../context/HNTDAuthContext';
import { useHNTDPlanets } from '../../context/HNTDPlanetContext';
import type { DeathCause, SurvivalEntry } from '../../context/HNTDPlanetContext';
import { renameHNTD } from '../../api/dontDie/HNTDAuthAPI';
import styles from '../../assets/css/dontDie/HNTDConsole.module.css';

// ── Death-specific survival entries ────────────────────────────
function buildDeathEntry(cause: DeathCause, planetKey: string): SurvivalEntry {
  if (cause === 'suit' && planetKey === 'planetone') {
    return {
      planet: 'Doubt',
      title: 'Suit Breach — Lessons From the Field',
      content: "A suit breach on Doubt’s crystalline terrain is survivable if caught early. It is not survivable if the explorer continues moving through the formation after the breach is detected.\n\nThe patch kit in the left thigh compartment exists for this scenario. Explorers are advised to check patch kit contents before departure. Do not assume the kit is stocked.\n\nThis entry was added following a confirmed fatality on Doubt. The details are on file. The lesson is above.",
      author: 'Safety Division, Sector 9', date: 'Year 4, Cycle 08', category: 'hazard',
    };
  }
  if (cause === 'battery') {
    return {
      planet: 'General',
      title: 'Suit Power Management — HUD Monitoring Compliance',
      content: "Battery depletion fatalities are entirely preventable. The HUD displays suit power levels in real time. The threshold warning activates at 20%. The critical warning activates at 10%.\n\nExplorers who do not return to the ship before power reaches zero do not make it back.\n\nThis entry was added following a confirmed fatality attributable to battery neglect. The explorer's HUD logs confirm warnings were active and visible for the final 22 minutes of the mission. The company is not liable.",
      author: 'Safety Division, Sector 9', date: 'Year 4, Cycle 09', category: 'hazard',
    };
  }
  // Default: oxygen depletion
  return {
    planet: 'General',
    title: 'Oxygen Management — HUD Monitoring Compliance',
    content: 'Oxygen depletion fatalities are entirely preventable. The HUD displays oxygen reserve levels in real time. The warning activates at 20%. At that point, an explorer at standard distance from the ship has approximately 12 minutes to return.\n\nExplorers who disregard these indicators do not make it back.\n\nThis entry was added following a confirmed fatality attributable to oxygen neglect. HUD logs confirm the explorer was warned. The company is not liable.',
    author: 'Safety Division, Sector 9', date: 'Year 4, Cycle 10', category: 'hazard',
  };
}

// ── Modified welcome letter ─────────────────────────────────────
function buildWelcomeLetter(cause: DeathCause, _planetKey: string): string {
  const causeNote =
    cause === 'suit'
      ? `As you may be aware, your predecessor was recently lost on Doubt following an unrecoverable suit breach. The incident occurred in a crystalline terrain zone. The prior commander failed to follow protocol and did not maintain their suit — specifically, they failed to ensure the standard-issue patch kit was stocked and ready for use. The kit was found empty. This has been logged as explorer error.`
    : cause === 'battery'
      ? `As you may be aware, your predecessor was recently lost during a surface mission. Cause of death: suit power failure. The prior commander failed to follow protocol by neglecting to monitor battery reserves and return to the ship before power depleted. HUD warnings were active and visible throughout the final 22 minutes of the mission. This has been logged as explorer error.`
      : `As you may be aware, your predecessor was recently lost during a surface mission. Cause of death: oxygen depletion. The prior commander failed to follow protocol by neglecting to monitor oxygen reserves and return to the ship before depletion. O2 warnings were active and visible throughout the final minutes. This has been logged as explorer error.`;

  return `Greetings, Explorer!

Welcome to Tö'tahli Naut Dy-in™ — where we aim, shoot, and occasionally hit the stars!

${causeNote}

We want to assure you that the company takes all explorer safety incidents very seriously, and has conducted a thorough internal review. The review concluded that all equipment and systems performed within acceptable parameters. All responsibility rests with the prior commander. The mission continues.

Your mission is to document flora, fauna, glowing things of indeterminate danger, and — should you encounter locals — practice your best non-hostile wave. Your findings will be added to the Survival Guide used by future and fellow explorers.

To aid you on your mission you've been equipped with a refurbished shuttle and our flagship AI companion, VERA: the Voyager Environmental Response Algorithm. VERA has been optimized to assist you in your mission.

So strap in, Commander. The galaxy awaits!

— — — — — — — — — — — — — — — — — — — — — —

DISCLAIMER & WAIVER OF LIABILITY

By proceeding, you acknowledge and agree that Tö'tahli Naut Dy-in™ (hereinafter "the Company") is not liable for any and all harm, injury, loss of life, suit breach, oxygen depletion, battery failure, gravitational anomaly, pre-colony structure interaction, glowing thing contact, VERA-related incident, patch kit inadequacy, or outcomes of any nature and from any cause, including but not limited to causes not yet classified. You accept full and sole responsibility for your own survival.

The Company wishes you every success.`;
}

// ── Component ──────────────────────────────────────────────────
type Phase = 'rename' | 'letter' | 'done';

const HNTDNewCommander: React.FC = () => {
  const navigate               = useNavigate();
  const location               = useLocation();
  const { user, token, updateUser } = useHNTDAuth();
  const { addDeathEntry, markNewCharacter } = useHNTDPlanets();

  const state      = (location.state as { deathCause?: DeathCause; planetKey?: string } | null) ?? {};
  const deathCause: DeathCause = state.deathCause ?? 'oxygen';
  const planetKey               = state.planetKey  ?? '';

  const [phase,     setPhase]     = useState<Phase>('rename');
  const [newName,   setNewName]   = useState('');
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);

  // Add death entry to survival guide on mount
  useEffect(() => {
    addDeathEntry(buildDeathEntry(deathCause, planetKey));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRename = async (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) { setError('Please enter a commander name.'); return; }
    if (!token) { setError('Session expired. Please log in again.'); return; }
    setLoading(true);
    setError('');
    try {
      const data = await renameHNTD(token, newName.trim());
      updateUser(data.user, data.token);
      markNewCharacter();
      // Reset the dashboard first-visit flag so the "first time here" VERA dialogue fires again
      localStorage.removeItem(`hntd_first_visit_${data.user.username}`);
      setPhase('letter');
    } catch (err: any) {
      setError(err.message || 'Failed to register new commander.');
    } finally {
      setLoading(false);
    }
  };

  const welcomeLetter = buildWelcomeLetter(deathCause, planetKey);

  if (phase === 'rename') {
    return (
      <div className={styles.consoleBackground}>
        <div className={styles.consoleScreen}>
          <div className={styles.authContainer}>
            <p className={styles.authTitle}>// NEW COMMANDER REGISTRATION</p>
            <p style={{ fontFamily: 'Courier New', fontSize: 'clamp(0.6rem, 1.2vmin, 0.75rem)', color: 'rgba(0,255,225,0.55)', marginBottom: '0.8rem', textAlign: 'center', maxWidth: '300px' }}>
              A replacement explorer has been assigned. Enter a character name for your new commander. Your login credentials remain unchanged.
            </p>
            <form onSubmit={handleRename} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
              <input
                className={styles.authInput}
                type="text"
                placeholder="NEW COMMANDER NAME"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                required
                disabled={loading}
              />
              {error && <p className={styles.authError}>{error}</p>}
              <button className={styles.authBtn} type="submit" disabled={loading}>
                {loading ? '> PROCESSING...' : '> REGISTER COMMANDER'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'letter') {
    return (
      <div className={styles.consoleBackground}>
        <div className={styles.consoleScreen}>
          <div className={styles.authContainer}>
            <p className={styles.authTitle}>// WELCOME, COMMANDER {(user?.username ?? newName).toUpperCase()}</p>
            <div style={{
              maxWidth: '340px', textAlign: 'left',
              fontFamily: 'Courier New', fontSize: 'clamp(0.58rem, 1.2vmin, 0.75rem)',
              color: '#00ffe1', lineHeight: 1.7, whiteSpace: 'pre-line',
              overflowY: 'auto', maxHeight: '52%',
            }}>
              {welcomeLetter}
            </div>
            <button className={styles.authBtn} style={{ marginTop: '0.8rem' }}
              onClick={() => navigate('/hntd-dashboard')}>
              &gt; ENTER THE SHIP TERMINAL
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default HNTDNewCommander;
