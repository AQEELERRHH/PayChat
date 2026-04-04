import React, { useState } from 'react';
import { PaymentRequest } from '../types';

interface Props {
  request: PaymentRequest;
  isMe: boolean;
  onPay: (id: string) => void;
}

export const PaymentCard: React.FC<Props> = ({ request, isMe, onPay }) => {
  const [status, setStatus] = useState(request.status);
  const [signing, setSigning] = useState(false);

  const handlePay = async () => {
    setSigning(true);
    await new Promise(r => setTimeout(r, 1400));
    setStatus('paid');
    setSigning(false);
    onPay(request.id);
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.tag}>💸 Payment Request</div>
        <div style={styles.amount}>
          {request.amount}
          <span style={styles.token}> {request.token}</span>
        </div>
        <div style={styles.chain}>on {request.chain}</div>
      </div>

      <div style={styles.body}>
        <div style={styles.memo}>{request.memo}</div>

        <div style={styles.meta}>
          <div style={styles.metaItem}>
            <div style={styles.metaLabel}>From</div>
            <div style={styles.metaVal}>
              {request.from.slice(0, 6)}...{request.from.slice(-4)}
            </div>
          </div>
          <div style={styles.metaItem}>
            <div style={styles.metaLabel}>Chain</div>
            <div style={styles.metaVal}>{request.chain}</div>
          </div>
          <div style={styles.metaItem}>
            <div style={styles.metaLabel}>Token</div>
            <div style={styles.metaVal}>{request.token}</div>
          </div>
        </div>

        {!isMe && status === 'pending' && (
          <button
            onClick={handlePay}
            disabled={signing}
            style={{
              ...styles.payBtn,
              opacity: signing ? 0.7 : 1,
              cursor: signing ? 'not-allowed' : 'pointer',
            }}
          >
            {signing ? '⟳ Signing with OWS...' : `⚡ Pay ${request.amount} ${request.token}`}
          </button>
        )}

        {status === 'paid' && (
          <div style={styles.paidBadge}>✓ Paid · Signed by OWS</div>
        )}

        {isMe && status === 'pending' && (
          <div style={styles.pendingBadge}>⏳ Awaiting payment...</div>
        )}

        <div style={styles.owsNote}>
          🔒 Policy-gated signing via Open Wallet Standard
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: '#0A0A10',
    border: '1px solid rgba(108,71,255,0.3)',
    borderRadius: 14,
    overflow: 'hidden',
    maxWidth: 240,
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  },
  header: {
    padding: '14px 16px 12px',
    background: 'linear-gradient(135deg, rgba(108,71,255,0.15), rgba(29,185,84,0.06))',
    borderBottom: '1px solid rgba(108,71,255,0.12)',
  },
  tag: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#9B8AFF',
    letterSpacing: '1.5px',
    textTransform: 'uppercase' as const,
    marginBottom: 8,
  },
  amount: {
    fontFamily: 'Georgia, serif',
    fontSize: 30,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 1,
    fontWeight: 'bold',
  },
  token: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
  },
  chain: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
    marginTop: 4,
    fontFamily: 'monospace',
  },
  body: {
    padding: '12px 14px',
  },
  memo: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 12,
    lineHeight: 1.4,
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  metaItem: { fontSize: 11 },
  metaLabel: {
    color: 'rgba(255,255,255,0.25)',
    marginBottom: 2,
    fontFamily: 'monospace',
    fontSize: 10,
  },
  metaVal: {
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '500',
  },
  payBtn: {
    width: '100%',
    padding: '10px 0',
    background: 'linear-gradient(135deg, #6C47FF, #4A2FCC)',
    border: 'none',
    borderRadius: 9,
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  },
  paidBadge: {
    width: '100%',
    padding: '10px 0',
    background: 'rgba(29,185,84,0.15)',
    border: '1px solid rgba(29,185,84,0.3)',
    borderRadius: 9,
    color: '#1DB954',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center' as const,
  },
  pendingBadge: {
    width: '100%',
    padding: '10px 0',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 9,
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    textAlign: 'center' as const,
  },
  owsNote: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.2)',
    textAlign: 'center' as const,
    marginTop: 8,
    fontFamily: 'monospace',
  },
};