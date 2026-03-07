"use client";

import Card from '@/components/Card';
import styles from './QuickQueries.module.css';

interface QuickQueryItem {
  id: string;
  icon: string;
  title: string;
  description?: string;
  onClick?: () => void;
}

const QUICK_QUERIES: QuickQueryItem[] = [
  {
    id: 'monthly-duty',
    icon: '📊',
    title: 'Show monthly duty summary',
    onClick: () => console.log('Monthly duty summary clicked')
  },
  {
    id: 'pending-svb',
    icon: '🔍',
    title: 'Find BOEs with pending SVB',
    onClick: () => console.log('Pending SVB BOEs clicked')
  },
  {
    id: 'compare-duty',
    icon: '📈',
    title: 'Compare duty by port',
    onClick: () => console.log('Compare duty by port clicked')
  },
  {
    id: 'high-value-boes',
    icon: '💰',
    title: 'Top 10 high-value BOEs',
    onClick: () => console.log('Top 10 high-value BOEs clicked')
  }
];

export const QuickQueries = () => {
  return (
    <Card className={styles.Container}>
      <div className={styles.Header}>
        <h3 className={styles.Title}>Quick Queries</h3>
      </div>
      <div className={styles.QueryList}>
        {QUICK_QUERIES.map((query) => (
          <button
            key={query.id}
            className={styles.QueryCard}
            onClick={query.onClick}
          >
            <span className={styles.Icon}>{query.icon}</span>
            <span className={styles.QueryTitle}>{query.title}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};