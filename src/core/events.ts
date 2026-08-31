import type { GameEvents } from './types';

type Handler<K extends keyof GameEvents> = (payload: GameEvents[K]) => void;

class Bus {
  private map = new Map<string, Set<Function>>();

  on<K extends keyof GameEvents>(k: K, fn: Handler<K>): () => void {
    let s = this.map.get(k as string);
    if (!s) this.map.set(k as string, (s = new Set()));
    s.add(fn);
    return () => s!.delete(fn);
  }

  off<K extends keyof GameEvents>(k: K, fn: Handler<K>) {
    this.map.get(k as string)?.delete(fn);
  }

  emit<K extends keyof GameEvents>(k: K, payload: GameEvents[K]) {
    const s = this.map.get(k as string);
    if (!s) return;
    for (const fn of s) (fn as Handler<K>)(payload);
  }
}

export const bus = new Bus();
