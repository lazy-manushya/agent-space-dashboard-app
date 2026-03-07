import Card from '@/components/Card';
import styles from './RecentChat.module.css';

interface RecentChatItem {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  isActive?: boolean;
}

const RECENT_CHATS: RecentChatItem[] = [
  {
    id: '1',
    title: 'BOE Analysis Chat',
    lastMessage: 'Can you show me the duty breakdown for...',
    timestamp: '2 min ago',
    isActive: true
  },
  {
    id: '2',
    title: 'Port Comparison',
    lastMessage: 'Generated comparison chart for Mumbai vs Chennai ports',
    timestamp: '1 hour ago'
  },
  {
    id: '3',
    title: 'Duty Summary',
    lastMessage: 'Monthly duty summary completed',
    timestamp: '3 hours ago'
  },
  {
    id: '4',
    title: 'High Value BOEs',
    lastMessage: 'Found 15 BOEs above ₹10 crores',
    timestamp: 'Yesterday'
  }
];

export const RecentChat = () => {
  return (
    <Card className={styles.Container}>
      <div className={styles.Header}>
        <h3 className={styles.Title}>Recent Chats</h3>
      </div>
      <div className={styles.ChatList}>
        {RECENT_CHATS.map((chat) => (
          <button
            key={chat.id}
            className={`${styles.ChatItem} ${chat.isActive ? styles.Active : ''}`}
          >
            <div className={styles.ChatHeader}>
              <span className={styles.ChatTitle}>{chat.title}</span>
              <span className={styles.Timestamp}>{chat.timestamp}</span>
            </div>
            <p className={styles.LastMessage}>{chat.lastMessage}</p>
          </button>
        ))}
      </div>
    </Card>
  );
};