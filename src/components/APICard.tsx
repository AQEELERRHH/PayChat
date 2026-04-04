import React, { useState } from 'react';
import { APIRequest } from '../types';

interface Props {
  request: APIRequest;
  onUnlock: (id: string) => void;
}

export const APICard: React.FC<Props> = ({ request, onUnlock }) => {
  const [status, setStatus] = useState(request.status);
  const [paying, setPaying] = useState(false);

  const handleUnlock = async () => {
    setPaying(true);
    await new Promise(r => setTimeout(r, 1200));
    setStatus('unlocked');
    setPaying(false);
    onUnlock(request.id);
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.iconRow}>
          <span style={styles.icon}>{request.icon}</span>
          <div>
            <div style={styles.tag}>x402 Pay-Per-Call</div>
            <div style={styles.service}>{request.service}</div>
          </div>
        </div>
        <div style={styles.query}>"{request.query}"</div>
      </div>

      <div style={styles.body}>
        {status === 'locked' ? (
          <>
            <div style={styles.costRow}>
              <div>
                <div style={styles.costLabel}>API Call Cost</div>
                <div style={styles.note}>No account · No API key · Just pay</div>
              </div>
              <div style={styles.cost}>{request.cost} {request.token}</div>
            </div>
            <button
              onClick={handleUnlock}
              disabled={paying}
              style={{ ...styles.btn, opacity: paying ? 0.7 : 1 }}
            >
              {paying ? '⟳ Calling API via x402...' : '⚡ Pay & Get Result'}
            </button>
          </>
        ) : (
          <>
            <div style={styles.result}>{request.result}</div>
            <div style={styles.footer}>
              <span style={styles.paid}>✓ {request.cost} {request.token} paid</span>
              <span style={styles.via}>x402 · OWS · Instant</span>
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
    border: '1px solid rgba(29,185,84,0.25)',
    borderRadius: 14,
    overflow: 'hidden',
    maxWidth: 260,
  },
  header: {
    padding: '12px 14px',
    background: 'linear-gradient(135deg, rgba(29,185,84,0.1), rgba(29,185,84,0.03))',
    borderBottom: '1px solid rgba(29,185,84,0.1)',
  },
  iconRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  icon: { fontSize: 24 },
  tag: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: '#1DB954',
    letterSpacing: '1.5px',
    textTransform: 'uppercase' as const,
    marginBottom: 2,
  },
  service: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  query: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    fontStyle: 'italic',
  },
  body: { padding: '12px 14px' },
  costRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  costLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
    marginBottom: 2,
  },
  note: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.25)',
    fontFamily: 'monospace',
  },
  cost: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1DB954',
    fontFamily: 'monospace',
  },
  btn: {
    width: '100%',
    padding: '10px 0',
    background: 'linear-gradient(135deg, #1DB954, #14803A)',
    border: 'none',
    borderRadius: 9,
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
  },
  result: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.6,
    marginBottom: 10,
    padding: '10px 12px',
    background: 'rgba(29,185,84,0.06)',
    borderRadius: 8,
    border: '1px solid rgba(29,185,84,0.1)',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paid: {
    fontSize: 11,
    color: '#1DB954',
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  via: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.2)',
    fontFamily: 'monospace',
  },
};