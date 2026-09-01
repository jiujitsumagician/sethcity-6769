import type { GameState } from '../core/state';
import type { Newspaper } from '../core/types';
import { mulberry32 } from '../core/rng';
import { bus } from '../core/events';

export function publishPaper(state: GameState): Newspaper {
  const rnd = mulberry32(state.seed + state.time.month + state.time.year * 12);
  const recent = state.news.filter((n) => n.tick > state.time.ticks - 30);
  const leads = ['CITY HUMS, LLAMAS LISTEN', 'MAYOR FACES ANOTHER PERFECTLY NORMAL MONTH', 'CRANES RISE; PIGEONS FILE OBJECTION', 'SETHCITY BUILDS TOWARD TOMORROW'];
  const headline = recent[0]?.text.toUpperCase() ?? leads[(rnd() * leads.length) | 0];
  const articles: Newspaper['articles'] = [];
  if (recent.length) for (let i = 0; i < Math.min(2, recent.length); i++) articles.push({ title: recent[i].kind === 'bad' ? 'Breaking Trouble' : 'Around the City', body: recent[i].text });
  const old = state.history.population.length > 1 ? state.history.population[state.history.population.length - 2] : 0;
  articles.push({ title: state.stats.population >= old ? 'Population Points Up' : 'Census Finds Spare Elbow Room', body: `${state.cityName} now counts ${state.stats.population.toLocaleString()} residents, with approval at ${Math.round(state.stats.approval * 100)}% and traffic at ${Math.round(state.stats.traffic * 100)}%.` });
  if (articles.length < 3) articles.push({ title: 'Treasury Desk', body: `City coffers hold §${Math.round(state.budget.funds).toLocaleString()}. Last month's balance was §${Math.round(state.budget.ledger.net).toLocaleString()}.` });
  const jokes = ['CLASSIFIED: Lost—one zoning permit, last seen under a coffee mug.', 'CLASSIFIED: Quiet apartment beside highway. Earplugs included.', 'CLASSIFIED: Llama seeks municipal role. Strong opinions on parks.', 'CLASSIFIED: Bridge for sale. Some water damage.'];
  const paper: Newspaper = { year: state.time.year, month: state.time.month, masthead: 'The SethCity 6769 Llama Ledger', headline, articles: articles.slice(0, 3), classified: jokes[(rnd() * jokes.length) | 0] };
  state.papers.unshift(paper); if (state.papers.length > 24) state.papers.length = 24;
  bus.emit('paper', paper); return paper;
}
