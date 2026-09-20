import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import teddy from "@/assets/teddy.png";
import teddyFlowers from "@/assets/teddy-flowers.png";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Confetti } from "@/components/Confetti";
import { useLullaby } from "@/hooks/use-lullaby";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "I'm Sorry, My Baby 🥺❤️" },
      {
        name: "description",
        content:
          "A little handwritten apology letter, with teddy bears, hearts and a promise to make more time for you.",
      },
      { property: "og:title", content: "I'm Sorry, My Baby 🥺❤️" },
      {
        property: "og:description",
        content: "Open my letter — I wrote this just for you. ❤️🧸",
      },
    ],
  }),
  component: SorryLetter,
});

/** The apology, written the way I'd actually say it to her. */
const LETTER = [
  "My baby,",
  "I'm sorry. Really, truly sorry — not the quick kind of sorry, the kind that comes from sitting with it and realising I let you down.",
  "You got dressed up for me. You did your makeup, you picked your outfit, you took your time… all because you wanted to spend that time with me. And I was busy. I let other things take the moments that belonged to you.",
  "I keep thinking about how that must have felt — making all that effort and then feeling like it went unnoticed. You had every right to feel hurt. You had every right to feel ignored, because in that moment, that's exactly what I made you feel.",
  "I saw the effort, baby. I did. I just didn't show you that I did, and that's on me. I never wanted you to feel unimportant, not for a single second — you're the person I think about first, every single day.",
  "You mean so much more to me than anything that kept me busy that day. So here's my promise: I'll make time for you, properly. Not leftover time — real time, phone down, fully yours. And when you go out of your way for me, you'll hear it from me, every time.",
  "I'm sorry, my baby. Please forgive me. ❤️🥺",
];

function SorryLetter() {
  const [opened, setOpened] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [forgiven, setForgiven] = useState<string | null>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const { playing, toggle, start } = useLullaby();

  // Smoothly move focus/scroll to the letter once the cover has transitioned out.
  useEffect(() => {
    if (opened) letterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [opened]);

  const openLetter = () => {
    start(); // begin the melody right as the letter opens
    setLeaving(true);
    window.setTimeout(() => setOpened(true), 450);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-10 sm:px-8">
      <FloatingHearts />
      {forgiven && <Confetti />}

      {/* ---------- Music toggle (never autoplays) ---------- */}
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2 text-sm font-semibold text-secondary-foreground shadow-lg backdrop-blur transition hover:scale-105 hover:bg-card"
      >
        <span aria-hidden>{playing ? "🔊" : "🎵"}</span>
        {playing ? "Music on" : "Play music"}
      </button>

      {/* ---------- Cover ---------- */}
      {!opened && (
        <section
          className={`relative mx-auto flex min-h-[85vh] max-w-2xl flex-col items-center justify-center text-center ${
            leaving ? "animate-soft-out" : "animate-soft-in"
          }`}
        >
          <img
            src={teddy}
            alt="A teddy bear hugging a big red heart"
            width={1024}
            height={1024}
            className="animate-bob w-56 drop-shadow-[0_22px_35px_oklch(0.6_0.14_15_/_0.35)] sm:w-72"
          />
          <h1 className="font-hand mt-4 text-5xl leading-tight text-primary sm:text-7xl">
            I'm Sorry, My Baby 🥺❤️
          </h1>
          <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
            I know I hurt your feelings… and I want to make it right.
          </p>
          <button
            type="button"
            onClick={openLetter}
            className="mt-9 rounded-full bg-primary px-9 py-4 text-lg font-bold text-primary-foreground shadow-[0_18px_30px_-12px_oklch(0.6_0.16_15_/_0.7)] transition hover:-translate-y-1 hover:brightness-105 active:translate-y-0"
          >
            Open My Letter 💌
          </button>
          <p className="mt-6 text-sm text-muted-foreground">made only for you 🧸</p>
        </section>
      )}

      {/* ---------- Letter + forgiveness ---------- */}
      {opened && (
        <div ref={letterRef} className="animate-soft-in mx-auto max-w-2xl pb-16">
          <article className="letter-paper rounded-4xl border border-border/60 px-6 py-10 sm:px-12 sm:py-14">
            <header className="text-center">
              <span aria-hidden className="text-3xl">
                💌
              </span>
              <h2 className="font-hand mt-2 text-4xl text-primary sm:text-5xl">
                A letter for my baby
              </h2>
              <div aria-hidden className="mt-3 text-sm tracking-[0.4em] text-accent-foreground/70">
                ❤︎ ✿ ❤︎
              </div>
            </header>

            <div className="font-hand mt-8 space-y-5 text-2xl leading-relaxed text-foreground sm:text-[1.75rem]">
              {LETTER.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <p className="font-hand mt-8 text-right text-2xl text-primary sm:text-3xl">
              Always yours, <br />
              your idiot who loves you 🧸
            </p>
          </article>

          {/* Forgive Me? */}
          <section className="mt-12 text-center">
            {!forgiven ? (
              <div className="animate-soft-in rounded-4xl border border-border/60 bg-card/80 px-6 py-10 shadow-xl backdrop-blur">
                <img
                  src={teddyFlowers}
                  alt="A teddy bear holding a bouquet of pink roses"
                  loading="lazy"
                  width={816}
                  height={816}
                  className="animate-bob mx-auto w-32 sm:w-40"
                />
                <h3 className="font-hand mt-3 text-4xl text-primary">Forgive Me? 🥺</h3>
                <p className="mt-2 text-muted-foreground">
                  There's no wrong answer… but I'm hoping for one of these.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setForgiven("Thank you, my love! ❤️🧸")}
                    className="rounded-full bg-primary px-8 py-3.5 text-lg font-bold text-primary-foreground shadow-[0_16px_28px_-14px_oklch(0.6_0.16_15_/_0.75)] transition hover:-translate-y-1"
                  >
                    Yes ❤️
                  </button>
                  <button
                    type="button"
                    onClick={() => setForgiven("Thank you, my love! ❤️🧸")}
                    className="rounded-full border border-primary/40 bg-accent px-8 py-3.5 text-lg font-bold text-accent-foreground shadow-lg transition hover:-translate-y-1"
                  >
                    Of Course 🥺
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-soft-in rounded-4xl border border-border/60 bg-card/85 px-6 py-12 shadow-xl backdrop-blur">
                <span aria-hidden className="animate-pulse-heart block text-6xl">
                  ❤️
                </span>
                <h3 className="font-hand mt-4 text-4xl text-primary sm:text-5xl">{forgiven}</h3>
                <p className="mt-3 text-muted-foreground">
                  I'm coming to make it up to you — dressed up, phone off, all yours. 💐
                </p>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
