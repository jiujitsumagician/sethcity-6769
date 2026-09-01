import type { GameState } from '../core/state';
import type { Newspaper, NewsItem } from '../core/types';
import { mulberry32 } from '../core/rng';
import { bus } from '../core/events';

type Situation = 'boom' | 'bust' | 'disaster' | 'milestone' | 'first' | 'quiet' | 'crime' | 'pollution' | 'traffic' | 'tax';
const HEADLINES: Record<Situation, readonly string[]> = {
  boom: ['CRANES OUTNUMBER EXCUSES', 'CENSUS CLERKS REQUEST LARGER ABACUS', 'CITY GROWS; HORIZON RETREATS', 'NEW NEIGHBOURS ARRIVE WITH BOXES', 'BOOM TIMES RATTLE THE WINDOWS', 'POPULATION CHART POINTS IMPOLITELY UP', 'BUILDERS DISCOVER ANOTHER STOREY', 'WELCOME MATS SELL OUT CITYWIDE'],
  bust: ['CENSUS FINDS SUSPICIOUSLY ROOMY CITY', 'MOVING VANS ENJOY RECORD QUARTER', 'CITY SHRINKS, PARKING IMPROVES', 'EMPTY FLATS DEVELOP ECHO', 'POPULATION TAKES SCENIC ROUTE DOWN', 'LAST RESIDENT OUT, PLEASE DIM STREETLIGHTS', 'GROWTH COMMITTEE MISPLACES GROWTH', 'CENSUS CLERK COUNTS EVERYONE TWICE, STILL WORRIES'],
  disaster: ['CITY DUSTS ITSELF OFF, AGAIN', 'SIRENS STOP; QUESTIONS BEGIN', 'DISASTER LEAVES MAYOR WITH VERY LARGE CLIPBOARD', 'RUBBLE DECLARED TEMPORARY LANDMARK', 'CITIZENS SURVIVE ANOTHER RUDE AFTERNOON', 'AFTERMATH: BROOM SALES SOAR', 'EMERGENCY CREWS WIN ARGUMENT WITH CHAOS', 'CITY STANDING, SOME ASSEMBLY REQUIRED'],
  milestone: ['CITY CROSSES LINE DRAWN BY STATISTICIANS', 'MILESTONE REACHED; CAKE COMMITTEE FORMED', 'CIVIC STATUS UPGRADED WITHOUT REBOOT', 'POPULATION EARNS SHINIER ROAD SIGN', 'CITY LEVELS UP, TAXPAYERS REMAIN ANALOGUE', 'HISTORY MADE BEFORE LUNCH', 'NEW MILESTONE, SAME OLD POTHOLE', 'LLAMAS SALUTE CIVIC ACHIEVEMENT'],
  first: ['A CITY FIRST, PROBABLY NOT ITS LAST', 'RIBBON CUT; SCISSORS ACCOUNTED FOR', 'FIRST OF ITS KIND OPENS DOORS', 'NEW INSTITUTION BAFFLES OLD PIGEONS', 'CITY TRIES SOMETHING ON PURPOSE', 'INAUGURAL FACILITY SURVIVES INAUGURATION', 'PROGRESS ARRIVES IN A HARD HAT', 'MAYOR UNVEILS THING CITIZENS ASKED FOR'],
  quiet: ['NOTHING EXPLODES; LEDGER INVESTIGATES', 'QUIET MONTH ALARMS NEWSROOM', 'CITY HUMS AT LEGALLY ACCEPTABLE VOLUME', 'PIGEONS DOMINATE COUNCIL AGENDA', 'NORMALITY BREAKS OUT CITYWIDE', 'MAYOR COMPLETES MONTH WITHOUT DUCKING', 'CALM CONDITIONS, LOUD CLASSIFIEDS', 'ALL ROUTINE, WHICH IS SUSPICIOUS'],
  crime: ['CRIME WAVE STEALS FRONT PAGE', 'LOCKSMITHS REPORT UNCOMFORTABLE BOOM', 'CITY ASKS WHO STOLE THE SAFETY BUDGET', 'HIGH CRIME, LOW ALIBI SUPPLY', 'CONSTABLES SEEK MORE CONSTABLES', 'NEIGHBOURHOOD WATCH NEEDS BINOCULARS', 'THIEVES TAKE EVERYTHING BUT ADVICE', 'SAFETY FIGURES HIDE UNDER DESK'],
  pollution: ['AIR ACQUIRES TEXTURE', 'SKY FILES FORMAL COMPLAINT', 'SMOG NOW VISIBLE FROM NEXT CENTURY', 'CITIZENS CHEW BEFORE BREATHING', 'POLLUTION METER RUNS OUT OF POLITE COLOURS', 'FACTORY CLOUD APPLIES FOR POSTCODE', 'CLEAN AIR REMAINS ATTRACTIVE THEORY', 'LLAMAS DEMAND SMALLER CHIMNEYS'],
  traffic: ['COMMUTE NOW MEASURED IN SEASONS', 'TRAFFIC JAM APPLIES FOR PERMANENT ADDRESS', 'HORNS REPLACE MUNICIPAL BIRDLIFE', 'RUSH HOUR DECLARED FULL-TIME JOB', 'DRIVERS AGE VISIBLY AT CROSSROADS', 'CITY MOVES AT SPEED OF COUNCIL MEETING', 'GRIDLOCK ACHIEVES PERFECT GRID', 'SHORTCUT DISCOVERED; IMMEDIATELY CLOGGED'],
  tax: ['TAX DIAL MOVES; WALLETS NOTICE', 'CITY HALL ADJUSTS PRICE OF CIVILISATION', 'TAXPAYERS READ FINE PRINT ALOUD', 'NEW RATES ARRIVE WITHOUT PARADE', 'TREASURY TURNS THREE IMPORTANT KNOBS', 'COUNCIL VOTES TO FEED THE LEDGER', 'TAX POLICY ENTERS ITS EXPERIMENTAL PHASE', 'MAYOR EXPLAINS PERCENTAGES; CROWD DISPERSES'],
};
const CLASSIFIEDS = [
  'Llama seeks arcology penthouse; elevator must accept hay.', 'For sale: one monorail map, only slightly imaginary.', 'Wanted: traffic engineer fluent in horns and regret.', 'Lost: municipal budget. Answers to “balanced.”',
  'Year-6769 calendar, mint condition; all previous appointments missed.', 'Arcology window washer seeks very, very long ladder.', 'Quiet home beside fusion plant; night-light included.', 'Llama grooming, zoning appeals, and light demolition—one office.',
  'Used hovercar. Still mostly hovers. No refunds after 6770.', 'Pothole naming rights available; family packages offered.', 'Mayor impersonator available for difficult ribbon cuttings.', 'Seeking roommate: must tolerate sirens, llamas, and 9% residential tax.',
  'Fresh beachfront plot; tide currently reviewing contract.', 'Power line untangler—reasonable rates, spectacular hair.', 'Subway musician needs audience; trains optional.', 'Genuine antique from 2026. Historians baffled, offers welcome.',
  'Smog photographer seeks days with subject matter.', 'Llama Ledger carrier needed; jetpack not supplied.', 'Bridge for sale. Water underneath sold separately.', 'Tiny park bench, panoramic view of six factories.',
  'Arcology committee seeks committee to reduce committees.', 'Rent a crane for weddings, birthdays, or medium-density zoning.', 'Found: one civic milestone behind the sofa.', 'Wanted: disaster-free weekend, any year considered.',
];

