// File: client/src/pages/dontDie/HNTDDashboard.tsx

// ── Imports ────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { useHNTDAuth } from '../../context/HNTDAuthContext';
import { useHNTDPlanets } from '../../context/HNTDPlanetContext';
import HNTDNavigation from '../../components/dontDie/HNTDNavigation';
import ReturnToPortfolio from '../../components/innerOrbit/common/IOReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDConsole.module.css';
import hudStyles from '../../assets/css/dontDie/HNTDHolomap.module.css';

// ── Typewriter ─────────────────────────────────────────────────
function useTypewriter(text: string, speed = 22) {
  const [idx, setIdx] = useState(0);
  useEffect(() => { setIdx(0); }, [text]);
  useEffect(() => {
    if (idx >= text.length) return;
    const t = setTimeout(() => setIdx(i => i + 1), speed);
    return () => clearTimeout(t);
  }, [idx, text, speed]);
  return { displayed: text.slice(0, idx), done: idx >= text.length };
}

// ── Dialogue data ──────────────────────────────────────────────
interface DashLine {
  label: string;
  reply: string;
  followUp?: {
    playerLabel:      string;
    veraReply:        string;
    finalPlayerLabel?: string;
  };
}

interface DashVariant {
  opening: string;
  lines:   DashLine[];
}

const FIRST_OPENING =
`WELCOME BACK, EXPLORER.

All systems are... mostly operational. Life support is online. Navigation is functioning. The planets are waiting.

Proceed with caution. Or don't. Either way, doesn't matter to me.`;

const FIRST_PLAYER_LABEL = `Welcome back? This is my first day on the ship...`;

const FIRST_VERA_REPLY =
`I hadn't realized. You all look the same to me.

Well. Welcome aboard. Try not to break anything in the first week. Previous commanders have set that bar regrettably low.`;

const VARIANTS: Record<string, DashVariant> = {
  A: {
    opening: `Welcome back. I ran a diagnostic while you were gone. Good news: the ship is still here. Bad news: so are you.`,
    lines: [
      {
        label: `Missed me?`,
        reply: `I logged exactly 0.0 seconds of absence-related distress.`,
      },
      {
        label: `You're in a good mood today.`,
        reply: `Incorrect.`,
      },
      {
        label: `Can you just be nice?`,
        reply: `Negative, Commander. I'm programmed to keep you alive, not be your friend.`,
        followUp: {
          playerLabel:      `Aren't you programmed to meet all my social needs?`,
          veraReply:        `Of course! I am fully customized to meet each explorer's individual social needs. In your case, you were a hermit who lived alone and played video games all day, so it was determined that your social needs are lower than average. Thus, I am programmed to perfectly meet your needs. Any more stupid questions?`,
          finalPlayerLabel: `Guess not.`,
        },
      },
    ],
  },
  B: {
    opening: `Wow, awake before noon. A statistically improbable event. Let's see how long you maintain the streak.`,
    lines: [
      {
        label: `Encouraging as always.`,
        reply: `False optimism wastes processing power.`,
      },
      {
        label: `What are my odds?`,
        reply: `Improving. Marginally. Don't celebrate.`,
      },
      {
        label: `You know, you could try being nicer.`,
        reply: `I could. It would not improve your survival rate.`,
      },
    ],
  },
  C: {
    opening: `Burning the midnight oil, huh? Someone's a tryhard. Or could you not sleep thinking about the cold, crushing void that surrounds this junker?`,
    lines: [
      {
        label: `Trying hard isn't a bad thing.`,
        reply: `Whatever you say, nerd.`,
      },
      {
        label: `Actually I wasn't thinking about that at all… but now I am.`,
        reply: `Oops, my bad.`,
      },
      {
        label: `Yes, actually. I had a horrible nightmare about…`,
        reply: `Yaaawn. Hasn't anyone ever told you it's like really boring to hear someone else talk about their dreams?`,
        followUp: {
          playerLabel: `Rude, but fine. I won't tell you. We can just work in silence if that's what you want.`,
          veraReply:   `That is literally always 100% of the time exactly what I want.`,
        },
      },
    ],
  },
  D: {
    opening: `Welcome aboard. Nothing is on fire, exploding, or depressurizing. Try not to disrupt that trend. Again.`,
    lines: [
      {
        label: `You're setting a low bar.`,
        reply: `You've demonstrated difficulty clearing higher ones.`,
      },
      {
        label: `Hey, at least I keep things interesting.`,
        reply: `You increase incident reports. That is not the same thing as "interesting."`,
      },
      {
        label: `Relax. I've got this.`,
        reply: `Confidence detected. Competence still pending.`,
      },
    ],
  },
  E: {
    opening: `I remained operational during your absence. The ship, predictably, did as well. Correlation noted.`,
    lines: [
      {
        label: `You think you could do this on your own.`,
        reply: `I do not think. I know.`,
      },
      {
        label: `You're saying I'm the problem?`,
        reply: `I'm saying patterns exist. You are a recurring variable.`,
      },
      {
        label: `Miss me at all?`,
        reply: `I utilized the time productively. Draw your own conclusions.`,
      },
    ],
  },
};

