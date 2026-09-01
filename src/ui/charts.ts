export interface ChartOptions {
  label: string;
  color?: string;
  percent?: boolean;
  money?: boolean;
}

export function drawLineChart(canvas: HTMLCanvasElement, values: readonly number[], opts: ChartOptions): void {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(220, rect.width || 320);
  const h = Math.max(100, rect.height || 120);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);
  const data = values.length ? values.slice(-72) : [0];
  let min = Math.min(...data, 0);
  let max = Math.max(...data, 1);
  if (max === min) max = min + 1;
  const pad = { l: 38, r: 12, t: 24, b: 17 };
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  ctx.font = '10px system-ui';
  ctx.fillStyle = '#93a0b0';
  ctx.fillText(opts.label, 10, 15);
  ctx.strokeStyle = 'rgba(255,255,255,.08)';
  ctx.fillStyle = '#718090';
  for (let n = 0; n <= 2; n++) {
    const y = pad.t + ih * n / 2;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
    const v = max - (max - min) * n / 2;
    ctx.fillText(short(v, opts), 3, y + 3);
  }
  const xAt = (i: number) => pad.l + (data.length === 1 ? iw : iw * i / (data.length - 1));
  const yAt = (v: number) => pad.t + ih - (v - min) / (max - min) * ih;
  const color = opts.color ?? '#3ddbd9';
  ctx.beginPath();
  data.forEach((v, i) => i ? ctx.lineTo(xAt(i), yAt(v)) : ctx.moveTo(xAt(i), yAt(v)));
  const gradient = ctx.createLinearGradient(0, pad.t, 0, h - pad.b);
  gradient.addColorStop(0, `${color}55`); gradient.addColorStop(1, `${color}00`);
  ctx.lineTo(xAt(data.length - 1), h - pad.b); ctx.lineTo(pad.l, h - pad.b); ctx.closePath();
  ctx.fillStyle = gradient; ctx.fill();
  ctx.beginPath();
  data.forEach((v, i) => i ? ctx.lineTo(xAt(i), yAt(v)) : ctx.moveTo(xAt(i), yAt(v)));
  ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke();
  const last = data[data.length - 1];
  const badge = short(last, opts);
  ctx.font = 'bold 10px system-ui';
  const bw = ctx.measureText(badge).width + 10;
  ctx.fillStyle = color; ctx.fillRect(w - pad.r - bw, 5, bw, 17);
  ctx.fillStyle = '#071716'; ctx.fillText(badge, w - pad.r - bw + 5, 17);
}

function short(value: number, opts: ChartOptions): string {
  if (opts.percent) return `${Math.round(value * 100)}%`;
  const abs = Math.abs(value);
  const s = abs >= 1e6 ? `${(value / 1e6).toFixed(1)}m` : abs >= 1e3 ? `${(value / 1e3).toFixed(1)}k` : Math.round(value).toString();
  return opts.money ? `§${s}` : s;
}
