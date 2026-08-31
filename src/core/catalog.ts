/**
 * SKYLINE — building catalog. CATALOG[id] is the definition; id 0 is "empty".
 * Grown buildings (grown:true, 1x1) are placed by the zoning sim.
 * Everything else is player-placed. FROZEN CONTRACT — add rows, never reorder.
 */
import { Zone, type BuildingDef } from './types';

const list: BuildingDef[] = [];

function def(d: Partial<BuildingDef> & Pick<BuildingDef, 'key' | 'name' | 'category' | 'archetype'>): BuildingDef {
  const full: BuildingDef = {
    id: list.length,
    w: 1,
    h: 1,
    cost: 0,
    upkeep: 0,
    grown: false,
    residents: 0,
    jobs: 0,
    power: 0,
    powerOut: 0,
    water: 0,
    waterOut: 0,
    pollution: 0,
    noise: 0,
    ...d,
  } as BuildingDef;
  list.push(full);
  return full;
}

/* id 0 — empty sentinel */
def({ key: 'empty', name: '—', category: 'special', archetype: 'rubble' });

/* ───────────────────────────── residential (grown) ───────────────────────── */
const RES_LOW = [
  ['rl1', 'Cabin', 4, 0, 12, 0x9d8368, 1.6],
  ['rl2', 'Family Home', 9, 20, 30, 0xd8cbb4, 2.1],
  ['rl3', 'Suburban House', 14, 45, 60, 0xe8e0cc, 2.6],
  ['rl4', 'Big House', 20, 90, 105, 0xf0ead8, 3.2],
  ['rl5', 'Estate', 28, 150, 160, 0xfaf4e4, 3.8],
] as const;
RES_LOW.forEach(([key, name, residents, minLV, lv, col, ht], i) =>
  def({
    key, name, category: 'residential', archetype: i < 2 ? 'house' : 'house',
    grown: true, zone: Zone.ResLow, level: i + 1,
    residents: residents as number, power: 0.6 + i * 0.35, water: 0.5 + i * 0.3,
    pollution: 4, noise: 6, minLandValue: minLV as number, height: ht as number,
    palette: [col as number, 0x8b5a3c, 0x6f4e37],
    upkeep: 0,
  }),
);

const RES_MED = [
  ['rm1', 'Duplex', 22, 30, 0xc9b8a0, 3.4],
  ['rm2', 'Row Houses', 40, 55, 0xd4bfa8, 4.2],
  ['rm3', 'Low Apartments', 70, 80, 0xc0b7ae, 6.0],
  ['rm4', 'Apartment Block', 115, 110, 0xb9b2ab, 8.5],
  ['rm5', 'Condominium', 170, 150, 0xd9d5cf, 11.0],
] as const;
RES_MED.forEach(([key, name, residents, minLV, col, ht], i) =>
  def({
    key, name, category: 'residential', archetype: i < 2 ? 'rowhouse' : 'apartment',
    grown: true, zone: Zone.ResMed, level: i + 1,
    residents: residents as number, power: 2.2 + i * 1.4, water: 2 + i * 1.2,
    pollution: 6, noise: 14, minLandValue: minLV as number, height: ht as number,
    palette: [col as number, 0x7d6b5d, 0x4a4a52],
  }),
);

const RES_HIGH = [
  ['rh1', 'Apartment Tower', 240, 90, 0x9fb0c4, 16],
  ['rh2', 'High-Rise', 380, 120, 0x8fa4bb, 24],
  ['rh3', 'Residential Tower', 560, 150, 0x7f98b4, 33],
  ['rh4', 'Luxury Tower', 780, 185, 0xa7bdd6, 44],
  ['rh5', 'Sky Residence', 1100, 215, 0xc2d6ea, 60],
] as const;
RES_HIGH.forEach(([key, name, residents, minLV, col, ht], i) =>
  def({
    key, name, category: 'residential', archetype: i < 1 ? 'apartment' : i < 4 ? 'tower' : 'skyscraper',
    grown: true, zone: Zone.ResHigh, level: i + 1,
    residents: residents as number, power: 8 + i * 6, water: 7 + i * 5,
    pollution: 8, noise: 22, minLandValue: minLV as number, height: ht as number,
    palette: [col as number, 0x5b6a7d, 0x2e3742],
  }),
);

