// Stream.io configuration
export const STREAM_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY || '688gk62bvsg8',
  secret: process.env.STREAM_SECRET_KEY || 'qgzhyceg982g8paszysdbf9j7nnp2e2m5td687p7qffp7ccnbt2ttrrzpkucr5vr',
  appId: process.env.NEXT_PUBLIC_STREAM_APP_ID || '1538663',
  // Hardcoded user for development
  userId: 'test-user',
  userName: 'Test User',
  userImage: 'https://via.placeholder.com/40x40/0066cc/ffffff?text=TU'
};

export const STREAM_CHANNEL_CONFIG = {
  channelType: 'messaging',
  channelId: 'ai-chat-room',
  channelName: 'AI Chat Room'
};