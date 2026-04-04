import { Thread } from '../types';

export const DEMO_WALLET = '0xAq34...rh42';

export const DEMO_THREADS: Thread[] = [
  {
    id: '1',
    address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    displayName: 'David.eth',
    avatarColor: '#6C47FF',
    lastMessage: 'Sure! Split the tickets?',
    lastTime: Date.now() - 120000,
    unread: 1,
    messages: [
      {
        id: 'm1',
        from: DEMO_WALLET,
        timestamp: Date.now() - 600000,
        type: 'text',
        text: 'Hey David! Want to go watch Sinners tonight? 🎬',
      },
      {
        id: 'm2',
        from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        timestamp: Date.now() - 480000,
        type: 'text',
        text: 'Yoooo yes! That movie looks 🔥 What time?',
      },
      {
        id: 'm3',
        from: DEMO_WALLET,
        timestamp: Date.now() - 420000,
        type: 'text',
        text: '8pm showing. Tickets are $24 total — split it?',
      },
      {
        id: 'm4',
        from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        timestamp: Date.now() - 360000,
        type: 'text',
        text: 'For sure! Send me the request 👇',
      },
      {
        id: 'm5',
        from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        timestamp: Date.now() - 120000,
        type: 'payment_request',
        paymentRequest: {
          id: 'pr1',
          amount: 12,
          token: 'USDC',
          memo: '🎬 Sinners movie tickets — your half',
          from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
          to: DEMO_WALLET,
          chain: 'Base',
          status: 'pending',
          createdAt: Date.now() - 120000,
        },
      },
    ],
  },
  {
    id: '2',
    address: '7xKzmP9qSolFriend',
    displayName: 'sol-friend.sol',
    avatarColor: '#1DB954',
    lastMessage: 'Ask me anything!',
    lastTime: Date.now() - 3600000,
    unread: 0,
    messages: [
      {
        id: 'm6',
        from: '7xKzmP9qSolFriend',
        timestamp: Date.now() - 3600000,
        type: 'text',
        text: 'Hey! Try /ai or /weather or /price to see PayChat magic 🔥',
      },
    ],
  },
  {
    id: '3',
    address: '0xAgent01AIBot',
    displayName: '🤖 AI Agent',
    avatarColor: '#FF6B6B',
    lastMessage: 'Pay to unlock response',
    lastTime: Date.now() - 7200000,
    unread: 0,
    messages: [
      {
        id: 'm7',
        from: '0xAgent01AIBot',
        timestamp: Date.now() - 7200000,
        type: 'text',
        text: 'Hello! I am an AI agent. Ask me anything — each response costs $0.10 USDC via x402 micropayment.',
      },
    ],
  },
];

export const AI_RESPONSES: Record<string, string> = {
  bitcoin: 'Bitcoin is a decentralized digital currency created in 2009 by Satoshi Nakamoto. It operates on a peer-to-peer network using blockchain technology to record transactions without any central authority.',
  ethereum: 'Ethereum is a decentralized blockchain platform that enables smart contracts and dApps. Its native token is Ether (ETH), used to pay for transactions and computation on the network.',
  defi: 'DeFi (Decentralized Finance) refers to financial services built on blockchain networks. It enables lending, borrowing, trading, and earning yield without traditional banks or intermediaries.',
  nft: 'NFTs (Non-Fungible Tokens) are unique digital assets stored on a blockchain. Unlike cryptocurrencies, each NFT is one-of-a-kind and represents ownership of a digital or physical item.',
  ows: 'The Open Wallet Standard (OWS) is an open-source framework by MoonPay that lets AI agents securely hold funds and sign transactions. Keys are encrypted locally and never exposed — agents sign via a policy-gated API.',
  xmtp: 'XMTP is a decentralized messaging protocol for wallet-to-wallet communication. Messages are end-to-end encrypted and tied to your wallet address — no phone number or email needed.',
  default: 'Great question! As an AI agent on PayChat, I process queries using advanced language models. Each response is gated by an x402 micropayment, ensuring fair compensation for compute resources used.',
};

export const WEATHER_DATA: Record<string, string> = {
  abuja: '⛅ Abuja, Nigeria: 32°C, Partly Cloudy. Humidity 68%. Great day ahead!',
  lagos: '🌤 Lagos, Nigeria: 29°C, Sunny. Humidity 75%. Typical coastal weather.',
  london: '🌧 London, UK: 12°C, Rainy. Carry an umbrella today!',
  newyork: '🌥 New York, USA: 18°C, Overcast. Mild winds from the west.',
  dubai: '☀️ Dubai, UAE: 38°C, Sunny and hot. Stay hydrated!',
  paris: '🌦 Paris, France: 15°C, Light showers. Romantic as ever.',
  tokyo: '🌸 Tokyo, Japan: 22°C, Clear skies. Cherry blossoms in bloom.',
  sydney: '🌊 Sydney, Australia: 26°C, Sunny. Perfect beach weather!',
  toronto: '❄️ Toronto, Canada: 4°C, Cloudy with light snow.',
  berlin: '🌫 Berlin, Germany: 10°C, Foggy morning. Clears by afternoon.',
  singapore: '⛈ Singapore: 30°C, Thunderstorms expected. Stay indoors!',
  cairo: '☀️ Cairo, Egypt: 35°C, Hot and dry. Desert winds active.',
  nairobi: '🌤 Nairobi, Kenya: 24°C, Partly cloudy. Pleasant afternoon.',
  accra: '🌤 Accra, Ghana: 30°C, Sunny. Warm coastal breeze.',
  johannesburg: '⛅ Johannesburg, SA: 21°C, Mild. Good day for outdoor activities.',
  default: '🌍 Weather fetched via x402 API. Temperature: 25°C, Clear skies.',
};

export const CRYPTO_PRICES: Record<string, string> = {
  bitcoin: '₿ Bitcoin (BTC): $67,420 · +2.4% today · Market Cap: $1.32T',
  ethereum: '⟠ Ethereum (ETH): $3,180 · +1.8% today · Market Cap: $382B',
  solana: '◎ Solana (SOL): $148 · +3.2% today · Market Cap: $68B',
  bnb: '◈ BNB: $412 · +0.9% today · Market Cap: $62B',
  default: '📈 Price fetched live via x402 oracle. All data on-chain verified.',
};