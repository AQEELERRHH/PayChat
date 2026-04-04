import React, { useState, useRef, useEffect } from 'react';
import { PaymentCard } from './components/PaymentCard';
import { AICard } from './components/AICard';
import { APICard } from './components/APICard';
import { Thread, Message } from './types';
import {
  DEMO_THREADS,
  DEMO_WALLET,
  AI_RESPONSES,
  WEATHER_DATA,
  CRYPTO_PRICES,
} from './hooks/mockData';

const uid = () => Math.random().toString(36).slice(2, 9);
const now = () => Date.now();
const timeAgo = (ts: number) => {
  const diff = now() - ts;
  if (diff < 60000) return 'now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
  return `${Math.floor(diff / 86400000)}d`;
};
const shortAddr = (addr: string) =>
  addr.length > 16 ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : addr;

export default function App() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [balance, setBalance] = useState(124.50);
  const [threads, setThreads] = useState<Thread[]>(DEMO_THREADS);
  const [activeId, setActiveId] = useState<string>('1');
  const [input, setInput] = useState('');
  const [showCommands, setShowCommands] = useState(false);
  const [newChatAddr, setNewChatAddr] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeThread = threads.find(t => t.id === activeId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages]);

  const connectWallet = async () => {
    setConnecting(true);
    await new Promise(r => setTimeout(r, 1800));
    setConnected(true);
    setConnecting(false);
  };

  const addMessage = (threadId: string, msg: Message) => {
    setThreads(prev =>
      prev.map(t =>
        t.id === threadId
          ? {
              ...t,
              messages: [...t.messages, msg],
              lastMessage: msg.text || '💸 Payment',
              lastTime: now(),
            }
          : t
      )
    );
  };

  const handleSend = () => {
    if (!input.trim() || !activeId) return;
    const raw = input.trim().toLowerCase();

    const userMsg: Message = {
      id: uid(),
      from: DEMO_WALLET,
      timestamp: now(),
      type: 'text',
      text: input.trim(),
    };
    addMessage(activeId, userMsg);
    setInput('');
    setShowCommands(false);

    setTimeout(() => {
      if (raw.startsWith('/pay') || raw.includes('send me') || raw.includes('pay me')) {
        const match = raw.match(/(\d+(\.\d+)?)/);
        const amount = match ? parseFloat(match[1]) : 10;
        addMessage(activeId, {
          id: uid(),
          from: activeThread!.address,
          timestamp: now(),
          type: 'payment_request',
          paymentRequest: {
            id: uid(),
            amount,
            token: 'USDC',
            memo: input.replace('/pay', '').trim() || '💸 Payment request',
            from: activeThread!.address,
            to: DEMO_WALLET,
            chain: 'Base',
            status: 'pending',
            createdAt: now(),
          },
        });
        return;
      }

      if (raw.startsWith('/ai') || raw.includes('explain') || raw.includes('what is') || raw.includes('tell me')) {
        const keyword = Object.keys(AI_RESPONSES).find(k => raw.includes(k)) || 'default';
        addMessage(activeId, {
          id: uid(),
          from: activeThread!.address,
          timestamp: now(),
          type: 'ai_response',
          aiRequest: {
            id: uid(),
            prompt: input.trim(),
            cost: 0.10,
            token: 'USDC',
            status: 'locked',
            response: AI_RESPONSES[keyword],
          },
        });
        return;
      }

      if (raw.startsWith('/weather') || raw.includes('weather')) {
        const city = Object.keys(WEATHER_DATA).find(c => raw.includes(c)) || 'default';
        addMessage(activeId, {
          id: uid(),
          from: activeThread!.address,
          timestamp: now(),
          type: 'api_result',
          apiRequest: {
            id: uid(),
            service: 'Weather API',
            query: input.trim(),
            cost: 0.05,
            token: 'USDC',
            status: 'locked',
            result: WEATHER_DATA[city],
            icon: '🌦',
          },
        });
        return;
      }

      if (raw.startsWith('/price') || raw.includes('price') || raw.includes('crypto')) {
        const coin = Object.keys(CRYPTO_PRICES).find(c => raw.includes(c)) || 'default';
        addMessage(activeId, {
          id: uid(),
          from: activeThread!.address,
          timestamp: now(),
          type: 'api_result',
          apiRequest: {
            id: uid(),
            service: 'Crypto Price Oracle',
            query: input.trim(),
            cost: 0.02,
            token: 'USDC',
            status: 'locked',
            result: CRYPTO_PRICES[coin],
            icon: '📈',
          },
        });
        return;
      }

      const replies: Record<string, string> = {
        hello: 'Hey! 👋 Try /pay, /ai, /weather, or /price',
        hi: 'Hey! 👋 Try /pay, /ai, /weather, or /price',
        hey: 'Yo! 👋 Try /pay 10 to send a payment request',
        help: '💡 Commands: /pay [amount] · /ai [question] · /weather [city] · /price [coin]',
      };
      const replyKey = Object.keys(replies).find(k => raw.includes(k));
      addMessage(activeId, {
        id: uid(),
        from: activeThread!.address,
        timestamp: now(),
        type: 'text',
        text: replyKey ? replies[replyKey] : '👍 Try /ai to ask anything, or /pay to request payment!',
      });
    }, 600);
  };

  const handlePayment = (threadId: string) => {
    setTimeout(() => {
      addMessage(threadId, {
        id: uid(),
        from: DEMO_WALLET,
        timestamp: now(),
        type: 'payment_confirmed',
        txHash: '0x' + Math.random().toString(16).slice(2, 18),
        text: 'Payment sent',
      });
      setBalance(b => parseFloat((b - 6).toFixed(2)));
    }, 400);
  };

  const handleNewChat = () => {
    if (!newChatAddr.trim()) return;
    const t: Thread = {
      id: uid(),
      address: newChatAddr.trim(),
      displayName: shortAddr(newChatAddr.trim()),
      avatarColor: `hsl(${Math.random() * 360}, 60%, 50%)`,
      lastMessage: 'New conversation',
      lastTime: now(),
      unread: 0,
      messages: [],
    };
    setThreads(prev => [t, ...prev]);
    setActiveId(t.id);
    setNewChatAddr('');
    setShowNewChat(false);
  };

  if (!connected) {
    return (
      <div style={s.connectRoot}>
        <div style={s.connectCard}>
          <div style={s.logoRow}>
            <div style={s.logoIcon}>
              <svg width="28" height="28" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C6.69 2 4 4.69 4 8C4 10.76 5.77 13.1 8.25 13.84V16H11.75V13.84C14.23 13.1 16 10.76 16 8C16 4.69 13.31 2 10 2Z" fill="white" opacity="0.9"/>
                <circle cx="10" cy="8" r="2.5" fill="rgba(0,0,0,0.4)"/>
              </svg>
            </div>
            <span style={s.logoText}>PayChat</span>
          </div>

          <h2 style={s.connectTitle}>Chat. Pay. Unlock.</h2>
          <p style={s.connectSub}>
            Wallet-native messaging with built-in payments and pay-per-call services. No accounts. No switching apps.
          </p>

          <div style={s.featureList}>
            {[
              '💬 Encrypted wallet-to-wallet chat via XMTP',
              '💸 One-tap payments signed by OWS',
              '🤖 Pay-per-response AI agent via x402',
              '⚡ Pay-per-call APIs — weather, prices & more',
            ].map(f => (
              <div key={f} style={s.featureItem}>{f}</div>
            ))}
          </div>

          <button
            onClick={connectWallet}
            disabled={connecting}
            style={{ ...s.connectBtn, opacity: connecting ? 0.7 : 1 }}
          >
            {connecting ? '⟳ Connecting via OWS...' : '🔐 Connect Wallet'}
          </button>
          <div style={s.poweredBy}>
            Powered by Open Wallet Standard · XMTP · x402
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.root}>
      {/* SIDEBAR */}
      <div style={s.sidebar}>
        <div style={s.sbHeader}>
          <div style={s.brand}>
            <div style={s.brandIcon}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C6.69 2 4 4.69 4 8C4 10.76 5.77 13.1 8.25 13.84V16H11.75V13.84C14.23 13.1 16 10.76 16 8C16 4.69 13.31 2 10 2Z" fill="white" opacity="0.9"/>
                <circle cx="10" cy="8" r="2.5" fill="rgba(0,0,0,0.4)"/>
              </svg>
            </div>
            <span style={s.brandName}>PayChat</span>
            <div style={s.liveDot} />
          </div>
          <button style={s.newBtn} onClick={() => setShowNewChat(!showNewChat)}>+</button>
        </div>

        {showNewChat && (
          <div style={s.newChatBox}>
            <input
              style={s.newChatInput}
              placeholder="Wallet address or ENS..."
              value={newChatAddr}
              onChange={e => setNewChatAddr(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleNewChat()}
              autoFocus
            />
            <button style={s.startBtn} onClick={handleNewChat}>Go</button>
          </div>
        )}

        <div style={s.searchBar}>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>🔍</span>
          <span style={s.searchText}>Search wallets...</span>
        </div>

        <div style={s.threadList}>
          {threads.map(t => (
            <div
              key={t.id}
              style={{ ...s.thread, ...(activeId === t.id ? s.threadActive : {}) }}
              onClick={() => {
                setActiveId(t.id);
                setThreads(prev => prev.map(th => th.id === t.id ? { ...th, unread: 0 } : th));
              }}
            >
              <div style={{ ...s.avatar, background: t.avatarColor }}>
                {t.displayName[0].toUpperCase()}
              </div>
              <div style={s.threadInfo}>
                <div style={s.threadName}>{t.displayName}</div>
                <div style={s.threadPrev}>{shortAddr(t.address)}</div>
              </div>
              <div style={s.threadMeta}>
                <div style={s.threadTime}>{timeAgo(t.lastTime)}</div>
                {t.unread > 0 && <div style={s.unread}>{t.unread}</div>}
              </div>
            </div>
          ))}
        </div>

        <div style={s.walletBox}>
          <div style={s.walletLabel}>My Wallet</div>
          <div style={s.walletRow}>
            <span style={s.walletAddr}>{shortAddr(DEMO_WALLET)}</span>
            <span style={s.owsTag}>OWS ✓</span>
          </div>
          <div style={s.walletBalance}>${balance.toFixed(2)} USDC</div>
        </div>
      </div>

      {/* CHAT */}
      <div style={s.chatPanel}>
        {activeThread ? (
          <>
            <div style={s.chatHeader}>
              <div style={{ ...s.avatar, width: 36, height: 36, fontSize: 13, background: activeThread.avatarColor }}>
                {activeThread.displayName[0].toUpperCase()}
              </div>
              <div>
                <div style={s.chatName}>{activeThread.displayName}</div>
                <div style={s.chatAddr}>{shortAddr(activeThread.address)}</div>
              </div>
              <div style={s.xmtpTag}>XMTP ✓</div>
            </div>

            <div style={s.messages}>
              {activeThread.messages.length === 0 && (
                <div style={s.emptyState}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
                  <div style={s.emptyTitle}>Start the conversation</div>
                  <div style={s.emptyHint}>
                    Try typing:{'\n'}
                    /pay 10 · /ai explain bitcoin{'\n'}
                    /weather lagos · /price solana
                  </div>
                </div>
              )}

              {activeThread.messages.map(msg => {
                const isMe = msg.from === DEMO_WALLET;

                if (msg.type === 'payment_request' && msg.paymentRequest) {
                  return (
                    <div key={msg.id} style={{ ...s.msgRow, justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                      {!isMe && <Av color={activeThread.avatarColor} name={activeThread.displayName} />}
                      <div>
                        <PaymentCard
                          request={msg.paymentRequest}
                          isMe={isMe}
                          onPay={() => handlePayment(activeId)}
                        />
                        <div style={{ ...s.ts, textAlign: isMe ? 'right' : 'left' }}>{timeAgo(msg.timestamp)}</div>
                      </div>
                      {isMe && <Av color="#6C47FF" name="Me" />}
                    </div>
                  );
                }

                if (msg.type === 'ai_response' && msg.aiRequest) {
                  return (
                    <div key={msg.id} style={{ ...s.msgRow, justifyContent: 'flex-start' }}>
                      <Av color={activeThread.avatarColor} name={activeThread.displayName} />
                      <div>
                        <AICard
                          request={msg.aiRequest}
                          onUnlock={() => {
                            setThreads(prev => prev.map(t =>
                              t.id === activeId ? {
                                ...t,
                                messages: t.messages.map(m =>
                                  m.id === msg.id && m.aiRequest
                                    ? { ...m, aiRequest: { ...m.aiRequest, status: 'unlocked' as const } }
                                    : m
                                )
                              } : t
                            ));
                          }}
                        />
                        <div style={s.ts}>{timeAgo(msg.timestamp)}</div>
                      </div>
                    </div>
                  );
                }

                if (msg.type === 'api_result' && msg.apiRequest) {
                  return (
                    <div key={msg.id} style={{ ...s.msgRow, justifyContent: 'flex-start' }}>
                      <Av color={activeThread.avatarColor} name={activeThread.displayName} />
                      <div>
                        <APICard
                          request={msg.apiRequest}
                          onUnlock={() => {
                            setThreads(prev => prev.map(t =>
                              t.id === activeId ? {
                                ...t,
                                messages: t.messages.map(m =>
                                  m.id === msg.id && m.apiRequest
                                    ? { ...m, apiRequest: { ...m.apiRequest, status: 'unlocked' as const } }
                                    : m
                                )
                              } : t
                            ));
                          }}
                        />
                        <div style={s.ts}>{timeAgo(msg.timestamp)}</div>
                      </div>
                    </div>
                  );
                }

                if (msg.type === 'payment_confirmed') {
                  return (
                    <div key={msg.id} style={{ ...s.msgRow, justifyContent: 'flex-end' }}>
                      <div style={s.txPill}>
                        <span>✅</span>
                        <div>
                          <div style={s.txTitle}>Payment sent!</div>
                          <div style={s.txHash}>{msg.txHash?.slice(0, 22)}... · Base</div>
                        </div>
                      </div>
                      <Av color="#6C47FF" name="Me" />
                    </div>
                  );
                }

                return (
                  <div key={msg.id} style={{ ...s.msgRow, justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                    {!isMe && <Av color={activeThread.avatarColor} name={activeThread.displayName} />}
                    <div>
                      <div style={isMe ? s.bubbleMe : s.bubbleThem}>{msg.text}</div>
                      <div style={{ ...s.ts, textAlign: isMe ? 'right' : 'left' }}>{timeAgo(msg.timestamp)}</div>
                    </div>
                    {isMe && <Av color="#6C47FF" name="Me" />}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {showCommands && (
              <div style={s.cmdPopup}>
                {[
                  { cmd: '/pay 10', desc: '💸 Request 10 USDC' },
                  { cmd: '/ai explain bitcoin', desc: '🤖 AI response ($0.10)' },
                  { cmd: '/weather lagos', desc: '🌦 Weather API ($0.05)' },
                  { cmd: '/price ethereum', desc: '📈 Crypto price ($0.02)' },
                ].map(c => (
                  <div
                    key={c.cmd}
                    style={s.cmdItem}
                    onClick={() => { setInput(c.cmd); setShowCommands(false); }}
                  >
                    <span style={s.cmdCode}>{c.cmd}</span>
                    <span style={s.cmdDesc}>{c.desc}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={s.inputRow}>
              <button
                style={s.cmdBtn}
                onClick={() => setShowCommands(!showCommands)}
                title="Commands"
              >
                ⚡
              </button>
              <input
                style={s.inputField}
                placeholder="/pay 10 · /ai · /weather · /price"
                value={input}
                onChange={e => {
                  setInput(e.target.value);
                  setShowCommands(e.target.value === '/');
                }}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button style={s.sendBtn} onClick={handleSend}>↑</button>
            </div>
          </>
        ) : (
          <div style={s.emptyState}>Select a conversation</div>
        )}
      </div>
    </div>
  );
}

const Av: React.FC<{ color: string; name: string }> = ({ color, name }) => (
  <div style={{ width: 26, height: 26, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white', flexShrink: 0 }}>
    {name[0].toUpperCase()}
  </div>
);

const s: Record<string, React.CSSProperties> = {
  root: { display: 'flex', height: '100vh', background: '#0A0A10', fontFamily: "'Geist','Segoe UI',sans-serif", overflow: 'hidden', color: 'white' },
  sidebar: { width: 272, background: '#0D0D14', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', flexShrink: 0 },
  sbHeader: { padding: '18px 14px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  brand: { display: 'flex', alignItems: 'center', gap: 8 },
  brandIcon: { width: 32, height: 32, background: 'linear-gradient(135deg,#6C47FF,#1DB954)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  brandName: { fontFamily: 'Georgia,serif', fontSize: 17, color: 'rgba(255,255,255,0.9)', fontWeight: 'bold' },
  liveDot: { width: 7, height: 7, background: '#1DB954', borderRadius: '50%' },
  newBtn: { width: 28, height: 28, background: 'rgba(108,71,255,0.15)', border: '1px solid rgba(108,71,255,0.3)', borderRadius: 7, color: '#9B8AFF', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: '1' },
  newChatBox: { padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 6 },
  newChatInput: { flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, padding: '7px 10px', color: 'rgba(255,255,255,0.8)', fontSize: 12, fontFamily: 'inherit', outline: 'none' },
  startBtn: { padding: '7px 12px', background: '#6C47FF', border: 'none', borderRadius: 7, color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' },
  searchBar: { margin: '10px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 },
  searchText: { fontSize: 12, color: 'rgba(255,255,255,0.2)' },
  threadList: { flex: 1, overflowY: 'auto', padding: '6px 8px' },
  thread: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px', borderRadius: 10, cursor: 'pointer', marginBottom: 2, transition: 'background 0.12s' },
  threadActive: { background: 'rgba(108,71,255,0.15)', border: '1px solid rgba(108,71,255,0.2)' },
  avatar: { width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white', flexShrink: 0 },
  threadInfo: { flex: 1, minWidth: 0 },
  threadName: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  threadPrev: { fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  threadMeta: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 },
  threadTime: { fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' },
  unread: { background: '#6C47FF', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 100 },
  walletBox: { margin: 8, padding: '10px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 },
  walletLabel: { fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 4 },
  walletRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 },
  walletAddr: { fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' },
  owsTag: { fontSize: 9, background: 'rgba(108,71,255,0.2)', color: '#9B8AFF', padding: '2px 6px', borderRadius: 4 },
  walletBalance: { fontSize: 14, fontWeight: 700, color: '#1DB954', fontFamily: 'monospace' },
  chatPanel: { flex: 1, display: 'flex', flexDirection: 'column', background: '#111118', minWidth: 0 },
  chatHeader: { padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 12, background: '#0D0D14' },
  chatName: { fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)' },
  chatAddr: { fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' },
  xmtpTag: { marginLeft: 'auto', fontSize: 10, background: 'rgba(29,185,84,0.1)', color: '#1DB954', padding: '3px 8px', borderRadius: 5, fontFamily: 'monospace' },
  messages: { flex: 1, overflowY: 'auto', padding: '20px 20px 10px', display: 'flex', flexDirection: 'column', gap: 14 },
  msgRow: { display: 'flex', gap: 8, alignItems: 'flex-end' },
  bubbleMe: { background: 'linear-gradient(135deg,#6C47FF,#4A2FCC)', padding: '10px 14px', borderRadius: 16, borderBottomRightRadius: 4, fontSize: 13, color: 'white', maxWidth: 320, lineHeight: 1.5 },
  bubbleThem: { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.06)', padding: '10px 14px', borderRadius: 16, borderBottomLeftRadius: 4, fontSize: 13, color: 'rgba(255,255,255,0.8)', maxWidth: 320, lineHeight: 1.5 },
  ts: { fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 3, fontFamily: 'monospace' },
  txPill: { display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(29,185,84,0.1)', border: '1px solid rgba(29,185,84,0.2)', borderRadius: 10, padding: '10px 14px' },
  txTitle: { fontSize: 12, fontWeight: 700, color: '#1DB954' },
  txHash: { fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' },
  emptyState: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', textAlign: 'center', padding: 40 },
  emptyTitle: { fontSize: 16, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 10 },
  emptyHint: { fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', lineHeight: 1.8, whiteSpace: 'pre-line' },
  cmdPopup: { margin: '0 16px 8px', background: '#0A0A10', border: '1px solid rgba(108,71,255,0.3)', borderRadius: 12, overflow: 'hidden' },
  cmdItem: { padding: '10px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)' },
  cmdCode: { fontSize: 12, color: '#9B8AFF', fontFamily: 'monospace', fontWeight: 600 },
  cmdDesc: { fontSize: 12, color: 'rgba(255,255,255,0.4)' },
  inputRow: { padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 8, alignItems: 'center' },
  cmdBtn: { width: 38, height: 38, background: 'rgba(108,71,255,0.12)', border: '1px solid rgba(108,71,255,0.2)', borderRadius: 10, color: '#9B8AFF', fontSize: 16, cursor: 'pointer', flexShrink: 0 },
  inputField: { flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '10px 14px', color: 'rgba(255,255,255,0.8)', fontSize: 13, fontFamily: 'inherit', outline: 'none' },
  sendBtn: { width: 38, height: 38, background: '#6C47FF', border: 'none', borderRadius: 10, color: 'white', fontSize: 16, cursor: 'pointer', flexShrink: 0 },
  connectRoot: { minHeight: '100vh', background: '#0A0A10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Geist','Segoe UI',sans-serif", padding: 20 },
  connectCard: { background: '#13131A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '40px 36px', maxWidth: 420, width: '100%', textAlign: 'center' },
  logoRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 24 },
  logoIcon: { width: 52, height: 52, background: 'linear-gradient(135deg,#6C47FF,#1DB954)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  logoText: { fontFamily: 'Georgia,serif', fontSize: 28, color: 'rgba(255,255,255,0.9)', fontWeight: 'bold' },
  connectTitle: { fontSize: 26, fontFamily: 'Georgia,serif', color: 'rgba(255,255,255,0.9)', marginBottom: 10 },
  connectSub: { fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: 24 },
  featureList: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, textAlign: 'left' },
  featureItem: { fontSize: 13, color: 'rgba(255,255,255,0.6)', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, lineHeight: 1.4 },
  connectBtn: { width: '100%', padding: '14px', background: 'linear-gradient(135deg,#6C47FF,#4A2FCC)', border: 'none', borderRadius: 12, color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 14 },
  poweredBy: { fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' },
};