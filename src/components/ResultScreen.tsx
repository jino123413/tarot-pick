import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TarotResult } from '../types';
import { tarotCards } from '../data/tarot-cards';
import {
  ElementRune,
  ArcanaRune,
  ShadowRune,
  HerbRune,
  BookOrnament,
  RitualCandleIcon,
  DirectionRibbon,
  RefreshIcon,
} from './BrandIcons';

/** 받침 유무로 "을/를" 선택 */
function eulReul(word: string): string {
  const last = word.charCodeAt(word.length - 1);
  if (last < 0xAC00 || last > 0xD7A3) return '을';
  return (last - 0xAC00) % 28 !== 0 ? '을' : '를';
}

interface ResultScreenProps {
  result: TarotResult;
  onRetry: () => void;
  adLoading: boolean;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRetry, adLoading }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const page = Math.round(el.scrollLeft / el.clientWidth);
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const cardImageSrc = `/cards/${result.card.id}.png`;
  const guardianCard = tarotCards.find(c => c.id === result.talismans.guardianId);

  return (
    <div className="result-screen-v2">
      {/* Horizontal swipe container */}
      <div className="result-pages" ref={scrollRef}>
        {/* ═══════ Page 1: Card ═══════ */}
        <div className="result-page page-card">
          <div className="page-card-bg">
            <img
              src={cardImageSrc}
              alt=""
              className="page-card-bg-img"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="page-card-bg-overlay" />
          </div>

          <div className="page-card-content">
            <div className="page-card-image-frame">
              <img
                src={cardImageSrc}
                alt={result.card.nameKr}
                className="page-card-image"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = 'none';
                  const p = t.parentElement;
                  if (p && !p.querySelector('.page-card-emoji-fallback')) {
                    const d = document.createElement('div');
                    d.className = 'page-card-emoji-fallback';
                    d.textContent = result.card.emoji;
                    p.appendChild(d);
                  }
                }}
              />
            </div>

            <div className="page-card-info">
              <span className="page-card-numeral">{result.card.romanNumeral}</span>
              <h2 className="page-card-name">{result.card.nameKr}</h2>
              <p className="page-card-eng">{result.card.name}</p>
              <div className="page-card-keyword-row">
                <span className="keyword-pill">{result.keyword}</span>
              </div>
              <div className="page-card-direction">
                <DirectionRibbon size={18} reversed={result.isReversed} color="var(--accent)" />
                <span>{result.isReversed ? '역방향' : '정방향'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ Page 2: Reading ═══════ */}
        <div className="result-page page-reading">
          <div className="page-reading-content">
            <BookOrnament width={240} size={12} color="var(--accent)" className="reading-ornament" />

            <div className="reading-body">
              <p className="reading-text">{result.description}</p>
            </div>

            <BookOrnament width={240} size={12} color="var(--accent)" className="reading-ornament" />

            <div className="reading-keywords">
              <span className="reading-keyword-label">키워드</span>
              <span className="keyword-pill">{result.keyword}</span>
            </div>
          </div>
        </div>

        {/* ═══════ Page 3: Fate Prescription ═══════ */}
        <div className="result-page page-energy">
          <div className="prescription-layout">
            {/* Decorative emblem (compact) */}
            <div className="prescription-emblem">
              <svg className="prescription-rings" viewBox="0 0 160 160" fill="none">
                <circle cx="80" cy="80" r="75" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" />
                <circle cx="80" cy="80" r="73" stroke="var(--accent)" strokeWidth="0.3" opacity="0.08" strokeDasharray="2 6" />
                <circle cx="80" cy="80" r="44" stroke="var(--accent)" strokeWidth="0.5" opacity="0.12" />
                {[0, 60, 120, 180, 240, 300].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  const x = 80 + 75 * Math.cos(rad - Math.PI / 2);
                  const y = 80 + 75 * Math.sin(rad - Math.PI / 2);
                  return <circle key={deg} cx={x} cy={y} r="1.2" fill="var(--accent)" opacity="0.2" />;
                })}
              </svg>
              <div className="prescription-card-circle">
                <img
                  src={cardImageSrc}
                  alt={result.card.nameKr}
                  className="prescription-card-img"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <span className="prescription-card-label">
                {result.card.romanNumeral} · {result.card.nameKr}
              </span>

              {/* Decorative talisman icons on ring (small, semi-transparent) */}
              <div className="ring-icon ring-icon-n"><ElementRune size={18} /></div>
              <div className="ring-icon ring-icon-e"><ArcanaRune size={18} /></div>
              <div className="ring-icon ring-icon-s"><ShadowRune size={18} /></div>
              <div className="ring-icon ring-icon-w"><HerbRune size={18} /></div>
            </div>

            {/* Storytelling prescription text */}
            <div className="prescription-card">
              <BookOrnament width={200} size={10} color="var(--accent)" className="reading-ornament" />

              <h3 className="prescription-title">운명의 처방</h3>

              <p className="prescription-main">
                오늘 당신을 수호하는{' '}
                <strong className="highlight-purple">{result.talismans.guardian}</strong>의 기운이{' '}
                <strong className="highlight-amber">{result.talismans.element}</strong>의 원소를 통해 발현될 것입니다.
              </p>

              <div className="prescription-divider" />

              <div className="prescription-warnings">
                <p className="prescription-warn">
                  <span className="warn-icon">◈</span>
                  <span><strong className="highlight-red">{result.talismans.shadow}</strong>의 그림자를 경계하세요</span>
                </p>
                <p className="prescription-remedy">
                  <span className="remedy-icon">✦</span>
                  <span><strong className="highlight-green">{result.talismans.ingredient}</strong>{eulReul(result.talismans.ingredient)} 활용한 정화 의식을 권합니다</span>
                </p>
              </div>

              <BookOrnament width={200} size={10} color="var(--accent)" className="reading-ornament" />
            </div>
          </div>
        </div>

        {/* ═══════ Page 4: Ritual + Retry ═══════ */}
        <div className="result-page page-ritual">
          <div className="page-ritual-content">
            <div className="ritual-icon-wrapper">
              <RitualCandleIcon size={48} color="var(--accent)" />
            </div>
            <h3 className="ritual-title">오늘의 의식</h3>
            <p className="ritual-text">{result.ritual}</p>

            <div className="ritual-divider" />

            <div className="retry-section">
              <button
                className="btn-retry-v2"
                onClick={onRetry}
                disabled={adLoading}
              >
                <RefreshIcon size={18} color="currentColor" />
                다른 카드 뽑기
                <span className="ad-badge">AD</span>
              </button>
              <p className="ad-notice">광고 시청 후 다른 카드를 뽑을 수 있습니다</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="dot-indicators">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`dot ${currentPage === i ? 'dot-active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultScreen;