function oldPopulation(state: GameState): number { const h = state.history.population; return h.length > 1 ? h[h.length - 2] : h.length ? h[0] : state.stats.population; }
function situation(state: GameState, recent: NewsItem[], delta: number): Situation {
  if (state.disasters.length || recent.some((n) => n.kind === 'bad')) return 'disaster';
  if (recent.some((n) => /reached|milestone/i.test(n.text))) return 'milestone';
  if (state.stats.safety < 0.35) return 'crime';
  if (state.stats.pollution > 0.48) return 'pollution';
  if (state.stats.traffic > 0.55) return 'traffic';
  if (Math.max(state.budget.taxRes, state.budget.taxCom, state.budget.taxInd) >= 0.12 || Math.min(state.budget.taxRes, state.budget.taxCom, state.budget.taxInd) <= 0.06) return 'tax';
  if (delta > Math.max(25, oldPopulation(state) * 0.015)) return 'boom';
  if (delta < -Math.max(10, oldPopulation(state) * 0.01)) return 'bust';
  if (state.stats.resBuildings + state.stats.comBuildings + state.stats.indBuildings <= 3 && state.stats.population > 0) return 'first';
  return 'quiet';
}
function unique(options: readonly string[], used: Set<string>, rnd: () => number): string { const start = (rnd() * options.length) | 0; for (let n = 0; n < options.length; n++) { const v = options[(start + n) % options.length]; if (!used.has(v)) return v; } return options[start]; }
function money(n: number): string { return `§${Math.round(n).toLocaleString()}`; }

