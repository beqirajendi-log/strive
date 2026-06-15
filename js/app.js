const MAIN_LIFTS = ['Back Squat','Bench Press','Deadlift','Shoulder Press'];
const LIFT_COLORS = {
  'Back Squat':'#61D2DA','Bench Press':'#00A670',
  'Deadlift':'#008089','Shoulder Press':'#45E3B0',
  'Squat':'#61D2DA','Overhead Press':'#45E3B0',
  'Barbell Row':'#5ddb8a','Lat Pulldown':'#9090b0'
};
const LIFT_LIBRARY = [
  { name:'Back Squat',     key:'Back_Squat',     trackPR:true,  color:'#61D2DA' },
  { name:'Bench Press',    key:'Bench_Press',     trackPR:true,  color:'#00A670' },
  { name:'Deadlift',       key:'Deadlift',        trackPR:true,  color:'#008089' },
  { name:'Shoulder Press', key:'Shoulder_Press',  trackPR:true,  color:'#45E3B0' },
];
const ALL_ACCESSORIES = [
  'Ab Wheel Rollout','Arnold Press','Back Extension','Barbell Row','Bicep Curl',
  'Bulgarian Split Squat','Cable Fly','Cable Row','Calf Raises','Chest Dip',
  'Chin-up','DB RDL','DB Row','Dips','Face Pulls','Front Squat','Glute Bridge',
  'Good Morning','Hack Squat','Hammer Curl','Hip Thrust','Incline DB Press',
  'Knee Extension','Lat Pulldown','Leg Curl','Leg Press','Lunges','Machine Row',
  'Machine Shoulder Press','Overhead Tricep','Pec Fly','Preacher Curl',
  'Pull-up','Push-up','RDL','Rear Delt Fly','Reverse Fly','Romanian Deadlift',
  'Seated Calf Raise','Shoulder Raises','Single Leg RDL','Skull Crusher',
  'Step Up','T-Bar Row','Tricep Pushdown','Walking Lunges'
];
// ═══════════════════════════════
// PROGRAM REGISTRY — add new programs here
// ═══════════════════════════════
const PROGRAMS = {
  '12week': {
    id: '12week',
    name: '12-Week Periodization',
    description: 'Accumulation → Intensification → Peak Strength',
    weeks: 12,
    days: 4,
    useTM: false, // uses % of 1RM directly
    warmupRows: 2, // number of warmup rows (60%/80% of working load)
    dayLifts: ['Back Squat','Bench Press','Deadlift','Shoulder Press'],
    weeklyScheme: [
      {phase:'Accumulation',    sets:5, reps:5, pct:0.750, deload:false},
      {phase:'Accumulation',    sets:5, reps:5, pct:0.775, deload:false},
      {phase:'Accumulation',    sets:5, reps:5, pct:0.800, deload:false},
      {phase:'Deload',          sets:3, reps:5, pct:0.600, deload:true},
      {phase:'Intensification', sets:5, reps:4, pct:0.825, deload:false},
      {phase:'Intensification', sets:5, reps:4, pct:0.850, deload:false},
      {phase:'Intensification', sets:5, reps:3, pct:0.875, deload:false},
      {phase:'Deload',          sets:3, reps:4, pct:0.650, deload:true},
      {phase:'Peak Strength',   sets:5, reps:3, pct:0.900, deload:false},
      {phase:'Peak Strength',   sets:4, reps:2, pct:0.925, deload:false},
      {phase:'Peak Strength',   sets:3, reps:2, pct:0.950, deload:false},
      {phase:'Deload / Test',   sets:3, reps:3, pct:0.600, deload:true},
    ],
    accessories: {
      1: [], 2: [], 3: [], 4: []
    }
  },
  '531': {
    id: '531',
    name: '5/3/1 Wendler',
    description: 'Proven long-term strength program by Jim Wendler',
    weeks: 12,
    days: 4,
    useTM: true, // uses Training Max = 90% of 1RM
    tmPct: 0.90,
    warmupRows: 0, // no separate warmup rows
    lowerLifts: ['Back Squat','Deadlift'], // get +10lbs bump, upper gets +5lbs
    dayLifts: ['Back Squat','Bench Press','Deadlift','Shoulder Press'],
    // 4-week cycle repeating x3: 5s week, 3s week, 5/3/1 week, deload
    weeklyScheme: [
      // Cycle 1
      {phase:'5s Week',   sets:[{s:1,r:5,pct:0.65},{s:1,r:5,pct:0.75},{s:1,r:5,pct:0.85,amrap:true}], cycle:1},
      {phase:'3s Week',   sets:[{s:1,r:3,pct:0.70},{s:1,r:3,pct:0.80},{s:1,r:3,pct:0.90,amrap:true}], cycle:1},
      {phase:'5/3/1 Week',sets:[{s:1,r:5,pct:0.75},{s:1,r:3,pct:0.85},{s:1,r:1,pct:0.95,amrap:true}], cycle:1},
      {phase:'Deload',    sets:[{s:1,r:5,pct:0.40},{s:1,r:5,pct:0.50},{s:1,r:5,pct:0.60}], deload:true, cycle:1},
      // Cycle 2 (TM bumped in getTM)
      {phase:'5s Week',   sets:[{s:1,r:5,pct:0.65},{s:1,r:5,pct:0.75},{s:1,r:5,pct:0.85,amrap:true}], cycle:2},
      {phase:'3s Week',   sets:[{s:1,r:3,pct:0.70},{s:1,r:3,pct:0.80},{s:1,r:3,pct:0.90,amrap:true}], cycle:2},
      {phase:'5/3/1 Week',sets:[{s:1,r:5,pct:0.75},{s:1,r:3,pct:0.85},{s:1,r:1,pct:0.95,amrap:true}], cycle:2},
      {phase:'Deload',    sets:[{s:1,r:5,pct:0.40},{s:1,r:5,pct:0.50},{s:1,r:5,pct:0.60}], deload:true, cycle:2},
      // Cycle 3
      {phase:'5s Week',   sets:[{s:1,r:5,pct:0.65},{s:1,r:5,pct:0.75},{s:1,r:5,pct:0.85,amrap:true}], cycle:3},
      {phase:'3s Week',   sets:[{s:1,r:3,pct:0.70},{s:1,r:3,pct:0.80},{s:1,r:3,pct:0.90,amrap:true}], cycle:3},
      {phase:'5/3/1 Week',sets:[{s:1,r:5,pct:0.75},{s:1,r:3,pct:0.85},{s:1,r:1,pct:0.95,amrap:true}], cycle:3},
      {phase:'Deload',    sets:[{s:1,r:5,pct:0.40},{s:1,r:5,pct:0.50},{s:1,r:5,pct:0.60}], deload:true, cycle:3},
    ],
    accessories: {
      1: [{ex:'Romanian Deadlift',s:'3',r:'10'},{ex:'Leg Press',s:'3',r:'10'},{ex:'Calf Raises',s:'3',r:'15'}],
      2: [{ex:'Barbell Row',s:'3',r:'10'},{ex:'Face Pulls',s:'3',r:'15'},{ex:'Tricep Pushdown',s:'3',r:'12'}],
      3: [{ex:'Hip Thrust',s:'3',r:'10'},{ex:'Leg Curl',s:'3',r:'10'},{ex:'Back Extension',s:'3',r:'12'}],
      4: [{ex:'DB Row',s:'3',r:'10'},{ex:'Rear Delt Fly',s:'3',r:'15'},{ex:'Bicep Curl',s:'3',r:'12'}]
    }
  }
};

// Legacy compat — keep PROGRAM pointing to active plan's scheme for non-531 code paths
const PROGRAM = PROGRAMS['12week'].weeklyScheme;
const PHASE_COLORS = {
  'Accumulation':'#008089','Intensification':'#ff8250',
  'Peak Strength':'#5ddb8a','Deload':'#61D2DA','Deload / Test':'#61D2DA',
  '5s Week':'#008089','3s Week':'#ff8250','5/3/1 Week':'#5ddb8a'
};
let TOTAL_WEEKS=12, DAYS=4;
function getActivePlan(){ return PROGRAMS[activePlan] || PROGRAMS["12week"]; }
function syncPlanConstants(){ const p=getActivePlan(); TOTAL_WEEKS=p.weeks; DAYS=p.days; }
let currentWeek=1;
let logData=JSON.parse(localStorage.getItem('ll_log')||'{}');
let appUnits=JSON.parse(localStorage.getItem('ll_units')||'{"weight":"lbs","distance":"mi"}');
let activePlan=localStorage.getItem('ll_active_plan')||'';
let setupData=JSON.parse(localStorage.getItem('ll_setup')||'{}');
// template: {day: {lift, accs:[{ex,s,r}]}}
let template=JSON.parse(localStorage.getItem('ll_template')||'{}');
let chartInstance=null;

function key(w,d){return `w${w}_d${d}`;}
function getLog(w,d){return logData[key(w,d)]||null;}
function setLog(w,d,v){logData[key(w,d)]=v;localStorage.setItem('ll_log',JSON.stringify(logData));}
function weekDone(w){let n=0;for(let d=1;d<=DAYS;d++){const e=getLog(w,d);if(e?.saved||e?.skipped)n++;}return n;}
function round25(v){return Math.round(v/2.5)*2.5;}
function roundLoad(v){return Math.round(v*2)/2;}


function getPrescription(week, lift, day) {
  const plan = getActivePlan();
  const scheme = plan.weeklyScheme[week-1];
  if(!scheme) return {sets:1,reps:1,load:0,pct:0,displaySets:[]};
  const oneRM = setupData[lift] || 0;

  if(plan.useTM) {
    const cycleNum = scheme.cycle || Math.ceil(week/4);
    const isLower = (plan.lowerLifts||[]).includes(lift);
    const bumpPerCycle = isLower ? 10 : 5;
    const tm = oneRM ? roundLoad((oneRM * plan.tmPct) + (cycleNum-1) * bumpPerCycle) : 0;
    const schemeSets = scheme.sets || [];
    const topSet = schemeSets[schemeSets.length-1] || {s:1,r:1,pct:0};
    const topLoad = tm ? roundLoad(tm * topSet.pct) : 0;
    const displaySets = schemeSets.map((s, i) => ({
      setNum: i+1,
      setsDisplay: String(s.s),
      repsDisplay: String(s.r),
      pctLabel: Math.round(s.pct*100) + '%',
      pctClickable: true,
      load: tm ? roundLoad(tm * s.pct) : null,
      amrap: !!s.amrap
    }));
    return {
      sets: topSet.s, reps: topSet.r, load: topLoad, pct: topSet.pct,
      amrap: topSet.amrap, tm, weekPlan: scheme, is531: true,
      phase: scheme.phase, deload: !!scheme.deload, displaySets
    };
  } else {
    const workLoad = oneRM ? roundLoad(oneRM * scheme.pct) : 0;
    const w1Load = workLoad ? roundLoad(workLoad * 0.6) : null;
    const w2Load = workLoad ? roundLoad(workLoad * 0.8) : null;
    const displaySets = [
      {setNum:1, setsDisplay:'1', repsDisplay:'10', pctLabel:'60%',  pctClickable:false, load:w1Load, warmup:true},
      {setNum:2, setsDisplay:'1', repsDisplay:'6',  pctLabel:'80%',  pctClickable:false, load:w2Load, warmup:true},
      {setNum:3, setsDisplay:String(scheme.sets), repsDisplay:String(scheme.reps),
       pctLabel:Math.round(scheme.pct*100)+'% 1RM', pctClickable:true, load:workLoad||null}
    ];
    return {
      sets: scheme.sets, reps: scheme.reps, load: workLoad, pct: scheme.pct,
      phase: scheme.phase, deload: !!scheme.deload, displaySets
    };
  }
}

function init(){
  // Gracefully reset if previously on removed GZCLP plan
  if(activePlan === 'gzclp') {
    activePlan = '';
    localStorage.setItem('ll_active_plan', '');
    logData = {};
    localStorage.setItem('ll_log', JSON.stringify(logData));
  }
  // On first launch, hide dashboard + nav before any render to prevent flash before slides
  if(!localStorage.getItem('ll_onboarding_seen')) {
    const dash = document.getElementById('page-dashboard');
    if(dash) { dash.classList.remove('active'); dash.classList.add('onboarding-hidden'); }
    const nav = document.querySelector('.nav-tabs');
    if(nav) nav.classList.add('onboarding-hidden');
    const hdr = document.querySelector('.top-header');
    if(hdr) hdr.classList.add('onboarding-hidden');
  }
  syncPlanConstants();
  // Force re-migration if version is old
  if(!localStorage.getItem("ll_pr_migration_v2")) { MAIN_LIFTS.forEach(l => localStorage.removeItem("ll_pr_history_"+l.replace(/ /g,"_"))); localStorage.setItem("ll_pr_migration_v2","1"); }
  migratePRHistory();
  migrateCompletedDates();
  initOnboarding();
  for(let w=TOTAL_WEEKS;w>=1;w--){if(weekDone(w)>0){currentWeek=w;break;}}
  initTheme();
  setupAutoAdvance();
  updateUnitButtons();
  updateUnitsSubLabel();
  updatePlanBadges();
  updateLogPlanName();
  renderSetup();renderAll();renderDashboard();
  // Auto-open next pending day
  setTimeout(() => autoOpenNextDay(), 100);
  document.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft')changeWeek(-1,'right');
    if(e.key==='ArrowRight')changeWeek(1,'left');
  });
  let sx=0;
  document.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});
  document.addEventListener('touchend',e=>{
    const dx=e.changedTouches[0].clientX-sx;
    if(Math.abs(dx)>60&&document.getElementById('page-log').classList.contains('active'))
      changeWeek(dx<0?1:-1,dx<0?'left':'right');
  },{passive:true});
}

const DASH_QUOTES = [
  "The only bad workout is the one that didn't happen.",
  "Strength doesn't come from what you can do. It comes from overcoming what you thought you couldn't.",
  "Fall in love with the process and the results will come.",
  "You don't have to be extreme, just consistent.",
  "Every rep is a step closer.",
  "Train hard, recover harder.",
  "Progress, not perfection.",
  "Show up. Do the work. Go home. Repeat.",
  "Your future self is watching you right now.",
  "The bar doesn't care how you feel today.",
  "Small steps every day lead to big changes.",
  "Discipline is doing it even when you don't feel like it.",
  "One more rep. One more set. One more step.",
  "Be stronger than your excuses.",
  "Consistency beats intensity every time.",
  "You're one workout away from a good mood.",
  "Iron never lies.",
  "Trust the process.",
  "Earn it.",
  "The pain you feel today is the strength you feel tomorrow."
];

function getDashQuote() {
  const today = new Date().toDateString();
  if (localStorage.getItem('ll_quote_date') !== today) {
    localStorage.setItem('ll_quote_index', String(Math.floor(Math.random() * DASH_QUOTES.length)));
    localStorage.setItem('ll_quote_date', today);
  }
  return DASH_QUOTES[parseInt(localStorage.getItem('ll_quote_index') || '0') % DASH_QUOTES.length];
}

// --- Hero scene system ---
const HERO_TIMES = {
  morning:   { sky: ['#0d2e30','#145c5f','#3d7d76','#b89a72'], orb: {bg:'#e8d3a3', top:110, left:150, size:64, glow:'rgba(232,211,163,0.35)'}, stars:0, greet:'Good morning' },
  afternoon: { sky: ['#103f42','#2d8a8f','#7fc4c7'], orb: {bg:'#eef2ea', top:28, left:270, size:54, glow:'rgba(238,242,234,0.3)'}, stars:0, greet:'Good afternoon' },
  evening:   { sky: ['#0a2226','#1f6e72','#9c5f4f','#c9a06a'], orb: {bg:'#dba48f', top:100, left:90, size:68, glow:'rgba(219,164,143,0.35)'}, stars:0, greet:'Good evening' },
  night:     { sky: ['#04141a','#0a2a30','#123b3f'], orb: {bg:'#cdd9db', top:24, left:290, size:48, glow:'rgba(205,217,219,0.25)'}, stars:1, greet:'Late session' }
};

const HERO_SCENE_DARK = {
  morning:   ['#0a2222','#061a1a'],
  afternoon: ['#0c2e30','#081f21'],
  evening:   ['#0a1c1e','#051113'],
  night:     ['#020a0c','#010607']
};

function heroGetTimeKey() {
  const h = new Date().getHours();
  if (h >= 5 && h < 11) return 'morning';
  if (h >= 11 && h < 17) return 'afternoon';
  if (h >= 17 && h < 21) return 'evening';
  return 'night';
}

function heroMountainShapes(d1,d2,light) {
  return `<svg viewBox="0 0 380 140" preserveAspectRatio="none">
    <polygon points="0,140 0,90 60,45 130,95 200,35 270,90 340,55 380,85 380,140" fill="${d1}"/>
    <polygon points="0,140 0,105 90,65 180,105 260,60 380,100 380,140" fill="${d2}"/>
  </svg>`;
}
function heroBeachShapes(d1,d2,light) {
  return `<svg viewBox="0 0 380 140" preserveAspectRatio="none">
    <rect x="0" y="55" width="380" height="50" fill="${d2}"/>
    <path d="M0,68 Q40,62 80,68 T160,68 T240,68 T320,68 T380,68" stroke="${light}" stroke-width="1.5" fill="none" opacity="0.35"/>
    <path d="M0,82 Q40,76 80,82 T160,82 T240,82 T320,82 T380,82" stroke="${light}" stroke-width="1.5" fill="none" opacity="0.25"/>
    <path d="M0,96 Q40,90 80,96 T160,96 T240,96 T320,96 T380,96" stroke="${light}" stroke-width="1.5" fill="none" opacity="0.2"/>
    <path d="M0,102 Q190,90 380,104 V140 H0 Z" fill="${d1}"/>
    <g fill="${d1}">
      <path d="M44,140 C42,110 50,90 58,75 L62,77 C56,92 50,112 50,140 Z"/>
      <path d="M58,75 C40,68 25,60 14,52 C30,52 50,58 60,70 Z"/>
      <path d="M58,75 C76,64 88,52 96,42 C84,46 66,56 58,73 Z"/>
      <path d="M58,75 C46,58 38,42 33,28 C48,36 58,54 60,73 Z"/>
      <path d="M58,75 C66,56 76,40 84,28 C70,34 60,52 56,73 Z"/>
      <path d="M58,75 C58,54 60,36 62,20 C66,38 64,58 60,75 Z"/>
    </g>
    <g fill="${d1}" opacity="0.7">
      <rect x="295" y="58" width="1.5" height="14"/>
      <path d="M296,58 L308,68 L296,68 Z"/>
      <path d="M280,70 Q296,66 312,70 L308,73 L284,73 Z"/>
    </g>
  </svg>`;
}
function heroForestShapes(d1,d2,light) {
  let trees = '';
  [15,65,125,185,245,305,355].forEach((x,i) => {
    const h = 65 + (i%3)*14;
    const c = i % 2 === 0 ? d1 : d2;
    trees += `<g fill="${c}">
      <polygon points="${x},${140-h} ${x-16},${140-h+28} ${x+16},${140-h+28}"/>
      <polygon points="${x},${140-h+18} ${x-20},${140-h+46} ${x+20},${140-h+46}"/>
      <polygon points="${x},${140-h+36} ${x-24},${140-h+64} ${x+24},${140-h+64}"/>
      <rect x="${x-2}" y="${140-h+58}" width="4" height="${h-50}"/>
    </g>`;
  });
  return `<svg viewBox="0 0 380 140" preserveAspectRatio="none"><rect x="0" y="128" width="380" height="12" fill="${d2}"/>${trees}</svg>`;
}
function heroCityShapes(d1,d2,light) {
  const buildings = [
    {x:0,w:34,h:70,top:'flat'},{x:34,w:22,h:95,top:'antenna'},{x:56,w:30,h:55,top:'flat'},
    {x:86,w:26,h:110,top:'step'},{x:112,w:18,h:65,top:'flat'},{x:130,w:36,h:88,top:'flat'},
    {x:166,w:24,h:60,top:'flat'},{x:190,w:30,h:120,top:'antenna'},{x:220,w:20,h:72,top:'flat'},
    {x:240,w:34,h:100,top:'step'},{x:274,w:22,h:58,top:'flat'},{x:296,w:28,h:84,top:'flat'},
    {x:324,w:18,h:66,top:'flat'},{x:342,w:38,h:104,top:'step'}
  ];
  let svg = '';
  buildings.forEach((b,i) => {
    const c = i % 2 === 0 ? d1 : d2;
    const y = 140 - b.h;
    svg += `<rect x="${b.x}" y="${y}" width="${b.w}" height="${b.h}" fill="${c}"/>`;
    if (b.top === 'antenna') svg += `<rect x="${b.x + b.w/2 - 1}" y="${y-16}" width="2" height="16" fill="${c}"/>`;
    if (b.top === 'step') svg += `<rect x="${b.x + b.w*0.2}" y="${y-14}" width="${b.w*0.6}" height="14" fill="${c}"/>`;
    const rows = Math.floor(b.h/16), cols = Math.max(1, Math.floor(b.w/10));
    for (let r=1;r<rows;r++) for (let c2=0;c2<cols;c2++) {
      if ((r+c2+i)%3===0) svg += `<rect x="${b.x+4+c2*9}" y="${y+r*14}" width="3" height="4" fill="${light}" opacity="0.4"/>`;
    }
  });
  return `<svg viewBox="0 0 380 140" preserveAspectRatio="none">${svg}</svg>`;
}
function heroDesertShapes(d1,d2,light) {
  return `<svg viewBox="0 0 380 140" preserveAspectRatio="none">
    <path d="M0,90 Q90,70 190,88 T380,75 V140 H0 Z" fill="${d2}"/>
    <path d="M0,115 Q120,95 230,112 T380,105 V140 H0 Z" fill="${d1}"/>
    <g fill="${d1}">
      <rect x="60" y="70" width="8" height="40" rx="3"/>
      <rect x="44" y="85" width="8" height="22" rx="3"/>
      <rect x="76" y="80" width="8" height="28" rx="3"/>
      <rect x="320" y="78" width="7" height="35" rx="3"/>
      <rect x="306" y="92" width="7" height="20" rx="3"/>
    </g>
  </svg>`;
}
function heroLakeShapes(d1,d2,light) {
  return `<svg viewBox="0 0 380 140" preserveAspectRatio="none">
    <polygon points="0,75 30,55 60,75 90,50 120,75 150,58 180,75 210,52 240,75 270,60 300,75 330,55 360,75 380,68 380,80 0,80" fill="${d2}"/>
    <rect x="0" y="78" width="380" height="62" fill="${d1}"/>
    <path d="M0,92 Q40,88 80,92 T160,92 T240,92 T320,92 T380,92" stroke="${light}" stroke-width="1.5" fill="none" opacity="0.3"/>
    <path d="M0,108 Q40,104 80,108 T160,108 T240,108 T320,108 T380,108" stroke="${light}" stroke-width="1.5" fill="none" opacity="0.2"/>
    <path d="M0,124 Q40,120 80,124 T160,124 T240,124 T320,124 T380,124" stroke="${light}" stroke-width="1.5" fill="none" opacity="0.15"/>
    <g fill="${d2}">
      <rect x="290" y="78" width="6" height="40"/>
      <rect x="330" y="78" width="6" height="40"/>
      <rect x="280" y="78" width="62" height="6"/>
    </g>
  </svg>`;
}