/* ───────────────────────────── commercial (grown) ────────────────────────── */
const COM_LOW = [
  ['cl1', 'Corner Store', 6, 0, 0xe0c9a6, 2.6],
  ['cl2', 'Shopfront', 14, 30, 0xe8d4b0, 3.4],
  ['cl3', 'Strip Mall', 28, 60, 0xdcc9ae, 4.2],
  ['cl4', 'Retail Block', 48, 95, 0xd0bfa4, 6.5],
  ['cl5', 'Department Store', 80, 135, 0xc8b89e, 9.0],
] as const;
COM_LOW.forEach(([key, name, jobs, minLV, col, ht], i) =>
  def({
    key, name, category: 'commercial', archetype: i < 3 ? 'shop' : 'mall',
    grown: true, zone: Zone.ComLow, level: i + 1,
    jobs: jobs as number, power: 1.6 + i * 1.5, water: 1 + i * 0.9,
    pollution: 8, noise: 24, minLandValue: minLV as number, height: ht as number,
    palette: [col as number, 0xb05a4a, 0x3f5b76],
  }),
);

const COM_HIGH = [
  ['ch1', 'Small Office', 45, 70, 0x9ab6c9, 12],
  ['ch2', 'Office Block', 110, 105, 0x86a7bf, 20],
  ['ch3', 'Office Tower', 220, 140, 0x6f95b3, 32],
  ['ch4', 'Corporate Tower', 400, 175, 0x5c88ad, 48],
  ['ch5', 'Skyscraper', 700, 210, 0x4f7fa8, 72],
] as const;
COM_HIGH.forEach(([key, name, jobs, minLV, col, ht], i) =>
  def({
    key, name, category: 'commercial', archetype: i < 2 ? 'office' : 'skyscraper',
    grown: true, zone: Zone.ComHigh, level: i + 1,
    jobs: jobs as number, power: 7 + i * 7, water: 4 + i * 4,
    pollution: 10, noise: 30, minLandValue: minLV as number, height: ht as number,
    palette: [col as number, 0x2b4a63, 0x1a2b3a],
  }),
);

/* ───────────────────────────── industrial (grown) ────────────────────────── */
def({ key: 'ia1', name: 'Smallholding', category: 'industrial', archetype: 'farm', grown: true, zone: Zone.IndAgri, level: 1, jobs: 8, power: 0.8, water: 3, pollution: 10, noise: 8, height: 1.8, palette: [0xc9a86a, 0x7a8f4a, 0x8b6b3d] });
def({ key: 'ia2', name: 'Farm', category: 'industrial', archetype: 'farm', grown: true, zone: Zone.IndAgri, level: 2, jobs: 16, power: 1.4, water: 6, pollution: 16, noise: 10, height: 2.4, palette: [0xb5432f, 0x8a9b52, 0x8b6b3d] });
def({ key: 'ia3', name: 'Agri Estate', category: 'industrial', archetype: 'farm', grown: true, zone: Zone.IndAgri, level: 3, jobs: 26, power: 2.2, water: 10, pollution: 24, noise: 12, height: 3.0, palette: [0xa03a2a, 0x95a45c, 0x7a5c34] });

def({ key: 'il1', name: 'Workshop', category: 'industrial', archetype: 'workshop', grown: true, zone: Zone.IndLight, level: 1, jobs: 20, power: 2.5, water: 1.5, pollution: 30, noise: 40, height: 3.2, palette: [0xb8b0a4, 0x7c7367, 0x5a5852] });
def({ key: 'il2', name: 'Light Factory', category: 'industrial', archetype: 'factory', grown: true, zone: Zone.IndLight, level: 2, jobs: 45, power: 5, water: 3, pollution: 45, noise: 55, height: 4.5, palette: [0xa8a49a, 0x6f6a60, 0x4d4b46] });
def({ key: 'il3', name: 'Industrial Park', category: 'industrial', archetype: 'warehouse', grown: true, zone: Zone.IndLight, level: 3, jobs: 80, power: 9, water: 5, pollution: 52, noise: 62, height: 5.2, palette: [0x9fa3a6, 0x676c70, 0x45484b] });
def({ key: 'il4', name: 'Technology Plant', category: 'industrial', archetype: 'factory', grown: true, zone: Zone.IndLight, level: 4, jobs: 130, power: 16, water: 8, pollution: 34, noise: 48, height: 6.5, palette: [0xd0d6da, 0x8fa0ad, 0x4a5760] });

