import React from 'react';
import { TarotResult } from '../types';
import {
  KeywordIcon,
  EnergyChartIcon,
  SparkleIcon,
  RefreshIcon,
  LuckyColorIcon,
  LuckyNumberIcon,
  LuckyCompassIcon,
  LuckyClockIcon,
  AdviceIcon,
} from './BrandIcons';

interface ResultScreenProps {
  result: TarotResult;
  onRetry: () => void;
  adLoading: boolean;
}

const gradeLabels: Record<string, string> = {
  S: '최고의 카드',
  A: '좋은 카드',
  B: '무난한 카드',
  C: '주의가 필요한 카드',
  D: '경계가 필요한 카드',
};

const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRetry, adLoading }) => {
  return (
    <div className="result-screen">
      {/* Grade Card */}
      <div className="result-card">
        <div className="result-card-header">
          <span className="result-direction-badge">
            {result.isReversed ? '역방향' : '정방향'}
          </span>
        </div>

        <div className={`result-grade grade-${result.grade}`}>
          {result.grade}
        </div>
        <div className="result-grade-label">{gradeLabels[result.grade]}</div>

        <div className="result-card-info">
          <span className="result-emoji">{result.card.emoji}</span>
          <h2 className="result-title">
            {result.card.nameKr}
            {result.isReversed ? ' (역방향)' : ''}
          </h2>
          <p className="result-eng-name">{result.card.name}</p>
          <div className="result-keyword">
            <KeywordIcon size={18} />
            {result.keyword}
          </div>
        </div>

        {/* Description */}
        <div className="result-description">
          <p>{result.description}</p>
        </div>
      </div>

      {/* Scores Section */}
      <div className="result-section">
        <h3 className="section-title">
          <EnergyChartIcon size={20} />
          에너지 분석
        </h3>
        <div className="scores-list">
          {result.scores.map((score, idx) => (
            <div className="score-row" key={idx}>
              <span className="score-label">{score.label}</span>
              <div className="score-bar-bg">
                <div
                  className="score-bar-fill"
                  style={{ width: `${score.value}%` }}
                />
              </div>
              <span className="score-value">{score.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lucky Items */}
      <div className="result-section">
        <h3 className="section-title">
          <SparkleIcon size={20} />
          행운 아이템
        </h3>
        <div className="lucky-grid">
          <div className="lucky-item">
            <div className="lucky-item-icon"><LuckyColorIcon size={28} color="#D4A574" /></div>
            <div className="lucky-item-label">행운의 색</div>
            <div className="lucky-item-value">{result.luckyItems.color}</div>
          </div>
          <div className="lucky-item">
            <div className="lucky-item-icon"><LuckyNumberIcon size={28} color="#D4A574" /></div>
            <div className="lucky-item-label">행운의 숫자</div>
            <div className="lucky-item-value">{result.luckyItems.number}</div>
          </div>
          <div className="lucky-item">
            <div className="lucky-item-icon"><LuckyCompassIcon size={28} color="#D4A574" /></div>
            <div className="lucky-item-label">행운의 방향</div>
            <div className="lucky-item-value">{result.luckyItems.direction}</div>
          </div>
          <div className="lucky-item">
            <div className="lucky-item-icon"><LuckyClockIcon size={28} color="#D4A574" /></div>
            <div className="lucky-item-label">행운의 시간</div>
            <div className="lucky-item-value">{result.luckyItems.time}</div>
          </div>
        </div>
      </div>

      {/* Advice */}
      <div className="result-section">
        <div className="advice-card">
          <div className="advice-icon"><AdviceIcon size={28} color="#D4A574" /></div>
          <div className="advice-content">
            <div className="advice-label">오늘의 조언</div>
            <p className="advice-text">{result.advice}</p>
          </div>
        </div>
      </div>

      {/* Retry Button */}
      <div className="button-group">
        <button
          className="btn-retry"
          onClick={onRetry}
          disabled={adLoading}
        >
          <RefreshIcon size={18} />
          다른 카드 뽑기
          <span className="ad-badge">AD</span>
        </button>
        <p className="ad-notice">광고 시청 후 다른 카드를 뽑을 수 있습니다</p>
      </div>
    </div>
  );
};

export default ResultScreen;
