"use client";

import { useMemo } from "react";
import { RhythmPattern } from "../lib/rhythms";

type Props = {
  pattern: RhythmPattern;
};

export function RhythmSpectrum({ pattern }: Props) {
  const normalized = useMemo(() => {
    const maxIntensity = Math.max(...pattern.pattern, 1);
    return pattern.pattern.map((value) => value / maxIntensity);
  }, [pattern]);

  return (
    <div className="rounded-2xl border border-deepBlue/10 bg-white/80 p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-deepBlue/60">
        Accent Map
      </p>
      <h3 className="font-display text-xl text-deepBlue mt-1">{pattern.name}</h3>
      <div className="mt-4 flex items-end gap-2">
        {normalized.map((value, index) => (
          <div key={index} className="flex-1">
            <div
              className="w-full rounded-t-xl bg-gradient-to-t from-mint to-saffron transition-all"
              style={{ height: `${Math.round(value * 100)}%`, minHeight: "18px" }}
            />
            <p className="mt-2 text-xs text-center text-deepBlue/50">{index + 1}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-deepBlue/70 leading-relaxed">
        Highlighted bars show where to punch or soften movement. Ask the child to breathe
        in on low bars and sparkle on the tall ones.
      </p>
    </div>
  );
}
