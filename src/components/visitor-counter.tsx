'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

interface VisitorCountResponse {
  count: number;
  isNewVisitor: boolean;
  error?: string;
}

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewVisitor, setIsNewVisitor] = useState(false);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitor-count', {
          method: 'GET',
          cache: 'no-store',
        });
        
        if (response.ok) {
          const data: VisitorCountResponse = await response.json();
          setVisitorCount(data.count);
          setIsNewVisitor(data.isNewVisitor);
        } else {
          console.error('Failed to fetch visitor count');
          setVisitorCount(0);
        }
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setVisitorCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Eye className="h-4 w-4" />
        <span>Loading visitors...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Eye className="h-4 w-4" />
      <span>
        {visitorCount !== null ? (
          <>
            <span className="font-medium">{visitorCount.toLocaleString()}</span>
            {' '}
            {visitorCount === 1 ? 'visitor' : 'visitors'}
            {isNewVisitor && (
              <span className="text-green-600 dark:text-green-400 ml-1">
                (Welcome! 👋)
              </span>
            )}
          </>
        ) : (
          'Unable to load visitor count'
        )}
      </span>
    </div>
  );
} 