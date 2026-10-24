import type { KeyboardEvent } from "react";

/** Keep tab selection and focus together for keyboard and assistive-tech users. */
export function handleTabKeys(
  event: KeyboardEvent<HTMLDivElement>,
  current: number,
  count: number,
  select: (index: number) => void,
) {
  const next =
    event.key === "ArrowRight"
      ? (current + 1) % count
      : event.key === "ArrowLeft"
        ? (current + count - 1) % count
        : event.key === "Home"
          ? 0
          : event.key === "End"
            ? count - 1
            : null;
  if (next === null) return;
  event.preventDefault();
  select(next);
  event.currentTarget
    .querySelectorAll<HTMLButtonElement>('[role="tab"]')
    [next]?.focus();
}