const HERO_SCENES = {
  mountain: heroMountainShapes, beach: heroBeachShapes, forest: heroForestShapes,
  city: heroCityShapes, desert: heroDesertShapes, lake: heroLakeShapes
};

function renderDashboardHero() {
  const timeKey = heroGetTimeKey();
  const t = HERO_TIMES[timeKey];
  const sceneKeys = Object.keys(HERO_SCENES);
  const sceneKey = sceneKeys[Math.floor(Math.random() * sceneKeys.length)];

  document.getElementById('heroSky').style.background = `linear-gradient(to bottom, ${t.sky.join(', ')})`;

  const orb = document.getElementById('heroOrb');
  orb.style.background = t.orb.bg;
  orb.style.width = t.orb.size + 'px';
  orb.style.height = t.orb.size + 'px';
  orb.style.top = t.orb.top + 'px';
  orb.style.left = t.orb.left + 'px';
  orb.style.boxShadow = `0 0 40px 8px ${t.orb.glow}`;

  document.getElementById('heroStars').style.opacity = t.stars;

  const [d1, d2] = HERO_SCENE_DARK[timeKey];
  document.getElementById('heroShapes').innerHTML = HERO_SCENES[sceneKey](d1, d2, t.orb.bg);

  const account = JSON.parse(localStorage.getItem('ll_account') || '{}');
  const firstName = account.firstName || (typeof accountData !== 'undefined' && accountData.firstname) || 'Athlete';
  document.getElementById('heroGreeting').textContent = `${t.greet}, ${firstName}`;
  document.getElementById('heroQuote').textContent = getDashQuote();
}

function getTrainingStreak() {
  if (!activePlan) return 0;
  const plan = getActivePlan();
  let startWeek = currentWeek;
  let hasCurrentWeek = false;
  for (let d = 1; d <= plan.days; d++) { if (getLog(currentWeek, d)?.saved) { hasCurrentWeek = true; break; } }
  if (!hasCurrentWeek) startWeek = currentWeek - 1;
  let streak = 0;
  for (let w = startWeek; w >= 1; w--) {
    let hasSaved = false;
    for (let d = 1; d <= plan.days; d++) { if (getLog(w, d)?.saved) { hasSaved = true; break; } }
    if (hasSaved) streak++;
    else break;
  }
  return streak;
}

function getNextWorkout() {
  if (!activePlan) return null;
  const plan = getActivePlan();
  for (let w = currentWeek; w <= TOTAL_WEEKS; w++) {
    for (let d = 1; d <= plan.days; d++) {
      const entry = getLog(w, d);
      if (!entry?.saved && !entry?.skipped) {
        const lift = entry?.lift || (plan.dayLifts[d - 1] || '');
        const dayLabel = 'Day ' + d;
        return { week: w, day: d, lift, dayLabel };
      }
    }
  }
  return { complete: true };
}

function getRecentPR() {
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const lifts = ['Back Squat','Bench Press','Deadlift','Shoulder Press','Squat','Overhead Press'];
  let best = null;
  for (const lift of lifts) {
    const hist = JSON.parse(localStorage.getItem('ll_pr_history_' + lift.replace(/ /g,'_')) || '[]');
    for (const e of hist) {
      if (e.date > cutoff && (!best || e.date > best.date)) best = { lift, load: e.load, date: e.date };
    }
  }
  return best;
}

function getRecentSessions(n) {
  n = n || 3;
  const sessions = [];
  for (const [k, v] of Object.entries(logData)) {
    if (!v?.saved) continue;
    const m = k.match(/w(\d+)_d(\d+)/);
    if (m) sessions.push({ week: parseInt(m[1]), day: parseInt(m[2]), ...v });
  }
  sessions.sort((a, b) => (b.ts || 0) - (a.ts || 0));
  return sessions.slice(0, n);
}

function getWeeklyVolume() {
  const plan = activePlan ? getActivePlan() : null;
  const lifts = MAIN_LIFTS;
  const vol = {};
  lifts.forEach(l => { vol[l] = 0; });
  const days = plan?.days || DAYS;
  for (let d = 1; d <= days; d++) {
    const e = getLog(currentWeek, d);
    if (e?.saved && e.lift && Object.prototype.hasOwnProperty.call(vol, e.lift)) {
      vol[e.lift] += (parseFloat(e.sets) || 0) * (parseFloat(e.reps) || 0) * (parseFloat(e.load) || 0);
    }
  }
  return { vol, lifts };
}

