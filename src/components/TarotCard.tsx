import React, { useState, useCallback } from 'react';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';
import { TarotResult } from '../types';
import { TarotCardBackPattern, ReversedIcon, TapHandIcon } from './BrandIcons';

interface TarotCardProps {
  result: TarotResult | null;
  onFlip: () => void;
  flipped: boolean;
}

const TarotCard: React.FC<TarotCardProps> = ({ result, onFlip, flipped }) => {
  const [hintActive, setHintActive] = useState(true);

  const handleTap = useCallback(() => {
    if (flipped) return;
    setHintActive(false);
    try {
      generateHapticFeedback({ type: 'softMedium' });
    } catch {}
    onFlip();
  }, [flipped, onFlip]);

  return (
    <div className="tarot-section">
      <div className="tarot-container" onClick={handleTap}>
        <div className={`tarot-card ${flipped ? 'flipped' : ''} ${hintActive && !flipped ? 'hint' : ''}`}>
          {/* Back face (visible initially) */}
          <div className="tarot-back">
            <div className="tarot-back-pattern">
              <TarotCardBackPattern width={180} height={260} />
            </div>
          </div>

          {/* Front face (visible after flip) */}
          <div className="tarot-front">
            {result && (
              <>
                <div className="tarot-front-emoji">{result.card.emoji}</div>
                <div className="tarot-front-name">{result.card.nameKr}</div>
                <div className="tarot-front-eng">{result.card.name}</div>
                <div className="tarot-front-keyword">{result.keyword}</div>
                {result.isReversed && (
                  <div className="tarot-front-reversed">
                    <ReversedIcon size={16} /> 역방향
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {!flipped && (
        <p className="tarot-instruction">
          <TapHandIcon size={18} /> 카드를 탭하여 뒤집어 보세요
        </p>
      )}
    </div>
  );
};

export default TarotCard;