def({ key: 'ih1', name: 'Factory', category: 'industrial', archetype: 'factory', grown: true, zone: Zone.IndHeavy, level: 1, jobs: 55, power: 8, water: 6, pollution: 90, noise: 80, height: 5.0, palette: [0x9d9186, 0x6b6158, 0x3f3a35] });
def({ key: 'ih2', name: 'Heavy Factory', category: 'industrial', archetype: 'factory', grown: true, zone: Zone.IndHeavy, level: 2, jobs: 95, power: 15, water: 11, pollution: 130, noise: 95, height: 6.5, palette: [0x8e8378, 0x5f564e, 0x3a352f] });
def({ key: 'ih3', name: 'Refinery', category: 'industrial', archetype: 'refinery', grown: true, zone: Zone.IndHeavy, level: 3, jobs: 150, power: 26, water: 20, pollution: 185, noise: 110, height: 8.0, palette: [0xb0b6b8, 0x7a8083, 0x4c5052] });
def({ key: 'ih4', name: 'Steelworks', category: 'industrial', archetype: 'refinery', grown: true, zone: Zone.IndHeavy, level: 4, jobs: 220, power: 40, water: 30, pollution: 230, noise: 130, height: 9.5, palette: [0x8a6b5a, 0x5d4a3f, 0x36302b] });

/* ─────────────────────────────────── power ───────────────────────────────── */
def({ key: 'p_wind', name: 'Wind Turbine', category: 'power', archetype: 'windturbine', w: 1, h: 1, cost: 4500, upkeep: 40, powerOut: 12, pollution: 0, noise: 20, height: 14, desc: 'Clean but modest output. Better on hills.' });
def({ key: 'p_solar', name: 'Solar Farm', category: 'power', archetype: 'solarfarm', w: 3, h: 3, cost: 22000, upkeep: 180, powerOut: 95, pollution: 0, noise: 0, height: 1.0, needsFlat: true, unlockPop: 500, desc: 'Silent, clean, needs a lot of flat land.' });
def({ key: 'p_coal', name: 'Coal Plant', category: 'power', archetype: 'powerplant', w: 4, h: 4, cost: 16000, upkeep: 420, powerOut: 320, pollution: 250, noise: 120, height: 9, needsFlat: true, desc: 'Cheap power. Filthy.' });
def({ key: 'p_gas', name: 'Gas Plant', category: 'power', archetype: 'powerplant', w: 4, h: 4, cost: 30000, upkeep: 560, powerOut: 480, pollution: 120, noise: 90, height: 8, needsFlat: true, unlockPop: 2000, desc: 'Cleaner than coal, pricier.' });
def({ key: 'p_hydro', name: 'Hydro Dam', category: 'power', archetype: 'powerplant', w: 2, h: 2, cost: 20000, upkeep: 240, powerOut: 220, pollution: 0, noise: 30, needsWater: true, height: 6, unlockPop: 1000, desc: 'Clean shoreline power.' });
def({ key: 'p_oil', name: 'Oil Plant', category: 'power', archetype: 'powerplant', w: 4, h: 4, cost: 22000, upkeep: 500, powerOut: 400, pollution: 190, noise: 100, height: 9, needsFlat: true, unlockPop: 1000, desc: 'More power than coal, almost as dirty.' });
def({ key: 'p_nuclear', name: 'Nuclear Plant', category: 'power', archetype: 'powerplant', w: 4, h: 4, cost: 120000, upkeep: 1900, powerOut: 1800, pollution: 30, noise: 60, height: 12, needsFlat: true, unlockPop: 30000, desc: 'Enormous output. Meltdown risk if underfunded.' });
def({ key: 'p_microwave', name: 'Microwave Receiver', category: 'power', archetype: 'powerplant', w: 4, h: 4, cost: 200000, upkeep: 2800, powerOut: 3200, pollution: 0, noise: 30, height: 13, needsFlat: true, unlockPop: 45000, desc: 'Beamed from orbit. Mostly hits the dish.' });
def({ key: 'p_fusion', name: 'Fusion Reactor', category: 'power', archetype: 'powerplant', w: 5, h: 5, cost: 420000, upkeep: 5200, powerOut: 6500, pollution: 0, noise: 40, height: 16, needsFlat: true, unlockPop: 80000, desc: 'The future, today.' });

