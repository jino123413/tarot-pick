import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

/** A tarot card shape with an eye symbol */
export const TarotCardIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="2" width="14" height="20" rx="2" stroke={color} strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="4" ry="2.5" stroke={color} strokeWidth="1.2" />
    <circle cx="12" cy="12" r="1.2" fill={color} />
  </svg>
);

/** An all-seeing eye — mystic occult motif */
export const MysticEyeIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 5C6 5 2 12 2 12s4 7 10 7 10-7 10-7-4-7-10-7Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.2" fill={color} />
    <line x1="12" y1="2" x2="12" y2="5" stroke={color} strokeWidth="1.2" />
    <line x1="12" y1="19" x2="12" y2="22" stroke={color} strokeWidth="1.2" />
  </svg>
);

/** Up/down arrows — reversed card indicator */
export const ReversedIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3l4 4h-3v4h-2V7H8l4-4Z" fill={color} />
    <path d="M12 21l-4-4h3v-4h2v4h3l-4 4Z" fill={color} />
  </svg>
);

/** A hand/finger tap gesture */
export const TapHandIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2a3 3 0 0 0-3 3v7l-1.3-1.3a2 2 0 0 0-2.83 2.83l5.3 5.3A5 5 0 0 0 13.7 21H15a5 5 0 0 0 5-5v-5a2 2 0 0 0-4 0v3"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 5v7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 11V9a2 2 0 0 0-4 0v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** A key symbol — keyword section */
export const KeywordIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="8" cy="10" r="4" stroke={color} strokeWidth="1.5" />
    <circle cx="8" cy="10" r="1.5" fill={color} />
    <path d="M12 10h8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 10v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 10v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** A bar chart — energy analysis */
export const EnergyChartIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="14" width="4" height="7" rx="1" fill={color} opacity="0.6" />
    <rect x="10" y="8" width="4" height="13" rx="1" fill={color} opacity="0.8" />
    <rect x="17" y="3" width="4" height="18" rx="1" fill={color} />
  </svg>
);

/** A sparkle star — lucky items */
export const SparkleIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Z"
      fill={color}
    />
    <path
      d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z"
      fill={color}
      opacity="0.6"
    />
    <path
      d="M6 16l.6 1.4L8 18l-1.4.6L6 20l-.6-1.4L4 18l1.4-.6L6 16Z"
      fill={color}
      opacity="0.4"
    />
  </svg>
);

/** A circle — lucky color */
export const LuckyColorIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="7" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" fill={color} opacity="0.4" />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

/** A dice — lucky number */
export const LuckyNumberIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="3" stroke={color} strokeWidth="1.5" />
    <circle cx="9" cy="9" r="1.3" fill={color} />
    <circle cx="15" cy="9" r="1.3" fill={color} />
    <circle cx="12" cy="12" r="1.3" fill={color} />
    <circle cx="9" cy="15" r="1.3" fill={color} />
    <circle cx="15" cy="15" r="1.3" fill={color} />
  </svg>
);

/** A compass — lucky direction */
export const LuckyCompassIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <polygon points="12,5 14,11 12,10 10,11" fill={color} />
    <polygon points="12,19 10,13 12,14 14,13" fill={color} opacity="0.5" />
    <line x1="12" y1="2" x2="12" y2="4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <line x1="12" y1="20" x2="12" y2="22" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <line x1="2" y1="12" x2="4" y2="12" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <line x1="20" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/** A clock — lucky time */
export const LuckyClockIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M12 6v6l4 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="1" fill={color} />
  </svg>
);

