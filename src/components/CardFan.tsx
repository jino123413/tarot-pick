import React from 'react';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';
import clsx from 'clsx';
import { TarotCardBackPattern } from './BrandIcons';

interface CardFanProps {
  cardIds: number[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

const ROTATIONS = [-15, -7.5, 0, 7.5, 15];

const CardFan: React.FC<CardFanProps> = ({ cardIds, selectedIndex, onSelect }) => {
  const handleTap = (index: number) => {
    if (selectedIndex !== null) return;
    try {
      generateHapticFeedback({ type: 'softMedium' });
    } catch {}
    onSelect(index);
  };

  return (
    <div className="card-fan-container">
      <div className="card-fan">
        {cardIds.map((_, index) => {
          const isSelected = selectedIndex === index;
          const hasSelection = selectedIndex !== null;

          return (
            <div
              key={index}
              className={clsx(
                'fan-card',
                isSelected && 'fan-card-selected',
                hasSelection && !isSelected && 'fan-card-dimmed',
              )}
              style={{
                '--rotation': `${ROTATIONS[index]}deg`,
                '--index': index,
              } as React.CSSProperties}
              onClick={() => handleTap(index)}
            >
              <TarotCardBackPattern width={90} height={130} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardFan;
