import React, { useState, useCallback, useEffect } from 'react';
import { Screen, TarotResult } from './types';
import { getDailyCards, getCardReading, getDailyQuote } from './utils/fortune-engine';
import { saveTodayCard, hasPickedToday, getTodayCard, getStreak } from './utils/storage';
import { useInterstitialAd } from './hooks/useInterstitialAd';
import { DeviceViewport } from './components/DeviceViewport';
import HomeScreen from './components/HomeScreen';
import FlipScreen from './components/FlipScreen';
import ResultScreen from './components/ResultScreen';

const AD_GROUP_ID = 'ait-ad-test-interstitial-id';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [result, setResult] = useState<TarotResult | null>(null);
  const [cardIds, setCardIds] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [dailyQuote, setDailyQuote] = useState('');
  const [isReady, setIsReady] = useState(false);

  const { loading: adLoading, showInterstitialAd } = useInterstitialAd(AD_GROUP_ID);

  useEffect(() => {
    const init = async () => {
      const cards = getDailyCards();
      setCardIds(cards);
      setDailyQuote(getDailyQuote());

      const streakData = await getStreak();
      setStreak(streakData.currentStreak);

      const picked = await hasPickedToday();
      if (picked) {
        const todayCard = await getTodayCard();
        if (todayCard) {
          const reading = getCardReading(todayCard.cardId, todayCard.selectedIndex);
          setResult(reading);
          setSelectedIndex(todayCard.selectedIndex);
          setScreen('result');
        }
      }

      setIsReady(true);
    };
    init();
  }, []);

  const handleSelectCard = useCallback((index: number) => {
    setSelectedIndex(index);
    const cardId = cardIds[index];
    const reading = getCardReading(cardId, index);
    setResult(reading);

    setTimeout(() => {
      setScreen('flip');
    }, 500);
  }, [cardIds]);

  const handleFlipComplete = useCallback(async () => {
    if (!result) return;
    await saveTodayCard(result.card.id, result.isReversed, selectedIndex ?? 0);
    const streakData = await getStreak();
    setStreak(streakData.currentStreak);
    setScreen('result');
  }, [result, selectedIndex]);

  const handleRetry = useCallback(() => {
    showInterstitialAd({
      onDismiss: () => {
        setSelectedIndex(null);
        setScreen('home');

        const cards = getDailyCards();
        setCardIds(cards);

        setTimeout(() => {
          const randomIdx = Math.floor(Math.random() * 5);
          setSelectedIndex(randomIdx);
          const cardId = cards[randomIdx];
          const reading = getCardReading(cardId, randomIdx);
          setResult(reading);

          saveTodayCard(reading.card.id, reading.isReversed, randomIdx);

          setTimeout(() => {
            setScreen('flip');
          }, 300);
        }, 100);
      },
    });
  }, [showInterstitialAd]);

  if (!isReady) {
    return (
      <>
        <DeviceViewport />
        <div className="app">
          <div className="loading-screen">
            <div className="loading-orb"></div>
            <p className="loading-text">카드를 섞고 있습니다...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DeviceViewport />
      <div className="app">
        {/* Stars Background */}
        <div className="stars-bg">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={`star ${i % 5 === 0 ? 'large' : ''}`}
              style={{
                left: `${(i * 31.7 + 13) % 100}%`,
                top: `${(i * 23.3 + 7) % 100}%`,
                '--delay': `${(i * 0.7) % 5}s`,
                '--duration': `${2 + (i * 0.9) % 4}s`,
                '--max-opacity': `${0.3 + (i * 0.13) % 0.7}`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">타로 한 장</h1>
        </header>

        {/* Screens */}
        {screen === 'home' && (
          <HomeScreen
            streak={streak}
            dailyQuote={dailyQuote}
            cardIds={cardIds}
            selectedIndex={selectedIndex}
            onSelectCard={handleSelectCard}
          />
        )}

        {screen === 'flip' && result && (
          <FlipScreen
            result={result}
            onFlipComplete={handleFlipComplete}
          />
        )}

        {screen === 'result' && result && (
          <ResultScreen
            result={result}
            onRetry={handleRetry}
            adLoading={adLoading}
          />
        )}
      </div>
    </>
  );
};

export default App;