/* ─────────────────────────────────── water ───────────────────────────────── */
def({ key: 'w_pump', name: 'Water Pump', category: 'water', archetype: 'watertower', w: 2, h: 2, cost: 3000, upkeep: 60, waterOut: 90, power: 2, needsWater: true, height: 3.5, desc: 'Must be built beside fresh water.' });
def({ key: 'w_tower', name: 'Water Tower', category: 'water', archetype: 'watertower', w: 2, h: 2, cost: 6000, upkeep: 90, waterOut: 160, power: 3, height: 9, desc: 'Works anywhere. Costlier per unit.' });
def({ key: 'w_treat', name: 'Treatment Plant', category: 'water', archetype: 'civic', w: 3, h: 3, cost: 24000, upkeep: 300, waterOut: 520, power: 12, pollution: 40, height: 4, needsFlat: true, unlockPop: 5000, desc: 'Big supply, mild pollution.' });
def({ key: 'w_desal', name: 'Desalination Plant', category: 'water', archetype: 'civic', w: 4, h: 4, cost: 90000, upkeep: 900, waterOut: 1600, power: 45, needsWater: true, height: 6, unlockPop: 30000, desc: 'Coastal. Vast supply, thirsty for power.' });

/* ─────────────────────────────────── safety ──────────────────────────────── */
def({ key: 's_police', name: 'Police Station', category: 'safety', archetype: 'civic', w: 2, h: 2, cost: 5000, upkeep: 220, power: 2, water: 1.5, jobs: 20, service: { kind: 'police', radius: 16, strength: 200 }, height: 4, desc: 'Cuts crime nearby.' });
def({ key: 's_police_hq', name: 'Police Headquarters', category: 'safety', archetype: 'civic', w: 3, h: 3, cost: 22000, upkeep: 700, power: 6, water: 4, jobs: 70, service: { kind: 'police', radius: 30, strength: 255 }, height: 8, unlockPop: 10000, desc: 'City-wide deterrence.' });
def({ key: 's_fire', name: 'Fire Station', category: 'safety', archetype: 'civic', w: 2, h: 2, cost: 5500, upkeep: 240, power: 2, water: 3, jobs: 22, service: { kind: 'fire', radius: 16, strength: 200 }, height: 4, desc: 'Fights fires in range.' });
def({ key: 's_fire_hq', name: 'Fire Headquarters', category: 'safety', archetype: 'civic', w: 3, h: 3, cost: 24000, upkeep: 760, power: 6, water: 8, jobs: 75, service: { kind: 'fire', radius: 30, strength: 255 }, height: 8, unlockPop: 10000 });
def({ key: 's_prison', name: 'Prison', category: 'safety', archetype: 'civic', w: 4, h: 4, cost: 30000, upkeep: 1100, power: 10, water: 12, jobs: 90, pollution: 20, noise: 60, service: { kind: 'police', radius: 44, strength: 140 }, height: 6, unlockPop: 8000, desc: 'Boosts police effect citywide, sours the neighbourhood.' });

