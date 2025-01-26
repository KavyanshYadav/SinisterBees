import React from 'react';
import { cn } from '../../../utils/cn';
import { useTheme } from '../../../context/ThemeContext';

const cardThemes = {
  light: {
    container:
      'bg-notion-light-background text-notion-light-textPrimary border border-notion-light-border shadow-sm',
    header: 'text-notion-light-textSecondary font-semibold mb-2',
    body: 'text-notion-light-textPrimary',
  },
  dark: {
    container:
      'bg-notion-dark-background text-notion-dark-textPrimary border border-notion-dark-border shadow-md',
    header: 'text-notion-dark-textSecondary font-semibold mb-2',
    body: 'text-notion-dark-textPrimary',
  },
};

const cardSizes = {};

interface NotionCardProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const NotionCard: React.FC<NotionCardProps> = ({
  header,
  children,
  size = 'md',
  className = '',
  onClick,
}) => {
  const { theme } = useTheme();

  const themeClasses = cardThemes[theme] || cardThemes.light;

  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden w-52 aspect-video  transition-all cursor-pointer',
        themeClasses.container,
        cardSizes[size],
        className,
      )}
      onClick={onClick}
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1459373176/vector/abstract-defocused-background-spring-summer-sea.jpg?s=612x612&w=0&k=20&c=P6D1VrXeeKsJfyKzlJeIqxyNXkeYtMb6C1mW6p68xro=')",
      }}
    >
      {/* {<img className='aspect-video h-32  object-cover' style={{objectPosition:"top"}} src="https://media.istockphoto.com/id/1459373176/vector/abstract-defocused-background-spring-summer-sea.jpg?s=612x612&w=0&k=20&c=P6D1VrXeeKsJfyKzlJeIqxyNXkeYtMb6C1mW6p68xro="></img>} */}
      {header && (
        <div className={cn('card-header', themeClasses.header)}>{header}</div>
      )}
      <div className={cn('card-body', themeClasses.body)}>{children}</div>
    </div>
  );
};

export default NotionCard;
