import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

/* ─────────────── Alchemy Symbols (Energy display) ─────────────── */

/** Scroll / open book — "핵심 메시지" */
export const ScrollSymbol: React.FC<IconProps & { glowLevel?: number }> = ({
  size = 24,
  color = 'currentColor',
  className,
  glowLevel = 3,
}) => {
  const opacity = 0.3 + (glowLevel / 5) * 0.7;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <filter id={`scroll-glow-${glowLevel}`}>
          <feGaussianBlur stdDeviation={glowLevel * 0.8} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#scroll-glow-${glowLevel})`} opacity={opacity}>
        <path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" stroke={color} strokeWidth="1.5" />
        <path d="M8 7h8M8 11h6M8 15h4" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      </g>
    </svg>
  );
};

/** Ancient key — "실현 가능성" */
export const KeySymbol: React.FC<IconProps & { glowLevel?: number }> = ({
  size = 24,
  color = 'currentColor',
  className,
  glowLevel = 3,
}) => {
  const opacity = 0.3 + (glowLevel / 5) * 0.7;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <filter id={`key-glow-${glowLevel}`}>
          <feGaussianBlur stdDeviation={glowLevel * 0.8} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#key-glow-${glowLevel})`} opacity={opacity}>
        <circle cx="8" cy="8" r="4.5" stroke={color} strokeWidth="1.5" />
        <circle cx="8" cy="8" r="2" stroke={color} strokeWidth="1" opacity="0.6" />
        <path d="M12 12l8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17 17l2-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 19l2-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
};

/** Third eye — "직감의 힘" */
export const ThirdEyeSymbol: React.FC<IconProps & { glowLevel?: number }> = ({
  size = 24,
  color = 'currentColor',
  className,
  glowLevel = 3,
}) => {
  const opacity = 0.3 + (glowLevel / 5) * 0.7;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <filter id={`eye-glow-${glowLevel}`}>
          <feGaussianBlur stdDeviation={glowLevel * 0.8} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#eye-glow-${glowLevel})`} opacity={opacity}>
        <path d="M12 5C6 5 2 12 2 12s4 7 10 7 10-7 10-7-4-7-10-7Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
        <circle cx="12" cy="12" r="1.2" fill={color} />
        <line x1="12" y1="2" x2="12" y2="5" stroke={color} strokeWidth="1.2" />
        <line x1="12" y1="19" x2="12" y2="22" stroke={color} strokeWidth="1.2" />
      </g>
    </svg>
  );
};

/* ─────────────── Talisman Rune Symbols (color-coded) ─────────────── */

