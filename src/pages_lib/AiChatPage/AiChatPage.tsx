import { QuickQueries } from './QuickQueries/QuickQueries';
import { RecentChat } from './RecentChat/RecentChat';
import { ChatRoom } from './ChatRoom/ChatRoom';
import styles from './AiChatPage.module.css';

export const AiChatPage = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.LeftSidebar}>
        <QuickQueries />
        <RecentChat />
      </div>
      <div className={styles.RightSection}>
        <ChatRoom />
      </div>
    </div>
  );
};