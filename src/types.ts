export type Screen = 'home' | 'result';

export interface TarotCard {
  id: number;
  name: string;
  nameKr: string;
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
}

export interface TarotResult {
  card: TarotCard;
  isReversed: boolean;
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  keyword: string;
  description: string;
  advice: string;
  scores: {
    label: string;
    value: number;
  }[];
  luckyItems: {
    color: string;
    number: number;
    direction: string;
    time: string;
  };
}

export interface TarotHistory {
  date: string;
  cardId: number;
  isReversed: boolean;
  grade: string;
}
