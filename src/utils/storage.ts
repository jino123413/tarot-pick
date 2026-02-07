import { Storage } from '@apps-in-toss/web-framework';
import { TarotHistory } from '../types';

const TODAY_CARD_KEY = 'tarot-pick-today';
const HISTORY_KEY = 'tarot-pick-history';

function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export async function getTodayCard(): Promise<TarotHistory | null> {
  try {
    const stored = await Storage.getItem(TODAY_CARD_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.date === getTodayString()) {
        return parsed;
      }
    }
  } catch {}
  return null;
}

export async function saveTodayCard(cardId: number, isReversed: boolean, grade: string): Promise<void> {
  const today = getTodayString();
  const entry: TarotHistory = { date: today, cardId, isReversed, grade };

  try {
    await Storage.setItem(TODAY_CARD_KEY, JSON.stringify(entry));
  } catch {}

  // Also add to history
  await addToHistory(entry);
}

async function addToHistory(entry: TarotHistory): Promise<void> {
  try {
    const history = await getHistory();
    // Avoid duplicate for same date
    const filtered = history.filter(h => h.date !== entry.date);
    filtered.unshift(entry);
    // Keep last 30 entries
    const trimmed = filtered.slice(0, 30);
    await Storage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch {}
}

export async function getHistory(): Promise<TarotHistory[]> {
  try {
    const stored = await Storage.getItem(HISTORY_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}
  return [];
}

export async function hasPickedToday(): Promise<boolean> {
  const card = await getTodayCard();
  return card !== null;
}
