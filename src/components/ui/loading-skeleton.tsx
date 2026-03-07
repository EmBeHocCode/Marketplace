export function LoadingSkeleton({
  className = "h-6 w-full"
}: {
  className?: string;
}) {
  return <div className={`animate-pulse rounded-2xl bg-slate-200 ${className}`} />;
}