/* ─────────────────────────────────── health ──────────────────────────────── */
def({ key: 'h_clinic', name: 'Clinic', category: 'health', archetype: 'hospital', w: 2, h: 2, cost: 6000, upkeep: 260, power: 3, water: 4, jobs: 25, service: { kind: 'health', radius: 15, strength: 180 }, height: 4.5, unlockPop: 300 });
def({ key: 'h_hospital', name: 'Hospital', category: 'health', archetype: 'hospital', w: 3, h: 3, cost: 26000, upkeep: 900, power: 12, water: 14, jobs: 120, service: { kind: 'health', radius: 28, strength: 240 }, height: 10, unlockPop: 3000 });
def({ key: 'h_medcenter', name: 'Medical Centre', category: 'health', archetype: 'hospital', w: 4, h: 4, cost: 85000, upkeep: 2400, power: 30, water: 34, jobs: 320, service: { kind: 'health', radius: 44, strength: 255 }, beauty: { radius: 12, strength: 30 }, height: 16, unlockPop: 25000 });

/* ────────────────────────────────── education ────────────────────────────── */
def({ key: 'e_school', name: 'Elementary School', category: 'education', archetype: 'school', w: 3, h: 2, cost: 7000, upkeep: 300, power: 3, water: 4, jobs: 30, service: { kind: 'education', radius: 16, strength: 190, tier: 1 }, height: 4, unlockPop: 300 });
def({ key: 'e_high', name: 'High School', category: 'education', archetype: 'school', w: 3, h: 3, cost: 18000, upkeep: 640, power: 7, water: 8, jobs: 70, service: { kind: 'education', radius: 22, strength: 220, tier: 1 }, height: 5.5, unlockPop: 2000 });
def({ key: 'e_library', name: 'Library', category: 'education', archetype: 'civic', w: 2, h: 2, cost: 6500, upkeep: 200, power: 2, water: 1.5, jobs: 14, service: { kind: 'education', radius: 18, strength: 120, tier: 1 }, beauty: { radius: 8, strength: 25 }, height: 5, unlockPop: 800 });
def({ key: 'e_college', name: 'Community College', category: 'education', archetype: 'university', w: 4, h: 4, cost: 45000, upkeep: 1500, power: 16, water: 18, jobs: 190, service: { kind: 'education', radius: 34, strength: 240, tier: 2 }, beauty: { radius: 14, strength: 30 }, height: 8, unlockPop: 10000 });
def({ key: 'e_university', name: 'University', category: 'education', archetype: 'university', w: 5, h: 5, cost: 130000, upkeep: 3600, power: 38, water: 42, jobs: 480, service: { kind: 'education', radius: 48, strength: 255, tier: 3 }, beauty: { radius: 20, strength: 45 }, height: 11, unlockPop: 30000 });
def({ key: 'e_museum', name: 'Museum', category: 'education', archetype: 'landmark', w: 3, h: 3, cost: 38000, upkeep: 900, power: 8, water: 6, jobs: 60, service: { kind: 'education', radius: 20, strength: 140, tier: 2 }, beauty: { radius: 22, strength: 70 }, height: 9, unlockPop: 15000 });

/* ─────────────────────────────────── leisure ─────────────────────────────── */
def({ key: 'l_park', name: 'Small Park', category: 'leisure', archetype: 'park', w: 1, h: 1, cost: 200, upkeep: 6, water: 0.4, service: { kind: 'park', radius: 8, strength: 110 }, beauty: { radius: 8, strength: 40 }, height: 0.3 });
def({ key: 'l_fountain', name: 'Fountain Square', category: 'leisure', archetype: 'plaza', w: 2, h: 2, cost: 1800, upkeep: 30, water: 2, service: { kind: 'park', radius: 12, strength: 150 }, beauty: { radius: 14, strength: 70 }, height: 0.8, unlockPop: 500 });
def({ key: 'l_bigpark', name: 'City Park', category: 'leisure', archetype: 'park', w: 3, h: 3, cost: 6500, upkeep: 120, water: 5, service: { kind: 'park', radius: 20, strength: 200 }, beauty: { radius: 22, strength: 90 }, height: 0.5, unlockPop: 1500 });
def({ key: 'l_sports', name: 'Sports Field', category: 'leisure', archetype: 'park', w: 3, h: 3, cost: 9000, upkeep: 180, power: 3, water: 8, jobs: 12, service: { kind: 'park', radius: 18, strength: 190 }, beauty: { radius: 12, strength: 50 }, height: 1.2, unlockPop: 3000 });
def({ key: 'l_marina', name: 'Marina', category: 'leisure', archetype: 'port', w: 3, h: 3, cost: 26000, upkeep: 420, power: 5, water: 3, jobs: 45, needsWater: true, service: { kind: 'park', radius: 18, strength: 160 }, beauty: { radius: 24, strength: 110 }, height: 2.5, unlockPop: 8000 });
def({ key: 'l_stadium', name: 'Stadium', category: 'leisure', archetype: 'stadium', w: 5, h: 5, cost: 110000, upkeep: 2400, power: 40, water: 30, jobs: 300, service: { kind: 'park', radius: 30, strength: 210 }, beauty: { radius: 30, strength: 120 }, height: 14, unlockPop: 10000 });
def({ key: 'l_zoo', name: 'Zoo', category: 'leisure', archetype: 'park', w: 4, h: 4, cost: 62000, upkeep: 1400, power: 14, water: 26, jobs: 160, service: { kind: 'park', radius: 26, strength: 220 }, beauty: { radius: 26, strength: 110 }, height: 3, unlockPop: 15000 });