/** A lightbulb — advice */
export const AdviceIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M9 21h6M10 17h4"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 3a6 6 0 0 0-4 10.5V16h8v-2.5A6 6 0 0 0 12 3Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <line x1="12" y1="7" x2="12" y2="11" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <line x1="10" y1="9" x2="14" y2="9" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/** A refresh/retry icon */
export const RefreshIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M4 12a8 8 0 0 1 14.3-4.8L20 5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M20 5v4h-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M20 12a8 8 0 0 1-14.3 4.8L4 19"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
    >
      {/* Background */}
      <rect width={width} height={height} rx={12 * scale} fill={bg} />

      {/* Outer border */}
      <rect
        x={8 * scale}
        y={8 * scale}
        width={width - 16 * scale}
        height={height - 16 * scale}
        rx={8 * scale}
        stroke={accent}
        strokeWidth={1.5 * scale}
        fill="none"
      />

      {/* Inner border */}
      <rect
        x={18 * scale}
        y={18 * scale}
        width={width - 36 * scale}
        height={height - 36 * scale}
        rx={6 * scale}
        stroke={accent}
        strokeWidth={1 * scale}
        fill="none"
        opacity="0.5"
      />

      {/* Corner circles */}
      {[
        [28 * scale, 28 * scale],
        [width - 28 * scale, 28 * scale],
        [28 * scale, height - 28 * scale],
        [width - 28 * scale, height - 28 * scale],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4 * scale} stroke={accent} strokeWidth={1 * scale} opacity="0.6" />
      ))}

      {/* Center circle (large) */}
      <circle cx={cx} cy={cy} r={42 * scale} stroke={accent} strokeWidth={1.2 * scale} opacity="0.3" />
      <circle cx={cx} cy={cy} r={34 * scale} stroke={accent} strokeWidth={1 * scale} opacity="0.5" />

      {/* Diagonal cross lines */}
      <line x1={28 * scale} y1={28 * scale} x2={width - 28 * scale} y2={height - 28 * scale} stroke={accent} strokeWidth={0.5 * scale} opacity="0.15" />
      <line x1={width - 28 * scale} y1={28 * scale} x2={28 * scale} y2={height - 28 * scale} stroke={accent} strokeWidth={0.5 * scale} opacity="0.15" />

      {/* Vertical and horizontal center lines */}
      <line x1={cx} y1={28 * scale} x2={cx} y2={height - 28 * scale} stroke={accent} strokeWidth={0.5 * scale} opacity="0.15" />
      <line x1={28 * scale} y1={cy} x2={width - 28 * scale} y2={cy} stroke={accent} strokeWidth={0.5 * scale} opacity="0.15" />

      {/* Central all-seeing eye */}
      <ellipse cx={cx} cy={cy} rx={24 * scale} ry={14 * scale} stroke={accent} strokeWidth={1.5 * scale} />
      <circle cx={cx} cy={cy} r={8 * scale} stroke={accent} strokeWidth={1.2 * scale} />
      <circle cx={cx} cy={cy} r={4 * scale} fill={accent} />

      {/* Eye rays — top and bottom */}
      <line x1={cx} y1={cy - 20 * scale} x2={cx} y2={cy - 34 * scale} stroke={accent} strokeWidth={1 * scale} opacity="0.7" />
      <line x1={cx} y1={cy + 20 * scale} x2={cx} y2={cy + 34 * scale} stroke={accent} strokeWidth={1 * scale} opacity="0.7" />

      {/* Eye rays — diagonal */}
      <line x1={cx - 16 * scale} y1={cy - 12 * scale} x2={cx - 24 * scale} y2={cy - 28 * scale} stroke={accent} strokeWidth={0.8 * scale} opacity="0.5" />
      <line x1={cx + 16 * scale} y1={cy - 12 * scale} x2={cx + 24 * scale} y2={cy - 28 * scale} stroke={accent} strokeWidth={0.8 * scale} opacity="0.5" />
      <line x1={cx - 16 * scale} y1={cy + 12 * scale} x2={cx - 24 * scale} y2={cy + 28 * scale} stroke={accent} strokeWidth={0.8 * scale} opacity="0.5" />
      <line x1={cx + 16 * scale} y1={cy + 12 * scale} x2={cx + 24 * scale} y2={cy + 28 * scale} stroke={accent} strokeWidth={0.8 * scale} opacity="0.5" />

      {/* Small stars at top and bottom center */}
      <path
        d={`M${cx},${30 * scale} l${2 * scale},${5 * scale} ${5 * scale},${2 * scale} -${5 * scale},${2 * scale} -${2 * scale},${5 * scale} -${2 * scale},-${5 * scale} -${5 * scale},-${2 * scale} ${5 * scale},-${2 * scale}Z`}
        fill={accent}
        opacity="0.6"
      />
      <path
        d={`M${cx},${height - 44 * scale} l${2 * scale},${5 * scale} ${5 * scale},${2 * scale} -${5 * scale},${2 * scale} -${2 * scale},${5 * scale} -${2 * scale},-${5 * scale} -${5 * scale},-${2 * scale} ${5 * scale},-${2 * scale}Z`}
        fill={accent}
        opacity="0.6"
      />
    </svg>
  );
};