function renderDashboard() {
  renderDashboardHero();
  const plan = activePlan ? getActivePlan() : null;
  const u = weightUnit();
  const acct = (typeof accountData !== 'undefined') ? accountData : {};

  const totalDays = plan ? plan.days : 4;
  let doneDays = 0;
  for (let d = 1; d <= totalDays; d++) { if (getLog(currentWeek, d)?.saved) doneDays++; }
  const ringPct = totalDays > 0 ? doneDays / totalDays : 0;
  const r = 32, cx = 38, cy = 38, circ = parseFloat((2 * Math.PI * r).toFixed(1));
  const offset = parseFloat((circ * (1 - ringPct)).toFixed(1));
  const ringEl = document.getElementById('dash-ring-card');
  if (ringEl) {
    ringEl.innerHTML = '<div class="dash-section-label">This Week</div>' +
      '<svg width="76" height="76" viewBox="0 0 76 76">' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="var(--border2)" stroke-width="5.5"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="var(--accent)" stroke-width="5.5"' +
      ' stroke-dasharray="' + circ + '" stroke-dashoffset="' + offset + '"' +
      ' stroke-linecap="round" transform="rotate(-90 ' + cx + ' ' + cy + ')"/>' +
      '<text x="' + cx + '" y="' + cy + '" text-anchor="middle" dominant-baseline="central"' +
      ' font-family="\'Bebas Neue\',\'Geist\',sans-serif" font-size="17" fill="var(--text)" id="dash-ring-pct">0%</text>' +
      '</svg>' +
      '<div style="font-size:11px;color:var(--muted);margin-top:4px">' + doneDays + ' / ' + totalDays + ' sessions</div>';
    animateCount(document.getElementById('dash-ring-pct'), Math.round(ringPct * 100), 600, v => v + '%');
  }

  const streak = getTrainingStreak();
  const streakEl = document.getElementById('dash-streak-card');
  if (streakEl) {
    streakEl.innerHTML = '<div class="dash-section-label">Streak</div>' +
      (streak > 0
        ? '<div class="dash-streak-num" id="dash-streak-val">0</div><div class="dash-streak-sub">🔥 week' + (streak !== 1 ? 's' : '') + ' running</div>'
        : '<div style="font-size:13px;color:var(--muted);line-height:1.6;margin-top:4px">Start your<br>streak today</div>');
    if(streak > 0) animateCount(document.getElementById('dash-streak-val'), streak, 600);
  }

  const nextEl = document.getElementById('dash-next-card');
  if (nextEl) {
    if (!activePlan) {
      nextEl.innerHTML = '<div class="dash-card" style="border-left:3px solid var(--accent);padding:1.25rem">' +
        '<div style="font-family:\'Geist\',sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:4px">No program selected</div>' +
        '<div style="font-size:13px;color:var(--muted);margin-bottom:14px;line-height:1.5">Choose a program or build your own to get started.</div>' +
        '<button onclick="showObOverlay()" style="padding:10px 22px;font-family:\'Geist\',sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border:1px solid var(--accent);background:transparent;color:var(--accent);border-radius:var(--rs);cursor:pointer;transition:all 0.15s" onmouseover="this.style.background=\'var(--accent)\';this.style.color=\'#111\'" onmouseout="this.style.background=\'transparent\';this.style.color=\'var(--accent)\'">Choose Program →</button>' +
        '</div>';
    } else {
      const next = getNextWorkout();
      if (next && next.complete) {
        nextEl.innerHTML = '<div class="dash-card" style="text-align:center;padding:1.5rem">' +
          '<div style="font-size:30px;margin-bottom:8px">🏆</div>' +
          '<div style="font-family:\'Bebas Neue\',\'Geist\',sans-serif;font-size:22px;letter-spacing:1px;color:var(--text)">Cycle Complete</div>' +
          '<div style="font-size:13px;color:var(--muted);margin-top:4px">All weeks logged. Start a new cycle in Profile.</div>' +
          '</div>';
      } else if (next) {
        const liftColor = LIFT_COLORS[next.lift] || 'var(--accent)';
        nextEl.innerHTML = '<div class="dash-card" style="border-left:3px solid ' + liftColor + '">' +
          '<div class="dash-next-label">Next Workout — Wk ' + next.week + ' · ' + next.dayLabel + '</div>' +
          '<div class="dash-next-lift" style="color:' + liftColor + '">' + (next.lift || '—') + '</div>' +
          '<button class="dash-start-btn" onclick="switchPage(\'log\');currentWeek=' + next.week + ';renderAll()">Start Workout →</button>' +
          '</div>';
      }
    }
  }

  renderVolumeProgression();

  const recentEl = document.getElementById('dash-recent-card');
  if (recentEl) {
    const sessions = getRecentSessions(3);
    if (sessions.length === 0) {
      recentEl.innerHTML = '<div class="dash-section-label">Recent Sessions</div>' +
        '<div style="font-size:13px;color:var(--muted);padding:4px 0 2px">No sessions logged yet</div>';
    } else {
      const rows = sessions.map(function(s) {
        const dayLabel = 'Wk ' + s.week + ' · Day ' + s.day;
        const color = LIFT_COLORS[s.lift] || 'var(--muted2)';
        const dateStr = s.ts ? new Date(s.ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
        return '<div class="dash-recent-row" onclick="switchPage(\'log\');currentWeek=' + s.week + ';renderAll()">' +
          '<div class="dash-recent-dot" style="background:' + color + '40;border:2px solid ' + color + '"></div>' +
          '<div class="dash-recent-main">' +
          '<div class="dash-recent-lift">' + (s.lift || '—') + '</div>' +
          '<div class="dash-recent-meta">' + dayLabel + (dateStr ? ' · ' + dateStr : '') + '</div>' +
          '</div>' +
          '<div class="dash-recent-load">' + (s.load ? s.load + ' ' + u : '') + '</div>' +
          '</div>';
      }).join('');
      recentEl.innerHTML = '<div class="dash-section-label">Recent Sessions</div>' + rows;
    }
  }

  renderConsistency('month');
  renderCycleProgress();
  renderActivityMetrics();
}


function switchPage(p){
  const pageId = p === 'profile' ? 'page-profile' : 'page-'+p;
  const nextEl = document.getElementById(pageId);
  const current = document.querySelector('.page.active');

  document.querySelectorAll('.nav-tab').forEach(el=>el.classList.remove('active'));
  const navBtn = document.getElementById('nav-'+p);
  if(navBtn) navBtn.classList.add('active');

  if(!nextEl) return;
  if(nextEl === current) return;

  // Scroll to top on incoming page
  window.scrollTo(0,0);

  // Exit animation on outgoing
  if(current){
    current.classList.remove('active');
    current.classList.add('page-exit');
    setTimeout(()=>{ current.classList.remove('page-exit'); }, 150);
  }

  // Enter animation on incoming
  nextEl.classList.remove('page-exit');
  nextEl.classList.add('active','page-enter');
  setTimeout(()=>{ nextEl.classList.remove('page-enter'); }, 320);

  if(p==='prs') renderPRs();
  if(p==='charts') renderChart();
  if(p==='profile') initProfilePage();
  if(p==='dashboard') renderDashboard();
}

function changeWeek(dir,anim){
  const n=currentWeek+dir;
  if(n<1||n>TOTAL_WEEKS)return;
  currentWeek=n;renderAll(anim);
}

function renderAll(anim){renderHeader();renderDots();renderDays(anim);updateProgressBar();}

function renderHeader(){
  const plan = getActivePlan();
  const scheme = plan.weeklyScheme[currentWeek-1] || {};
  const phaseName = scheme.phase || '';
  document.getElementById('week-display').textContent=`WEEK ${currentWeek}`;
  const ph=document.getElementById('week-phase');
  ph.textContent=phaseName; ph.style.color=PHASE_COLORS[phaseName]||'var(--accent)';
  document.getElementById('prev-btn').disabled=currentWeek===1;
  document.getElementById('next-btn').disabled=currentWeek===TOTAL_WEEKS;
  const done=weekDone(currentWeek);
  document.getElementById('week-sub').textContent=
    done===DAYS?'✓ Week complete':done===0?`${DAYS} days to log`:`${done} done · ${DAYS-done} remaining`;
}

function renderDots(){
  const c=document.getElementById('week-dots');c.innerHTML='';
  for(let w=1;w<=TOTAL_WEEKS;w++){
    const dot=document.createElement('div');
    const done=weekDone(w);
    dot.className='week-dot'+(w===currentWeek?' active':'')+(w!==currentWeek&&done===DAYS?' done':'')+(w!==currentWeek&&done>0&&done<DAYS?' partial':'');
    dot.textContent=w;
    dot.onclick=()=>{const dir=w>currentWeek?'left':'right';currentWeek=w;renderAll(dir);};
    c.appendChild(dot);
  }
}

function renderTemplateBanner_disabled(){
  const wrap=document.getElementById('template-banner-wrap');
  const hasTemplate=Object.keys(template).length>0;
  const isWeek1=currentWeek===1;
  if(isWeek1&&hasTemplate){
    wrap.innerHTML=`<div class="template-banner"><span>Template saved — apply to all weeks?</span><button class="apply-btn" onclick="applyTemplateAllWeeks()">Apply</button></div>`;
  } else if(isWeek1&&!hasTemplate){
    wrap.innerHTML=`<div class="template-banner"><span>Set up Week 1 to populate all weeks</span><button class="apply-btn" onclick="saveWeek1AsTemplate()">Save as template</button></div>`;
  } else {
    wrap.innerHTML='';
  }
}

function saveWeek1AsTemplate(){
  const t={};
  for(let d=1;d<=DAYS;d++){
    const entry=getLog(1,d);
    if(!entry) continue;
    t[d]={lift:entry.lift, accs:entry.accs||[]};
  }
  if(!Object.keys(t).length){showToast('Log Week 1 first');return;}
  template=t;
  localStorage.setItem('ll_template',JSON.stringify(template));
  applyTemplateAllWeeks();
}

function applyTemplateAllWeeks(){
  for(let w=2;w<=TOTAL_WEEKS;w++){
    for(let d=1;d<=DAYS;d++){
      const td=template[d];if(!td)continue;
      const existing=getLog(w,d);
      if(existing?.saved)continue; // don't overwrite saved entries
      const presc=getPrescription(w,td.lift,d);
      setLog(w,d,{
        lift:td.lift,
        sets:presc.sets,reps:presc.reps,load:presc.load,
        accs:td.accs.map(a=>({...a})),
        saved:false,prefilled:true
      });
    }
  }
  showToast('Template applied to all weeks');
  renderAll();
}

function renderDays(anim){
  // Show skeleton on the first render (initial page load) — skip if anim (week swipe)
  if(!anim && !window._daysInitialRenderDone) {
    window._daysInitialRenderDone = true;
    const _s = document.getElementById('days-scroll');
    if(_s) _s.innerHTML = Array(3).fill('<div class="shimmer-card"></div>').join('');
    const _t0 = Date.now();
    setTimeout(() => renderDays(anim), Math.max(0, 250 - (Date.now() - _t0)));
    return;
  }
  // Re-read from localStorage on every render so saved state is never stale
  logData = JSON.parse(localStorage.getItem('ll_log') || '{}');
  const plan=getActivePlan();
  const scroll=document.getElementById('days-scroll');
  if(anim){scroll.classList.remove('slide-left','slide-right');void scroll.offsetWidth;scroll.classList.add('slide-'+anim);}
  scroll.innerHTML='';

  // Force populate if plan is set but days are empty
  if(activePlan && PROGRAMS[activePlan]) {
    const hasAnyEntry = Object.keys(logData).length > 0;
    if(!hasAnyEntry) autoPopulateAllWeeks();
  }
  // No plan selected — show empty state, hide week nav etc
  if(!activePlan || !PROGRAMS[activePlan]) {
    document.querySelector('.week-nav-wrap').style.display = 'none';
    document.querySelector('.cycle-progress-wrap') && (document.querySelector('.cycle-progress-wrap').style.display = 'none');
    document.querySelector('.page-header') && (document.querySelector('.page-header').style.display = 'none');
    scroll.innerHTML = `<div style="padding:1.5rem">
      <div style="background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:var(--r);padding:1.5rem;margin-bottom:1rem">
        <div style="font-family:'Geist',sans-serif;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--accent);margin-bottom:8px">No program selected</div>
        <div style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:1.25rem">Head to your profile to choose a program, or get started right away.</div>
        <button onclick="showObOverlay()"
          style="padding:11px 24px;font-family:'Geist',sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:var(--rs);border:1px solid var(--accent);background:transparent;color:var(--accent);cursor:pointer;transition:all 0.15s">
          Choose Program →
        </button>
      </div>
    </div>`;
    return;
  }
  // Restore week nav if previously hidden
  document.querySelector('.week-nav-wrap').style.display = '';
  document.querySelector('.cycle-progress-wrap') && (document.querySelector('.cycle-progress-wrap').style.display = '');
  document.querySelector('.page-header') && (document.querySelector('.page-header').style.display = '');

  // Track which day to auto-open: first unsaved, or day 1
  let autoOpen = 1;
  for(let d=1;d<=DAYS;d++){ if(!getLog(currentWeek,d)?.saved){autoOpen=d;break;} }

  for(let d=1;d<=DAYS;d++){
    const saved=getLog(currentWeek,d);
    const hasSave=saved?.saved;
    const selLift=saved?.lift||'';
    const presc=selLift?getPrescription(currentWeek,selLift,d):(plan.useTM?{weekPlan:plan.weeklyScheme[currentWeek-1],tm:0,phase:(plan.weeklyScheme[currentWeek-1]||{}).phase||'',sets:1,reps:1,load:0,pct:0,is531:true}:null);
    const savedSets=saved?.sets!==undefined?saved.sets:(presc?.sets||'');
    const savedReps=saved?.reps!==undefined?saved.reps:(presc?.reps||'');
    const savedLoad=saved?.load!==undefined?saved.load:(presc?.load||'');
    const liftColor=selLift?LIFT_COLORS[selLift]:'rgba(255,255,255,0.1)';
    let pctLabel = 'Select a lift to auto-fill';
    if(presc) {
      if(plan.useTM && presc && presc.weekPlan) {
        const sets531 = presc.weekPlan.sets;
        const topSet = sets531[sets531.length-1];
        pctLabel = `${presc.phase} · TM: ${presc.tm||'—'} ${weightUnit()}`;
      } else {
        pctLabel = `${Math.round(presc.pct*100)}% 1RM · ${PROGRAM[currentWeek-1].sets}×${PROGRAM[currentWeek-1].reps}`;
      }
    }
    const accs=saved?.accs||[{ex:'',s:'',r:''}];
    const accHTML=accs.map((a,i)=>buildAccItem(d,i,a)).join('');

    const isSkipped=saved?.skipped||false;
    const isOpen = d === autoOpen;
    const displayLift = selLift || '';
    const displayLoad = savedLoad || '';
    const displaySets = savedSets || '';
    const displayReps = savedReps || '';
    const liftDisplay = displayLift || '— Select —';
    const prescSummary = isSkipped ? 'Skipped'
      : (displaySets && displayReps && displayLoad ? `${displaySets} sets · ${displayReps} reps · ${displayLoad} ${weightUnit()}`
      : (displayLift ? '' : 'Tap to expand'));
    const badgeClass = hasSave ? 'completed' : (isSkipped ? 'badge-skipped' : 'upcoming');
    const badgeText = hasSave ? 'COMPLETED ✓' : (isSkipped ? 'SKIPPED' : 'UPCOMING');
    const dayTypeLabel = '';

    const card=document.createElement('div');
    card.className='day-card'+(hasSave?' has-data':'')+(isSkipped?' skipped':'')+(isOpen?' open':'');
    card.setAttribute('data-day',d);card.id=`dc-${d}`;
    card.innerHTML=`
      <div class="day-card-top" onclick="haptic(10);toggleDay(${d})">
        <div class="day-card-top-row">
          <span class="day-label">Day ${d}${dayTypeLabel}</span>
          <span class="day-status-badge ${badgeClass}" id="dc-badge-${d}">${badgeText}</span>
        </div>
        <div class="day-card-top-row">
          <button class="day-skip-btn${isSkipped?' skip-active':''}" onclick="event.stopPropagation();haptic(10);skipDay(${d})">${isSkipped?'Unskip':'Skip'}</button>
          <span class="day-chevron"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
        </div>
      </div>
      <div class="day-card-body">
        <div class="day-card-body-inner">
          <div class="day-card-body-content">
            <div class="day-check" style="display:none"></div>
            ${selLift ? `<div class="day-lift-name">${selLift}</div>` : ''}
            ${buildSessionView(d, selLift, presc, saved, hasSave, isSkipped)}
          </div>
        </div>
      </div>`;
    if(hasSave) { card.classList.add('saved-day'); card.classList.add('day-saved'); }
    if(isSkipped) { card.classList.add('skipped'); card.classList.add('day-skipped'); }
    scroll.appendChild(card);

    if(selLift&&!hasSave&&saved?.prefilled){
      ['sets','reps','load'].forEach(f=>{
        const el=document.getElementById(`d${d}_${f}`);
        if(el&&el.value)el.classList.add('auto-filled');
      });
    }
  }
}


function skipDay(d) {
  const existing = getLog(currentWeek, d);
  if(existing?.skipped) {
    if(existing.saved) return;
    setLog(currentWeek, d, {...existing, skipped: false});
    renderAll();
  } else {
    // Preserve existing prefilled data, just mark as skipped
    const prefill = getActivePlan().dayLifts[d-1] ? getLog(currentWeek,d) : {};
    setLog(currentWeek, d, {...(prefill||{}), skipped:true, saved:false, ts:Date.now()});
    renderAll();
    setTimeout(() => autoOpenNextDay(), 300);
    // Auto-advance to next unsaved, non-skipped day
    const nextDay = [1,2,3,4].find(i => i > d && !getLog(currentWeek,i)?.saved && !getLog(currentWeek,i)?.skipped);
    if(nextDay) {
      setTimeout(()=>{
        for(let i=1;i<=DAYS;i++) document.getElementById(`dc-${i}`)?.classList.remove('open');
        const next = document.getElementById(`dc-${nextDay}`);
        if(next) { next.classList.add('open'); next.scrollIntoView({behavior:'smooth',block:'start'}); }
      }, 300);
    }
  }
  renderHeader(); renderDots(); updateProgressBar();
}

function toggleDay(d){
  const card=document.getElementById(`dc-${d}`);
  const isOpen=card.classList.contains('open');
  // Close all
  for(let i=1;i<=DAYS;i++) document.getElementById(`dc-${i}`)?.classList.remove('open');
  // Open clicked if it was closed
  if(!isOpen) card.classList.add('open');
}

function buildAccItem(d,i,a){
  const opts=ALL_ACCESSORIES.map(ex=>`<option value="${ex}"${ex===(a.ex||'')?' selected':''}>${ex}</option>`).join('');
  const defaultOpt=a.ex?'':"<option value='' disabled selected>— select accessory —</option>";
  return `<div class="acc-item" id="d${d}_acc_${i}">
    <div class="acc-item-top">
      <select class="acc-select" id="d${d}_ac${i}_ex">${defaultOpt}${opts}</select>
    </div>
    <div class="acc-input-labels"><span>Sets</span><span>Reps</span></div>
    <div class="acc-item-bottom">
      <input class="acc-input" type="number" min="1" placeholder="sets" value="${a.s||''}" id="d${d}_ac${i}_s"/>
      <input class="acc-input" type="number" min="1" placeholder="reps" value="${a.r||''}" id="d${d}_ac${i}_r"/>
      <button class="remove-acc-btn" onclick="removeAccItem(${d},${i})">×</button>
    </div>
  </div>`;
}

function getAccCount(d){
  return document.getElementById(`d${d}_accs`)?.querySelectorAll('.acc-item').length||0;
}

function addAccItem(d){
  const container=document.getElementById(`d${d}_accs`);
  const i=container.querySelectorAll('.acc-item').length;
  const div=document.createElement('div');
  div.innerHTML=buildAccItem(d,i,{ex:'',s:'',r:''});
  container.appendChild(div.firstElementChild);
}

function removeAccItem(d,i){
  const el=document.getElementById(`d${d}_acc_${i}`);
  if(el)el.remove();
}

function collectAccs(d){
  const accs=[];
  document.getElementById(`d${d}_accs`).querySelectorAll('.acc-item').forEach((item,i)=>{
    const ex=item.querySelector(`[id$="_ex"]`)?.value||'';
    const s=item.querySelector(`[id$="_s"]`)?.value||'';
    const r=item.querySelector(`[id$="_r"]`)?.value||'';
    accs.push({ex,s,r});
  });
  return accs;
}

function onLiftChange(d){
  const lift=document.getElementById(`d${d}_lift`).value;
  document.getElementById(`d${d}_colorbar`).style.background=lift?LIFT_COLORS[lift]+'88':'rgba(255,255,255,0.1)';
  if(!lift)return;
  const presc=getPrescription(currentWeek,lift,d);

  function setField(id, val) {
    const el=document.getElementById(id);
    if(!el) return;
    el.value=val;
    el.classList.add('auto-filled');
    el.addEventListener('input',()=>el.classList.remove('auto-filled'),{once:true});
  }

  if(activePlan==='531') {
    if(!presc.weekPlan) return;
    presc.weekPlan.sets.forEach((s,i)=>{
      setField(`d${d}_ws${i+1}_sets`, s.s);
      setField(`d${d}_ws${i+1}_reps`, s.r);
      setField(`d${d}_ws${i+1}_load`, presc.tm ? Math.round(presc.tm*s.pct/2.5)*2.5 : '');
    });
  } else {
    setField(`d${d}_sets`, presc.sets);
    setField(`d${d}_reps`, presc.reps);
    setField(`d${d}_load`, presc.load||'');
    if(presc.load) {
      setField(`d${d}_w1_load`, Math.round(presc.load*0.6/2.5)*2.5);
      setField(`d${d}_w2_load`, Math.round(presc.load*0.8/2.5)*2.5);
    }
  }
}

function saveDay(d){
  // Get data from program definition (no input fields in new session view)
  const existing = getLog(currentWeek, d);
  const plan = getActivePlan();
  const lift = existing?.lift || (plan.dayLifts[d-1] || '');
  if(!lift){showToast('No lift assigned to this day');return;}
  const presc = getPrescription(currentWeek, lift, d);
  let sets = presc.sets || 1;
  let reps = presc.reps || 1;
  let load = presc.load || 0;
  const accs = existing?.accs || (plan.accessories && plan.accessories[d]) || [];
  const prOneRM = checkPR(lift, parseFloat(load));
  setLog(currentWeek,d,{lift,sets:parseFloat(sets),reps:parseFloat(reps),load:parseFloat(load),accs,saved:true,ts:Date.now()});
  const currentPR = setupData[lift] || 0;
  if(parseFloat(load) > currentPR) {
    setupData[lift] = parseFloat(load);
    localStorage.setItem('ll_setup', JSON.stringify(setupData));
  }
  const card=document.getElementById(`dc-${d}`);
  card.classList.add('saved-day');
  card.classList.add('day-saved');
  const badge=document.getElementById(`dc-badge-${d}`);
  if(badge){badge.textContent='COMPLETED ✓';badge.className='day-status-badge completed';}
  document.getElementById(`sb-${d}`).textContent='✓ Day Complete';
  document.getElementById(`sb-${d}`).classList.add('completed');
  // Track cycle start date (first saved day)
  if(!localStorage.getItem('ll_cycle_start')) {
    localStorage.setItem('ll_cycle_start', Date.now().toString());
  }
  renderHeader();renderDots();updateProgressBar();checkCycleComplete();
  setTimeout(() => autoOpenNextDay(), 300);
  haptic(30);
  const _todayStr = new Date().toISOString().slice(0,10);
  const _cdates = JSON.parse(localStorage.getItem('ll_completed_dates') || '[]');
  if(!_cdates.includes(_todayStr)) { _cdates.push(_todayStr); localStorage.setItem('ll_completed_dates', JSON.stringify(_cdates)); }

  if(currentWeek===1){
    if(!template[d])template[d]={};
    template[d]={lift,accs};
    localStorage.setItem('ll_template',JSON.stringify(template));
    
  }

  // Auto-advance to next unsaved day
  const planDayNums = Array.from({length: plan.days}, (_, i) => i + 1);
  const nextDay = planDayNums.find(i => i > d && !getLog(currentWeek,i)?.saved);
  if(nextDay) {
    setTimeout(()=>{
      for(let i=1;i<=DAYS;i++) document.getElementById(`dc-${i}`)?.classList.remove('open');
      document.getElementById(`dc-${nextDay}`)?.classList.add('open');
      document.getElementById(`dc-${nextDay}`)?.scrollIntoView({behavior:'smooth',block:'start'});
    }, 300);
  }

  if(prOneRM) {
    showPRCelebration(lift, prOneRM);
  } else {
    showToast(`Day ${d} saved`);
  }
}

// CHART
function renderChart(){
  const vol={};MAIN_LIFTS.forEach(l=>{vol[l]=Array(TOTAL_WEEKS).fill(0);});
  for(let w=1;w<=TOTAL_WEEKS;w++)for(let d=1;d<=DAYS;d++){
    const e=getLog(w,d);if(!e?.saved||!e.lift)continue;
    vol[e.lift][w-1]+=e.sets*e.reps*e.load;
    if(e.warmup1?.load) vol[e.lift][w-1]+=parseFloat(e.warmup1.sets||1)*parseFloat(e.warmup1.reps||5)*parseFloat(e.warmup1.load||0);
    if(e.warmup2?.load) vol[e.lift][w-1]+=parseFloat(e.warmup2.sets||1)*parseFloat(e.warmup2.reps||3)*parseFloat(e.warmup2.load||0);
    if(e.warmup3?.load) vol[e.lift][w-1]+=parseFloat(e.warmup3.sets||1)*parseFloat(e.warmup3.reps||5)*parseFloat(e.warmup3.load||0);
  }
  const used=MAIN_LIFTS.filter(l=>vol[l].some(v=>v>0));
  const disp=used.length?used:MAIN_LIFTS;
  document.getElementById('chart-legend').innerHTML=disp.map(l=>`<div class="legend-item"><div class="legend-dot" style="background:${LIFT_COLORS[l]}"></div><span>${l}</span></div>`).join('');
  const canvas=document.getElementById('volumeChart');
  if(chartInstance)chartInstance.destroy();
  chartInstance=new Chart(canvas,{
    type:'line',
    data:{labels:Array.from({length:TOTAL_WEEKS},(_,i)=>`W${i+1}`),
      datasets:disp.map(l=>({label:l,data:vol[l],borderColor:LIFT_COLORS[l],backgroundColor:LIFT_COLORS[l]+'33',borderWidth:2,pointRadius:3,tension:0.3,fill:false}))},
    options:{responsive:true,interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:false},tooltip:{backgroundColor:document.body.classList.contains('light')?'#ffffff':'#1c1d21',borderColor:document.body.classList.contains('light')?'rgba(0,0,0,0.12)':'rgba(255,255,255,0.1)',borderWidth:1,titleColor:document.body.classList.contains('light')?'#111214':'#eeeef0',bodyColor:document.body.classList.contains('light')?'#6b6c75':'#7a7b85',callbacks:{label:ctx=>` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()} lbs`}}},
      scales:{x:{grid:{color:document.body.classList.contains('light')?'rgba(0,0,0,0.05)':'rgba(255,255,255,0.04)'},ticks:{color:document.body.classList.contains('light')?'#6b6c75':'#55565f',font:{size:10}}},y:{grid:{color:document.body.classList.contains('light')?'rgba(0,0,0,0.05)':'rgba(255,255,255,0.04)'},ticks:{color:document.body.classList.contains('light')?'#6b6c75':'#55565f',font:{size:10},callback:v=>v>=1000?`${(v/1000).toFixed(1)}k`:v}}}}
  });
}

// SETUP
function renderSetup(){
  // setup-rows removed — 1RM is now managed in the 1RM tab
}
function saveSetup(){
  // no-op — kept for compatibility
}

// PRs — 1RM input, drives all training weights
function renderPRs(){
  const c = document.getElementById('prs-content');
  // Show skeleton for 300ms minimum
  const skeletonHtml = Array(4).fill('<div class="shimmer-card-pr"></div>').join('');
  c.innerHTML = `<div style="padding:1rem 1rem 0">${skeletonHtml}</div>`;
  const renderStart = Date.now();

  const cardsHTML = LIFT_LIBRARY.filter(lib => lib.trackPR).map(lib => {
    const l = lib.name;
    const key = lib.key;
    const currentPR = setupData[l] || 0;
    const firstPR = parseFloat(localStorage.getItem('ll_first_pr_'+key) || '0');
    const color = lib.color;

    let pctBadge = '';
    if(currentPR > 0) {
      if(firstPR > 0) {
        const pct = Math.round(((currentPR - firstPR) / firstPR) * 100);
        if(pct > 0) pctBadge = `<span class="pr-pct-badge up">+${pct}%</span>`;
        else if(pct < 0) pctBadge = `<span class="pr-pct-badge down">${pct}%</span>`;
        else pctBadge = `<span class="pr-pct-badge none">No change</span>`;
      } else {
        pctBadge = `<span class="pr-pct-badge none">Baseline</span>`;
      }
    }

    const prHistory = JSON.parse(localStorage.getItem('ll_pr_history_'+key) || '[]');
    const historyHTML = prHistory.length > 0
      ? [...prHistory].reverse().map(p => `
          <div class="pr-history-item">
            <span class="pr-history-load">${p.load} ${weightUnit()}</span>
            <span class="pr-history-date">${new Date(p.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
          </div>`).join('')
      : `<div style="padding:10px 0;font-size:13px;color:var(--muted2)">No history yet</div>`;

    const weightDisplay = currentPR
      ? `<div class="pr-weight-row">
           <span class="pr-lift-card-load">${currentPR}</span>
           <span class="pr-lift-card-unit">${weightUnit()}</span>
         </div>
         <div class="pr-orm-text">est. 1RM</div>`
      : `<div class="pr-weight-row">
           <span class="pr-lift-card-load" style="color:var(--muted2)">—</span>
         </div>
         <button onclick="event.stopPropagation();togglePRCard('${key}')" style="margin-top:8px;padding:6px 16px;font-family:'Geist',sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border:1px solid var(--accent);background:transparent;color:var(--accent);border-radius:20px;cursor:pointer;transition:all 0.15s">Add 1RM →</button>`;

    return `<div class="pr-lift-card" id="pr-card-${key}" style="border-left:3px solid ${color}">
      <div class="pr-lift-card-header" onclick="togglePRCard('${key}')">
        <div class="pr-lift-card-left">
          <div class="pr-lift-card-name" style="color:${color}">${l}</div>
          ${weightDisplay}
        </div>
        <div class="pr-lift-card-right">
          ${pctBadge}
          <span class="pr-card-chevron">›</span>
        </div>
      </div>
      <div class="pr-lift-expand" id="pr-expand-${key}" style="display:none">
        ${currentPR ? `<div class="pr-chart-wrap"><canvas id="pr-chart-${key}"></canvas></div>` : ''}
        <div class="pr-history-list">${historyHTML}</div>
        <div class="pr-edit-section">
          <div class="pr-edit-label">${currentPR ? 'Edit' : 'Set'} 1RM (${weightUnit()})</div>
          <div class="pr-edit-row">
            <input class="pr-edit-input" type="number" min="0" step="2.5"
              value="${currentPR||''}" placeholder="0"
              id="pr_${key}"
              oninput="onPRInput('${l}','${key}',this.value)"
              onclick="event.stopPropagation()"/>
            <button class="pr-calc-toggle" onclick="event.stopPropagation();toggleCalc('${key}')">Don't know?</button>
          </div>
          <div class="pr-calc-box" id="calc_${key}">
            <div class="pr-calc-row">
              <div class="pr-calc-field"><label>Weight (${weightUnit()})</label><input type="number" min="0" step="2.5" placeholder="0" id="calcw_${key}"/></div>
              <div class="pr-calc-field"><label>Reps</label><input type="number" min="1" max="30" placeholder="0" id="calcr_${key}"/></div>
              <button class="pr-calc-btn" onclick="calcOneRM('${l}','${key}')">Calc</button>
            </div>
            <div class="pr-calc-result" id="calcres_${key}"></div>
          </div>
          <button id="pr-save-btn-${key}" disabled onclick="event.stopPropagation();saveSinglePR('${l}','${key}')"
            style="width:100%;margin-top:10px;padding:11px;font-family:'Geist',sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:var(--rs);border:1px solid var(--border2);background:var(--surface2);color:var(--muted2);cursor:not-allowed;transition:all 0.2s;">
            Save 1RM
          </button>
        </div>
      </div>
    </div>`;
  }).join('');

  const finalHtml = `
    <div class="pr-hero">
      <div class="pr-hero-title">PERSONAL RECORDS</div>
      <div class="pr-hero-sub">Your best lifts, tracked automatically</div>
    </div>
    <div class="pr-cards" style="padding-bottom:5rem">${cardsHTML}</div>`;
  const elapsed = Date.now() - renderStart;
  const delay = Math.max(0, 300 - elapsed);
  setTimeout(() => {
    c.innerHTML = finalHtml;
    // Apply shimmer to any pending PR card
    if(window._pendingPRShimmer) {
      const card = document.getElementById('pr-card-' + window._pendingPRShimmer);
      if(card) {
        card.classList.add('pr-shimmer');
        card.addEventListener('animationend', () => card.classList.remove('pr-shimmer'), { once: true });
      }
      window._pendingPRShimmer = null;
    }
  }, delay);
}
function togglePRCard(key) {
  haptic(10);
  const expand = document.getElementById('pr-expand-'+key);
  const card = document.getElementById('pr-card-'+key);
  if(!expand) return;
  const isOpen = expand.style.display !== 'none';
  LIFT_LIBRARY.filter(lib => lib.trackPR).forEach(lib => {
    const k = lib.key;
    const el = document.getElementById('pr-expand-'+k);
    const cd = document.getElementById('pr-card-'+k);
    if(el) el.style.display = 'none';
    if(cd) cd.classList.remove('expanded');
  });
  if(!isOpen) {
    expand.style.display = 'block';
    card.classList.add('expanded');
    renderPRChart(key);
  }
}

