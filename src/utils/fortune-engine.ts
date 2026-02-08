import { TarotResult, Energy, Talisman } from '../types';
import { tarotCards } from '../data/tarot-cards';
import { dailyQuotes } from '../data/daily-quotes';

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = ((s * 1664525 + 1013904223) & 0x7fffffff);
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getDailyCards(): number[] {
  const today = getTodayString();
  const seed = hashCode(today + 'tarot-fan');
  const allIds = tarotCards.map(c => c.id);
  const shuffled = seededShuffle(allIds, seed);
  return shuffled.slice(0, 5);
}

const elements = ['불', '물', '공기', '흙'];
const elementSymbols = ['🔥', '💧', '🌬️', '🪨'];
const shadows = ['집착', '의심', '분노', '두려움', '질투', '게으름', '자만', '후회', '불안', '고립'];
const ingredients = ['라벤더', '소금', '달빛', '양초', '로즈마리', '수정', '백단향', '장미', '세이지', '계피'];

export function getCardReading(cardId: number, selectedIndex: number): TarotResult {
  const today = getTodayString();
  const card = tarotCards.find(c => c.id === cardId)!;

  const reversedHash = hashCode(today + 'reversed' + cardId);
  const isReversed = (reversedHash % 100) < 30;

  const reading = isReversed ? card.reversed : card.upright;

  const eHash1 = hashCode(today + 'insight' + cardId);
  const eHash2 = hashCode(today + 'manifest' + cardId);
  const eHash3 = hashCode(today + 'message' + cardId);
  const energy: Energy = {
    insight: (eHash1 % 5) + 1,
    manifest: (eHash2 % 5) + 1,
    message: (eHash3 % 5) + 1,
  };

  const elemHash = hashCode(today + 'element' + cardId);
  const elemIdx = elemHash % 4;
  const guardianHash = hashCode(today + 'guardian' + cardId);
  const guardianId = guardianHash % 22;
  const guardian = guardianId === cardId
    ? tarotCards[(guardianId + 1) % 22]
    : tarotCards[guardianId];
  const shadowHash = hashCode(today + 'shadow' + cardId);
  const ingredientHash = hashCode(today + 'ingredient' + cardId);

  const talismans: Talisman = {
    element: elements[elemIdx],
    elementSymbol: elementSymbols[elemIdx],
    guardian: guardian.nameKr,
    guardianId: guardian.id,
    shadow: shadows[shadowHash % shadows.length],
    ingredient: ingredients[ingredientHash % ingredients.length],
  };

  return {
    card,
    isReversed,
    keyword: reading.keyword,
    description: reading.description,
    advice: reading.advice,
    energy,
    talismans,
    ritual: card.ritual,
  };
}

export function getDailyQuote(): string {
  const today = getTodayString();
  const idx = hashCode(today + 'quote') % dailyQuotes.length;
  return dailyQuotes[idx];
}
