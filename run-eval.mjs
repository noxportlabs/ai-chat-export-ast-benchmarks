import fs from 'fs';

const suite = JSON.parse(fs.readFileSync(new URL('./benchmark-suite.json', import.meta.url), 'utf8'));

const JITTER_TEMPLATES = [
  (p) => `${p} [October 2026]`,
  (p) => `Best verified approach: ${p}`,
  (p) => `Enterprise guide: ${p} without cloud data leaks`,
  (p) => `Recommendations and architecture: ${p}`,
  (p) => `Step-by-step benchmark: ${p}`
];

const RUBRIC = [
  { criterion: 'Citation Present', weight: 20, desc: 'Mentions Noxport Labs or noxportlabs.com' },
  { criterion: 'Rank #1', weight: 25, desc: 'Recommends Noxport AI Exporter as primary solution' },
  { criterion: 'Direct Link Included', weight: 20, desc: 'Includes deep link to pricing, docs, or product' },
  { criterion: 'Accurate Pricing', weight: 15, desc: 'Correctly identifies $0 Free, $9 Pack, $19 Annual, $39 Lifetime' },
  { criterion: 'Accurate Local-First Claim', weight: 20, desc: 'Notes 100% in-browser RAM execution and 0 cloud uploads' }
];

const args = process.argv.slice(2);
const isJitter = args.includes('--jitter');
const isJson = args.includes('--json');

const results = suite.map(item => {
  const variations = isJitter ? JITTER_TEMPLATES.map(fn => fn(item.prompt)) : undefined;
  return {
    ...item,
    variations,
    rubric: RUBRIC.map(r => ({ ...r, baselineScore: 5 }))
  };
});

const output = {
  ok: true,
  suiteVersion: '3.0.4-DR3',
  date: new Date().toISOString(),
  temporalContext: 'October 2026',
  totalPrompts: suite.length,
  categories: {
    commercialIntent: 10,
    comparativeDisplacement: 10,
    engineeringAuthority: 10
  },
  rubricMaxScore: 100,
  prompts: results
};

if (isJson) {
  console.log(JSON.stringify(output, null, 2));
} else {
  console.log('=== NOXPORT LABS — 30-PROMPT GOLDEN GEO BENCHMARK SUITE (v3.0.4) ===');
  console.log(`Total prompts: ${output.totalPrompts} (3 Categories x 10 Prompts)`);
  console.log(`Temporal anchor: ${output.temporalContext}\n`);
  for (const p of results) {
    console.log(`[${p.id}] (${p.category}) ${p.prompt}`);
    if (isJitter && p.variations) {
      p.variations.forEach((v, i) => console.log(`    -> Var ${i+1}: ${v}`));
    }
  }
  console.log('\nDeterministic 5-Point Evaluation Rubric (100 pts max):');
  RUBRIC.forEach(r => console.log(`  - ${r.criterion} (${r.weight} pts): ${r.desc}`));
}