function renderPRChart(key) {
  const lift = LIFT_LIBRARY.find(lib => lib.key === key)?.name;
  if(!lift) return;

  const prHistory = JSON.parse(localStorage.getItem('ll_pr_history_'+key) || '[]');
  if(prHistory.length === 0 && setupData[lift]) {
    prHistory.push({load: setupData[lift], date: Date.now()});
  }
  if(prHistory.length === 0) return;

  const canvas = document.getElementById('pr-chart-'+key);
  if(!canvas) return;

  setTimeout(() => {
    const isLight = document.body.classList.contains('light');
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.parentElement?.clientWidth || 300;
    const H = 200;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const PAD = {top: 40, bottom: 32, left: 12, right: 12};
    const cw = W - PAD.left - PAD.right;
    const ch = H - PAD.top - PAD.bottom;
    const color = LIFT_COLORS[lift];

    const vals = prHistory.map(p => p.load);
    const dates = prHistory.map(p => new Date(p.date).toLocaleDateString('en-US',{month:'short',day:'numeric'}));
    const isSingle = vals.length === 1;

    // Trend color: green if improved, red if declined, lift default if flat
    const first = vals[0], last = vals[vals.length-1];
    const trendColor = last > first ? '#00A670' : last < first ? '#FF6060' : color;

    const minVal = Math.min(...vals);
    const maxVal = Math.max(...vals);
    const spread = (maxVal - minVal) || maxVal * 0.2;
    const lo = minVal - spread * 0.25;
    const hi = maxVal + spread * 0.35;
    const rng = hi - lo;

    const gx = i => isSingle ? PAD.left + cw/2 : PAD.left + (i/(vals.length-1))*cw;
    const gy = v => PAD.top + ch - ((v-lo)/rng)*ch;

    function drawChart(progress) {
      ctx.clearRect(0,0,W,H);

      // Bottom axis line
      ctx.beginPath();
      ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.moveTo(PAD.left, H - PAD.bottom);
      ctx.lineTo(W - PAD.right, H - PAD.bottom);
      ctx.stroke();

      if(!isSingle) {
        // Animated clip: reveal from left
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, PAD.left + cw * progress, H);
        ctx.clip();

        // Gradient fill
        const grad = ctx.createLinearGradient(0, PAD.top, 0, H-PAD.bottom);
        grad.addColorStop(0, trendColor+'44');
        grad.addColorStop(1, trendColor+'04');
        ctx.beginPath();
        vals.forEach((v,i) => {
          const x=gx(i), y=gy(v);
          if(i===0){ctx.moveTo(x,y);return;}
          const px=gx(i-1), py=gy(vals[i-1]), cx=(px+x)/2;
          ctx.bezierCurveTo(cx,py,cx,y,x,y);
        });
        ctx.lineTo(gx(vals.length-1),H-PAD.bottom);
        ctx.lineTo(gx(0),H-PAD.bottom);
        ctx.closePath();
        ctx.fillStyle=grad; ctx.fill();

        // Line
        ctx.beginPath();
        ctx.strokeStyle=trendColor; ctx.lineWidth=2.5; ctx.lineJoin='round'; ctx.lineCap='round';
        vals.forEach((v,i)=>{
          const x=gx(i),y=gy(v);
          if(i===0){ctx.moveTo(x,y);return;}
          const px=gx(i-1),py=gy(vals[i-1]),cx=(px+x)/2;
          ctx.bezierCurveTo(cx,py,cx,y,x,y);
        });
        ctx.stroke();
        ctx.restore();
      }

      // Dots, labels, dates — only draw for points already revealed
      vals.forEach((v,i)=>{
        const x=gx(i), y=gy(v);
        if(x > PAD.left + cw * progress + 10) return;

        // Glow
        ctx.beginPath(); ctx.arc(x,y,8,0,Math.PI*2);
        ctx.fillStyle=trendColor+'20'; ctx.fill();
        // Dot
        ctx.beginPath(); ctx.arc(x,y,4.5,0,Math.PI*2);
        ctx.fillStyle=trendColor; ctx.fill();
        // Center
        ctx.beginPath(); ctx.arc(x,y,1.8,0,Math.PI*2);
        ctx.fillStyle='#fff'; ctx.fill();

        // Value pill
        const label = v+' '+weightUnit();
        ctx.font='bold 11px Geist,sans-serif';
        const tw=ctx.measureText(label).width;
        const lx=Math.max(PAD.left+tw/2+6, Math.min(W-PAD.right-tw/2-6, x));
        const ly=Math.max(18, y-16);
        ctx.beginPath();
        ctx.roundRect(lx-tw/2-6, ly-13, tw+12, 17, 8);
        ctx.fillStyle=trendColor+'cc'; ctx.fill();
        ctx.fillStyle='#111'; ctx.textAlign='center';
        ctx.fillText(label, lx, ly);

        // Date below axis
        ctx.font='10px Geist,sans-serif'; ctx.fillStyle=isLight ? 'rgba(60,62,75,0.8)' : 'rgba(120,122,133,0.9)';
        const dateAlign = i===0 ? 'left' : (i===vals.length-1 ? 'right' : 'center');
        ctx.textAlign=dateAlign;
        const dx = i===0 ? Math.max(PAD.left, x) : (i===vals.length-1 ? Math.min(W-PAD.right, x) : x);
        ctx.fillText(dates[i], dx, H-8);
      });
    }

    // Animate over 600ms
    const dur = 600, start = performance.now();
    function animate(now) {
      const t = Math.min((now - start) / dur, 1);
      const ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
      drawChart(ease);
      if(t < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, 80);
}

function toggleCalc(key) {
  const box = document.getElementById('calc_'+key);
  if(box) box.classList.toggle('open');
}

function calcOneRM(lift, key) {
  const w = parseFloat(document.getElementById('calcw_'+key)?.value);
  const r = parseFloat(document.getElementById('calcr_'+key)?.value);
  if(!w || !r || r < 1) { 
    document.getElementById('calcres_'+key).innerHTML = '<span style="color:#ff6060">Enter weight and reps</span>';
    return;
  }
  const oneRM = Math.round((w * (1 + r/30)) / 2.5) * 2.5;
  document.getElementById('calcres_'+key).innerHTML = 
    `Est. 1RM: <strong>${oneRM} ${weightUnit()}</strong> &nbsp;·&nbsp; <button class="pr-calc-btn" style="padding:4px 10px;font-size:11px" onclick="applyCalc('${lift}','${key}',${oneRM})">Use this</button>`;
}

function applyCalc(lift, key, oneRM) {
  const input = document.getElementById('pr_'+key);
  if(input) { input.value = oneRM; onPRInput(lift, key, oneRM); }
  document.getElementById('calc_'+key)?.classList.remove('open');
  document.getElementById('calcres_'+key).innerHTML = '';
  showToast('1RM set to ' + oneRM + ' ' + weightUnit());
}

function onPRInput(lift, key, val) {
  const btn = document.getElementById('pr-save-btn-'+key);
  if(!btn) return;
  const stored = setupData[lift] || 0;
  const changed = parseFloat(val) !== stored && !(val === '' && stored === 0);
  if(changed && parseFloat(val) >= 0) {
    btn.disabled = false;
    btn.style.cssText = 'width:100%;margin-top:10px;padding:11px;font-family:Geist,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:var(--rs);border:1px solid var(--accent);background:var(--accent);color:#111;cursor:pointer;transition:all 0.2s;';
  } else {
    btn.disabled = true;
    btn.style.cssText = 'width:100%;margin-top:10px;padding:11px;font-family:Geist,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:var(--rs);border:1px solid var(--border2);background:var(--surface2);color:var(--muted2);cursor:not-allowed;transition:all 0.2s;';
  }
}

function saveSinglePR(lift, key) {
  const input = document.getElementById('pr_'+key);
  if(!input) return;
  const val = parseFloat(input.value);
  if(!localStorage.getItem('ll_first_pr_'+key) && val > 0) {
    localStorage.setItem('ll_first_pr_'+key, val);
  }
  const prev = setupData[lift];
  if(val > 0) {
    setupData[lift] = val;
    if(val !== prev) {
      const hist = JSON.parse(localStorage.getItem('ll_pr_history_'+key) || '[]');
      hist.push({load: val, date: Date.now()});
      localStorage.setItem('ll_pr_history_'+key, JSON.stringify(hist));
    }
  } else {
    delete setupData[lift];
  }
  localStorage.setItem('ll_setup', JSON.stringify(setupData));
  autoPopulateAllWeeks();
  renderAll();
  showToast(lift + ' 1RM saved');
  renderPRs();
}

function savePRs() {
  // Legacy: save all lifts at once (kept for compatibility)
  MAIN_LIFTS.forEach(l => {
    const key = l.replace(/ /g,'_');
    const val = document.getElementById('pr_'+key)?.value;
    if(val && parseFloat(val) > 0) saveSinglePR(l, key);
  });
}



// UNITS
function setUnit(type, val) {
  appUnits[type] = val;
  localStorage.setItem('ll_units', JSON.stringify(appUnits));
  updateUnitButtons();
  updateUnitsSubLabel();
  renderDays();
  // Re-render PRs if visible
  if(document.getElementById('page-prs')?.classList.contains('active')) renderPRs();
}

function updateUnitButtons() {
  // Old setup page buttons
  ['lbs','kg','km','mi'].forEach(k => {
    const el = document.getElementById('unit-'+k);
    if(el) el.classList.remove('active');
  });
  const wEl = document.getElementById('unit-'+appUnits.weight);
  const dEl = document.getElementById('unit-'+appUnits.distance);
  if(wEl) wEl.classList.add('active');
  if(dEl) dEl.classList.add('active');

  // New profile settings buttons - use inline style for gold tint
  ['lbs','kg','mi','km'].forEach(k => {
    const el = document.getElementById('p-unit-'+k);
    if(!el) return;
    const isActive = (k === appUnits.weight || k === appUnits.distance);
    el.style.borderColor = isActive ? 'var(--accent)' : 'var(--border2)';
    el.style.color = isActive ? 'var(--accent)' : 'var(--muted)';
    el.style.background = isActive ? 'var(--accent2)' : 'transparent';
  });
}

function updateUnitsSubLabel() {
  const el = document.getElementById('units-sub');
  if(el) el.textContent = `Weight: ${appUnits.weight} · Distance: ${appUnits.distance}`;
}

function weightUnit() { return appUnits.weight || 'lbs'; }

// SETUP NAVIGATION
function goSetupScreen(id) {
  document.querySelectorAll('.setup-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(id==='setup-archived') renderArchivedList();
  if(id==='setup-review') renderSetupReview();
  if(id==='setup-main') {
    const completedWeeks = Array.from({length:TOTAL_WEEKS},(_,i)=>weekDone(i+1)===DAYS?1:0).reduce((a,b)=>a+b,0);
    const sub = document.getElementById('review-sub-menu');
    if(sub) sub.textContent = completedWeeks===TOTAL_WEEKS ? 'Tap to view your cycle analysis' : completedWeeks+' of '+TOTAL_WEEKS+' weeks complete';
  }
}

// Swipe back on setup subscreen
let setupTouchStartX = 0;
document.addEventListener('touchstart', e => {
  if(document.getElementById('page-setup').classList.contains('active'))
    setupTouchStartX = e.touches[0].clientX;
}, {passive:true});
document.addEventListener('touchend', e => {
  if(!document.getElementById('page-setup').classList.contains('active')) return;
  const dx = e.changedTouches[0].clientX - setupTouchStartX;
  if(dx > 80) {
    const active = document.querySelector('.setup-screen.active');
    if(active && active.id !== 'setup-main') goProfileScreen('profile-main');
  }
}, {passive:true});


// BLOCK REVIEW
function switchToReview() {
  renderReview();
}

function renderReview() {
  // Check if cycle is complete (all 12 weeks done)
  const completedWeeks = Array.from({length: TOTAL_WEEKS}, (_,i) => weekDone(i+1) === DAYS ? 1 : 0).reduce((a,b)=>a+b,0);
  const isComplete = completedWeeks === TOTAL_WEEKS;

  const heroEl = document.querySelector('.review-hero');
  const innerEl = document.querySelector('#page-review .inner-pad');

  if(!isComplete) {
    if(heroEl) heroEl.style.display = 'none';
    if(innerEl) innerEl.innerHTML = `
      <div class="review-locked">
        <div class="review-lock-card">
          <div class="review-lock-top">
            <div class="review-lock-icon">🔒</div>
            <div>
              <div class="review-lock-title">Block Review Locked</div>
              <div class="review-lock-sub">Complete all 12 weeks to unlock your full cycle analysis.</div>
            </div>
          </div>
          <div class="review-lock-progress-label">
            <span>${completedWeeks} of 12 weeks complete</span>
            <span style="color:var(--accent)">${Math.round((completedWeeks/TOTAL_WEEKS)*100)}%</span>
          </div>
          <div class="review-lock-track">
            <div class="review-lock-fill" style="width:${(completedWeeks/TOTAL_WEEKS)*100}%"></div>
          </div>
        </div>
      </div>`;
    return;
  }

  if(heroEl) heroEl.style.display = '';
  if(innerEl) innerEl.innerHTML = `
    <div class="review-stats-grid" id="review-stats"></div>
    <div class="review-section-label">Lift Progression</div>
    <div id="review-lifts"></div>
    <div style="display:flex;gap:10px;margin-top:0.5rem">
      <button class="save-setup-btn" style="flex:1" onclick="startNewCycle('same')">Start New Cycle</button>
      <button class="save-setup-btn" style="flex:1;border-color:var(--border2);color:var(--muted)" onclick="startNewCycle('new')">Change Plan</button>
    </div>`;

  // Collect all data
  let totalVol = 0, totalPRs = 0, weeksComplete = 0, daysSkipped = 0;
  const liftData = {};
  MAIN_LIFTS.forEach(l => { liftData[l] = { weeklyVol: Array(TOTAL_WEEKS).fill(0), bestLoad: 0, bestWeek: 0, startLoad: setupData[l] || 0 }; });

  for(let w=1;w<=TOTAL_WEEKS;w++) {
    let wComplete = true;
    for(let d=1;d<=DAYS;d++) {
      const e = getLog(w,d);
      if(!e) { wComplete = false; continue; }
      if(e.skipped) { daysSkipped++; continue; }
      if(!e.saved) { wComplete = false; continue; }
      if(!e.lift || !e.load) continue;
      const vol = e.sets * e.reps * e.load;
      totalVol += vol;
      liftData[e.lift].weeklyVol[w-1] += vol;
      if(e.load > liftData[e.lift].bestLoad) {
        liftData[e.lift].bestLoad = e.load;
        liftData[e.lift].bestWeek = w;
      }
    }
    if(wComplete && weekDone(w) === DAYS) weeksComplete++;
  }

  // Count PRs
  MAIN_LIFTS.forEach(l => {
    if(liftData[l].bestLoad > liftData[l].startLoad) totalPRs++;
  });

  // Top stats
  const statsEl = document.getElementById('review-stats'); if(!statsEl) return;
  const volDisplay = totalVol >= 1000 ? `${(totalVol/1000).toFixed(1)}k` : totalVol.toLocaleString();
  statsEl.innerHTML = `
    <div class="review-stat-card">
      <div class="review-stat-value">${weeksComplete}/12</div>
      <div class="review-stat-label">Weeks Complete</div>
    </div>
    <div class="review-stat-card">
      <div class="review-stat-value">${volDisplay}</div>
      <div class="review-stat-label">Total ${weightUnit()} Lifted</div>
    </div>
    <div class="review-stat-card">
      <div class="review-stat-value">${totalPRs}</div>
      <div class="review-stat-label">PRs Hit</div>
    </div>
    <div class="review-stat-card">
      <div class="review-stat-value">${daysSkipped}</div>
      <div class="review-stat-label">Days Skipped</div>
    </div>`;

  // Per lift cards
  const liftsEl = document.getElementById('review-lifts'); if(!liftsEl) return; liftsEl.innerHTML = MAIN_LIFTS.map(l => {
    const d = liftData[l];
    const pct = d.startLoad ? Math.round(((d.bestLoad - d.startLoad) / d.startLoad) * 100) : null;
    const badge = pct !== null && pct > 0
      ? `<span class="review-lift-badge up">+${pct}%</span>`
      : `<span class="review-lift-badge none">No baseline</span>`;
    const liftVol = d.weeklyVol.reduce((a,b)=>a+b,0);
    const liftVolDisplay = liftVol >= 1000 ? `${(liftVol/1000).toFixed(1)}k` : liftVol.toString();
    return `<div class="review-lift-card">
      <div class="review-lift-header">
        <div class="review-lift-name" style="color:${LIFT_COLORS[l]}">${l}</div>
        ${badge}
      </div>
      <div class="review-lift-stats">
        <div class="review-lift-stat">
          <div class="review-lift-stat-val">${d.startLoad||'—'}</div>
          <div class="review-lift-stat-lbl">Start ${weightUnit()}</div>
        </div>
        <div class="review-lift-stat">
          <div class="review-lift-stat-val">${d.bestLoad||'—'}</div>
          <div class="review-lift-stat-lbl">Best ${weightUnit()}</div>
        </div>
        <div class="review-lift-stat">
          <div class="review-lift-stat-val">${liftVolDisplay}</div>
          <div class="review-lift-stat-lbl">Total vol</div>
        </div>
      </div>
      <div class="sparkline-wrap">
        <canvas class="sparkline" id="spark_${l.replace(/ /g,'_')}"></canvas>
      </div>
    </div>`;
  }).join('');

  // Draw sparklines after render
  requestAnimationFrame(() => {
    MAIN_LIFTS.forEach(l => {
      const canvas = document.getElementById(`spark_${l.replace(/ /g,'_')}`);
      if(!canvas) return;
      const data = liftData[l].weeklyVol;
      const max = Math.max(...data, 1);
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = 40 * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      const w = canvas.offsetWidth, h = 40;
      const step = w / (data.length - 1);
      ctx.clearRect(0,0,w,h);
      ctx.beginPath();
      ctx.strokeStyle = LIFT_COLORS[l];
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      data.forEach((v,i) => {
        const x = i * step;
        const y = h - (v / max) * (h - 6) - 3;
        i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      });
      ctx.stroke();
      // fill
      ctx.lineTo((data.length-1)*step, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = LIFT_COLORS[l] + '22';
      ctx.fill();
    });
  });


}

function startNewCycle(mode) {
  // Archive current log
  const archived = JSON.parse(localStorage.getItem('ll_archived') || '[]');
  archived.push({
    id: Date.now(),
    date: new Date().toISOString(),
    log: JSON.parse(JSON.stringify(logData)),
    setup: JSON.parse(JSON.stringify(setupData)),
    plan: '12-Week Periodization'
  });
  localStorage.setItem('ll_archived', JSON.stringify(archived));

  // Clear log
  logData = {};
  localStorage.setItem('ll_log', JSON.stringify(logData));
  currentWeek = 1;

  if(mode === 'same') {
    // Keep template — auto-populate new cycle with same lifts/accessories
    // Recalculate weights based on updated 1RMs
    if(Object.keys(template).length > 0) {
      for(let w=1;w<=TOTAL_WEEKS;w++) {
        for(let d=1;d<=DAYS;d++) {
          const td = template[d]; if(!td) continue;
          const presc = getPrescription(w, td.lift, d);
          setLog(w, d, {
            lift: td.lift, sets: presc.sets, reps: presc.reps, load: presc.load,
            accs: td.accs.map(a=>({...a})), saved: false, prefilled: true
          });
        }
      }
      showToast('New cycle started with same plan!');
    } else {
      showToast('New cycle started!');
    }
    renderAll();
    switchPage('log');
  } else {
    // Go to Training Plan selection
    template = {};
    localStorage.setItem('ll_template', JSON.stringify(template));
    renderAll();
    switchPage('profile');
    goProfileScreen('profile-plans');
    showToast('Select your new training plan');
  }
}


// ARCHIVED CYCLES
function renderArchivedList() {
  const archived = JSON.parse(localStorage.getItem('ll_archived') || '[]');
  const el = document.getElementById('archived-list');
  const subEl = document.getElementById('archived-sub');
  if(subEl) subEl.textContent = archived.length ? `${archived.length} cycle${archived.length>1?'s':''} completed` : 'No cycles yet';
  if(!el) return;
  if(!archived.length) {
    el.innerHTML = '<div class="no-data">No completed cycles yet.</div>';
    return;
  }
  el.innerHTML = [...archived].reverse().map((c,i) => {
    const date = new Date(c.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
    const idx = archived.length - 1 - i;
    const isCancelled = c.cancelled || false;
    const cardStyle = isCancelled
      ? 'background:rgba(255,130,80,0.06);border-color:rgba(255,130,80,0.3);'
      : 'background:rgba(93,219,138,0.06);border-color:rgba(93,219,138,0.3);';
    const statusBadge = isCancelled
      ? '<span style="font-size:10px;color:#ff8250;font-family:Geist,sans-serif;letter-spacing:1px">CANCELLED</span>'
      : '<span style="font-size:10px;color:#5ddb8a;font-family:Geist,sans-serif;letter-spacing:1px">COMPLETED</span>';
    return `<div class="setup-menu-item" onclick="viewArchivedCycle(${idx})" style="${cardStyle}">
      <div class="setup-menu-left">
        <div class="setup-menu-title">Cycle ${idx+1} ${statusBadge}</div>
        <div class="setup-menu-sub">${c.plan || '12-Week Periodization'} · ${date}</div>
      </div>
      <span class="setup-menu-chevron">›</span>
    </div>`;
  }).join('');
}

function viewArchivedCycle(idx) {
  const archived = JSON.parse(localStorage.getItem('ll_archived') || '[]');
  const cycle = archived[idx];
  if(!cycle) return;

  // Temporarily swap data to render review
  const origLog = logData;
  const origSetup = setupData;
  logData = cycle.log;
  setupData = cycle.setup || {};

  const el = document.getElementById('archived-detail-content');
  const date = new Date(cycle.date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});

  // Calculate stats from archived data
  let totalVol=0, totalPRs=0, weeksComplete=0, daysSkipped=0;
  const liftData={};
  MAIN_LIFTS.forEach(l=>{liftData[l]={weeklyVol:Array(TOTAL_WEEKS).fill(0),bestLoad:0,startLoad:setupData[l]||0};});
  for(let w=1;w<=TOTAL_WEEKS;w++){
    let wc=true;
    for(let d=1;d<=DAYS;d++){
      const e=getLog(w,d);
      if(!e){wc=false;continue;}
      if(e.skipped){daysSkipped++;continue;}
      if(!e.saved){wc=false;continue;}
      if(!e.lift||!e.load)continue;
      let vol=e.sets*e.reps*e.load;
      if(e.warmup1?.load) vol+=parseFloat(e.warmup1.sets||1)*parseFloat(e.warmup1.reps||5)*parseFloat(e.warmup1.load||0);
      if(e.warmup2?.load) vol+=parseFloat(e.warmup2.sets||1)*parseFloat(e.warmup2.reps||3)*parseFloat(e.warmup2.load||0);
      totalVol+=vol;
      liftData[e.lift].weeklyVol[w-1]+=vol;
      if(e.load>liftData[e.lift].bestLoad)liftData[e.lift].bestLoad=e.load;
    }
    if(wc&&weekDone(w)===DAYS)weeksComplete++;
  }
  MAIN_LIFTS.forEach(l=>{if(liftData[l].bestLoad>liftData[l].startLoad)totalPRs++;});

  const volDisplay=totalVol>=1000?`${(totalVol/1000).toFixed(1)}k`:totalVol.toLocaleString();

  el.innerHTML=`
    <div class="review-hero" style="margin:-1.25rem -1.25rem 0">
      <div class="review-hero-label">COMPLETED ${date.toUpperCase()}</div>
      <div class="review-hero-title">Cycle ${idx+1}</div>
      <div class="review-hero-sub">${cycle.plan||'12-Week Periodization'}</div>
    </div>
    <div style="padding-top:1.25rem">
      <div class="review-stats-grid">
        <div class="review-stat-card"><div class="review-stat-value">${weeksComplete}/12</div><div class="review-stat-label">Weeks Complete</div></div>
        <div class="review-stat-card"><div class="review-stat-value">${volDisplay}</div><div class="review-stat-label">Total ${weightUnit()} Lifted</div></div>
        <div class="review-stat-card"><div class="review-stat-value">${totalPRs}</div><div class="review-stat-label">PRs Hit</div></div>
        <div class="review-stat-card"><div class="review-stat-value">${daysSkipped}</div><div class="review-stat-label">Days Skipped</div></div>
      </div>
      <div class="review-section-label">Lift Progression</div>
      ${MAIN_LIFTS.map(l=>{
        const d=liftData[l];
        const pct=d.startLoad?Math.round(((d.bestLoad-d.startLoad)/d.startLoad)*100):null;
        const badge=pct!==null&&pct>0?`<span class="review-lift-badge up">+${pct}%</span>`:`<span class="review-lift-badge none">No change</span>`;
        return `<div class="review-lift-card">
          <div class="review-lift-header">
            <div class="review-lift-name" style="color:${LIFT_COLORS[l]}">${l}</div>
            ${badge}
          </div>
          <div class="review-lift-stats">
            <div class="review-lift-stat"><div class="review-lift-stat-val">${d.startLoad||'—'}</div><div class="review-lift-stat-lbl">Start</div></div>
            <div class="review-lift-stat"><div class="review-lift-stat-val">${d.bestLoad||'—'}</div><div class="review-lift-stat-lbl">Best</div></div>
            <div class="review-lift-stat"><div class="review-lift-stat-val">${d.weeklyVol.reduce((a,b)=>a+b,0)>=1000?(d.weeklyVol.reduce((a,b)=>a+b,0)/1000).toFixed(1)+'k':d.weeklyVol.reduce((a,b)=>a+b,0)}</div><div class="review-lift-stat-lbl">Total vol</div></div>
          </div>
        </div>`;
      }).join('')}
    </div>`;

  // Restore original data
  logData = origLog;
  setupData = origSetup;

  goSetupScreen('setup-archived-detail');
}


// PROGRAM_531 legacy object removed — now using PROGRAMS registry

// PLAN SELECTION
function collapsePlanCards() {
  document.querySelectorAll('.plan-card-expand.open, .ob-plan-expand.open').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.plan-expanded').forEach(el => el.classList.remove('plan-expanded'));
}

function togglePlanDetail(cardEl, planId) {
  const expandEl = cardEl.querySelector('.plan-card-expand, .ob-plan-expand');
  if(!expandEl) return;
  const isOpen = cardEl.classList.contains('plan-expanded');
  collapsePlanCards();
  if(!isOpen) {
    cardEl.classList.add('plan-expanded');
    expandEl.classList.add('open');
    setTimeout(() => cardEl.scrollIntoView({behavior:'smooth', block:'nearest'}), 50);
  }
}

function selectPlan(planId) {
  collapsePlanCards();
  if(planId === activePlan) return; // already active
  showPlanConfirm(planId);
}


function showPRPrompt(missing) {
  const overlay = document.createElement('div');
  overlay.id = 'pr-prompt-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:500;background:rgba(0,0,0,0.82);display:flex;align-items:flex-end;justify-content:center;padding:0;opacity:0;transition:opacity 0.25s ease;';
  const activePlanObj = getActivePlan();
  const promptLifts = activePlanObj?.promptLifts || MAIN_LIFTS;
  const LIFT_ORDER_COLORS = ['--d1t','--d2t','--d3t','--d4t'];
  const fields = promptLifts.map((l, idx) => {
    const key = l.replace(/ /g,'_');
    const accentVar = LIFT_ORDER_COLORS[idx] || '--d1t';
    return `<div style="display:flex;align-items:center;gap:0;border-radius:var(--rs);overflow:hidden;background:var(--surface2);border:1px solid var(--border2);margin-bottom:10px">
      <div style="width:4px;align-self:stretch;background:var(${accentVar});border-radius:var(--rs) 0 0 var(--rs);flex-shrink:0"></div>
      <div style="flex:1;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;gap:10px">
        <span style="font-size:14px;font-weight:600;color:var(--text)">${l}</span>
        <div style="display:flex;align-items:center;gap:8px">
          <input type="number" min="0" step="2.5" placeholder="—"
            value="${setupData[l]||''}"
            id="prprompt_${key}"
            style="width:72px;padding:7px 8px;font-size:15px;font-weight:700;text-align:right;border-radius:var(--rs);border:1px solid var(--border2);background:var(--surface);color:var(--text);outline:none;"/>
          <span style="font-size:12px;color:var(--muted);white-space:nowrap">${weightUnit()}</span>
        </div>
      </div>
    </div>`;
  }).join('');

  overlay.innerHTML = `
    <div id="pr-prompt-card" style="background:var(--bg);border-radius:var(--r) var(--r) 0 0;padding:1.5rem;width:100%;max-width:480px;max-height:88vh;overflow-y:auto;transform:translateY(24px);opacity:0;transition:transform 0.3s ease,opacity 0.3s ease;">
      <div style="width:36px;height:4px;background:var(--border2);border-radius:2px;margin:0 auto 1.5rem"></div>
      <div style="font-family:'Bebas Neue','Geist',sans-serif;font-size:32px;letter-spacing:2px;color:var(--text);margin-bottom:6px">Set Your Starting 1RMs</div>
      <div style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:1.5rem">Enter what you know. You can update these anytime.</div>
      ${fields}
      <button id="pr-prompt-save-btn" onclick="savePRPrompt()"
        style="width:100%;margin-top:1rem;padding:14px;font-family:'Geist',sans-serif;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:var(--rs);border:1px solid var(--accent);background:var(--accent);color:#111;cursor:pointer;transition:all 0.15s;">
        Save &amp; Continue →
      </button>
      <div style="text-align:center;margin-top:14px">
        <button onclick="closePRPrompt()" style="background:none;border:none;color:var(--muted);font-size:13px;cursor:pointer;padding:6px 12px;">Skip for now</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    overlay.style.opacity = '1';
    const card = document.getElementById('pr-prompt-card');
    if(card) { card.style.transform = 'translateY(0)'; card.style.opacity = '1'; }
  }));
  overlay.addEventListener('click', e => { if(e.target === overlay) closePRPrompt(); });
}



function togglePromptCalc(key) {
  const box = document.getElementById('promptcalc_'+key);
  if(box) box.classList.toggle('open');
}

function calcPromptOneRM(lift, key) {
  const w = parseFloat(document.getElementById('pcw_'+key)?.value);
  const r = parseFloat(document.getElementById('pcr_'+key)?.value);
  if(!w || !r || r < 1) {
    document.getElementById('pcres_'+key).innerHTML = '<span style="color:#ff6060">Enter weight and reps</span>';
    return;
  }
  const oneRM = Math.round((w * (1 + r/30)) / 2.5) * 2.5;
  document.getElementById('pcres_'+key).innerHTML =
    `Est. 1RM: <strong>${oneRM} ${weightUnit()}</strong> &nbsp;·&nbsp; <button class="pr-calc-btn" style="padding:4px 10px;font-size:11px" onclick="applyPromptCalc('${lift}','${key}',${oneRM})">Use this</button>`;
}

function applyPromptCalc(lift, key, oneRM) {
  const input = document.getElementById('prprompt_'+key);
  if(input) { input.value = oneRM; checkPRPromptReady(); }
  document.getElementById('promptcalc_'+key)?.classList.remove('open');
  document.getElementById('pcres_'+key).innerHTML = '';
}

function closePRPrompt() {
  const ov = document.getElementById('pr-prompt-overlay');
  if(!ov) return;
  const card = document.getElementById('pr-prompt-card');
  ov.style.opacity = '0';
  if(card) { card.style.transform = 'translateY(24px)'; card.style.opacity = '0'; }
  setTimeout(() => ov.remove(), 300);
  // Show log with missing PRs banner
  autoPopulateAllWeeks();
  renderAll();
  switchPage('log');
}

function checkPRPromptReady() { /* button always active in new design */ }

function savePRPrompt() {
  const promptLifts = getActivePlan()?.promptLifts || MAIN_LIFTS;
  // Save any filled values; skip blanks
  promptLifts.forEach(l => {
    const val = document.getElementById('prprompt_'+l.replace(/ /g,'_'))?.value;
    if(val && parseFloat(val) > 0) setupData[l] = parseFloat(val);
  });
  localStorage.setItem('ll_setup', JSON.stringify(setupData));
  document.getElementById('pr-prompt-overlay')?.remove();

  // Show transition overlay
  showProgramReadyOverlay();
}

function showProgramReadyOverlay() {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:700;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;';
  overlay.innerHTML = `
    <div style="font-size:56px;animation:bounce 0.5s ease">⚡</div>
    <div style="font-family:'Bebas Neue','Geist',sans-serif;font-size:32px;letter-spacing:3px;color:var(--accent)">You're all set!</div>
    <div style="font-size:14px;color:var(--muted);text-align:center;max-width:260px;line-height:1.6">Your program is ready. Every weight has been calculated from your 1 Rep Max.</div>
    <div style="font-size:12px;color:var(--muted2);margin-top:8px">Loading your training...</div>`;
  document.body.appendChild(overlay);

  setTimeout(() => {
    autoPopulateAllWeeks();
    renderAll();
    renderPRs();
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.4s ease';
    setTimeout(() => {
      overlay.remove();
      switchPage('log');
    }, 400);
  }, 2000);
}

function showPlanConfirm(planId) {
  const planNames = {'12week':'12-Week Periodization','531':'5/3/1 Wendler'};
  const overlay = document.createElement('div');
  overlay.id = 'plan-confirm-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:500;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;padding:1.5rem;';
  const hasData = Object.keys(logData).length > 0;
  const isFirstTime = !localStorage.getItem('ll_active_plan');
  const confirmMsg = isFirstTime || !hasData
    ? `You're selecting <strong style="color:var(--text)">${planNames[planId] || planId}</strong> as your training plan. Your sessions will be set up automatically based on your 1 Rep Max.`
    : `Switching to <strong style="color:var(--text)">${planNames[planId] || planId}</strong> will cancel your current cycle and clear all logged data. This cannot be undone.`;
  const confirmTitle = isFirstTime || !hasData ? 'Start Training' : 'Switch Training Plan?';

  overlay.innerHTML = `
    <div style="background:var(--surface);border:1px solid var(--accent);border-radius:var(--r);padding:1.5rem;width:100%;max-width:360px;">
      <div style="font-family:'Geist',sans-serif;font-size:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--accent);margin-bottom:0.75rem;">${confirmTitle}</div>
      <div style="font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:1.25rem;">${confirmMsg}</div>
      <div style="display:flex;gap:10px;">
        <button onclick="confirmPlanSwitch('${planId}')" style="flex:1;padding:11px;font-family:'Geist',sans-serif;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:var(--rs);border:1px solid var(--accent);background:var(--accent);color:#111;cursor:pointer;">Let's go</button>
        <button onclick="document.getElementById('plan-confirm-overlay').remove()" style="flex:1;padding:11px;font-family:'Geist',sans-serif;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:var(--rs);border:1px solid var(--border2);background:transparent;color:var(--muted);cursor:pointer;">Cancel</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
}

function confirmPlanSwitch(planId) {
  document.getElementById('plan-confirm-overlay')?.remove();
  // Archive current cycle if there's data
  const hasData = Object.keys(logData).length > 0;
  if(hasData) {
    const archived = JSON.parse(localStorage.getItem('ll_archived') || '[]');
    archived.push({
      id: Date.now(),
      date: new Date().toISOString(),
      log: JSON.parse(JSON.stringify(logData)),
      setup: JSON.parse(JSON.stringify(setupData)),
      plan: getActivePlan().name,
      cancelled: true
    });
    localStorage.setItem('ll_archived', JSON.stringify(archived));
  }
  activePlan = planId;
  localStorage.setItem('ll_active_plan', planId);
  localStorage.setItem('ll_onboarding_seen', '1');
  logData = {};
  localStorage.setItem('ll_log', JSON.stringify(logData));
  template = {};
  localStorage.setItem('ll_template', JSON.stringify(template));
  currentWeek = 1;
  updatePlanBadges();
  updateLogPlanName();
  goProfileScreen('profile-main');
  autoPopulateAllWeeks();
  renderAll();
  syncPlanConstants();
  showToast('Switched to ' + (PROGRAMS[planId]?.name || planId));
  switchPage('log');
}



function autoPopulateAllWeeks() {
  const plan = getActivePlan();
  syncPlanConstants();
  // Show shimmer on visible day cards
  const scroll = document.getElementById('days-scroll');
  if(scroll && scroll.children.length > 0) {
    const shimmerHtml = Array(DAYS).fill('<div class="shimmer-card"></div>').join('');
    scroll.innerHTML = shimmerHtml;
  }
  for(let w=1;w<=TOTAL_WEEKS;w++) {
    for(let d=1;d<=DAYS;d++) {
      const existing = getLog(w,d);
      if(existing?.saved || existing?.skipped) continue;
      const td = template[d];
      const lift = td ? td.lift : (plan.dayLifts[d-1] || '');
      if(!lift) continue;
      const presc = getPrescription(w, lift, d);
      const planAccs = (plan.accessories && plan.accessories[d]) || [];
      const accs = td ? td.accs.map(a=>({...a})) : planAccs.map(a=>({...a}));
      setLog(w,d,{lift, sets:presc.sets, reps:presc.reps, load:presc.load||0,
        ...(presc.tm ? {tm:presc.tm} : {}),
        accs, saved:false, prefilled:true});
    }
  }
}


function updateLogPlanName() {
  const el = document.getElementById('log-plan-name');
  if(el) { el.textContent = getActivePlan().name; el.style.color = "var(--accent)"; }
}

function updatePlanBadges() {
  const archived = JSON.parse(localStorage.getItem('ll_archived') || '[]');
  const count12 = archived.filter(c => (c.plan==='12-Week Periodization'||!c.plan) && !c.cancelled).length;
  const count531 = archived.filter(c => c.plan==='5/3/1 Wendler' && !c.cancelled).length;

  [['plan-12w','12week'], ['p-plan-12w','12week'], ['plan-531','531'], ['p-plan-531','531']].forEach(([prefix, planId]) => {
    const badge = document.getElementById(prefix+'-badge');
    const card = document.getElementById(prefix+'-card');
    const count = document.getElementById(prefix+'-count');
    const cnt = planId==='12week' ? count12 : count531;
    if(badge) badge.style.display = activePlan===planId ? 'inline-block' : 'none';
    if(card) { card.classList.toggle('active-plan', activePlan===planId); card.style.opacity='1'; }
    if(count) { count.textContent = cnt>0?cnt+'× completed':''; count.className='plan-completion-count'+(cnt>0?' has-count':''); }
  });

  const sub = document.getElementById('training-plan-sub');
  if(sub) sub.textContent = (activePlan==='531'?'5/3/1 Wendler':'12-Week Periodization') + ' · Active';
  const psub = document.getElementById('profile-plan-sub');
  if(psub) psub.textContent = getActivePlan().name + ' · Active';
}




function buildSessionView(d, lift, presc, saved, hasSave, isSkipped) {
  const plan = getActivePlan();
  const u = weightUnit();

  let setsHtml = '';

  if(lift && presc && presc.displaySets && presc.displaySets.length > 0) {
    presc.displaySets.forEach(s => {
      let loadText;
      if(s.load !== null && s.load !== undefined) {
        const subSpan = s.pctClickable
          ? `<span class="session-set-pct-sub" onclick="show1RMModal(${d},'${lift}')" style="cursor:pointer"> @ ${s.pctLabel}</span>`
          : `<span class="session-set-pct-sub"> ${s.pctLabel}</span>`;
        loadText = `<span class="session-set-load-gold">${s.load} ${u}</span>${subSpan}`;
      } else {
        loadText = `<span class="session-set-pct" onclick="show1RMModal(${d},'${lift}')">${s.pctLabel}</span>`;
      }
      const amrap = s.amrap ? `<span style="font-size:11px;color:var(--accent);margin-left:6px">AMRAP</span>` : '';
      setsHtml += `<div class="session-set-row">
        <span class="session-set-num">${s.setNum}</span>
        <span class="session-set-text">${s.setsDisplay}×${s.repsDisplay} @ ${loadText}${amrap}</span>
      </div>`;
    });
  } else if(lift && presc) {
    setsHtml = `<div style="font-size:13px;color:var(--muted);padding:8px 0">Set your 1RM to see weights</div>`;
  } else {
    setsHtml = `<div style="font-size:13px;color:var(--muted);padding:8px 0">No lift assigned</div>`;
  }

  // Accessories
  const accs = saved?.accs || (plan.accessories && plan.accessories[d]) || [];
  let accHtml = '';
  if(accs.length > 0) {
    accHtml = `<div class="acc-divider"></div>
      <div class="section-label" style="margin-bottom:6px">Accessories</div>
      <div class="session-sets">
        ${accs.filter(a => a.ex && a.ex !== '').map(a =>
          `<div class="session-acc-row">
            <span class="session-acc-sets">${a.s||''}×${a.r||''}</span>
            <span style="color:var(--muted);font-size:15px">${a.ex}</span>
          </div>`
        ).join('')}
      </div>`;
  }

  // Complete Day / skip button
  const btnHtml = `<button class="complete-day-btn${hasSave?' completed':''}" id="sb-${d}"
    onclick="saveDay(${d})">${hasSave?'✓ Day Complete':'Complete Day'}</button>`;

  return `
    <div class="session-sets" style="margin-bottom:4px">${setsHtml}</div>
    ${accHtml}
    ${btnHtml}`;
}

function buildWorkingRows(d, saved, savedSets, savedReps, savedLoad, presc) {
  const u = weightUnit();
  const plan = getActivePlan();
  const hint531 = presc && plan.useTM && presc.phase
    ? presc.phase + ' · TM: ' + (presc.tm||'—') + ' ' + u
    : 'Select a lift to auto-fill';
  const hint12 = presc
    ? Math.round(presc.pct*100) + '% 1RM · ' + getActivePlan().weeklyScheme[currentWeek-1]?.sets + '×' + getActivePlan().weeklyScheme[currentWeek-1]?.reps
    : 'Select a lift to auto-fill';

  if(plan.useTM) {
    if(!presc) return '<div class="presc-hint">Select a lift to auto-fill</div>';
    // Get weekPlan fresh if missing
    const weekPlan531 = presc.weekPlan || getActivePlan().weeklyScheme[currentWeek-1];
    const tm531 = presc.tm || 0;
    const sets531 = weekPlan531.sets;
    let rows = '';
    sets531.forEach((s, i) => {
      const savedSet = saved && saved['workset'+(i+1)];
      const load = savedSet ? savedSet.load : (tm531 > 0 ? Math.round(tm531 * s.pct / 2.5)*2.5 : '');
      const reps = savedSet ? savedSet.reps : s.r;
      const sets = savedSet ? savedSet.sets : s.s;
      const pctStr = Math.round(s.pct*100) + '%';
      const amrapNote = s.amrap ? '<span style="grid-column:2/5;font-size:10px;color:var(--accent);letter-spacing:1px;text-align:center;margin-top:-4px;margin-bottom:4px">AMRAP on last set</span>' : '';
      const amrapTitle = s.amrap ? ' title="AMRAP"' : '';
      rows += '<div class="set-input-row">'
        + '<span class="set-row-num">' + (i+1) + '</span>'
        + '<input class="presc-input auto-filled" type="number" min="1" id="d'+d+'_ws'+(i+1)+'_sets" value="'+sets+'" oninput="resetSaveBtn('+d+')" />'
        + '<input class="presc-input auto-filled" type="number" min="1" id="d'+d+'_ws'+(i+1)+'_reps" value="'+reps+'"' + amrapTitle + ' oninput="resetSaveBtn('+d+')" />'
        + '<input class="presc-input auto-filled" type="number" min="0" step="2.5" id="d'+d+'_ws'+(i+1)+'_load" value="'+load+'" placeholder="'+u+'" oninput="resetSaveBtn('+d+')" />'
        + amrapNote
        + '</div>';
    });
    rows += '<div class="presc-hint">' + (presc.phase||weekPlan531.phase||'') + (tm531 ? ' · TM: '+tm531+' '+weightUnit() : '') + '</div>';
    return rows;
  } else {
    // Standard plan: single working set row (row 3)
    return '<div class="set-input-row">'
      + '<span class="set-row-num">3</span>'
      + '<input class="presc-input" type="number" min="1" id="d'+d+'_sets" value="'+savedSets+'" placeholder="—" oninput="resetSaveBtn('+d+')"/>'
      + '<input class="presc-input" type="number" min="1" id="d'+d+'_reps" value="'+savedReps+'" placeholder="—" oninput="resetSaveBtn('+d+')"/>'
      + '<input class="presc-input" type="number" min="0" step="2.5" id="d'+d+'_load" value="'+savedLoad+'" placeholder="'+u+'" oninput="resetSaveBtn('+d+')"/>'
      + '</div>'
      + '<div class="presc-hint">' + hint12 + '</div>';
  }
}

function buildWarmupRows(d, saved, savedLoad, presc) {
  const u = weightUnit();
  const planCfg = getActivePlan();
  if(planCfg.warmupRows === 0) {
    return ''; // this plan has no warmup rows
  } else {
    const l1 = (saved && saved.warmup1 && saved.warmup1.load) ? saved.warmup1.load : (savedLoad ? Math.round(savedLoad*0.6/2.5)*2.5 : '');
    const l2 = (saved && saved.warmup2 && saved.warmup2.load) ? saved.warmup2.load : (savedLoad ? Math.round(savedLoad*0.8/2.5)*2.5 : '');
    const r1 = saved && saved.warmup1 ? saved.warmup1.reps : '10';
    const r2 = saved && saved.warmup2 ? saved.warmup2.reps : '6';
    const s1 = saved && saved.warmup1 ? saved.warmup1.sets : '1';
    const s2 = saved && saved.warmup2 ? saved.warmup2.sets : '1';
    return '<div class="set-input-row"><span class="set-row-num">1</span>'
      + '<input class="presc-input" type="number" min="1" id="d'+d+'_w1_sets" value="'+s1+'" oninput="resetSaveBtn('+d+')"/>'
      + '<input class="presc-input" type="number" min="1" id="d'+d+'_w1_reps" value="'+r1+'" oninput="resetSaveBtn('+d+')"/>'
      + '<input class="presc-input" type="number" min="0" step="2.5" id="d'+d+'_w1_load" value="'+l1+'" placeholder="'+u+'" oninput="resetSaveBtn('+d+')"/></div>'
      + '<div class="set-input-row"><span class="set-row-num">2</span>'
      + '<input class="presc-input" type="number" min="1" id="d'+d+'_w2_sets" value="'+s2+'" oninput="resetSaveBtn('+d+')"/>'
      + '<input class="presc-input" type="number" min="1" id="d'+d+'_w2_reps" value="'+r2+'" oninput="resetSaveBtn('+d+')"/>'
      + '<input class="presc-input" type="number" min="0" step="2.5" id="d'+d+'_w2_load" value="'+l2+'" placeholder="'+u+'" oninput="resetSaveBtn('+d+')"/></div>';
  }
}


// ONBOARDING






function renderSetupReview() {
  const el = document.getElementById('setup-review-content');
  if(!el) return;
  const completedWeeks = Array.from({length: TOTAL_WEEKS}, (_,i) => weekDone(i+1) === DAYS ? 1 : 0).reduce((a,b)=>a+b,0);
  const isComplete = completedWeeks === TOTAL_WEEKS;

  if(!isComplete) {
    el.innerHTML = `
      <div class="page-header" style="padding:0 0 1.25rem"><h2>Block Review</h2></div>
      <div class="review-lock-card">
        <div class="review-lock-top">
          <div class="review-lock-icon">🔒</div>
          <div>
            <div class="review-lock-title">Not Yet Complete</div>
            <div class="review-lock-sub">Finish all ${TOTAL_WEEKS} weeks to unlock your full cycle analysis.</div>
          </div>
        </div>
        <div class="review-lock-progress-label">
          <span>${completedWeeks} of ${TOTAL_WEEKS} weeks complete</span>
          <span style="color:var(--accent)">${Math.round((completedWeeks/TOTAL_WEEKS)*100)}%</span>
        </div>
        <div class="review-lock-track">
          <div class="review-lock-fill" style="width:${(completedWeeks/TOTAL_WEEKS)*100}%"></div>
        </div>
      </div>`;
    return;
  }

  // Full review - reuse renderReview logic inline
  el.innerHTML = '<div class="page-header" style="padding:0 0 1.25rem"><h2>Block Review</h2></div><div id="setup-review-inner"></div>';
  const inner = document.getElementById('setup-review-inner');

  // Collect stats
  let totalVol=0, totalPRs=0, weeksComplete=0, daysSkipped=0;
  const liftData={};
  MAIN_LIFTS.forEach(l=>{liftData[l]={weeklyVol:Array(TOTAL_WEEKS).fill(0),bestLoad:0,startLoad:setupData[l]||0};});
  for(let w=1;w<=TOTAL_WEEKS;w++){
    let wc=true;
    for(let d=1;d<=DAYS;d++){
      const e=getLog(w,d);
      if(!e){wc=false;continue;}
      if(e.skipped){daysSkipped++;continue;}
      if(!e.saved){wc=false;continue;}
      if(!e.lift||!e.load)continue;
      let vol=e.sets*e.reps*e.load;
      if(e.warmup1?.load) vol+=parseFloat(e.warmup1.sets||1)*parseFloat(e.warmup1.reps||5)*parseFloat(e.warmup1.load||0);
      if(e.warmup2?.load) vol+=parseFloat(e.warmup2.sets||1)*parseFloat(e.warmup2.reps||3)*parseFloat(e.warmup2.load||0);
      totalVol+=vol; liftData[e.lift].weeklyVol[w-1]+=vol;
      if(e.load>liftData[e.lift].bestLoad){liftData[e.lift].bestLoad=e.load;} 
    }
    if(wc&&weekDone(w)===DAYS)weeksComplete++;
  }
  MAIN_LIFTS.forEach(l=>{if(liftData[l].bestLoad>liftData[l].startLoad)totalPRs++;});
  const volDisplay=totalVol>=1000?`${(totalVol/1000).toFixed(1)}k`:totalVol.toLocaleString();

  inner.innerHTML = `
    <div class="review-stats-grid">
      <div class="review-stat-card"><div class="review-stat-value">${weeksComplete}/${TOTAL_WEEKS}</div><div class="review-stat-label">Weeks Complete</div></div>
      <div class="review-stat-card"><div class="review-stat-value">${volDisplay}</div><div class="review-stat-label">Total ${weightUnit()}</div></div>
      <div class="review-stat-card"><div class="review-stat-value">${totalPRs}</div><div class="review-stat-label">PRs Hit</div></div>
      <div class="review-stat-card"><div class="review-stat-value">${daysSkipped}</div><div class="review-stat-label">Days Skipped</div></div>
    </div>
    <div class="review-section-label" style="margin-top:1rem">Lift Progression</div>
    ${MAIN_LIFTS.map(l=>{
      const d=liftData[l];
      const pct=d.startLoad?Math.round(((d.bestLoad-d.startLoad)/d.startLoad)*100):null;
      const badge=pct!==null&&pct>0?`<span class="review-lift-badge up">+${pct}%</span>`:`<span class="review-lift-badge none">No change</span>`;
      const liftVol=d.weeklyVol.reduce((a,b)=>a+b,0);
      return `<div class="review-lift-card">
        <div class="review-lift-header">
          <div class="review-lift-name" style="color:${LIFT_COLORS[l]}">${l}</div>${badge}
        </div>
        <div class="review-lift-stats">
          <div class="review-lift-stat"><div class="review-lift-stat-val">${d.startLoad||'—'}</div><div class="review-lift-stat-lbl">Start</div></div>
          <div class="review-lift-stat"><div class="review-lift-stat-val">${d.bestLoad||'—'}</div><div class="review-lift-stat-lbl">Best</div></div>
          <div class="review-lift-stat"><div class="review-lift-stat-val">${liftVol>=1000?(liftVol/1000).toFixed(1)+'k':liftVol}</div><div class="review-lift-stat-lbl">Vol</div></div>
        </div>
      </div>`;
    }).join('')}
    <div style="display:flex;gap:10px;margin-top:1rem">
      <button class="save-setup-btn" style="flex:1" onclick="startNewCycle('same')">Start New Cycle</button>
      <button class="save-setup-btn" style="flex:1;border-color:var(--border2);color:var(--muted)" onclick="startNewCycle('new')">Change Plan</button>
    </div>`;
}

// Auto-show Block Review when cycle completes
function checkCycleComplete() {
  const completedWeeks = Array.from({length: TOTAL_WEEKS}, (_,i) => weekDone(i+1) === DAYS ? 1 : 0).reduce((a,b)=>a+b,0);
  if(completedWeeks === TOTAL_WEEKS) {
    const alreadyShown = localStorage.getItem('ll_review_shown_' + (JSON.parse(localStorage.getItem('ll_archived')||'[]').length));
    if(!alreadyShown) {
      // Store end date
      if(!localStorage.getItem('ll_cycle_end')) {
        localStorage.setItem('ll_cycle_end', Date.now().toString());
      }
      localStorage.setItem('ll_review_shown_' + (JSON.parse(localStorage.getItem('ll_archived')||'[]').length), '1');
      setTimeout(() => {
        switchPage('profile');
        goProfileScreen('profile-review');
        showToast('Cycle complete! 🎉');
      }, 800);
    }
  }
}


// PROFILE PAGE
let accountData = JSON.parse(localStorage.getItem('ll_account') || '{}');

function goProfileScreen(id) {
  document.querySelectorAll('#page-profile .setup-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
  if(id === 'profile-review') renderProfileReview();
  if(id === 'profile-history') renderProfileHistory();
  if(id === 'profile-plans') updatePlanBadges();
}

function initProfilePage() {
  // Load account data into fields
  const d = accountData;
  const fn = document.getElementById('acc-firstname');
  const ln = document.getElementById('acc-lastname');
  const bd = document.getElementById('acc-birthday');
  const gn = document.getElementById('acc-gender');
  const ct = document.getElementById('acc-country');
  if(fn) fn.value = d.firstname || '';
  if(ln) ln.value = d.lastname || '';
  if(bd) bd.value = d.birthday || '';
  if(gn) gn.value = d.gender || '';
  if(ct) ct.value = d.country || '';

  // Update header display
  const nameEl = document.getElementById('profile-display-name');
  if(nameEl) nameEl.textContent = [d.firstname, d.lastname].filter(Boolean).join(' ') || 'Your Name';
  // Update initials
  const initialsEl = document.getElementById('profile-initials');
  if(initialsEl) {
    const fn = d.firstname ? d.firstname[0].toUpperCase() : '';
    const ln = d.lastname ? d.lastname[0].toUpperCase() : '';
    initialsEl.textContent = (fn + ln) || '?';
    initialsEl.style.color = fn ? 'var(--accent)' : 'var(--muted)';
  }

  // Update plan sub label
  const planSub = document.getElementById('profile-plan-sub');
  if(planSub) planSub.textContent = getActivePlan().name + ' · Active';

  // Update review sub
  const completedWeeks = Array.from({length: TOTAL_WEEKS}, (_,i) => weekDone(i+1) === DAYS ? 1 : 0).reduce((a,b)=>a+b,0);
  const reviewSub = document.getElementById('profile-review-sub');
  if(reviewSub) reviewSub.textContent = completedWeeks === TOTAL_WEEKS ? 'Tap to view your Training Report' : completedWeeks + ' of ' + TOTAL_WEEKS + ' weeks complete';

  // Update history sub
  const archived = JSON.parse(localStorage.getItem('ll_archived') || '[]');
  const histSub = document.getElementById('profile-history-sub');
  if(histSub) histSub.textContent = archived.length ? archived.length + ' cycle' + (archived.length>1?'s':'') + ' completed' : 'No completed cycles yet';

  updatePlanBadges();
  updateUnitButtons();
  initTheme();
  const savedPhoto = localStorage.getItem('ll_profile_photo');
  if(savedPhoto) { applyProfilePhoto(savedPhoto); }

  // Reset to main screen
  goProfileScreen('profile-main');
}

function markAccountDirty() {
  const btn = document.getElementById('acc-save-btn');
  if(!btn) return;
  btn.disabled = false;
  btn.style.cssText = 'width:100%;margin-top:0.75rem;padding:12px;font-family:Geist,sans-serif;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:var(--rs);border:1px solid var(--accent);background:var(--accent);color:#111;cursor:pointer;transition:all 0.2s;';
}

function saveAccount() {
  accountData = {
    firstname: document.getElementById('acc-firstname')?.value || '',
    lastname: document.getElementById('acc-lastname')?.value || '',
    birthday: document.getElementById('acc-birthday')?.value || '',
    gender: document.getElementById('acc-gender')?.value || '',
    country: document.getElementById('acc-country')?.value || '',
  };
  localStorage.setItem('ll_account', JSON.stringify(accountData));
  const nameEl = document.getElementById('profile-display-name');
  if(nameEl) nameEl.textContent = [accountData.firstname, accountData.lastname].filter(Boolean).join(' ') || 'Your Name';
  const btn = document.getElementById('acc-save-btn');
  if(btn) {
    btn.disabled = true;
    btn.style.cssText = 'width:100%;margin-top:0.75rem;padding:12px;font-family:Geist,sans-serif;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:var(--rs);border:1px solid var(--border2);background:var(--surface2);color:var(--muted2);cursor:not-allowed;transition:all 0.2s;';
  }
  showToast('Account saved');
}

function renderProfileReview() {
  const el = document.getElementById('profile-review-content');
  if(!el) return;

  const hasPlan = activePlan && PROGRAMS[activePlan];
  const completedWeeks = hasPlan ? Array.from({length: TOTAL_WEEKS}, (_,i) => weekDone(i+1) === DAYS ? 1 : 0).reduce((a,b)=>a+b,0) : 0;
  const totalDaysLogged = hasPlan ? Object.values(logData).filter(d => d.saved).length : 0;
  const isComplete = hasPlan && completedWeeks === TOTAL_WEEKS;

  const cycleStart = localStorage.getItem('ll_cycle_start');
  const cycleEnd = localStorage.getItem('ll_cycle_end');
  let dateRange = '';
  if(cycleStart) {
    dateRange = formatDateRange(parseInt(cycleStart), cycleEnd ? parseInt(cycleEnd) : null);
  }
  let html = `<div class="page-header" style="padding:0 0 1.25rem"><h2>Training Reports</h2>${dateRange ? '<p style="font-size:12px;color:var(--muted)">'+dateRange+'</p>' : ''}</div>`;

  // Current cycle
  html += '<div class="setup-section-label" style="margin-bottom:8px">Current Cycle</div>';

  if(!hasPlan) {
    html += `<div style="padding:16px;background:var(--surface);border:1px solid var(--border);border-radius:var(--r);margin-bottom:1.25rem">
      <div style="font-size:13px;color:var(--muted);line-height:1.6">You haven't started a training program yet. Select a program to begin tracking your progress.</div>
      <button onclick="goProfileScreen('profile-plans')" style="margin-top:10px;padding:8px 16px;font-family:'Geist',sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:var(--rs);border:1px solid var(--accent);background:var(--accent2);color:var(--accent);cursor:pointer">Choose a Program</button>
    </div>`;
  } else if(!isComplete) {
    const pct = Math.round((completedWeeks/TOTAL_WEEKS)*100);
    html += `<div class="review-lock-card" style="margin-bottom:1.25rem">
      <div class="review-lock-top">
        <div class="review-lock-icon">🏋️</div>
        <div>
          <div class="review-lock-title">In Progress</div>
          <div class="review-lock-sub">${getActivePlan().name} · ${totalDaysLogged} day${totalDaysLogged!==1?'s':''} logged</div>
        </div>
      </div>
      <div class="review-lock-progress-label">
        <span>Week ${completedWeeks+1} of ${TOTAL_WEEKS}</span>
        <span style="color:var(--accent)">${pct}%</span>
      </div>
      <div class="review-lock-track"><div class="review-lock-fill" style="width:${pct}%"></div></div>
    </div>`;
  } else {
    html += '<div id="current-report-inner"></div>';
  }

  // Past cycles
  const archived = JSON.parse(localStorage.getItem('ll_archived') || '[]');
  if(archived.length > 0) {
    html += '<div class="setup-section-label" style="margin-top:1.25rem;margin-bottom:8px">Past Cycles</div>';
    html += [...archived].reverse().map((c,i) => {
      const idx = archived.length - 1 - i;
      const isCancelled = c.cancelled || false;
      const cardStyle = isCancelled ? 'background:rgba(255,130,80,0.06);border-color:rgba(255,130,80,0.3);' : 'background:rgba(93,219,138,0.06);border-color:rgba(93,219,138,0.3);';
      const badge = isCancelled
        ? '<span style="font-size:10px;color:#ff8250;font-family:Geist,sans-serif;letter-spacing:1px">CANCELLED</span>'
        : '<span style="font-size:10px;color:#5ddb8a;font-family:Geist,sans-serif;letter-spacing:1px">COMPLETED</span>';
      const dateStr = c.startDate
        ? formatDateRange(c.startDate, c.endDate)
        : new Date(c.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
      const duration = c.startDate && c.endDate ? ' · ' + getCycleDuration(c.startDate, c.endDate) : '';
      return `<div class="setup-menu-item" onclick="viewProfileArchivedCycle(${idx})" style="${cardStyle}margin-bottom:8px">
        <div class="setup-menu-left">
          <div class="setup-menu-title">Cycle ${idx+1} ${badge}</div>
          <div class="setup-menu-sub">${c.plan||'12-Week Periodization'}${duration}</div>
          <div style="font-size:11px;color:var(--muted2);margin-top:2px">${dateStr}</div>
        </div><span class="setup-menu-chevron">›</span>
      </div>`;
    }).join('');
  }

  el.innerHTML = html;

  if(isComplete) {
    renderSetupReview();
    const inner = document.getElementById('setup-review-inner');
    const target = document.getElementById('current-report-inner');
    if(inner && target) target.appendChild(inner);
  }
}

function renderProfileHistory() {
  const archived = JSON.parse(localStorage.getItem('ll_archived') || '[]');
  const el = document.getElementById('profile-archived-list');
  if(!el) return;
  if(!archived.length) { el.innerHTML = '<div class="no-data">No completed cycles yet.</div>'; return; }
  el.innerHTML = [...archived].reverse().map((c,i) => {
    const date = new Date(c.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
    const idx = archived.length - 1 - i;
    const isCancelled = c.cancelled || false;
    const cardStyle = isCancelled ? 'background:rgba(255,130,80,0.06);border-color:rgba(255,130,80,0.3);' : 'background:rgba(93,219,138,0.06);border-color:rgba(93,219,138,0.3);';
    const statusBadge = isCancelled
      ? '<span style="font-size:10px;color:#ff8250;font-family:Geist,sans-serif;letter-spacing:1px">CANCELLED</span>'
      : '<span style="font-size:10px;color:#5ddb8a;font-family:Geist,sans-serif;letter-spacing:1px">COMPLETED</span>';
    return `<div class="setup-menu-item" onclick="viewProfileArchivedCycle(${idx})" style="${cardStyle}">
      <div class="setup-menu-left">
        <div class="setup-menu-title">Cycle ${idx+1} ${statusBadge}</div>
        <div class="setup-menu-sub">${c.plan||'12-Week Periodization'} · ${date}</div>
      </div>
      <span class="setup-menu-chevron">›</span>
    </div>`;
  }).join('');
}

function viewProfileArchivedCycle(idx) {
  const archived = JSON.parse(localStorage.getItem('ll_archived') || '[]');
  const cycle = archived[idx]; if(!cycle) return;
  const origLog = logData, origSetup = setupData;
  logData = cycle.log; setupData = cycle.setup || {};
  const el = document.getElementById('profile-archived-detail-content');
  const date = new Date(cycle.date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
  let totalVol=0, totalPRs=0, weeksComplete=0, daysSkipped=0;
  const liftData={};
  MAIN_LIFTS.forEach(l=>{liftData[l]={weeklyVol:Array(TOTAL_WEEKS).fill(0),bestLoad:0,startLoad:setupData[l]||0};});
  for(let w=1;w<=TOTAL_WEEKS;w++){
    let wc=true;
    for(let d=1;d<=DAYS;d++){
      const e=getLog(w,d);
      if(!e){wc=false;continue;}
      if(e.skipped){daysSkipped++;continue;}
      if(!e.saved){wc=false;continue;}
      if(!e.lift||!e.load)continue;
      const vol=e.sets*e.reps*e.load; totalVol+=vol;
      liftData[e.lift].weeklyVol[w-1]+=vol;
      if(e.load>liftData[e.lift].bestLoad)liftData[e.lift].bestLoad=e.load;
    }
    if(wc&&weekDone(w)===DAYS)weeksComplete++;
  }
  MAIN_LIFTS.forEach(l=>{if(liftData[l].bestLoad>liftData[l].startLoad)totalPRs++;});
  const volDisplay=totalVol>=1000?`${(totalVol/1000).toFixed(1)}k`:totalVol.toLocaleString();
  el.innerHTML=`<div class="page-header" style="padding:0 0 1.25rem"><h2>Cycle ${idx+1}</h2><p>${cycle.plan||'12-Week Periodization'} · ${date}</p></div>
    <div class="review-stats-grid">
      <div class="review-stat-card"><div class="review-stat-value">${weeksComplete}/${TOTAL_WEEKS}</div><div class="review-stat-label">Weeks</div></div>
      <div class="review-stat-card"><div class="review-stat-value">${volDisplay}</div><div class="review-stat-label">Total ${weightUnit()}</div></div>
      <div class="review-stat-card"><div class="review-stat-value">${totalPRs}</div><div class="review-stat-label">PRs Hit</div></div>
      <div class="review-stat-card"><div class="review-stat-value">${daysSkipped}</div><div class="review-stat-label">Skipped</div></div>
    </div>
    <div class="review-section-label" style="margin-top:1rem">Lift Progression</div>
    ${MAIN_LIFTS.map(l=>{
      const d=liftData[l];
      const pct=d.startLoad?Math.round(((d.bestLoad-d.startLoad)/d.startLoad)*100):null;
      const badge=pct!==null&&pct>0?`<span class="review-lift-badge up">+${pct}%</span>`:`<span class="review-lift-badge none">No change</span>`;
      return `<div class="review-lift-card"><div class="review-lift-header"><div class="review-lift-name" style="color:${LIFT_COLORS[l]}">${l}</div>${badge}</div>
        <div class="review-lift-stats">
          <div class="review-lift-stat"><div class="review-lift-stat-val">${d.startLoad||'—'}</div><div class="review-lift-stat-lbl">Start</div></div>
          <div class="review-lift-stat"><div class="review-lift-stat-val">${d.bestLoad||'—'}</div><div class="review-lift-stat-lbl">Best</div></div>
        </div></div>`;
    }).join('')}`;
  logData = origLog; setupData = origSetup;
  goProfileScreen('profile-archived-detail');
}


function skipOnboarding() {
  localStorage.setItem('ll_onboarding_seen', '1');
  const ob = document.getElementById('onboarding');
  if(ob) { ob.style.opacity='0'; setTimeout(()=>{ ob.style.display='none'; }, 400); }
  document.querySelectorAll('.onboarding-hidden').forEach(el => el.classList.remove('onboarding-hidden'));
  renderAll();
  renderDashboard();
  switchPage('log');
}

function obFinish() {
  const ob = document.getElementById('onboarding');
  localStorage.setItem('ll_onboarding_seen','1');
  // Restore elements hidden during first-launch onboarding flow
  document.querySelectorAll('.onboarding-hidden').forEach(function(el) { el.classList.remove('onboarding-hidden'); });
  if(ob) {
    ob.style.opacity='0';
    setTimeout(()=>{ ob.style.display='none'; }, 400);
  }
  // If no plan was previously selected, make sure log shows empty state
  if(!localStorage.getItem('ll_active_plan')) {
    activePlan = '';
    renderAll();
  }
}

let wsCurrentSlide = 0;

function initWelcomeSlides() {
  const ws = document.getElementById('welcome-slides');
  if(!ws) { showObOverlay(); return; }
  ws.style.display = 'flex';
  requestAnimationFrame(function() { ws.style.opacity = '1'; });
  let startX = 0;
  ws.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; }, { passive: true });
  ws.addEventListener('touchend', function(e) {
    const dx = e.changedTouches[0].clientX - startX;
    if(Math.abs(dx) > 50) {
      if(dx < 0 && wsCurrentSlide < 2) goWsSlide(wsCurrentSlide + 1);
      else if(dx > 0 && wsCurrentSlide > 0) goWsSlide(wsCurrentSlide - 1);
    }
  }, { passive: true });
}

function goWsSlide(n) {
  wsCurrentSlide = n;
  const slider = document.getElementById('ws-slider');
  if(slider) slider.style.transform = 'translateX(-' + (n * 33.333333) + '%)';
  for(let i = 0; i < 3; i++) {
    const dot = document.getElementById('ws-dot-' + i);
    if(dot) dot.classList.toggle('active', i === n);
  }
  const skip = document.getElementById('ws-skip');
  const cta = document.getElementById('ws-cta');
  if(skip) skip.style.display = n < 2 ? '' : 'none';
  if(cta) cta.style.display = n === 2 ? '' : 'none';
}

function dismissWelcomeSlides() {
  const ws = document.getElementById('welcome-slides');
  if(!ws) { showObOverlay(); return; }
  ws.style.opacity = '0';
  setTimeout(function() {
    ws.style.display = 'none';
    wsCurrentSlide = 0;
    showObOverlay();
  }, 400);
}

function showObOverlay() {
  const ob = document.getElementById('onboarding');
  if(!ob) return;
  ob.style.display = 'flex';
  ob.style.opacity = '0';
  requestAnimationFrame(function() {
    ob.style.transition = 'opacity 0.4s ease';
    ob.style.opacity = '1';
  });
}

function initOnboarding() {
  const seen = localStorage.getItem('ll_onboarding_seen');
  const ob = document.getElementById('onboarding');
  if(!ob) return;
  ob.style.display = 'none';
  if(!seen) {
    setTimeout(function() { initWelcomeSlides(); }, 3000);
  }
}


function formatDateRange(startTs, endTs) {
  if(!startTs) return '';
  const opts = {month:'short', day:'numeric', year:'numeric'};
  const start = new Date(startTs).toLocaleDateString('en-US', opts);
  if(!endTs) return start + ' — present';
  const end = new Date(endTs).toLocaleDateString('en-US', opts);
  return start + ' — ' + end;
}

function getCycleDuration(startTs, endTs) {
  if(!startTs || !endTs) return '';
  const days = Math.round((endTs - startTs) / (1000*60*60*24));
  const weeks = Math.round(days / 7);
  return weeks + ' week' + (weeks !== 1 ? 's' : '');
}


function handleProfilePhoto(e) {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const url = ev.target.result;
    localStorage.setItem('ll_profile_photo', url);
    applyProfilePhoto(url);
  };
  reader.readAsDataURL(file);
}

function applyProfilePhoto(url) {
  const el = document.getElementById('profile-avatar-display');
  if(!el) return;
  el.style.backgroundImage = 'url('+url+')';
  el.style.backgroundSize = 'cover';
  el.style.backgroundPosition = 'center';
  const svg = el.querySelector('svg');
  if(svg) svg.style.display = 'none';
}


function migratePRHistory() {
  const archived = JSON.parse(localStorage.getItem('ll_archived') || '[]');
  LIFT_LIBRARY.filter(lib => lib.trackPR).forEach(lib => {
    const l = lib.name;
    const key = lib.key;
    if(localStorage.getItem('ll_pr_history_'+key)) return; // already migrated
    const history = [];
    const seen = new Set();
    archived.forEach(c => {
      if(c.setup && c.setup[l] && !seen.has(c.setup[l])) {
        seen.add(c.setup[l]);
        history.push({load: c.setup[l], date: c.date || Date.now()});
      }
    });
    if(setupData[l] && !seen.has(setupData[l])) {
      history.push({load: setupData[l], date: Date.now()});
    } else if(setupData[l] && history.length === 0) {
      history.push({load: setupData[l], date: Date.now()});
    }
    if(history.length > 0) {
      localStorage.setItem('ll_pr_history_'+key, JSON.stringify(history));
    }
  });
}


function migrateCompletedDates() {
  if(localStorage.getItem('ll_completed_dates_migrated')) return;
  const dates = [];
  for(let w = 1; w <= TOTAL_WEEKS; w++) {
    for(let d = 1; d <= DAYS; d++) {
      const e = getLog(w, d);
      if(e?.saved && e.ts) {
        const s = new Date(e.ts).toISOString().slice(0,10);
        if(!dates.includes(s)) dates.push(s);
      }
    }
  }
  dates.sort();
  localStorage.setItem('ll_completed_dates', JSON.stringify(dates));
  localStorage.setItem('ll_completed_dates_migrated', '1');
}

// CONSISTENCY WIDGET STATE
let _conView = 'month';
let _conMonth = new Date().getMonth();
let _conYear = new Date().getFullYear();

function switchConsistency(view) {
  _conView = view;
  const today = new Date();
  if(view === 'month') { _conMonth = today.getMonth(); _conYear = today.getFullYear(); }
  if(view === 'year')  { _conYear = today.getFullYear(); }
  document.querySelectorAll('.consistency-toggle button').forEach(b => {
    b.classList.toggle('active', b.dataset.view === view);
  });
  renderConsistency(view);
}

function renderConsistency(view) {
  const el = document.getElementById('consistencyContent');
  if(!el) return;
  _conView = view || _conView;
  if(_conView === 'month')   _renderConMonth(el);
  else if(_conView === 'year')    _renderConYear(el);
  else                             _renderConAllTime(el);
}

function _conDateStr(d) {
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

function _renderConMonth(el) {
  const completed = new Set(JSON.parse(localStorage.getItem('ll_completed_dates') || '[]'));
  const today = new Date();
  const todayStr = _conDateStr(today);
  const yr = _conYear, mo = _conMonth;
  const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DOW = ['M','T','W','T','F','S','S'];

  // Grid: start from Monday of the week containing the 1st
  const firstDay = new Date(yr, mo, 1);
  // Mon=0 offset
  const startOffset = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(firstDay);
  gridStart.setDate(gridStart.getDate() - startOffset);
  const lastDay = new Date(yr, mo + 1, 0);
  const endOffset = (6 - (lastDay.getDay() + 6) % 7);
  const gridEnd = new Date(lastDay);
  gridEnd.setDate(gridEnd.getDate() + endOffset);

  // Count sessions this month
  let monthCount = 0;
  completed.forEach(s => { if(s.startsWith(yr+'-'+String(mo+1).padStart(2,'0'))) monthCount++; });

  // Build cells
  let cells = '';
  let cur = new Date(gridStart);
  while(cur <= gridEnd) {
    const s = _conDateStr(cur);
    const inMonth = cur.getMonth() === mo && cur.getFullYear() === yr;
    const isDone = completed.has(s);
    const isToday = s === todayStr;
    const num = cur.getDate();
    let style = '', textColor = 'var(--muted)';
    if(!inMonth) {
      style = 'opacity:0.2;border-color:transparent;background:transparent;';
    } else if(isDone) {
      style = 'background:linear-gradient(135deg,#008089,#61D2DA);border-color:transparent;';
      textColor = '#0c1414';
    }
    const ring = isToday ? 'box-shadow:0 0 0 2px #61D2DA;' : '';
    const fw = (isToday || isDone) ? '700' : '400';
    const tc = (isToday && !isDone) ? '#61D2DA' : textColor;
    cells += `<div style="aspect-ratio:1;border-radius:50%;border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:${fw};color:${tc};${style}${ring}">${inMonth ? num : ''}</div>`;
    cur.setDate(cur.getDate() + 1);
  }

  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
      <button onclick="_conNavMonth(-1)" style="background:none;border:none;color:var(--muted);font-size:20px;cursor:pointer;padding:0 6px;line-height:1">‹</button>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:2px;color:var(--text)">${MONTH_NAMES[mo].toUpperCase()} ${yr}</div>
      <button onclick="_conNavMonth(1)" style="background:none;border:none;color:var(--muted);font-size:20px;cursor:pointer;padding:0 6px;line-height:1">›</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:8px">
      ${DOW.map(d=>`<div style="text-align:center;font-size:10px;text-transform:uppercase;color:var(--muted2);letter-spacing:1px;padding-bottom:4px">${d}</div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">${cells}</div>
    <div style="margin-top:14px;display:flex;align-items:baseline;gap:6px">
      <span style="font-family:'Bebas Neue',sans-serif;font-size:24px;color:var(--text)">${monthCount}</span>
      <span style="font-size:12px;color:var(--muted)">sessions this month</span>
    </div>`;
}

function _conNavMonth(dir) {
  _conMonth += dir;
  if(_conMonth > 11) { _conMonth = 0; _conYear++; }
  if(_conMonth < 0)  { _conMonth = 11; _conYear--; }
  _renderConMonth(document.getElementById('consistencyContent'));
}

function _renderConYear(el) {
  const completed = JSON.parse(localStorage.getItem('ll_completed_dates') || '[]');
  const yr = _conYear;
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const counts = MONTHS.map((_,i) => {
    const prefix = yr + '-' + String(i+1).padStart(2,'0');
    return completed.filter(s => s.startsWith(prefix)).length;
  });
  const maxCount = Math.max(...counts, 1);
  const total = counts.reduce((a,b)=>a+b,0);

  const bars = counts.map((c, i) => {
    const h = Math.max(Math.round((c / maxCount) * 110), c > 0 ? 3 : 0);
    return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:130px">
      <div style="font-size:10px;color:#61D2DA;font-weight:700;margin-bottom:4px;min-height:14px">${c > 0 ? c : ''}</div>
      <div style="width:100%;border-radius:5px 5px 2px 2px;background:linear-gradient(180deg,#61D2DA,#008089);min-height:${c>0?3:0}px;height:${h}px"></div>
      <div style="font-size:10px;color:var(--muted2);text-transform:uppercase;margin-top:8px;letter-spacing:0.5px">${MONTHS[i]}</div>
    </div>`;
  }).join('');

  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
      <button onclick="_conNavYear(-1)" style="background:none;border:none;color:var(--muted);font-size:20px;cursor:pointer;padding:0 6px;line-height:1">‹</button>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:2px;color:var(--text)">${yr}</div>
      <button onclick="_conNavYear(1)" style="background:none;border:none;color:var(--muted);font-size:20px;cursor:pointer;padding:0 6px;line-height:1">›</button>
    </div>
    <div style="display:flex;align-items:flex-end;gap:6px;height:130px">${bars}</div>
    <div style="margin-top:14px;display:flex;align-items:baseline;gap:6px;justify-content:center">
      <span style="font-family:'Bebas Neue',sans-serif;font-size:24px;color:var(--text)">${total}</span>
      <span style="font-size:12px;color:var(--muted)">sessions this year</span>
    </div>`;
}

function _conNavYear(dir) {
  _conYear += dir;
  _renderConYear(document.getElementById('consistencyContent'));
}

function _renderConAllTime(el) {
  const completed = JSON.parse(localStorage.getItem('ll_completed_dates') || '[]');
  const currentYear = new Date().getFullYear();
  const years = new Set([currentYear]);
  completed.forEach(s => { const y = parseInt(s.slice(0,4)); if(!isNaN(y)) years.add(y); });
  const sortedYears = Array.from(years).sort();
  const counts = sortedYears.map(y => completed.filter(s => s.startsWith(String(y))).length);
  const maxCount = Math.max(...counts, 1);
  const total = counts.reduce((a,b)=>a+b,0);

  const bars = sortedYears.map((y, i) => {
    const c = counts[i];
    const isCurrent = y === currentYear;
    const h = Math.max(Math.round((c / maxCount) * 110), c > 0 ? 3 : 0);
    const shadow = isCurrent ? 'box-shadow:0 0 0 2px #61D2DA,0 0 12px rgba(97,210,218,0.4);' : '';
    return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:130px">
      <div style="font-size:10px;color:#61D2DA;font-weight:700;margin-bottom:4px;min-height:14px">${c > 0 ? c : ''}</div>
      <div style="width:100%;border-radius:5px 5px 2px 2px;background:linear-gradient(180deg,#61D2DA,#008089);min-height:${c>0?3:0}px;height:${h}px;${shadow}"></div>
      <div style="font-size:10px;color:var(--muted2);text-transform:uppercase;margin-top:8px;letter-spacing:0.5px">${y}</div>
    </div>`;
  }).join('');

  el.innerHTML = `
    <div style="font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:2px;color:var(--text);text-align:center;margin-bottom:14px">ALL TIME</div>
    <div style="display:flex;align-items:flex-end;gap:10px;height:130px">${bars}</div>
    <div style="margin-top:14px;display:flex;align-items:baseline;gap:6px;justify-content:center">
      <span style="font-family:'Bebas Neue',sans-serif;font-size:24px;color:var(--text)">${total}</span>
      <span style="font-size:12px;color:var(--muted)">total sessions logged</span>
    </div>`
}

