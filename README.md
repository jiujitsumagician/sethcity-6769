# SETHCITY 6769

**The whole city in your pocket. Build it, run it, wreck it.**

A mobile-first 3D city-building game in the browser — SimCity 2000's complete
feature set, rebuilt for a phone in the year 6769, with modern real-time 3D
graphics. No art assets: every mesh, texture and sound is generated procedurally
in code.

## Play

```bash
npm install
npm run dev        # → http://localhost:5183 (open on your phone via LAN IP)
npm run build      # production build in dist/
```

Best experienced installed as a PWA (Add to Home Screen) in portrait or landscape.

## What's inside

- **Zones** — residential / commercial / industrial at three densities, growing
  through five development levels from cabins to sky residences.
- **Networks** — streets, avenues, highways, rail, subways, power lines, water
  mains; bridges over water, tunnels through hills; an SC2K underground view.
- **Utilities** — 9 power sources from wind to fusion and a microwave receiver;
  pumps, towers, treatment and desalination for water; brown-outs when short.
- **Services** — police, fire, prisons, clinics to medical centres, schools to
  universities, parks to stadiums, bus/train/subway/seaport/airport.
- **Simulation** — RCI demand, land value, pollution, noise, crime, traffic flow,
  education, health, happiness, milestones, reward buildings, four arcologies.
- **City life** — day/night cycle, four seasons, weather, animated traffic and
  pedestrians, disasters from house fires to volcanoes to the Giant Llama.
- **Government** — budget with per-service funding, three tax rates, bonds,
  ordinances, neighbour deals, seven advisors, and the *Llama Ledger* newspaper.
- **Fully customisable** — map shape/water/hills/trees/seed, difficulty from
  easy to hard plus sandbox (∞ funds), disasters toggle, graphics quality,
  procedural audio, autosave, multiple save slots.

## Stack

Vite + TypeScript (strict) + three.js. Custom shaders for sky, water, tilt-shift
post. Fixed-step simulation over typed-array fields (128×128 tiles) with
staggered expensive passes. Everything procedural, everything 60fps-on-a-phone.

---

Built by a fleet of Claude agents, orchestrated end-to-end in one session.
