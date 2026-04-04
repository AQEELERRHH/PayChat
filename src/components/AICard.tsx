import React, { useState } from 'react';
import { AIRequest } from '../types';

interface Props {
  request: AIRequest;
  onUnlock: (id: string) => void;
}

export const AICard: React.FC<Props> = ({ request, onUnlock }) => {
  const [status, setStatus] = useState(request.status);
  const [paying, setPaying] = useState(false);

  const handleUnlock = async () => {
    setPaying(true);
    await new Promise(r => setTimeout(r, 1600));
    setStatus('unlocked');
    setPaying(false);
    onUnlock(request.id);
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.tag}>🤖 AI Response</div>
        <div style={styles.prompt}>"{request.prompt}"</div>
      </div>

      <div style={styles.body}>
        {status === 'locked' ? (
          <>
            <div style={styles.blurred}>
              ████████████ ████████ ███████ ██████████ ██████ ████████████ ████ ██████ ████████████████ ██████ ████
            </div>
            <div style={styles.costRow}>
              <div style={styles.costLabel}>x402 Micropayment</div>
              <div style={styles.cost}>{request.cost} {request.token}</div>
            </div>
            <button
              onClick={handleUnlock}
              disabled={paying}
              style={{ ...styles.unlockBtn, opacity: paying ? 0.7 : 1 }}
            >
              {paying ? '⟳ Processing x402 payment...' : `⚡ Pay ${request.cost} ${request.token} to Unlock`}
            </button>
            <div style={styles.note}>🔒 Powered by x402 · OWS signs · No API keys</div>
          </>
        ) : (
          <>
            <div style={styles.response}>{request.response}</div>
            <div style={styles.paidRow}>
              <span style={styles.paidBadge}>✓ Paid {request.cost} {request.token}</span>
              <span style={styles.xmtpNote}>via x402 · signed by OWS</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: '#0A0A10',
    border: '1px solid rgba(255,107,107,0.25)',
    borderRadius: 14,
    overflow: 'hidden',
    maxWidth: 280,
  },
  header: {
    padding: '12px 14px',
    background: 'linear-gradient(135deg, rgba(255,107,107,0.1), rgba(255,107,107,0.04))',
    borderBottom: '1px solid rgba(255,107,107,0.12)',
  },
  tag: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#FF8A8A',
    letterSpacing: '1.5px',
    textTransform: 'uppercase' as const,
    marginBottom: 6,
  },
  prompt: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontStyle: 'italic',
  },
  body: { padding: '12px 14px' },
  blurred: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.08)',
    lineHeight: 1.6,
    marginBottom: 12,
    userSelect: 'none' as const,
    filter: 'blur(3px)',
    letterSpacing: 1,
  },
  costRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  costLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    fontFamily: 'monospace',
  },
  cost: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'monospace',
  },
  unlockBtn: {
    width: '100%',
    padding: '10px 0',
    background: 'linear-gradient(135deg, #FF6B6B, #CC4444)',
    border: 'none',
    borderRadius: 9,
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
  },
  note: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.2)',
    textAlign: 'center' as const,
    marginTop: 8,
    fontFamily: 'monospace',
  },
  response: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.6,
    marginBottom: 10,
  },
  paidRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paidBadge: {
    fontSize: 11,
    color: '#1DB954',
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  xmtpNote: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.2)',
    fontFamily: 'monospace',
  },
};