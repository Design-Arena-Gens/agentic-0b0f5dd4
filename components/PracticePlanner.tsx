"use client";

import { useMemo, useState } from "react";
import { rhythms } from "../lib/rhythms";

type Session = {
  id: string;
  label: string;
  duration: string;
  focus: string;
  prompt: string;
};

const baseSessions: Session[] = [
  {
    id: "warmup",
    label: "Warm-up Mirage",
    duration: "5 min",
    focus: "Breath + gentle waves",
    prompt: "Trace small circles with wrists while counting softly in Arabic: wahid, jouj, tlata..."
  },
  {
    id: "pulse",
    label: "Pulse Lock-in",
    duration: "6 min",
    focus: "Rhythm awareness",
    prompt: "Clap the accent pattern twice before stepping. Keep claps low near the belly."
  },
  {
    id: "combo",
    label: "Combo Grow",
    duration: "8 min",
    focus: "Linking 2 moves",
    prompt: "Choose any move card and loop it with a new arm story. Aim for smooth transitions."
  },
  {
    id: "freestyle",
    label: "Freestyle Story",
    duration: "4 min",
    focus: "Confidence + expression",
    prompt: "Pick a story card and dance like you're telling a friend what the scene looks like."
  }
];

export function PracticePlanner() {
  const [selectedRhythmId, setSelectedRhythmId] = useState(rhythms[0].id);
  const selectedRhythm = useMemo(
    () => rhythms.find((rhythm) => rhythm.id === selectedRhythmId) ?? rhythms[0],
    [selectedRhythmId]
  );

  return (
    <section className="rounded-3xl border border-deepBlue/10 bg-white shadow-dance p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-deepBlue/60">
            Practice Flow
          </p>
          <h2 className="font-display text-3xl text-deepBlue mt-1">
            20-minute micro-session planner
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs uppercase tracking-[0.25em] text-deepBlue/60">
            Rhythm Focus
          </label>
          <select
            value={selectedRhythmId}
            onChange={(event) => setSelectedRhythmId(event.target.value)}
            className="rounded-full border border-deepBlue/20 bg-sand/40 px-4 py-2 text-sm font-semibold text-deepBlue focus:outline-none focus:ring-2 focus:ring-mint/60"
          >
            {rhythms.map((rhythm) => (
              <option key={rhythm.id} value={rhythm.id}>
                {rhythm.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {baseSessions.map((session, index) => (
          <div
            key={session.id}
            className="rounded-2xl border border-deepBlue/10 bg-sand/40 p-5 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between text-sm text-deepBlue/60 uppercase tracking-[0.2em]">
              <span>{`Step ${index + 1}`}</span>
              <span>{session.duration}</span>
            </div>
            <h3 className="font-display text-xl text-deepBlue">{session.label}</h3>
            <p className="text-sm text-deepBlue/70">{session.focus}</p>
            <p className="rounded-xl bg-white/70 p-4 text-sm text-deepBlue/70 leading-relaxed">
              {session.prompt}
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-mint/80">
              Tip: layer in {selectedRhythm.moves[index % selectedRhythm.moves.length].name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
