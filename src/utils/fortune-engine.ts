import { TarotCard, TarotResult } from '../types';
import { tarotCards } from '../data/tarot-cards';

const gradeMap: Record<number, 'S' | 'A' | 'B' | 'C' | 'D'> = {
  0: 'A', 1: 'S', 2: 'B', 3: 'A', 4: 'C',
  5: 'A', 6: 'S', 7: 'B', 8: 'A', 9: 'B',
  10: 'S', 11: 'A', 12: 'C', 13: 'D', 14: 'A',
  15: 'D', 16: 'D', 17: 'S', 18: 'C', 19: 'S',
  20: 'A', 21: 'S',
};

const gradeScoreMap: Record<string, number> = {
  S: 95,
  A: 82,
  B: 68,
  C: 52,
  D: 38,
};

export function getTarotFortune(): TarotResult {
  const randomIndex = Math.floor(Math.random() * tarotCards.length);
  const card = tarotCards[randomIndex];
  const isReversed = Math.random() < 0.3;

  const reading = isReversed ? card.reversed : card.upright;
  const baseGrade = gradeMap[card.id] || 'B';
  const grade = isReversed
    ? (baseGrade === 'S' ? 'B' : baseGrade === 'A' ? 'C' : baseGrade === 'B' ? 'C' : 'D')
    : baseGrade;

  const baseScore = gradeScoreMap[grade];

  return {
    card,
    isReversed,
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
  };
}
