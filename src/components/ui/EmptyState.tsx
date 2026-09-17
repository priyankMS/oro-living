import { Button } from "./Button";

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-5 py-20 text-center">
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      {description && <p className="max-w-sm text-sm leading-relaxed text-muted">{description}</p>}
      {actionLabel && actionHref && (
        <Button href={actionHref} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