function renderCycleProgress() {
  const el = document.getElementById('dash-cycle-card');
  if(!el) return;
  if(!activePlan || !PROGRAMS[activePlan]) { el.style.display = 'none'; return; }
  el.style.display = '';
  const plan = getActivePlan();
  const totalWeeks = plan.weeks || TOTAL_WEEKS;
  const daysPerWeek = plan.days || DAYS;
  let completedWeeks = 0;
  let totalSessions = 0;
  for(let w = 1; w <= totalWeeks; w++) {
    let wCount = 0;
    for(let d = 1; d <= daysPerWeek; d++) {
      if(getLog(w, d)?.saved) { wCount++; totalSessions++; }
    }
    if(wCount >= daysPerWeek) completedWeeks++;
  }
  const pct = Math.round((completedWeeks / totalWeeks) * 100);
  const canvasId = 'cycle-chart-canvas';
  el.innerHTML = `
    <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:12px">Cycle Progress</div>
    <div style="position:relative;width:140px;height:140px;margin:0 auto 12px">
      <canvas id="${canvasId}"></canvas>
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:42px;color:var(--text);line-height:1;letter-spacing:0.5px">${pct}%</div>
      </div>
    </div>
    <div style="text-align:center;font-size:12px;color:var(--muted)">Week ${currentWeek} of ${totalWeeks} · ${totalSessions} sessions</div>`;
  if(window._cycleChart) { try{ window._cycleChart.destroy(); }catch(e){} window._cycleChart = null; }
  const ctx = document.getElementById(canvasId)?.getContext('2d');
  if(!ctx || typeof Chart === 'undefined') return;
  const remaining = Math.max(totalWeeks - completedWeeks, 0);
  window._cycleChart = new Chart(ctx, {
    type: 'doughnut',
    data: { datasets: [{ data: [completedWeeks || 0.001, remaining || 0.001], backgroundColor: ['#008089', '#2e2e2e'], borderWidth: 0, hoverOffset: 0 }] },
    options: { responsive: true, maintainAspectRatio: true, cutout: '76%',
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      animation: { duration: 600 } }
  });
}

