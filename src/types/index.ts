export type MessageType = 'text' | 'payment_request' | 'payment_confirmed' | 'ai_response' | 'api_result';

export interface PaymentRequest {
  id: string;
  amount: number;
  token: 'USDC' | 'ETH' | 'SOL';
  memo: string;
  from: string;
  to: string;
  chain: string;
  status: 'pending' | 'paid' | 'expired';
  createdAt: number;
}

export interface AIRequest {
  id: string;
  prompt: string;
  cost: number;
  token: string;
  status: 'locked' | 'unlocked';
  response?: string;
}

export interface APIRequest {
  id: string;
  service: string;
  query: string;
  cost: number;
  token: string;
  status: 'locked' | 'unlocked';
  result?: string;
  icon: string;
}

export interface Message {
  id: string;
  from: string;
  timestamp: number;
  type: MessageType;
  text?: string;
  paymentRequest?: PaymentRequest;
  aiRequest?: AIRequest;
  apiRequest?: APIRequest;
  txHash?: string;
}

export interface Thread {
  id: string;
  address: string;
  displayName: string;
  avatarColor: string;
  lastMessage: string;
  lastTime: number;
  unread: number;
  messages: Message[];
}

export interface WalletState {
  address: string;
  connected: boolean;
  balance: number;
  owsSigned: boolean;
}