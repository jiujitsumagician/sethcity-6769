import { bus } from '../core/events';

export type ToastKind = 'info' | 'good' | 'warn' | 'bad';

export class Toasts {
  private readonly stack: HTMLElement;
  private readonly offs: (() => void)[];

  constructor(private readonly root: HTMLElement) {
    this.stack = document.createElement('div');
    this.stack.className = 'toasts';
    this.stack.dataset.ui = '';
    root.append(this.stack);
    this.offs = [
      bus.on('money:spent', (p) => this.money(p.amount, p.x, p.y)),
      bus.on('money:denied', ({ reason }) => this.toast(reason || 'Not enough funds', 'bad')),
      bus.on('game:saved', () => this.toast('City saved', 'good')),
      bus.on('milestone', (m) => this.toast(`${m.name} reached — §${m.reward.toLocaleString()}`, 'good')),
    ];
  }

  toast(message: string, kind: ToastKind = 'info'): void {
    const el = document.createElement('div');
    el.className = `toast k-${kind}`;
    const marks: Record<ToastKind, string> = { info: 'i', good: '✓', warn: '!', bad: '×' };
    el.innerHTML = `<span class="ic">${marks[kind]}</span><span></span>`;
    el.lastElementChild!.textContent = message;
    this.stack.append(el);
    const leave = () => { el.classList.add('leaving'); setTimeout(() => el.remove(), 260); };
    el.addEventListener('click', leave, { once: true });
    setTimeout(leave, 3000);
  }

  money(amount: number, x: number, y: number): void {
    const el = document.createElement('div');
    el.className = `money-float ${amount > 0 ? 'gain' : 'loss'}`;
    el.style.left = `${x}px`; el.style.top = `${y}px`;
    el.textContent = `${amount > 0 ? '+' : '−'}§${Math.abs(amount).toLocaleString()}`;
    this.root.append(el); setTimeout(() => el.remove(), 1200);
  }

  dispose(): void { this.offs.forEach((off) => off()); this.stack.remove(); }
}
