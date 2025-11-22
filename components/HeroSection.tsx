"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-mint via-sand to-saffron p-8 md:p-12 shadow-dance">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/25 blur-3xl" />
      <motion.div
        className="relative grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 md:items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-deepBlue/80">
            Movement Lab
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-5xl text-deepBlue leading-tight">
            Help your child dance confidently to vibrant Algerian rhythms.
          </h1>
          <p className="mt-4 text-lg text-deepBlue/70 leading-relaxed">
            Rhythm Oasis blends interactive pulses, kid-friendly coaching, and cultural
            storytelling so young dancers fall in love with chaâbi, raï, and Amazigh
            grooves while strengthening coordination and musicality.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/80 px-5 py-2 text-sm font-semibold text-deepBlue shadow-sm">
              Guided Movement Recipes
            </span>
            <span className="rounded-full bg-deepBlue text-white px-5 py-2 text-sm font-semibold shadow-lg">
              Pulse-driven Practice
            </span>
          </div>
        </div>
        <div className="relative">
          <motion.div
            className="rounded-[36px] bg-white/90 p-6 shadow-2xl backdrop-blur"
            initial={{ rotate: -6, y: 50, opacity: 0 }}
            animate={{ rotate: 0, y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          >
            <p className="text-xs uppercase tracking-[0.28em] text-deepBlue/50">
              Focus Today
            </p>
            <p className="mt-2 font-display text-2xl text-deepBlue">Chaâbi Wave Flow</p>
            <ul className="mt-4 space-y-2 text-sm text-deepBlue/70">
              <li>• Bend knees softly to catch the darbuka accent.</li>
              <li>• Trace circles with wrists on beats 2 and 4.</li>
              <li>• Smile with each shoulder pop—confidence grows!</li>
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-2xl bg-sand/70 p-3">
                <p className="text-xs uppercase text-deepBlue/60 tracking-[0.18em]">
                  Mood
                </p>
                <p className="text-lg font-semibold text-deepBlue">Playful</p>
              </div>
              <div className="rounded-2xl bg-mint/70 p-3">
                <p className="text-xs uppercase text-deepBlue/60 tracking-[0.18em]">
                  Skill
                </p>
                <p className="text-lg font-semibold text-deepBlue">Hip Spirals</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
