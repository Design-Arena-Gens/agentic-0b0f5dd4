"use client";

import { motion } from "framer-motion";

const stories = [
  {
    title: "Chaâbi Tea House",
    description:
      "Imagine a warm evening in the Casbah of Algiers. Families gather with mint tea, chatting while the bendir sets a swaying pulse. Chaâbi dancers let their shoulders ripple like sea waves.",
    cue: "Encourage the child to imagine passing cups of tea between friends—soft, gliding hands that never spill."
  },
  {
    title: "Raï Street Lights",
    description:
      "In Oran, raï burst from youth cafés with neon lights. Voices soar over synth bass, inviting bold footwork and power stances.",
    cue: "Ask the child to pretend they're stepping onto a glowing stage. Each accented beat turns on a new spotlight."
  },
  {
    title: "Amazigh Mountain Winds",
    description:
      "Kabylie villages celebrate with rolling 6/8 rhythms. The bendir echo across mountains, and dancers trace circles that match the wind.",
    cue: "Guide the child to draw infinity signs with their hips while their hands paint clouds."
  }
];

export function CultureSpotlight() {
  return (
    <section className="rounded-3xl border border-deepBlue/10 bg-gradient-to-br from-white via-sand/40 to-white p-6 md:p-8 shadow-inner">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-deepBlue/60">
            Story Prompts
          </p>
          <h2 className="font-display text-3xl text-deepBlue mt-1">
            Tell a micro-story to unlock expressive dancing.
          </h2>
        </div>
        <p className="text-deepBlue/70 max-w-xl">
          Young dancers connect deeper when each rhythm carries a place, smell, and mood.
          Use these quick storytelling cues to set the scene before practicing.
        </p>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {stories.map((story, index) => (
          <motion.article
            key={story.title}
            className="rounded-2xl bg-white/80 border border-deepBlue/10 p-5 flex flex-col shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-xl text-deepBlue">{story.title}</h3>
            <p className="text-sm text-deepBlue/70 mt-3 leading-relaxed">
              {story.description}
            </p>
            <p className="mt-4 text-sm font-semibold text-mint leading-relaxed">
              {story.cue}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
