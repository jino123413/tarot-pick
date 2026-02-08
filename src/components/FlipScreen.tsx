import React, { useEffect, useState } from 'react';
import { TarotResult } from '../types';
import { TarotCardBackPattern } from './BrandIcons';

interface FlipScreenProps {
  result: TarotResult;
  onFlipComplete: () => void;
}

const FlipScreen: React.FC<FlipScreenProps> = ({ result, onFlipComplete }) => {
  const [flipped, setFlipped] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const flipTimer = setTimeout(() => setFlipped(true), 600);
    const infoTimer = setTimeout(() => setShowInfo(true), 1400);
    const completeTimer = setTimeout(() => onFlipComplete(), 3000);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(infoTimer);
      clearTimeout(completeTimer);
    };
  }, [onFlipComplete]);

  const cardImageSrc = `/cards/${result.card.id}.png`;

  return (
    <div className="flip-screen">
      <div className="flip-card-wrapper">
        <div className={`flip-card-3d ${flipped ? 'flipped' : ''}`}>
          {/* Back */}
          <div className="flip-card-face flip-card-back">
            <TarotCardBackPattern width={220} height={330} />
          </div>
          {/* Front */}
          <div className="flip-card-face flip-card-front">
            <img
              src={cardImageSrc}
              alt={result.card.nameKr}
              className="flip-card-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.flip-card-emoji')) {
                  const emoji = document.createElement('div');
                  emoji.className = 'flip-card-emoji';
                  emoji.textContent = result.card.emoji;
                  parent.appendChild(emoji);
                }
              }}
            />
            <div className="flip-card-name-overlay">
              <span className="flip-card-numeral">{result.card.romanNumeral}</span>
              <span className="flip-card-kr">{result.card.nameKr}</span>
            </div>
          </div>
        </div>
      </div>

      {showInfo && (
        <div className="flip-info">
          <p className="flip-announce">당신이 고른 카드는...</p>
          <p className="flip-card-title">
            {result.card.romanNumeral} · {result.card.nameKr} · {result.isReversed ? '역방향' : '정방향'}
          </p>
        </div>
      )}
    </div>
  );
};

export default FlipScreen;
