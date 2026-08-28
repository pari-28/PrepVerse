import { useCountUp } from "../hooks/useCountUp";

type StatCardProps = {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
  delay?: number;
};

export default function StatCard({
  value,
  label,
  suffix = "",
  decimals = 0,
  delay = 0
}: StatCardProps) {

  const { ref, count } = useCountUp(value, 2000, delay);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1">
        {count.toLocaleString(undefined, {
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </p>

      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}