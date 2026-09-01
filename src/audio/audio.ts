import type { GameState } from '../core/state';

export type SfxName = 'place' | 'bulldoze' | 'error' | 'coin' | 'click' | 'levelup' | 'disaster' | 'siren' | 'whoosh' | 'pop';

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private effects: GainNode | null = null;
  private music: GainNode | null = null;
  private padGain: GainNode | null = null;
  private humGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private pad: OscillatorNode[] = [];
  private lfo: OscillatorNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private brownBuffer: AudioBuffer | null = null;
  private muted = false;
  private musicEnabled = true;
  private chordClock = 0;
  private chordIndex = 0;
  private walk = 0x6769;

  constructor() {}
  get ready(): boolean { return this.ctx !== null; }

  unlock(): void {
    if (this.ctx) { void this.ctx.resume().catch(() => undefined); return; }
    const Ctor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor(); this.ctx = ctx;
    this.master = ctx.createGain(); this.effects = ctx.createGain(); this.music = ctx.createGain();
    this.master.gain.value = 0; this.effects.gain.value = 0.82; this.music.gain.value = 1;
    this.effects.connect(this.master); this.music.connect(this.master); this.master.connect(ctx.destination);
    this.noiseBuffer = this.makeNoise(false); this.brownBuffer = this.makeNoise(true);
    this.createAmbient();
    this.ramp(this.master.gain, this.muted ? 0 : 0.75, 0.08);
    void ctx.resume().catch(() => undefined);
  }

  private makeNoise(brown: boolean): AudioBuffer {
    const ctx = this.ctx!; const b = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate); const d = b.getChannelData(0); let last = 0;
    for (let i = 0; i < d.length; i++) { const white = Math.random() * 2 - 1; if (brown) { last = (last + 0.02 * white) / 1.02; d[i] = last * 3.5; } else d[i] = white; }
    return b;
  }

  private createAmbient(): void {
    const ctx = this.ctx!;
    this.padGain = ctx.createGain(); this.padGain.gain.value = 0;
    this.filter = ctx.createBiquadFilter(); this.filter.type = 'lowpass'; this.filter.frequency.value = 800; this.filter.Q.value = 0.8;
    const delay = ctx.createDelay(2); delay.delayTime.value = 0.72; const feedback = ctx.createGain(); feedback.gain.value = 0.22;
    this.padGain.connect(this.filter); this.filter.connect(this.music!); this.filter.connect(delay); delay.connect(feedback); feedback.connect(delay); delay.connect(this.music!);
    for (let i = 0; i < 2; i++) { const o = ctx.createOscillator(); o.type = i ? 'triangle' : 'sawtooth'; o.frequency.value = i ? 110.4 : 110; o.detune.value = i ? 7 : -5; o.connect(this.padGain); o.start(); this.pad.push(o); }
    this.lfo = ctx.createOscillator(); const lfoGain = ctx.createGain(); this.lfo.frequency.value = 0.035; lfoGain.gain.value = 220; this.lfo.connect(lfoGain); lfoGain.connect(this.filter.frequency); this.lfo.start();
    this.humGain = ctx.createGain(); this.humGain.gain.value = 0; const hum = ctx.createBufferSource(); hum.buffer = this.brownBuffer; hum.loop = true; const humFilter = ctx.createBiquadFilter(); humFilter.type = 'lowpass'; humFilter.frequency.value = 180; hum.connect(humFilter); humFilter.connect(this.humGain); this.humGain.connect(this.music!); hum.start();
    this.rainGain = ctx.createGain(); this.rainGain.gain.value = 0; const rain = ctx.createBufferSource(); rain.buffer = this.noiseBuffer; rain.loop = true; const rainFilter = ctx.createBiquadFilter(); rainFilter.type = 'bandpass'; rainFilter.frequency.value = 2600; rainFilter.Q.value = 0.45; rain.connect(rainFilter); rainFilter.connect(this.rainGain); this.rainGain.connect(this.music!); rain.start();
    this.setChord(0, 0);
  }

  private ramp(param: AudioParam, value: number, seconds = 0.08): void {
    const now = this.ctx!.currentTime; param.cancelScheduledValues(now); param.setValueAtTime(param.value, now); param.linearRampToValueAtTime(value, now + seconds);
  }

  private tone(freq: number, start: number, duration: number, volume: number, type: OscillatorType = 'sine', destination = this.effects): void {
    if (!this.ctx || !destination) return; const o = this.ctx.createOscillator(), g = this.ctx.createGain(); o.type = type; o.frequency.setValueAtTime(freq, start); g.gain.setValueAtTime(0.0001, start); g.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), start + Math.min(0.015, duration * 0.2)); g.gain.exponentialRampToValueAtTime(0.0001, start + duration); o.connect(g); g.connect(destination); o.onended = () => { o.disconnect(); g.disconnect(); }; o.start(start); o.stop(start + duration + 0.02);
  }

  private noise(start: number, duration: number, volume: number, low: number, high: number, brown = false): void {
    if (!this.ctx || !this.effects) return; const src = this.ctx.createBufferSource(), f = this.ctx.createBiquadFilter(), g = this.ctx.createGain(); src.buffer = brown ? this.brownBuffer : this.noiseBuffer; f.type = 'lowpass'; f.frequency.setValueAtTime(low, start); f.frequency.exponentialRampToValueAtTime(Math.max(20, high), start + duration); g.gain.setValueAtTime(0.0001, start); g.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), start + duration * 0.25); g.gain.exponentialRampToValueAtTime(0.0001, start + duration); src.connect(f); f.connect(g); g.connect(this.effects); src.onended = () => { src.disconnect(); f.disconnect(); g.disconnect(); }; src.start(start); src.stop(start + duration + 0.02);
  }

  sfx(name: SfxName, volume = 1): void {
    if (!this.ctx || this.muted) return; const t = this.ctx.currentTime + 0.004, v = Math.max(0, Math.min(2, volume));
    if (name === 'place') { this.noise(t, 0.09, 0.09 * v, 900, 180, true); this.tone(105, t, 0.11, 0.12 * v); }
    else if (name === 'bulldoze') this.noise(t, 0.42, 0.24 * v, 4200, 100, false);
    else if (name === 'error') { this.tone(196, t, 0.2, 0.1 * v, 'square'); this.tone(207.65, t, 0.24, 0.08 * v, 'triangle'); }
    else if (name === 'coin') [523.25, 659.25, 783.99].forEach((f, i) => this.tone(f, t + i * 0.07, 0.16, 0.09 * v));
    else if (name === 'click') this.tone(1100, t, 0.025, 0.05 * v, 'square');
    else if (name === 'levelup') [261.63, 329.63, 392, 523.25, 659.25].forEach((f, i) => this.tone(f, t + i * 0.085, 0.28, 0.075 * v, 'triangle'));
    else if (name === 'disaster') this.noise(t, 1.6, 0.32 * v, 70, 210, true);
    else if (name === 'siren') for (let i = 0; i < 8; i++) this.tone(i & 1 ? 740 : 540, t + i * 0.16, 0.18, 0.055 * v, 'sine');
    else if (name === 'whoosh') this.noise(t, 0.4, 0.13 * v, 180, 6000, false);
    else this.tone(420, t, 0.09, 0.1 * v, 'sine');
  }

  private setChord(nightFactor: number, rain: number): void {
    if (!this.ctx || !this.filter) return;
    this.walk = (Math.imul(this.walk, 1664525) + 1013904223) >>> 0;
    const major = [[0, 7], [5, 12], [9, 16], [7, 14]]; const minor = [[0, 7], [3, 10], [8, 15], [5, 12]];
    this.chordIndex = (this.chordIndex + ((this.walk >>> 29) % 3) - 1 + 4) % 4;
    const chord = (nightFactor > 0.55 ? minor : major)[this.chordIndex]; const base = 82.41;
    this.pad.forEach((o, i) => o.frequency.linearRampToValueAtTime(base * Math.pow(2, chord[i] / 12), this.ctx!.currentTime + 4));
    this.filter.frequency.linearRampToValueAtTime(820 - nightFactor * 300 - rain * 120, this.ctx.currentTime + 3);
  }

  setMuted(m: boolean): void { this.muted = m; if (this.master) this.ramp(this.master.gain, m ? 0 : 0.75, 0.045); }
  setMusicEnabled(m: boolean): void { this.musicEnabled = m; if (this.music) this.ramp(this.music.gain, m ? 1 : 0, 0.08); }

  update(dt: number, state: GameState, nightFactor: number, rain: number): void {
    if (!this.ctx || !this.padGain || !this.humGain || !this.rainGain || !this.music) return;
    this.chordClock += dt; if (this.chordClock >= 16) { this.chordClock %= 16; this.setChord(nightFactor, rain); }
    const enabled = this.musicEnabled && !this.muted;
    const pad = enabled ? 0.026 * (1 - nightFactor * 0.45) : 0;
    const hum = enabled ? Math.min(0.025, Math.log10(state.stats.population + 1) * 0.0048) : 0;
    const wash = enabled ? Math.max(0, Math.min(1, rain)) * 0.018 : 0;
    const tau = 1 - Math.exp(-dt * 2.5);
    this.padGain.gain.setTargetAtTime(pad, this.ctx.currentTime, Math.max(0.03, 0.3 / Math.max(tau, 0.01)));
    this.humGain.gain.setTargetAtTime(hum, this.ctx.currentTime, 0.5);
    this.rainGain.gain.setTargetAtTime(wash, this.ctx.currentTime, 0.4);
  }

  dispose(): void { if (!this.ctx) return; for (const o of this.pad) try { o.stop(); } catch { /* already stopped */ } try { this.lfo?.stop(); } catch { /* already stopped */ } void this.ctx.close(); this.ctx = null; this.pad = []; }
}
