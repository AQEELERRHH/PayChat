# PayChat 

> **Chat. Pay. Unlock.**  Wallet-native messaging with built-in payments and pay-per-call services.

Built for the **OWS Hackathon 2026** · Track 03: Pay-Per-Call Services & API Monetization

[![OWS](https://img.shields.io/badge/OWS-Powered-6C47FF?style=flat-square)](https://openwallet.sh)
[![XMTP](https://img.shields.io/badge/XMTP-Messaging-1DB954?style=flat-square)](https://xmtp.org)
[![x402](https://img.shields.io/badge/x402-Payments-FF6B6B?style=flat-square)](https://x402.org)

---

## The Problem

Crypto payments are broken for everyday users:

- You leave your chat to send money
- You copy-paste wallet addresses manually
- Paying for small services (APIs, AI) is nearly impossible in a conversation
- Communication and payments live in completely separate apps

---

## The Solution

PayChat merges **chat + payments + pay-per-call services** into one wallet-native experience.

```
Chat → Tap → Pay → Done
```

No app switching. No address copying. No accounts.

---

## Features

###  Payment Requests
Send a payment request inside any chat thread. The recipient sees a card with amount, memo, and a **Pay** button. One tap signs via OWS and confirms on-chain.

###  AI Agent (Pay-per-response)
Ask the AI anything inside the chat. Each response is gated behind an x402 micropayment. Pay → unlock → get the answer. Powered by the Claude API.

###  Pay-Per-Call APIs
Trigger real-world API calls (weather, crypto prices) from inside the chat. No API keys just pay with your OWS wallet via x402.

###  OWS Signing
All payments are signed through the Open Wallet Standard. Private keys are never exposed. Policy-gated, audit-logged, multi-chain.

###  XMTP Messaging
End-to-end encrypted wallet-to-wallet messages. No phone number, no email just your wallet address.

---

## Quick Commands

| Command | What it does |
|---|---|
| `/pay 10` | Send a 10 USDC payment request |
| `/ai explain bitcoin` | Ask AI (costs $0.10 USDC via x402) |
| `/weather abuja` | Get weather (costs $0.05 USDC via x402) |
| `/price ethereum` | Get crypto price (costs $0.02 USDC via x402) |

---

## Tech Stack

| Layer | Technology | Role |
|---|---|---|
| Messaging | XMTP | Encrypted wallet-to-wallet chat |
| Payment signing | Open Wallet Standard (OWS) | Secure, policy-gated signing |
| Micropayments | x402 | Pay-per-call API access |
| AI | Claude API (Anthropic) | Pay-gated AI responses |
| Frontend | React + TypeScript | UI layer |
| Token | USDC on Base | Default payment token |

---

## Architecture

```
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
┌──────┐   ┌──────────────┐
│ XMTP │   │     OWS      │
│ Chat │   │   Signing    │
└──────┘   └──────┬───────┘
                  │
            ┌─────┴──────┐
            │            │
            ▼            ▼
         x402         Claude
       Pay-Per-       AI API
         Call
```

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Aqeelerh/paychat.git
cd paychat

# Install dependencies
npm install

# Start development server
npm start
```

### Environment Variables

Create a `.env` file:

```env
REACT_APP_XMTP_ENV=production
REACT_APP_OWS_POLICY=spending_limit_100
REACT_APP_ANTHROPIC_KEY=your_key_here
```

---

## How It Works

1. **User connects wallet** → OWS creates an encrypted local vault
2. **User opens a chat** → XMTP establishes encrypted channel to the wallet address
3. **User sends /pay 10** → PayChat generates a payment request card (XMTP Content Type)
4. **Recipient taps Pay** → OWS policy engine validates → signs → broadcasts to Base
5. **For /ai or /weather or / any services** → x402 micropayment sent first → then API result returned in-chat

---

## Track Alignment

**Track 03 Pay-Per-Call Services & API Monetization**

PayChat embodies every principle of this track:

- ✅ No accounts → wallet-only identity
- ✅ No API keys → x402 payment-gated execution  
- ✅ No subscriptions → per-interaction micropayments
- ✅ OWS wallet as the single identity + payment layer
- ✅ Conversational interface for the pay-per-call economy

---

## Built by

**Aqeelerh** Web3 developer & community builder  
OWS Hackathon 2026 · April 3, 2026

Twitter/X: [@Aqeelerh](https://x.com/Aqeelerh)

---

## License

MIT
