import { useEffect, useRef, useState, type AnimationEvent } from "react";
import { HEX_OUTLINE_PATH, LOADING_TIMINGS } from "../../constants";
import { useAppContext } from "../../context/AppProvider";
import type { HoneycombItem } from "../../types";

/** Fly destination offsets (hero coords → dashboard section). */
const HONEYCOMB_FLY_TARGETS: Record<
  string,
  { dx: number; dy: number; scale: number }
> = {
  inbox: { dx: 52, dy: 362, scale: 0.34 },
  ai: { dx: 318, dy: 328, scale: 0.36 },
  workflow: { dx: 548, dy: 348, scale: 0.34 },
  campaign: { dx: 748, dy: 368, scale: 0.3 },
  contacts: { dx: 668, dy: 342, scale: 0.34 },
  media: { dx: 108, dy: 372, scale: 0.34 },
};

const DEFAULT_FLY_TARGET = HONEYCOMB_FLY_TARGETS.inbox;

interface HoneycombButtonProps {
  item: HoneycombItem;
  isSelected: boolean;
  isFlying?: boolean;
  isLanded?: boolean;
  isDimmed?: boolean;
  onFlyComplete?: () => void;
  onSelect?: () => void;
}

export function HoneycombButton({
  item,
  isSelected,
  isFlying = false,
  isLanded = false,
  isDimmed = false,
  onFlyComplete,
  onSelect,
}: HoneycombButtonProps) {
  const fillGradientId = `hex-fill-${item.id}`;
  const strokeGradientId = `hex-stroke-${item.id}`;
  const flyTarget = HONEYCOMB_FLY_TARGETS[item.id] ?? DEFAULT_FLY_TARGET;

  function handleAnimationEnd(event: AnimationEvent<HTMLButtonElement>) {
    if (isFlying && event.animationName === "hex-fly-to-section") {
      onFlyComplete?.();
    }
  }

  return (
    <button
      type="button"
      aria-label={item.id}
      aria-pressed={isSelected}
      onClick={onSelect}
      onAnimationEnd={handleAnimationEnd}
      className={[
        "hex-float hex-figma absolute outline-none",
        isSelected ? "hex-figma-selected" : "",
        isFlying ? "hex-figma--flying" : "",
        isLanded ? "hex-figma--landed" : "",
        isDimmed ? "hex-figma--dimmed" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        left: item.left,
        top: item.top,
        width: item.size,
        height: item.size,
        animationDelay: isFlying ? "0s" : `${item.delay}s`,
        ...(isFlying || isLanded
          ? ({
              "--hex-fly-x": `${flyTarget.dx}px`,
              "--hex-fly-y": `${flyTarget.dy}px`,
              "--hex-fly-scale": flyTarget.scale,
            } as React.CSSProperties)
          : {}),
      }}
    >
      <svg className="hex-highlight-svg" viewBox="0 0 80 80" aria-hidden>
        <defs>
          <linearGradient
            id={fillGradientId}
            x1="8"
            y1="6"
            x2="72"
            y2="74"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#8b5cf6" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.38" />
          </linearGradient>
        </defs>
        <path
          d={HEX_OUTLINE_PATH}
          className="hex-highlight-fill"
          fill={`url(#${fillGradientId})`}
        />
      </svg>

      <img
        src={item.src}
        alt=""
        className="hex-icon-img block size-full max-w-none select-none"
        draggable={false}
        decoding="async"
      />

      <svg className="hex-outline-svg" viewBox="0 0 80 80" aria-hidden>
        <defs>
          <linearGradient
            id={strokeGradientId}
            x1="8"
            y1="6"
            x2="72"
            y2="74"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="50%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
        </defs>
        <path
          d={HEX_OUTLINE_PATH}
          className={isSelected ? 'hex-outline hex-outline--active' : 'hex-outline'}
          style={{
            animationDelay: isSelected ? `${item.delay}s` : undefined,
            stroke: isSelected ? `url(#${strokeGradientId})` : undefined,
          }}
        />
      </svg>
    </button>
  );
}

export function HoneycombGrid({
  items,
  onCycleComplete,
}: {
  items: HoneycombItem[];
  onCycleComplete?: () => void;
}) {
  const { isDataReady, honeycombCycleDone } = useAppContext();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [flyState, setFlyState] = useState<"idle" | "flying" | "landed">(
    "idle",
  );
  const [flyIndex, setFlyIndex] = useState(0);

  const visitedRef = useRef(new Set<number>([0]));
  const cycleCompleteRef = useRef(false);
  const completeTimerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const frozenIndexRef = useRef<number | null>(null);
  const onCycleCompleteRef = useRef(onCycleComplete);

  onCycleCompleteRef.current = onCycleComplete;

  const maybeCompleteCycle = () => {
    if (
      cycleCompleteRef.current ||
      visitedRef.current.size < items.length ||
      !onCycleCompleteRef.current
    ) {
      return;
    }

    cycleCompleteRef.current = true;

    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    completeTimerRef.current = window.setTimeout(() => {
      onCycleCompleteRef.current?.();
    }, LOADING_TIMINGS.honeycombIntervalMs);
  };

  const selectIndex = (index: number) => {
    if (flyState !== "idle") return;

    visitedRef.current.add(index);
    setSelectedIndex(index);
    maybeCompleteCycle();
  };

  useEffect(() => {
    if (honeycombCycleDone && frozenIndexRef.current === null) {
      frozenIndexRef.current = selectedIndex;
    }
  }, [honeycombCycleDone, selectedIndex]);

  useEffect(() => {
    if (
      !honeycombCycleDone ||
      !isDataReady ||
      flyState !== "idle" ||
      frozenIndexRef.current === null
    ) {
      return;
    }

    setFlyIndex(frozenIndexRef.current);
    setFlyState("flying");
  }, [honeycombCycleDone, isDataReady, flyState]);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      if (cycleCompleteRef.current) return;

      setSelectedIndex((current) => {
        const next = (current + 1) % items.length;
        visitedRef.current.add(next);
        maybeCompleteCycle();
        return next;
      });
    }, LOADING_TIMINGS.honeycombIntervalMs);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
      if (completeTimerRef.current !== null) {
        window.clearTimeout(completeTimerRef.current);
      }
    };
  }, [items.length]);

  return (
    <>
      {items.map((item, index) => {
        const isFlying = flyState === "flying" && index === flyIndex;
        const isLanded = flyState === "landed" && index === flyIndex;
        const isDimmed = flyState !== "idle" && index !== flyIndex;

        return (
          <HoneycombButton
            key={item.id}
            item={item}
            isSelected={
              flyState === "idle"
                ? index === selectedIndex
                : index === flyIndex && flyState !== "landed"
            }
            isFlying={isFlying}
            isLanded={isLanded}
            isDimmed={isDimmed}
            onFlyComplete={() => setFlyState("landed")}
            onSelect={() => selectIndex(index)}
          />
        );
      })}
    </>
  );
}