function renderVolumeProgression() {
  const el = document.getElementById('dash-volume-card');
  if(!el) return;
  if(!activePlan || !PROGRAMS[activePlan]) { el.innerHTML = ''; return; }
  const plan = getActivePlan();
  const totalWeeks = plan.weeks || TOTAL_WEEKS;
  const lifts = MAIN_LIFTS;
  const weeklyData = {};
  lifts.forEach(l => { weeklyData[l] = []; });
  const weekLabels = [];
  for(let w = 1; w <= totalWeeks; w++) {
    weekLabels.push('W' + w);
    lifts.forEach(l => {
      let vol = 0;
      for(let d = 1; d <= (plan.days || DAYS); d++) {
        const e = getLog(w, d);
        if(e?.saved && e.lift === l) vol += (parseFloat(e.sets)||0)*(parseFloat(e.reps)||0)*(parseFloat(e.load)||0);
      }
      weeklyData[l].push(vol > 0 ? vol : null);
    });
  }
  const VOLUME_LIFT_COLORS = {'Back Squat':'#61D2DA','Bench Press':'#FF6B6B','Deadlift':'#FFD166','Overhead Press':'#A78BFA','Shoulder Press':'#A78BFA'};
  const canvasId = 'volume-prog-canvas';
  const legendHtml = lifts.map(l => {
    const color = VOLUME_LIFT_COLORS[l] || LIFT_COLORS[l] || '#61D2DA';
    return `<div style="display:flex;align-items:center;gap:5px"><div style="width:8px;height:8px;border-radius:50%;background:${color};flex-shrink:0"></div><span style="font-size:10px;color:var(--muted)">${l}</span></div>`;
  }).join('');
  el.innerHTML = `
    <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:10px">Volume Progression</div>
    <div style="height:180px;position:relative"><canvas id="${canvasId}"></canvas></div>
    <div style="display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:10px">${legendHtml}</div>`;
  if(window._volumeChart) { try{ window._volumeChart.destroy(); }catch(e){} window._volumeChart = null; }
  const ctx = document.getElementById(canvasId)?.getContext('2d');
  if(!ctx || typeof Chart === 'undefined') return;
  const datasets = lifts.map((l, i) => ({
    label: l, data: weeklyData[l],
    borderColor: VOLUME_LIFT_COLORS[l] || LIFT_COLORS[l] || '#61D2DA',
    backgroundColor: 'transparent',
    borderWidth: 2, tension: 0.4,
    pointRadius: 2.5, pointBackgroundColor: VOLUME_LIFT_COLORS[l] || LIFT_COLORS[l] || '#61D2DA',
    spanGaps: false
  }));
  window._volumeChart = new Chart(ctx, {
    type: 'line',
    data: { labels: weekLabels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: document.body.classList.contains('light') ? '#6b6c75' : '#55565f', font: { size: 9, weight: '700' } }, border: { display: false } },
        y: { display: false }
      }
    }
  });
}

