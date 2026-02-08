export type Screen = 'home' | 'flip' | 'result';

export interface TarotCard {
  id: number;
  name: string;
  nameKr: string;
  romanNumeral: string;
  emoji: string;
  upright: {
    keyword: string;
    description: string;
    advice: string;
  };
  reversed: {
    keyword: string;
    description: string;
    advice: string;
  };
  ritual: string;
}

export interface Talisman {
  element: string;
  elementSymbol: string;
  guardian: string;
  guardianId: number;
  shadow: string;
  ingredient: string;
}

export interface Energy {
  insight: number;   // 직감의 힘 (1-5)
  manifest: number;  // 실현 가능성 (1-5)
  message: number;   // 핵심 메시지 (1-5)
}

export interface TarotResult {
  card: TarotCard;
  isReversed: boolean;
  keyword: string;
  description: string;
  advice: string;
  energy: Energy;
  talismans: Talisman;
  ritual: string;
}

export interface TarotHistory {
  date: string;
  cardId: number;
  isReversed: boolean;
  selectedIndex: number;
}

export interface StreakData {
  currentStreak: number;
  lastDate: string;
}
