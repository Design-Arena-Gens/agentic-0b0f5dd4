"use client";

import { HeroSection } from "../components/HeroSection";
import { BeatTrainer } from "../components/BeatTrainer";
import { MoveDeck } from "../components/MoveDeck";
import { PracticePlanner } from "../components/PracticePlanner";
import { CultureSpotlight } from "../components/CultureSpotlight";
import { ResourceGrid } from "../components/ResourceGrid";
import { Footer } from "../components/Footer";
import { rhythms } from "../lib/rhythms";
import { RhythmSpectrum } from "../components/RhythmSpectrum";
import { useState } from "react";

export default function Page() {
  const [activePatternId, setActivePatternId] = useState(rhythms[0].id);
  const activePattern =
    rhythms.find((pattern) => pattern.id === activePatternId) ?? rhythms[0];

  return (
    <main className="min-h-screen px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl space-y-10 md:space-y-12">
        <HeroSection />

        <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6">
          <BeatTrainer
            patterns={rhythms}
            onPatternChange={(pattern) => setActivePatternId(pattern.id)}
          />
          <div className="flex flex-col gap-6">
            <RhythmSpectrum pattern={activePattern} />
            <div className="rounded-2xl border border-deepBlue/10 bg-white/90 p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-deepBlue/60">
                Spotlight Rhythm
              </p>
              <select
                value={activePatternId}
                onChange={(event) => setActivePatternId(event.target.value)}
                className="mt-2 w-full rounded-full border border-deepBlue/20 bg-sand/40 px-4 py-2 text-sm font-semibold text-deepBlue focus:outline-none focus:ring-2 focus:ring-mint/60"
              >
                {rhythms.map((pattern) => (
                  <option key={pattern.id} value={pattern.id}>
                    {pattern.name}
                  </option>
                ))}
              </select>
              <p className="mt-4 text-sm text-deepBlue/70 leading-relaxed">
                {activePattern.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-deepBlue/70">
                <li>
                  <span className="font-semibold text-mint">Tempo:</span>{" "}
                  {activePattern.tempo} BPM
                </li>
                <li>
                  <span className="font-semibold text-mint">Signature:</span>{" "}
                  {activePattern.signature}
                </li>
                <li>
                  <span className="font-semibold text-mint">Feel cue:</span>{" "}
                  {activePattern.feel}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <MoveDeck patterns={rhythms} />
        <PracticePlanner />
        <CultureSpotlight />
        <ResourceGrid />
        <Footer />
      </div>
    </main>
  );
}