export function publishPaper(state: GameState): Newspaper {
  const rnd = mulberry32((state.seed + state.time.year * 12 + state.time.month) | 0);
  const recent = state.news.filter((n) => n.tick > state.time.ticks - 31);
  const delta = state.stats.population - oldPopulation(state);
  const lastSix = state.papers.slice(0, 6);
  const headline = unique(HEADLINES[situation(state, recent, delta)], new Set(lastSix.map((p) => p.headline)), rnd);
  const namedEvents = recent.slice(0, 2).map((n) => n.text).join(' / ') || 'no sirens, ribbon cuttings, or escaped planning meetings';
  const active = state.disasters.map((d) => d.kind).join(', ') || 'none active';
  const articles: Newspaper['articles'] = [
    { title: state.disasters.length ? 'After the Sirens' : 'The Month in One Nervous Glance', body: `${state.cityName} reports ${state.stats.population.toLocaleString()} residents, a monthly change of ${delta >= 0 ? '+' : ''}${delta.toLocaleString()}. Recent dispatches include ${namedEvents}; active disasters: ${active}. The Ledger congratulates everyone who did not make either list.` },
    { title: 'Mayor, Money, and Other Weather Systems', body: `Mayor ${state.mayorName} faces an approval rating of ${Math.round(state.stats.approval * 100)}%, while city funds stand at ${money(state.budget.funds)}. The last ledger balance was ${money(state.budget.ledger.net)}, with residential, commercial, and industrial taxes at ${Math.round(state.budget.taxRes * 100)}%, ${Math.round(state.budget.taxCom * 100)}%, and ${Math.round(state.budget.taxInd * 100)}%. Numbers remain cheaper than promises.` },
    { title: 'Streets, Stacks, and Taps', body: `Traffic is ${Math.round(state.stats.traffic * 100)}%, pollution ${Math.round(state.stats.pollution * 100)}%, and safety ${Math.round(state.stats.safety * 100)}%. Water supply is ${state.stats.waterSupply.toLocaleString()} against demand of ${state.stats.waterDemand.toLocaleString()}, while power supply is ${state.stats.powerSupply.toLocaleString()} against ${state.stats.powerDemand.toLocaleString()} demand. If these figures improve, the Ledger will reluctantly print that too.` },
  ];
  const classified = unique(CLASSIFIEDS, new Set(lastSix.map((p) => p.classified)), rnd);
  const paper: Newspaper = { year: state.time.year, month: state.time.month, masthead: 'The Llama Ledger', headline, articles, classified };
  state.papers.unshift(paper); if (state.papers.length > 24) state.papers.length = 24;
  bus.emit('paper', paper); return paper;
}
