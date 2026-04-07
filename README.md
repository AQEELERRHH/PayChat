# PayChat 

> **Chat. Pay. Unlock.** — Wallet-native messaging with built-in payments and pay-per-call services.

** Built for OWS Hackathon 2026 · Track 03: Pay-Per-Call Services & API Monetization**

🌐 **Live Demo:** https://aqeelerrhh.github.io/PayChat

[![OWS](https://img.shields.io/badge/OWS-Powered-6C47FF?style=flat-square)](https://openwallet.sh)
[![XMTP](https://img.shields.io/badge/XMTP-Messaging-1DB954?style=flat-square)](https://xmtp.org)
[![x402](https://img.shields.io/badge/x402-Payments-FF6B6B?style=flat-square)](https://x402.org)
[![Claude](https://img.shields.io/badge/Claude-AI_Agent-F5A623?style=flat-square)](https://anthropic.com)

---

## ❗ The Problem

Crypto payments and communication are completely broken for everyday users:

- You **leave your chat** to send money
- You **copy-paste wallet addresses** manually  
- **Paying for small services** (APIs, AI) inside a conversation is impossible
- Communication and payments live in **completely separate apps**

---

##  The Solution

PayChat merges **chat + payments + pay-per-call services** into one wallet-native experience.
Chat → Tap → Pay → Done
No app switching. No address copying. No accounts. Just your wallet.

---

##  Features

###  Wallet-to-Wallet Chat (XMTP)
End-to-end encrypted messaging between any two wallet addresses. No phone number. No email. Your wallet address IS your identity.

###  One-Tap Payment Requests (OWS)
Send payment requests inside any chat. Recipient sees a card → taps Pay → OWS signs securely → confirmed on-chain. Private key never exposed.

###  Pay-Per-Response AI Agent (x402 + Claude)
Ask the AI anything inside the chat. Each response is gated behind a $0.10 USDC x402 micropayment. Pay → unlock → get the answer.

###  Pay-Per-Call APIs (x402)
Trigger real-world APIs (weather, crypto prices) directly from chat. No API keys. Just pay with your wallet and get the result instantly.

---

## ⚡ Quick Commands

| Command | What it does | Cost |
|---|---|---|
| `/pay 10` | Send a 10 USDC payment request | Free |
| `/ai explain bitcoin` | Ask AI agent anything | $0.10 USDC |
| `/weather tokyo` | Live weather for any city | $0.05 USDC |
| `/price ethereum` | Live crypto price | $0.02 USDC |

---

##  Tech Stack

| Layer | Technology | Role |
|---|---|---|
| 💬 Messaging | XMTP | Encrypted wallet-to-wallet chat |
| 🔐 Signing | Open Wallet Standard (OWS) | Secure, policy-gated signing |
| ⚡ Micropayments | x402 | Pay-per-call API access |
| 🤖 AI | Claude API (Anthropic) | Pay-gated AI responses |
| 🌍 Weather | wttr.in | Live weather data |
| 📈 Prices | CoinGecko API | Live crypto prices |
| 🖥 Frontend | React + TypeScript | UI layer |
| 💵 Token | USDC on Base | Default payment token |

---

##  Architecture
User (Wallet Address)
│
▼
┌─────────────┐
│  PayChat UI │  ← React + TypeScript
└──────┬──────┘
│
┌─────┴──────┐
│            │
▼            ▼
┌──────┐  ┌───────────┐
│ XMTP │  │    OWS    │
│ Chat │  │  Signing  │
└──────┘  └─────┬─────┘
│
┌─────┴──────┐
│            │
▼            ▼
x402        Claude
Pay-Per-      AI API
Call

---

##  Getting Started
```bash
# Clone the repo
git clone https://github.com/AQEELERRHH/PayChat.git
cd PayChat

# Install dependencies
npm install

# Start development server
npm start
```

Opens at `http://localhost:3000`

---

##  Track Alignment

**Track 03 — Pay-Per-Call Services & API Monetization**

| Requirement | PayChat |
|---|---|
| No accounts | ✅ Wallet-only identity |
| No API keys | ✅ x402 payment-gated execution |
| No subscriptions | ✅ Per-interaction micropayments |
| OWS wallet as identity | ✅ XMTP + OWS unified |
| Pay-per-call execution | ✅ Weather, AI, prices & more |

---

##  Built By

**Aqeelerh** — Web3 developer & community builder  
OWS Hackathon 2026 · April 3, 2026  
Twitter/X: [@Aqeelerh](https://x.com/Aqeelerh)

---

## 📄 License
MIT