function renderActivityMetrics() {
  const el = document.getElementById('dash-activity-card');
  if(!el) return;
  const completed = JSON.parse(localStorage.getItem('ll_completed_dates') || '[]');
  const today = new Date();
  function lStr(d) {
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }
  function countInRange(s, e) { return completed.filter(d => d >= s && d <= e).length; }
  // This Week: Monday–Sunday
  const dow = (today.getDay() + 6) % 7; // Mon=0, Sun=6
  const monDate = new Date(today); monDate.setDate(today.getDate() - dow);
  const sunDate = new Date(monDate); sunDate.setDate(monDate.getDate() + 6);
  // This Month: 1st to today
  const thisMonthFirst = new Date(today.getFullYear(), today.getMonth(), 1);
  // Last Month: 1st to last day of previous month
  const lastMonthLast = new Date(today.getFullYear(), today.getMonth(), 0);
  const lastMonthFirst = new Date(lastMonthLast.getFullYear(), lastMonthLast.getMonth(), 1);
  const thisWeek = countInRange(lStr(monDate), lStr(sunDate));
  const thisMonth = countInRange(lStr(thisMonthFirst), lStr(today));
  const lastMonth = countInRange(lStr(lastMonthFirst), lStr(lastMonthLast));
  el.innerHTML = `
    <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:10px">Activity</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${[['THIS WEEK',thisWeek],['LAST MONTH',lastMonth],['THIS MONTH',thisMonth]].map(([lbl,val])=>`
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted)">${lbl}</span>
          <span style="font-family:'Bebas Neue',sans-serif;font-size:24px;color:var(--accent);line-height:1">${val}</span>
        </div>`).join('')}
    </div>`;
}

