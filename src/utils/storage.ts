import { Storage } from '@apps-in-toss/web-framework';
import { TarotHistory, StreakData } from '../types';

const TODAY_CARD_KEY = 'tarot-pick-today-v2';
const HISTORY_KEY = 'tarot-pick-history-v2';
const STREAK_KEY = 'tarot-pick-streak';

function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
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

export async function saveTodayCard(
  cardId: number,
  isReversed: boolean,
  selectedIndex: number,
): Promise<void> {
  const today = getTodayString();
  const entry: TarotHistory = { date: today, cardId, isReversed, selectedIndex };

  try {
    await Storage.setItem(TODAY_CARD_KEY, JSON.stringify(entry));
  } catch {}

  await addToHistory(entry);
  await updateStreak();
}

async function addToHistory(entry: TarotHistory): Promise<void> {
  try {
    const history = await getHistory();
    const filtered = history.filter(h => h.date !== entry.date);
    filtered.unshift(entry);
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

export async function getStreak(): Promise<StreakData> {
  try {
    const stored = await Storage.getItem(STREAK_KEY);
    if (stored) {
      const data: StreakData = JSON.parse(stored);
      const today = getTodayString();
      const yesterday = getYesterdayString();

      if (data.lastDate === today) {
        return data;
      }
      if (data.lastDate === yesterday) {
        return { currentStreak: data.currentStreak, lastDate: data.lastDate };
      }
    }
  } catch {}
  return { currentStreak: 0, lastDate: '' };
}

async function updateStreak(): Promise<void> {
  try {
    const current = await getStreak();
    const today = getTodayString();
    const yesterday = getYesterdayString();

    let newStreak: number;
    if (current.lastDate === today) {
      return;
    } else if (current.lastDate === yesterday) {
      newStreak = current.currentStreak + 1;
    } else {
      newStreak = 1;
    }

    await Storage.setItem(
      STREAK_KEY,
      JSON.stringify({ currentStreak: newStreak, lastDate: today }),
    );
  } catch {}
}
