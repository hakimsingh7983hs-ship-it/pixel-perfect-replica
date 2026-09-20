import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A gentle, looping music-box melody generated with the Web Audio API.
 * No external audio files, and it NEVER autoplays: sound only starts from a
 * user click, which also satisfies browser autoplay policies.
 */
const MELODY = [0, 4, 7, 12, 11, 7, 4, 2, 0, 4, 9, 7, 5, 4, 2, 0];
const BASE = 392; // G4
const STEP = 0.42; // seconds per note

export function useLullaby() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    gainRef.current?.gain.setTargetAtTime(0, ctxRef.current?.currentTime ?? 0, 0.15);
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) {
      stop();
      return;
    }

    const AudioCtx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = ctxRef.current ?? new AudioCtx();
    ctxRef.current = ctx;
    void ctx.resume();

    const master = gainRef.current ?? ctx.createGain();
    if (!gainRef.current) {
      master.connect(ctx.destination);
      gainRef.current = master;
    }
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.setTargetAtTime(0.18, ctx.currentTime, 0.4);

    // Pluck one soft bell note of the melody
    const playNote = () => {
      const semitone = MELODY[indexRef.current % MELODY.length] ?? 0;
      indexRef.current += 1;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = BASE * Math.pow(2, semitone / 12);
      env.gain.setValueAtTime(0.0001, now);
      env.gain.exponentialRampToValueAtTime(0.6, now + 0.03);
      env.gain.exponentialRampToValueAtTime(0.0001, now + STEP * 2.4);
      osc.connect(env).connect(master);
      osc.start(now);
      osc.stop(now + STEP * 2.6);
    };

    playNote();
    timerRef.current = setInterval(playNote, STEP * 1000);
    setPlaying(true);
  }, [playing, stop]);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    void ctxRef.current?.close();
  }, []);

  return { playing, toggle, start, stop };
}
