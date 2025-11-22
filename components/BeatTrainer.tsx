/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IconPlayerPlay, IconPlayerStop, IconHeartbeat } from "@tabler/icons-react";
import { RhythmPattern } from "../lib/rhythms";
import classNames from "classnames";

type Props = {
  patterns: RhythmPattern[];
  onPatternChange?: (pattern: RhythmPattern) => void;
};

type BeatVoice = {
  context: AudioContext;
  gain: GainNode;
};

const BASE_INTERVAL_MS = 60000;

export function BeatTrainer({ patterns, onPatternChange }: Props) {
  const [selectedPattern, setSelectedPattern] = useState(patterns[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const stepRef = useRef(0);
  const voiceRef = useRef<BeatVoice | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, []);

  useEffect(() => {
    onPatternChange?.(selectedPattern);
  }, [selectedPattern, onPatternChange]);

  const beatInterval = useMemo(() => {
    const steps = selectedPattern.pattern.length;
    return (BASE_INTERVAL_MS / selectedPattern.tempo / steps) * 4;
  }, [selectedPattern]);

  const ensureVoice = async (): Promise<BeatVoice> => {
    if (!voiceRef.current) {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const gain = context.createGain();
      gain.gain.value = volume;
      gain.connect(context.destination);
      voiceRef.current = { context, gain };
    }
    return voiceRef.current;
  };

  const createClick = (intensity: number) => {
    ensureVoice().then(({ context, gain }) => {
      if (context.state === "suspended") {
        void context.resume();
      }
      const osc = context.createOscillator();
      const envelope = context.createGain();
      const baseFreq = intensity >= 1 ? 900 : intensity > 0.7 ? 760 : 620;
      const peak = 0.2 + intensity / 3;

      osc.type = "square";
      osc.frequency.value = baseFreq;

      envelope.gain.value = 0;
      envelope.gain.linearRampToValueAtTime(peak, context.currentTime + 0.001);
      envelope.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.12);

      osc.connect(envelope);
      envelope.connect(gain);

      osc.start();
      osc.stop(context.currentTime + 0.15);
    });
  };

  const stopPlayback = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    stepRef.current = 0;
  };

  const startPlayback = () => {
    stopPlayback();
    setIsPlaying(true);
    timerRef.current = setInterval(() => {
      const step = stepRef.current % selectedPattern.pattern.length;
      const intensity = selectedPattern.pattern[step];
      if (intensity > 0) {
        createClick(intensity);
      }
      stepRef.current += 1;
    }, beatInterval);
  };

  useEffect(() => {
    if (voiceRef.current) {
      voiceRef.current.gain.gain.value = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      startPlayback();
    }
  }, [selectedPattern, beatInterval]);

  return (
    <section className="rounded-3xl bg-white/90 shadow-dance backdrop-blur-sm border border-deepBlue/10 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-deepBlue/60 flex items-center gap-2">
            <IconHeartbeat className="h-5 w-5 text-mint" /> Pulse Lab
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-deepBlue">
            Groove Trainer
          </h2>
          <p className="text-deepBlue/70 mt-3 max-w-2xl">
            Choose a signature Algerian rhythm, feel the pulse, and let the built-in
            sonic click accent the moves. Each loop adapts to the rhythm feel so the
            child can mirror the groove confidently.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className={classNames(
              "inline-flex items-center gap-2 rounded-full px-5 py-3 font-display text-sm uppercase tracking-wide shadow-md transition",
              isPlaying
                ? "bg-deepBlue text-white shadow-lg"
                : "bg-mint text-deepBlue hover:bg-deepBlue hover:text-white"
            )}
            onClick={() => {
              if (isPlaying) stopPlayback();
              else startPlayback();
            }}
          >
            {isPlaying ? (
              <>
                <IconPlayerStop className="h-4 w-4" />
                Stop Pulse
              </>
            ) : (
              <>
                <IconPlayerPlay className="h-4 w-4" />
                Start Pulse
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 mt-8">
        <div className="rounded-2xl bg-deepBlue p-6 text-white flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">
              Rhythm Selector
            </p>
            <h3 className="text-2xl font-display mt-1">{selectedPattern.name}</h3>
            <p className="text-sm text-white/70">
              {selectedPattern.origin} • {selectedPattern.signature} •{" "}
              {selectedPattern.tempo} BPM
            </p>
          </div>
          <p className="text-sm leading-relaxed text-white/80">
            {selectedPattern.description}
          </p>
          <p className="text-sm font-semibold text-mint/90">{selectedPattern.feel}</p>
          <label className="mt-4">
            <span className="text-xs uppercase tracking-[0.28em] text-white/70">
              Volume
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="w-full mt-2 accent-mint"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {patterns.map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => {
                  setSelectedPattern(pattern);
                  onPatternChange?.(pattern);
                }}
                className={classNames(
                  "rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deepBlue/60",
                  selectedPattern.id === pattern.id
                    ? "border-mint bg-mint/15"
                    : "border-deepBlue/10 bg-white hover:bg-sand/60"
                )}
              >
                <p className="font-display text-lg text-deepBlue">{pattern.name}</p>
                <p className="text-xs uppercase text-deepBlue/60 tracking-[0.18em] mt-1">
                  {pattern.signature}
                </p>
                <p className="text-sm text-deepBlue/70 mt-2 leading-relaxed line-clamp-3">
                  {pattern.description}
                </p>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-deepBlue/10 bg-white p-5">
            <p className="font-display text-lg text-deepBlue mb-3">
              Movement focus
            </p>
            <div className="flex flex-wrap gap-3">
              {selectedPattern.moves.map((move) => (
                <div
                  key={move.name}
                  className="flex-1 min-w-[220px] rounded-xl bg-sand/40 border border-deepBlue/10 p-4"
                >
                  <p className="text-sm uppercase tracking-[0.22em] text-deepBlue/60">
                    {move.name}
                  </p>
                  <p className="text-base font-semibold text-deepBlue mt-1">
                    {move.focus}
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-deepBlue/70">
                    {move.tips.map((tip) => (
                      <li key={tip} className="flex gap-2">
                        <span className="text-mint">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