/** Element rune — 원소 (amber/gold) */
export const ElementRune: React.FC<IconProps> = ({ size = 24, color = '#F5A623', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <filter id="elem-glow">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <g filter="url(#elem-glow)">
      <path d="M12 3L18 14H6L12 3Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill={color} fillOpacity="0.1" />
      <circle cx="12" cy="16" r="2" stroke={color} strokeWidth="1" opacity="0.6" />
      <path d="M12 14v-3" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </g>
  </svg>
);

/** Arcana rune — 수호 아르카나 (regal purple) */
export const ArcanaRune: React.FC<IconProps> = ({ size = 24, color = '#B08ED5', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <filter id="arcana-glow">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <g filter="url(#arcana-glow)">
      <rect x="6" y="2" width="12" height="20" rx="2" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.08" />
      <path d="M12 7l2.5 1.5v3L12 13l-2.5-1.5v-3L12 7Z" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.15" />
      <circle cx="12" cy="17" r="1.5" fill={color} opacity="0.5" />
    </g>
  </svg>
);

/** Shadow rune — 피해야 할 그림자 (muted red) */
export const ShadowRune: React.FC<IconProps> = ({ size = 24, color = '#E85D5D', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <filter id="shadow-glow">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <g filter="url(#shadow-glow)">
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1" opacity="0.25" />
      <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <path d="M9 9l1.5 1.5M13.5 13.5L15 15M15 9l-1.5 1.5M10.5 13.5L9 15" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <circle cx="12" cy="12" r="1.5" fill={color} opacity="0.7" />
    </g>
  </svg>
);

/** Herb rune — 의식 재료 (sage green) */
export const HerbRune: React.FC<IconProps> = ({ size = 24, color = '#7BC794', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <filter id="herb-glow">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <g filter="url(#herb-glow)">
      <path d="M12 22V10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 14c-4-4-7-2-7.5 0.5s2 5.5 4.5 4.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.08" />
      <path d="M12 10c4-4 7-2 7.5 0.5s-2 5.5-4.5 4.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.08" />
      <path d="M12 7c-2.5-3.5-5-2.5-5.5-0.5s1 4 3 4.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <circle cx="12" cy="5" r="1" fill={color} opacity="0.5" />
    </g>
  </svg>
);

/* ─────────────── Decorative / Utility ─────────────── */

/** Book ornament — page divider (古서 장식) */
export const BookOrnament: React.FC<IconProps & { width?: number }> = ({
  size = 12,
  width = 200,
  color = 'currentColor',
  className,
}) => (
  <svg width={width} height={size} viewBox={`0 0 ${width} ${size}`} fill="none" className={className}>
    <line x1="0" y1={size / 2} x2={width * 0.35} y2={size / 2} stroke={color} strokeWidth="0.8" opacity="0.3" />
    <circle cx={width * 0.4} cy={size / 2} r="1.5" fill={color} opacity="0.5" />
    <path d={`M${width * 0.44},${size / 2} l${width * 0.03},-${size * 0.25} ${width * 0.03},${size * 0.25} ${width * 0.03},${size * 0.25} -${width * 0.03},-${size * 0.25}Z`} fill={color} opacity="0.4" />
    <circle cx={width * 0.5} cy={size / 2} r="2" fill={color} opacity="0.6" />
    <path d={`M${width * 0.53},${size / 2} l${width * 0.03},-${size * 0.25} ${width * 0.03},${size * 0.25} ${width * 0.03},${size * 0.25} -${width * 0.03},-${size * 0.25}Z`} fill={color} opacity="0.4" />
    <circle cx={width * 0.6} cy={size / 2} r="1.5" fill={color} opacity="0.5" />
    <line x1={width * 0.65} y1={size / 2} x2={width} y2={size / 2} stroke={color} strokeWidth="0.8" opacity="0.3" />
  </svg>
);

/** Ritual candle icon */
export const RitualCandleIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="9" y="10" width="6" height="11" rx="1" stroke={color} strokeWidth="1.5" />
    <path d="M12 10V7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 3c1.5 1 2 2.5 1.5 4-.3.8-1 1.2-1.5 1.2s-1.2-.4-1.5-1.2C10 5.5 10.5 4 12 3Z" fill={color} opacity="0.8" />
    <line x1="9" y1="15" x2="15" y2="15" stroke={color} strokeWidth="0.8" opacity="0.4" />
  </svg>
);

/** Direction ribbon (정/역방향) */
export const DirectionRibbon: React.FC<IconProps & { reversed?: boolean }> = ({
  size = 24,
  color = 'currentColor',
  className,
  reversed = false,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    {reversed ? (
      <g>
        <path d="M7 4h10l-3 4 3 4H7V4Z" fill={color} opacity="0.15" />
        <path d="M7 4h10l-3 4 3 4H7V4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 18l-2-2h4l-2 2Z" fill={color} opacity="0.5" />
        <path d="M12 14v4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      </g>
    ) : (
      <g>
        <path d="M7 4h10l-3 4 3 4H7V4Z" fill={color} opacity="0.15" />
        <path d="M7 4h10l-3 4 3 4H7V4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 14l-2 2h4l-2-2Z" fill={color} opacity="0.5" />
        <path d="M12 14v4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      </g>
    )}
  </svg>
);

/* ─────────────── Kept from original ─────────────── */

/** MysticEye — hero motif */
export const MysticEyeIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 5C6 5 2 12 2 12s4 7 10 7 10-7 10-7-4-7-10-7Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.2" fill={color} />
    <line x1="12" y1="2" x2="12" y2="5" stroke={color} strokeWidth="1.2" />
    <line x1="12" y1="19" x2="12" y2="22" stroke={color} strokeWidth="1.2" />
  </svg>
);

/** Refresh/retry icon */
export const RefreshIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 12a8 8 0 0 1 14.3-4.8L20 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 5v4h-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 12a8 8 0 0 1-14.3 4.8L4 19" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 19v-4h4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Decorative card-back pattern — mystic eye with geometric frame */
interface CardBackProps {
  width?: number;
  height?: number;
  className?: string;
}

export const TarotCardBackPattern: React.FC<CardBackProps> = ({
  width = 180,
  height = 260,
  className,
}) => {
  const accent = '#D4A574';
  const bg = '#6A1B4D';
  const cx = width / 2;
  const cy = height / 2;
  const scale = Math.min(width, height) / 260;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" className={className}>
      <rect width={width} height={height} rx={12 * scale} fill={bg} />
      <rect x={8 * scale} y={8 * scale} width={width - 16 * scale} height={height - 16 * scale} rx={8 * scale} stroke={accent} strokeWidth={1.5 * scale} fill="none" />
      <rect x={18 * scale} y={18 * scale} width={width - 36 * scale} height={height - 36 * scale} rx={6 * scale} stroke={accent} strokeWidth={1 * scale} fill="none" opacity="0.5" />
      {[
        [28 * scale, 28 * scale],
        [width - 28 * scale, 28 * scale],
        [28 * scale, height - 28 * scale],
        [width - 28 * scale, height - 28 * scale],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4 * scale} stroke={accent} strokeWidth={1 * scale} opacity="0.6" />
      ))}
      <circle cx={cx} cy={cy} r={42 * scale} stroke={accent} strokeWidth={1.2 * scale} opacity="0.3" />
      <circle cx={cx} cy={cy} r={34 * scale} stroke={accent} strokeWidth={1 * scale} opacity="0.5" />
      <line x1={28 * scale} y1={28 * scale} x2={width - 28 * scale} y2={height - 28 * scale} stroke={accent} strokeWidth={0.5 * scale} opacity="0.15" />
      <line x1={width - 28 * scale} y1={28 * scale} x2={28 * scale} y2={height - 28 * scale} stroke={accent} strokeWidth={0.5 * scale} opacity="0.15" />
      <line x1={cx} y1={28 * scale} x2={cx} y2={height - 28 * scale} stroke={accent} strokeWidth={0.5 * scale} opacity="0.15" />
      <line x1={28 * scale} y1={cy} x2={width - 28 * scale} y2={cy} stroke={accent} strokeWidth={0.5 * scale} opacity="0.15" />
      <ellipse cx={cx} cy={cy} rx={24 * scale} ry={14 * scale} stroke={accent} strokeWidth={1.5 * scale} />
      <circle cx={cx} cy={cy} r={8 * scale} stroke={accent} strokeWidth={1.2 * scale} />
      <circle cx={cx} cy={cy} r={4 * scale} fill={accent} />
      <line x1={cx} y1={cy - 20 * scale} x2={cx} y2={cy - 34 * scale} stroke={accent} strokeWidth={1 * scale} opacity="0.7" />
      <line x1={cx} y1={cy + 20 * scale} x2={cx} y2={cy + 34 * scale} stroke={accent} strokeWidth={1 * scale} opacity="0.7" />
    </svg>
  );
};
