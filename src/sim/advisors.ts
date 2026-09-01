import type { GameState } from '../core/state';
import type { AdvisorMessage } from '../core/types';

export function getAdvice(state: GameState): AdvisorMessage[] {
  const s = state.stats, b = state.budget;
  const rows: { score: number; msg: AdvisorMessage }[] = [];
  const add = (score: number, advisor: AdvisorMessage['advisor'], name: string, text: string) => rows.push({ score, msg: { advisor, name, mood: score > 0.72 ? 'angry' : score > 0.42 ? 'worried' : score < 0.15 ? 'happy' : 'neutral', text } });
  add(b.funds < 0 ? 1 : b.ledger.net < 0 ? 0.65 : 0.08, 'finance', 'Mara Quid', b.funds < 0 ? 'The treasury is echoing. Raise revenue or trim funding before the llamas repossess City Hall.' : b.ledger.net < 0 ? 'Our monthly ledger is bleeding gently, which is still bleeding.' : 'The books balance. I have sharpened a celebratory pencil.');
  add(1 - s.safety, 'safety', 'Chief Bolt', s.safety < 0.55 ? 'Crime is outrunning patrol coverage. Fund police and connect neglected districts.' : 'Streets are orderly. Suspiciously orderly. Keep the radios charged.');
  add(1 - s.health, 'health', 'Dr. Vela Pulse', s.health < 0.55 ? 'Clinics are stretched thin. Sick citizens do not make cheerful taxpayers.' : 'Public health is sturdy; wash your hands anyway, Mayor.');
  add(1 - s.educationLevel, 'education', 'Prof. Ada Quill', s.educationLevel < 0.5 ? 'We need classrooms, libraries, and fewer textbooks holding up wobbly desks.' : 'Education is rising. The children have begun correcting my footnotes.');
  add(Math.max(s.traffic, s.unemployment * 0.8), 'transport', 'Rex Axle', s.traffic > 0.55 ? 'Traffic is congealing. Add capacity or transit before everyone simply lives in their cars.' : 'Commutes are moving. Roads still require funding and occasional dignity.');
  add(s.pollution, 'environment', 'Fern Moss', s.pollution > 0.35 ? 'The air has texture. Separate heavy industry and invest in cleaner policy.' : 'The breeze smells mostly like breeze. Plant another tree for insurance.');
  const utility = Math.max(s.powerDemand > s.powerSupply ? 0.9 : 0, s.waterDemand > s.waterSupply ? 0.9 : 0, 1 - s.landValueAvg / 140);
  add(utility, 'planning', 'Ivo Grid', s.powerDemand > s.powerSupply || s.waterDemand > s.waterSupply ? 'Growth is outrunning utilities. No amount of zoning can drink a blueprint.' : 'Shape compact districts around connected roads; sprawl is just distance wearing a hat.');
  rows.sort((a, b2) => b2.score - a.score);
  return rows.map((r) => r.msg);
}