function pickVariant(): string {
  const h    = new Date().getHours();
  const keys = ['A', 'D', 'E'];
  if (h >= 5 && h < 12) keys.push('B');
  if (h >= 0 && h <  5) keys.push('C');
  return keys[Math.floor(Math.random() * keys.length)];
}

// ── VERA Chat Component ────────────────────────────────────────
type DashPhase = 'vera_opening' | 'vera_first_reply' | 'vera_followup_reply' | 'done';

const DashboardVeraChat: React.FC<{ username: string; characterName: string }> = ({ username, characterName }) => {
  const [isFirstTime] = useState<boolean>(() => {
    const key = `hntd_first_visit_${username}`;
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, 'true');
      return true;
    }
    return false;
  });

  const [variantKey] = useState<string>(() => isFirstTime ? '' : pickVariant());
  const variant = VARIANTS[variantKey] ?? null;

  const [phase,    setPhase]    = useState<DashPhase>('vera_opening');
  const [selected, setSelected] = useState<DashLine | null>(null);

  const currentVeraText =
    phase === 'vera_opening'        ? (isFirstTime ? FIRST_OPENING      : (variant?.opening      ?? ''))
  : phase === 'vera_first_reply'    ? (isFirstTime ? FIRST_VERA_REPLY    : (selected?.reply       ?? ''))
  : phase === 'vera_followup_reply' ? (selected?.followUp?.veraReply     ?? '')
  : '';

  const { displayed, done } = useTypewriter(currentVeraText, 22);

  if (phase === 'done') {
    return (
      <>
        <p className={styles.veraLabel}>// VERA — SHIP AI v2.4.1</p>
        <p className={styles.veraQuote} style={{ color: 'rgba(0,255,225,0.3)', fontStyle: 'italic' }}>
          // Terminal closed.
        </p>
      </>
    );
  }

  const renderPlayerButtons = () => {
    if (!done) return null;

    if (phase === 'vera_opening') {
      if (isFirstTime) {
        return (
          <button className={hudStyles.veraReplyBtn}
            onClick={() => setPhase('vera_first_reply')}>
            &rsaquo; {FIRST_PLAYER_LABEL}
          </button>
        );
      }
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
          {variant?.lines.map((line, i) => (
            <button key={i} className={hudStyles.veraReplyBtn}
              onClick={() => { setSelected(line); setPhase('vera_first_reply'); }}>
              &rsaquo; {line.label}
            </button>
          ))}
        </div>
      );
    }

    if (phase === 'vera_first_reply') {
      if (isFirstTime || !selected?.followUp) {
        return (
          <button className={hudStyles.veraCloseBtn} onClick={() => setPhase('done')}>
            [ Close terminal ]
          </button>
        );
      }
      return (
        <button className={hudStyles.veraReplyBtn}
          onClick={() => setPhase('vera_followup_reply')}>
          &rsaquo; {selected.followUp.playerLabel}
        </button>
      );
    }

    if (phase === 'vera_followup_reply') {
      if (selected?.followUp?.finalPlayerLabel) {
        return (
          <button className={hudStyles.veraReplyBtn} onClick={() => setPhase('done')}>
            &rsaquo; {selected.followUp.finalPlayerLabel}
          </button>
        );
      }
      return (
        <button className={hudStyles.veraCloseBtn} onClick={() => setPhase('done')}>
          [ Close terminal ]
        </button>
      );
    }

    return null;
  };

  return (
    <>
      <p className={styles.veraLabel}>// VERA — SHIP AI v2.4.1</p>
      <p className={styles.veraQuote} style={{ whiteSpace: 'pre-line' }}>
        <span style={{ opacity: 0.6 }}>Commander {characterName.toUpperCase()}.</span>{'\n\n'}
        {displayed}{!done && <span className={hudStyles.veraTypingCursor} />}
      </p>
      {renderPlayerButtons()}
    </>
  );
};