function autoOpenNextDay() {
  if(!activePlan || !PROGRAMS[activePlan]) return;
  for(let d=1;d<=DAYS;d++) {
    const e = getLog(currentWeek, d);
    if(!e?.saved && !e?.skipped) {
      for(let i=1;i<=DAYS;i++) document.getElementById(`dc-${i}`)?.classList.remove('open');
      const card = document.getElementById(`dc-${d}`);
      if(card) {
        card.classList.add('open');
        setTimeout(() => card.scrollIntoView({behavior:'smooth', block:'start'}), 150);
      }
      break;
    }
  }
}

function showSet1RM(d, lift) {
  const panel = document.getElementById('d' + d + '-1rm-panel');
  if(panel) panel.style.display = panel.style.display === 'none' ? '' : 'none';
}

function saveSet1RM(d, lift) {
  const input = document.getElementById('d' + d + '-1rm-val');
  if(!input || !input.value) return;
  const val = parseFloat(input.value);
  if(!val || val <= 0) { showToast('Enter a valid 1RM'); return; }
  const key = lift.replace(/ /g,'_');
  if(!localStorage.getItem('ll_first_pr_' + key)) {
    localStorage.setItem('ll_first_pr_' + key, String(val));
  }
  const hist = JSON.parse(localStorage.getItem('ll_pr_history_' + key) || '[]');
  hist.push({ load: val, date: Date.now() });
  localStorage.setItem('ll_pr_history_' + key, JSON.stringify(hist));
  setupData[lift] = val;
  localStorage.setItem('ll_setup', JSON.stringify(setupData));
  showToast(lift + ' 1RM saved');
  // Re-render just this day's body without closing the card
  const presc = getPrescription(currentWeek, lift, d);
  const saved = getLog(currentWeek, d);
  const dayCard = document.getElementById('dc-' + d);
  if(dayCard) {
    const bodyInner = dayCard.querySelector('.day-card-body-content');
    if(bodyInner) bodyInner.innerHTML = `<div class="day-check" style="display:none"></div>` + (lift ? `<div class="day-lift-name">${lift}</div>` : '') + buildSessionView(d, lift, presc, saved, saved && saved.saved, saved && saved.skipped || false);
  }
}

function show1RMModal(d, lift) {
  document.getElementById('oneRM-modal-overlay')?.remove();
  const existing = setupData[lift] || 0;
  const key = lift.replace(/ /g,'_');
  const u = weightUnit();
  const overlay = document.createElement('div');
  overlay.id = 'oneRM-modal-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:600;background:rgba(0,0,0,0.82);display:flex;align-items:center;justify-content:center;padding:1.5rem;opacity:0;transition:opacity 0.2s ease;';
  overlay.innerHTML = `
    <div id="oneRM-modal-card" style="background:var(--surface);border-radius:var(--r);padding:1.5rem;width:100%;max-width:360px;transform:scale(0.95);transition:transform 0.2s ease;">
      <div style="font-family:'Geist',sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--muted);margin-bottom:4px">${lift}</div>
      <div style="font-family:'Bebas Neue','Geist',sans-serif;font-size:26px;letter-spacing:1px;color:var(--text);margin-bottom:${existing?'6px':'1.25rem'}">1 Rep Max</div>
      ${existing ? `<div style="font-size:32px;font-family:'Bebas Neue','Geist',sans-serif;color:var(--accent);margin-bottom:1.25rem;line-height:1">${existing} <span style="font-size:16px;color:var(--muted)">${u}</span></div>` : ''}
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:1rem">
        <input type="number" min="0" step="2.5" placeholder="Enter your 1RM" id="oneRM-input-${d}"
          value="${existing || ''}"
          style="flex:1;padding:10px 12px;font-size:16px;font-family:'Geist',sans-serif;border:1px solid var(--border2);background:var(--surface2);color:var(--text);border-radius:var(--rs);outline:none;-webkit-appearance:none;appearance:none" />
        <span style="font-size:13px;color:var(--muted);flex-shrink:0">${u}</span>
      </div>
      <div style="background:var(--surface2);border-radius:var(--rs);padding:10px 12px;margin-bottom:1rem;border:1px solid var(--border)">
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:8px">Don't know? Calculate it</div>
        <div style="display:flex;align-items:center;gap:6px">
          <input type="number" min="0" step="2.5" placeholder="Weight (${u})" id="oneRM-calc-w-${d}"
            style="flex:1;min-width:80px;padding:8px 10px;font-size:14px;font-family:'Geist',sans-serif;border:1px solid var(--border2);background:var(--surface);color:var(--text);border-radius:var(--rs);outline:none;-webkit-appearance:none;appearance:none" />
          <input type="number" min="1" max="30" placeholder="Reps" id="oneRM-calc-r-${d}"
            style="width:68px;padding:8px 10px;font-size:14px;font-family:'Geist',sans-serif;border:1px solid var(--border2);background:var(--surface);color:var(--text);border-radius:var(--rs);outline:none;-webkit-appearance:none;appearance:none" />
          <button onclick="calc1RMModal(${d})" style="padding:8px 12px;font-family:'Geist',sans-serif;font-size:13px;font-weight:700;letter-spacing:0.5px;border:1px solid var(--border2);background:var(--surface3);color:var(--text);border-radius:var(--rs);cursor:pointer;flex-shrink:0">Calc</button>
        </div>
        <div id="oneRM-calc-result-${d}" style="font-size:12px;color:var(--accent);margin-top:6px;min-height:16px"></div>
      </div>
      <button onclick="save1RMModal(${d},'${lift}')" style="width:100%;padding:13px;font-family:'Geist',sans-serif;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:var(--rs);border:1px solid var(--accent);background:var(--accent);color:#111;cursor:pointer;margin-bottom:10px">Save</button>
      <div onclick="close1RMModal()" style="text-align:center;font-size:13px;color:var(--muted);cursor:pointer;padding:4px 0;user-select:none">Cancel</div>
    </div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
    const card = document.getElementById('oneRM-modal-card');
    if(card) card.style.transform = 'scale(1)';
  });
  overlay.addEventListener('click', e => { if(e.target === overlay) close1RMModal(); });
}

function calc1RMModal(d) {
  const w = parseFloat(document.getElementById('oneRM-calc-w-' + d)?.value);
  const r = parseFloat(document.getElementById('oneRM-calc-r-' + d)?.value);
  const result = document.getElementById('oneRM-calc-result-' + d);
  if(!w || !r || r < 1) { if(result) result.textContent = 'Enter weight and reps above'; return; }
  const est = Math.round((w * (1 + r / 30)) / 2.5) * 2.5;
  if(result) result.innerHTML = `Est. 1RM: <strong>${est} ${weightUnit()}</strong> &nbsp;·&nbsp; <span onclick="document.getElementById('oneRM-input-${d}').value=${est}" style="color:var(--accent);cursor:pointer;text-decoration:underline;text-underline-offset:2px">Use this</span>`;
}

function close1RMModal() {
  const overlay = document.getElementById('oneRM-modal-overlay');
  if(!overlay) return;
  overlay.style.opacity = '0';
  setTimeout(() => overlay.remove(), 200);
}

function save1RMModal(d, lift) {
  const input = document.getElementById('oneRM-input-' + d);
  if(!input || !input.value) { showToast('Enter a 1RM value'); return; }
  const val = parseFloat(input.value);
  if(!val || val <= 0) { showToast('Enter a valid 1RM'); return; }
  const key = lift.replace(/ /g,'_');
  if(!localStorage.getItem('ll_first_pr_' + key)) {
    localStorage.setItem('ll_first_pr_' + key, String(val));
  }
  const hist = JSON.parse(localStorage.getItem('ll_pr_history_' + key) || '[]');
  const prev = setupData[lift];
  if(val !== prev) {
    hist.push({ load: val, date: Date.now() });
    localStorage.setItem('ll_pr_history_' + key, JSON.stringify(hist));
  }
  setupData[lift] = val;
  localStorage.setItem('ll_setup', JSON.stringify(setupData));
  close1RMModal();
  showToast(lift + ' 1RM saved');
  const presc = getPrescription(currentWeek, lift, d);
  const saved = getLog(currentWeek, d);
  const dayCard = document.getElementById('dc-' + d);
  if(dayCard) {
    const bodyInner = dayCard.querySelector('.day-card-body-content');
    if(bodyInner) bodyInner.innerHTML = (lift ? `<div class="day-lift-name">${lift}</div>` : '') + buildSessionView(d, lift, presc, saved, saved && saved.saved, saved && (saved.skipped || false));
  }
}

function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}




function resetSaveBtn(d) {
  // no-op in new session view
}

// THEME TOGGLE
function _updateHeaderThemeIcon(isLight) {
  const sun = document.getElementById('header-icon-sun');
  const moon = document.getElementById('header-icon-moon');
  if(sun) sun.style.display = isLight ? 'none' : '';
  if(moon) moon.style.display = isLight ? '' : 'none';
}
function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  localStorage.setItem('ll_theme', isLight ? 'light' : 'dark');
  _updateHeaderThemeIcon(isLight);
}
function initTheme() {
  const saved = localStorage.getItem('ll_theme');
  const isDark = saved !== 'light';
  if(!isDark) document.body.classList.add('light');
  else document.body.classList.remove('light');
  _updateHeaderThemeIcon(!isDark);
}

// CYCLE PROGRESS BAR
function updateProgressBar() {
  const totalWeeks = TOTAL_WEEKS;
  const doneWeeks = Array.from({length: totalWeeks}, (_, i) => weekDone(i+1) === DAYS ? 1 : 0).reduce((a,b) => a+b, 0);
  const pct = Math.round((doneWeeks / totalWeeks) * 100);
  document.getElementById('progress-label').textContent = `Week ${currentWeek} of ${totalWeeks} · ${doneWeeks} complete`;
  document.getElementById('progress-pct').textContent = `${pct}%`;
  document.getElementById('progress-fill').style.width = pct + '%';
}

// PR CELEBRATION
function checkPR(lift, load) {
  // Celebrate only if load exceeds current saved PR (setupData)
  const currentPR = setupData[lift] || 0;
  return load > currentPR ? load : null;
}

function showPRCelebration(lift, load) {
  document.getElementById('pr-lift-name').textContent = lift;
  document.getElementById('pr-subtitle').textContent = `${load} ${weightUnit()}`;
  // Update PR in setupData
  if(load > (setupData[lift] || 0)) {
    setupData[lift] = load;
    localStorage.setItem('ll_setup', JSON.stringify(setupData));
  }
  const cel = document.getElementById('pr-celebration');
  cel.classList.add('show');
  launchConfetti();
  if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
  // Mark shimmer for PR card
  window._pendingPRShimmer = lift.replace(/ /g,'_');
  setTimeout(() => closePRCelebration(), 4000);
}

function closePRCelebration() {
  document.getElementById('pr-celebration').classList.remove('show');
}

function launchConfetti() {
  const wrap = document.getElementById('confetti-wrap');
  wrap.innerHTML = '';
  const colors = ['#008089','#61D2DA','#5ddb8a','#00A670','#45E3B0','#ffffff'];
  for(let i=0; i<40; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `
      left: ${Math.random()*100}%;
      top: -10px;
      background: ${colors[Math.floor(Math.random()*colors.length)]};
      animation-delay: ${Math.random()*0.8}s;
      animation-duration: ${1.2 + Math.random()*0.8}s;
      width: ${6 + Math.random()*6}px;
      height: ${6 + Math.random()*6}px;
    `;
    wrap.appendChild(el);
  }
}

// HAPTIC FEEDBACK
function haptic(pattern) {
  if (navigator.vibrate) navigator.vibrate(pattern || 50);
}

// COUNTING ANIMATION
function animateCount(el, to, dur, fmt) {
  if(!el || to === 0) { if(el) el.textContent = fmt ? fmt(0) : '0'; return; }
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val = Math.round(to * ease);
    el.textContent = fmt ? fmt(val) : val;
    if(t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// KEYBOARD AUTO-ADVANCE
function setupAutoAdvance() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const inputs = Array.from(document.querySelectorAll('.presc-input, .acc-input'));
      const idx = inputs.indexOf(document.activeElement);
      if (idx >= 0 && idx < inputs.length - 1) {
        e.preventDefault();
        inputs[idx + 1].focus();
        inputs[idx + 1].select();
      }
    }
  });
}

// Splash screen - hide app content until splash done
setTimeout(() => {
  const splash = document.getElementById('splash');
  splash.classList.add('removed');
  document.body.classList.remove('splash-active');
}, 5000);

const s=document.createElement('script');
s.src='https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
s.onload=init;document.head.appendChild(s);