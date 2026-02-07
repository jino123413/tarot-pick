import React, { useState, useCallback, useEffect } from 'react';
import { GoogleAdMob } from '@apps-in-toss/web-framework';
import { Screen, TarotResult } from './types';
import { getTarotFortune } from './utils/fortune-engine';
import { saveTodayCard, hasPickedToday, getTodayCard } from './utils/storage';
import { tarotCards } from './data/tarot-cards';
import { DeviceViewport } from './components/DeviceViewport';
import TarotCard from './components/TarotCard';
import ResultScreen from './components/ResultScreen';

const AD_GROUP_ID = 'ait-ad-test-interstitial-id';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [result, setResult] = useState<TarotResult | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [adLoading, setAdLoading] = useState(false);
  const [pickedToday, setPickedToday] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Check if user already picked today
  useEffect(() => {
    const init = async () => {
      const picked = await hasPickedToday();
      setPickedToday(picked);

      if (picked) {
        // Restore today's card
        const todayCard = await getTodayCard();
        if (todayCard) {
          const card = tarotCards.find(c => c.id === todayCard.cardId);
          if (card) {
            const reading = todayCard.isReversed ? card.reversed : card.upright;
            const gradeScoreMap: Record<string, number> = { S: 95, A: 82, B: 68, C: 52, D: 38 };
            const grade = todayCard.grade as TarotResult['grade'];
            const baseScore = gradeScoreMap[grade];

            setResult({
              card,
              isReversed: todayCard.isReversed,
              grade,
              keyword: reading.keyword,
              description: reading.description,
              advice: reading.advice,
              scores: [
                { label: '핵심 메시지', value: baseScore },
                { label: '실현 가능성', value: Math.max(20, baseScore + Math.floor(Math.random() * 20 - 10)) },
                { label: '에너지', value: Math.max(20, baseScore + Math.floor(Math.random() * 20 - 10)) },
              ],
              luckyItems: {
                color: ['보라', '남색', '금색', '은색', '흰색'][card.id % 5],
                number: (card.id * 3 + 7) % 45 + 1,
                direction: ['동', '서', '남', '북'][card.id % 4],
                time: ['오전 6시', '오전 10시', '오후 2시', '오후 6시', '오후 10시'][card.id % 5],
              },
            });
            setFlipped(true);
            setShowResult(true);
            setScreen('result');
          }
        }
      }

      setIsReady(true);
    };
    init();
  }, []);

  // Prepare the first draw
  const prepareDraw = useCallback(() => {
    const fortune = getTarotFortune();
    setResult(fortune);
    setFlipped(false);
    setShowResult(false);
    setScreen('home');
  }, []);

  useEffect(() => {
    if (isReady && !pickedToday && !result) {
      prepareDraw();
    }
  }, [isReady, pickedToday, result, prepareDraw]);

  const handleFlip = useCallback(async () => {
    if (!result) return;
    setFlipped(true);

    // Save today's card
    await saveTodayCard(result.card.id, result.isReversed, result.grade);
    setPickedToday(true);

    // Show result after flip animation completes
    setTimeout(() => {
      setShowResult(true);
      setScreen('result');
    }, 1000);
  }, [result]);

  const handleRetry = useCallback(async () => {
    setAdLoading(true);
    try {
      await GoogleAdMob.showInterstitialAd({ adGroupId: AD_GROUP_ID });
    } catch {}
    setAdLoading(false);

    // Draw a new card
    const fortune = getTarotFortune();
    setResult(fortune);
    setFlipped(false);
    setShowResult(false);
    setScreen('home');

    // Save the new card
    await saveTodayCard(fortune.card.id, fortune.isReversed, fortune.grade);
  }, []);

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
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                '--delay': `${Math.random() * 5}s`,
                '--duration': `${2 + Math.random() * 4}s`,
                '--max-opacity': `${0.3 + Math.random() * 0.7}`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">타로 한 장</h1>
          <p className="app-subtitle">매일 한 장의 타로카드</p>
        </header>

        {/* Main Content */}
        {screen === 'home' && (
          <div className="home-screen">
            <TarotCard
              result={result}
              onFlip={handleFlip}
              flipped={flipped}
            />
          </div>
        )}

        {screen === 'result' && showResult && result && (
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
