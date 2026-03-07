'use client';

import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Window,
  Thread
} from 'stream-chat-react';
import { STREAM_CONFIG, STREAM_CHANNEL_CONFIG } from '../../../config/stream';
import styles from './ChatRoom.module.css';

// Import Stream Chat CSS
import 'stream-chat-react/dist/css/v2/index.css';

const chatClient = StreamChat.getInstance(STREAM_CONFIG.apiKey);

export const ChatRoom = () => {
  const [channel, setChannel] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Connect user - in production, you'd get a proper token from your backend
        const user = {
          id: STREAM_CONFIG.userId,
          name: STREAM_CONFIG.userName,
          image: STREAM_CONFIG.userImage,
        };

        // Get proper JWT token from API endpoint
        const response = await fetch('/api/stream-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id })
        });
        
        if (!response.ok) {
          throw new Error('Failed to get authentication token');
        }
        
        const { token } = await response.json();
        
        await chatClient.connectUser(user, token);

        // Create or get the channel
        const channelInstance = chatClient.channel(
          STREAM_CHANNEL_CONFIG.channelType,
          STREAM_CHANNEL_CONFIG.channelId,
          {
            name: STREAM_CHANNEL_CONFIG.channelName,
            members: [STREAM_CONFIG.userId],
            // Add AI assistant as a member (you can customize this)
            created_by_id: STREAM_CONFIG.userId,
          }
        );

        await channelInstance.watch();
        setChannel(channelInstance);
      } catch (err) {
        console.error('Failed to initialize chat:', err);
        setError('Failed to initialize chat. Please check your Stream.io configuration.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();

    // Cleanup on unmount
    return () => {
      if (chatClient.userID) {
        chatClient.disconnectUser();
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className={styles.LoadingContainer}>
        <div className={styles.LoadingSpinner}></div>
        <p className={styles.LoadingText}>Initializing chat...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.ErrorContainer}>
        <div className={styles.ErrorIcon}>⚠️</div>
        <h3 className={styles.ErrorTitle}>Chat Unavailable</h3>
        <p className={styles.ErrorMessage}>{error}</p>
        <div className={styles.ErrorHelp}>
          <p>To set up Stream.io:</p>
          <ol>
            <li>Create a Stream.io account</li>
            <li>Add your API keys to the config</li>
            <li>Refresh the page</li>
          </ol>
        </div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className={styles.ErrorContainer}>
        <p>Failed to load chat channel.</p>
      </div>
    );
  }

  return (
    <div className={styles.ChatContainer}>
      <Chat client={chatClient} theme="str-chat__theme-light">
        <Channel channel={channel}>
          <Window>
            <div className={styles.ChatHeader}>
              <ChannelHeader />
            </div>
            <div className={styles.MessageListContainer}>
              <MessageList />
            </div>
            <div className={styles.MessageInputContainer}>
              <MessageInput />
            </div>
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};