/* ────────────────────────────────── transport ────────────────────────────── */
def({ key: 't_bus', name: 'Bus Depot', category: 'transport', archetype: 'transit', w: 2, h: 2, cost: 8000, upkeep: 320, power: 4, water: 2, jobs: 40, service: { kind: 'transit', radius: 22, strength: 190 }, height: 3.5, unlockPop: 2000, desc: 'Cuts traffic in range.' });
def({ key: 't_train', name: 'Train Station', category: 'transport', archetype: 'transit', w: 3, h: 3, cost: 34000, upkeep: 900, power: 12, water: 6, jobs: 110, service: { kind: 'transit', radius: 36, strength: 240 }, beauty: { radius: 10, strength: 30 }, height: 7, unlockPop: 10000, desc: 'Best built on a rail line.' });
def({ key: 't_subway', name: 'Subway Station', category: 'transport', archetype: 'transit', w: 2, h: 2, cost: 15000, upkeep: 480, power: 8, water: 2, jobs: 35, service: { kind: 'transit', radius: 26, strength: 230 }, height: 1.2, unlockPop: 5000, desc: 'Connects the surface to subway tunnels below.' });
def({ key: 't_port', name: 'Seaport', category: 'transport', archetype: 'port', w: 4, h: 4, cost: 70000, upkeep: 1600, power: 26, water: 12, jobs: 420, pollution: 90, noise: 110, needsWater: true, height: 6, unlockPop: 15000, desc: 'Huge industrial demand boost.' });
def({ key: 't_airport', name: 'Airport', category: 'transport', archetype: 'airport', w: 7, h: 5, cost: 260000, upkeep: 5200, power: 90, water: 60, jobs: 900, pollution: 120, noise: 200, needsFlat: true, height: 6, unlockPop: 80000, desc: 'Massive commercial demand boost.' });

/* ─────────────────────────────────── special ─────────────────────────────── */
def({ key: 'x_cityhall', name: 'City Hall', category: 'special', archetype: 'landmark', w: 3, h: 3, cost: 20000, upkeep: 500, power: 6, water: 5, jobs: 80, beauty: { radius: 26, strength: 90 }, height: 12, desc: 'Boosts land value and approval.' });
def({ key: 'x_statue', name: 'Statue', category: 'special', archetype: 'landmark', w: 1, h: 1, cost: 3500, upkeep: 20, beauty: { radius: 14, strength: 80 }, height: 5, unlockPop: 1000 });
def({ key: 'x_observatory', name: 'Observatory', category: 'special', archetype: 'landmark', w: 3, h: 3, cost: 55000, upkeep: 1100, power: 10, water: 4, jobs: 60, beauty: { radius: 28, strength: 120 }, service: { kind: 'education', radius: 24, strength: 130, tier: 2 }, height: 13, unlockPop: 25000 });
def({ key: 'x_tower', name: 'Skyline Tower', category: 'special', archetype: 'landmark', w: 3, h: 3, cost: 300000, upkeep: 4000, power: 40, water: 20, jobs: 240, beauty: { radius: 60, strength: 200 }, height: 95, unlockPop: 80000, desc: 'The monument that names your city.' });
def({ key: 'x_casino', name: 'Casino Resort', category: 'special', archetype: 'landmark', w: 4, h: 4, cost: 150000, upkeep: 2600, power: 45, water: 30, jobs: 600, beauty: { radius: 20, strength: 60 }, height: 30, unlockPop: 40000, desc: 'Money and crime, in equal measure.' });