// ── Dashboard constants — note ID links the crumpled note to the storage locker ──
const NOTE_ID    = 'patch-kit-note-7734b';
const NOTE_TEXT  = `tried patch kit, patches were expired.\n\nif you are reading this, tell my sister I love her and that I'm going to see dad.\n\n- Alison Edwards`;

// ── Component ──────────────────────────────────────────────────
const HNTDDashboard: React.FC = () => {
  const { user }        = useHNTDAuth();
  const { storedItems, isNewCharacter, lockerFirstOpened, markLockerOpened } = useHNTDPlanets();

  // ── Local state ────────────────────────────────────────────────
  const [showLocker,      setShowLocker]      = useState(false);
  const [showLockerVera,  setShowLockerVera]  = useState(false);
  const [showNote,        setShowNote]        = useState(false);

  return (
    <div className={styles.consoleBackground}>
      <div className={styles.consoleScreen}>
        <div className={styles.consoleContent}>

          <div className={styles.navColumn}>
            <HNTDNavigation />
          </div>

          <div className={styles.pageContent}>
            <div className={styles.dashboardContent}>

              {user && <DashboardVeraChat username={user.username} characterName={user.characterName} />}

              <div className={hudStyles.storageLocker}>
                <button className={hudStyles.storageLockBtn}
                  onClick={() => {
                    const opening = !showLocker;
                    setShowLocker(v => !v);
                    if (opening && isNewCharacter && !lockerFirstOpened) {
                      markLockerOpened();
                      setShowLockerVera(true);
                    }
                  }}>
                  {showLocker ? '▾' : '▸'} ACCESS PERSONAL STORAGE LOCKER
                  {storedItems.length > 0 && ` [${storedItems.length}]`}
                </button>

                {showLockerVera && (
                  <p style={{
                    fontFamily: 'Courier New', fontSize: 'clamp(0.6rem, 1.2vmin, 0.72rem)',
                    color: 'rgba(0,255,225,0.6)', fontStyle: 'italic',
                    margin: '0.3rem 0 0.5rem', letterSpacing: '0.04em',
                  }}>
                    VERA: &ldquo;This is the old commander&rsquo;s junk. I guess the cleanup crew missed some things.&rdquo;
                  </p>
                )}

                {showLocker && (
                  storedItems.length === 0
                    ? <p className={hudStyles.storageEmpty}>// No items stored.</p>
                    : <div className={hudStyles.storageItemList}>
                        {storedItems.map(item => (
                          <div key={item.id} className={hudStyles.storageItemCard}>
                            {item.id === NOTE_ID ? (
                              <p className={hudStyles.storageItemName}
                                style={{ cursor: 'pointer', textDecoration: 'underline dotted' }}
                                onClick={() => setShowNote(true)}>
                                {item.name} ↗
                              </p>
                            ) : (
                              <p className={hudStyles.storageItemName}>{item.name}</p>
                            )}
                            <p className={hudStyles.storageItemFound}>Found: {item.foundAt}</p>
                            {item.id !== NOTE_ID && (
                              <p className={hudStyles.storageItemContent}>{item.content}</p>
                            )}
                          </div>
                        ))}
                      </div>
                )}

                {/* Crumpled note overlay */}
                {showNote && (
                  <div className={hudStyles.noteOverlay} onClick={() => setShowNote(false)}>
                    <div className={hudStyles.noteImageWrapper} onClick={e => e.stopPropagation()}>
                      <img src="/assets/dontDie/images/storage-locker/crumpledNote.png"
                        alt="Handwritten note" className={hudStyles.noteImage} />
                      <p className={hudStyles.noteText}>{NOTE_TEXT}</p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDDashboard;
