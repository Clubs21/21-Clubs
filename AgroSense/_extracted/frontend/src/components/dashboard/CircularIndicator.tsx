interface CircularIndicatorProps {
  value: number; // 0-100
  label: string;
  sublabel?: string;
  size?: number;
  color?: string;
}

export function CircularIndicator({
  value,
  label,
  sublabel,
  size = 132,
  color = "var(--color-primary)",
}: CircularIndicatorProps) {
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--color-secondary)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold tracking-tight">{value}</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            score
          </span>
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold">{label}</p>
      {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
    </div>
  );
}
