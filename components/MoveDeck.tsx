"use client";

import { motion } from "framer-motion";
import { RhythmPattern } from "../lib/rhythms";

type Props = {
  patterns: RhythmPattern[];
};

export function MoveDeck({ patterns }: Props) {
  return (
    <section className="rounded-3xl bg-white shadow-dance border border-deepBlue/10 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-deepBlue/60">
            Moves Library
          </p>
          <h2 className="font-display text-3xl text-deepBlue mt-1">
            Coach the groove with kid-friendly prompts.
          </h2>
        </div>
        <p className="text-deepBlue/70 max-w-xl">
          Each card focuses on a single idea—body part, feeling, or story cue—so the
          child can embody the rhythm one layer at a time. Stack cards to build a mini
          choreography.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {patterns.flatMap((pattern, patternIndex) =>
          pattern.moves.map((move, moveIndex) => (
            <motion.article
              key={`${pattern.id}-${move.name}`}
              className="rounded-2xl border border-deepBlue/10 bg-sand/40 p-5 flex flex-col"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (patternIndex * 2 + moveIndex) * 0.08 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-[0.22em] text-deepBlue/60">
                {pattern.name}
              </p>
              <h3 className="font-display text-xl text-deepBlue mt-1">{move.name}</h3>
              <p className="text-sm text-deepBlue/70 mt-2 leading-relaxed">
                {move.focus}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-deepBlue/70">
                {move.tips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="text-mint font-semibold">✶</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))
        )}
      </div>
    </section>
  );
}
