"use client";

import { IconHeadphones, IconPlaylist, IconMovie } from "@tabler/icons-react";

const resources = [
  {
    title: "Chaâbi Starter Playlist",
    description: "Handpicked slower chaâbi songs lightly instrumented to help young dancers catch the groove.",
    action: "Open Spotify",
    url: "https://open.spotify.com/playlist/37i9dQZF1DX6tTW0tFwKaU"
  },
  {
    title: "Raï Power Mix",
    description: "Feel the bold beats with this kid-safe selection of vintage and modern raï anthems.",
    action: "Play Mix",
    url: "https://music.youtube.com/playlist?list=PLmKo60Tg3yR-ulroPTZC5buoQIBewItgu"
  },
  {
    title: "Kabyle Dance Showcase",
    description: "Watch gentle Amazigh footwork and scarf play to inspire your child’s storytelling.",
    action: "Watch Clips",
    url: "https://www.youtube.com/watch?v=CP83N14OwZM"
  }
];

export function ResourceGrid() {
  return (
    <section className="rounded-3xl bg-deepBlue text-white p-6 md:p-8 shadow-dance border border-white/10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-mint/80">
            Extra Sparks
          </p>
          <h2 className="font-display text-3xl mt-1">Curated sound + inspiration</h2>
        </div>
        <p className="text-sm text-white/70 max-w-xl">
          Pair the practice with real music moments. These playlists and clips highlight family-friendly Algerian gems.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {resources.map((resource, index) => (
          <article
            key={resource.title}
            className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-5 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3 text-mint">
              {index === 0 && <IconPlaylist className="h-8 w-8" />}
              {index === 1 && <IconHeadphones className="h-8 w-8" />}
              {index === 2 && <IconMovie className="h-8 w-8" />}
              <h3 className="font-display text-xl text-white">{resource.title}</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">{resource.description}</p>
            <a
              href={resource.url}
              rel="noopener noreferrer"
              target="_blank"
              className="mt-auto inline-flex items-center justify-center rounded-full bg-mint text-deepBlue font-semibold px-4 py-2 text-sm hover:bg-white transition"
            >
              {resource.action}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
