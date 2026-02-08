import React from 'react';
import { MysticEyeIcon } from './BrandIcons';
import CardFan from './CardFan';

interface HomeScreenProps {
  streak: number;
  dailyQuote: string;
  cardIds: number[];
  selectedIndex: number | null;
  onSelectCard: (index: number) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  streak,
  dailyQuote,
  cardIds,
  selectedIndex,
  onSelectCard,
}) => {
  return (
    <div className="home-screen">
      {streak > 0 && (
        <div className="streak-chip">
          연속 {streak}일째
        </div>
      )}

      <div className="hero-section">
        <div className="mystic-eye-hero">
          <MysticEyeIcon size={56} color="var(--accent)" />
        </div>
        <h2 className="hero-title">오늘의 카드를 골라보세요</h2>
      </div>

      <CardFan
        cardIds={cardIds}
        selectedIndex={selectedIndex}
        onSelect={onSelectCard}
      />

      <p className="daily-quote">"{dailyQuote}"</p>
    </div>
  );
};

export default HomeScreen;