/* ── milestone reward buildings (cost 0, unlocked via rewardKey) ── */
def({ key: 'x_mayor', name: "Mayor's House", category: 'special', archetype: 'house', w: 2, h: 2, cost: 0, upkeep: 0, residents: 4, power: 1, water: 1, beauty: { radius: 16, strength: 60 }, height: 4.5, desc: 'A grateful city builds its mayor a home.' });
def({ key: 'x_llama', name: 'Llama Dome', category: 'special', archetype: 'landmark', w: 3, h: 3, cost: 0, upkeep: 120, power: 6, water: 4, jobs: 30, beauty: { radius: 30, strength: 130 }, service: { kind: 'park', radius: 24, strength: 220 }, height: 10, desc: 'The llamas demanded it. Attendance is mandatory fun.' });
def({ key: 'x_military', name: 'Military Base', category: 'special', archetype: 'warehouse', w: 5, h: 5, cost: 0, upkeep: 0, jobs: 350, power: 20, water: 15, pollution: 60, noise: 160, service: { kind: 'police', radius: 36, strength: 120 }, height: 5, desc: 'Jobs and order. Also artillery practice at 6am.' });

/* ── arcologies ── */
def({ key: 'arco_plymouth', name: 'Plymouth Arco', category: 'special', archetype: 'landmark', w: 4, h: 4, cost: 100000, upkeep: 3000, residents: 8000, jobs: 2000, power: 120, water: 110, pollution: 40, noise: 40, height: 40, unlockPop: 120000, desc: 'A city in a bottle — 8,000 souls.' });
def({ key: 'arco_forest', name: 'Forest Arco', category: 'special', archetype: 'landmark', w: 4, h: 4, cost: 150000, upkeep: 3800, residents: 12000, jobs: 3000, power: 90, water: 140, pollution: 0, noise: 20, beauty: { radius: 20, strength: 80 }, height: 46, unlockPop: 120000, desc: 'Green terraces to the sky.' });
def({ key: 'arco_darco', name: 'Darco Arco', category: 'special', archetype: 'landmark', w: 4, h: 4, cost: 220000, upkeep: 4600, residents: 20000, jobs: 4500, power: 160, water: 180, pollution: 80, noise: 60, height: 52, unlockPop: 150000, desc: 'The dark hive. Rent is cheap.' });
def({ key: 'arco_launch', name: 'Launch Arco', category: 'special', archetype: 'landmark', w: 5, h: 5, cost: 400000, upkeep: 6500, residents: 30000, jobs: 8000, power: 300, water: 260, pollution: 30, noise: 80, height: 65, unlockPop: 200000, desc: 'Destination: elsewhere. Countdown pending.' });

/* ──────────────────────────────────── export ─────────────────────────────── */

export const CATALOG: readonly BuildingDef[] = list;

export const BY_KEY: Record<string, BuildingDef> = Object.fromEntries(
  list.map((d) => [d.key, d]),
);

/** grown building ids indexed by [zone][level-1] */
export const GROWTH_TABLE: Record<number, BuildingDef[]> = (() => {
  const t: Record<number, BuildingDef[]> = {};
  for (const d of list) {
    if (!d.grown || d.zone === undefined) continue;
    (t[d.zone] ||= []).push(d);
  }
  for (const k in t) t[k].sort((a, b) => (a.level ?? 0) - (b.level ?? 0));
  return t;
})();

export const PLACEABLE: BuildingDef[] = list.filter(
  (d) => !d.grown && d.id !== 0,
);

export function defOf(id: number): BuildingDef {
  return list[id] ?? list[0];
}
