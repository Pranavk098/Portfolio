/* ── STARFIELD / SKY — dark & light mode ────────────────────── */
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let W, H, stars = [];
let lightMode = false;
let clouds = [];
let windT = 0;
const STAR_N = 260;
const FOV    = 380;
const WARP   = 0.00055;   // reduced — calmer warp speed
let mouse = { x: 0, y: 0 };

/* — Stars — */
function newStar(randomZ) {
  return {
    x:   (Math.random() - 0.5) * 2,
    y:   (Math.random() - 0.5) * 2,
    z:   randomZ ? Math.random() * 0.9 + 0.1 : 1,
    hue: Math.random() < .06 ? 'gold' : Math.random() < .06 ? 'cyan' : 'white',
  };
}

/* — Clouds — */
function newCloud(xRandom) {
  return {
    x:      xRandom ? Math.random() * (W + 400) - 200 : -250,
    // Keep clouds in the upper sky — max 42% down the hero (Mario style)
    y:      30 + Math.random() * (H * 0.42),
    scaleX: 1.0 + Math.random() * 1.3,
    scaleY: 0.55 + Math.random() * 0.5,
    speed:  0.10 + Math.random() * 0.22,
    alpha:  0.62 + Math.random() * 0.35,
    far:    Math.random() < 0.38,
  };
}

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  if (!stars.length)  stars  = Array.from({length: STAR_N}, () => newStar(true));
  if (!clouds.length) clouds = Array.from({length: 10},     () => newCloud(true));
}

/* — Draw a single cloud puff cluster — */
function drawSingleCloud(x, y, sx, sy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = 'rgba(255,255,255,0.93)';
  const puffs = [
    [ 0,  0, 42], [-38, 13, 28], [38, 13, 28],
    [-20,-19, 23], [20,-19, 21], [ 0,-27, 18],
    [-54, 18, 20], [54, 18, 20],
  ];
  puffs.forEach(([px, py, r]) => {
    ctx.beginPath();
    ctx.arc(x + px*sx, y + py*sy, r * Math.min(sx, sy), 0, Math.PI*2);
    ctx.fill();
  });
  // Soft bottom shadow tint
  ctx.fillStyle = 'rgba(160,205,238,0.28)';
  [[0,14,30],[-22,16,22],[22,16,22]].forEach(([px, py, r]) => {
    ctx.beginPath();
    ctx.arc(x + px*sx, y + py*sy, r * Math.min(sx, sy) * 0.7, 0, Math.PI*2);
    ctx.fill();
  });
  ctx.restore();
}

/* — Star draw pass — */
function drawStars() {
  ctx.fillStyle = 'rgba(4,4,14,0.38)';
  ctx.fillRect(0, 0, W, H);
  const cx = W/2, cy = H/2;
  const mx = (mouse.x - cx) / cx * 0.25;
  const my = (mouse.y - cy) / cy * 0.25;
  stars.forEach(s => {
    const pz = s.z;
    s.z -= WARP;
    if (s.z <= 0.01) { Object.assign(s, newStar(false)); return; }
    const sx  = (s.x + mx*s.z) / s.z * FOV + cx;
    const sy  = (s.y + my*s.z) / s.z * FOV + cy;
    const spx = (s.x + mx*pz)  / pz  * FOV + cx;
    const spy = (s.y + my*pz)  / pz  * FOV + cy;
    if (sx < -20 || sx > W+20 || sy < -20 || sy > H+20) { Object.assign(s, newStar(false)); return; }
    const bright = Math.min(1, (1 - s.z) * 1.4);
    const thick  = Math.max(0.3, (1 - s.z) * 2.2);
    const col = s.hue==='gold' ? `rgba(255,215,0,${bright})`
              : s.hue==='cyan' ? `rgba(0,229,255,${bright})`
              :                  `rgba(255,255,255,${bright})`;
    ctx.beginPath(); ctx.moveTo(spx, spy); ctx.lineTo(sx, sy);
    ctx.strokeStyle = col; ctx.lineWidth = thick; ctx.stroke();
    ctx.beginPath(); ctx.arc(sx, sy, thick*0.7, 0, Math.PI*2);
    ctx.fillStyle = col; ctx.fill();
  });
}

/* — Cloud/sky draw pass — */
function drawClouds() {
  // Sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0,    '#3a80cc');
  sky.addColorStop(0.38, '#5da8e0');
  sky.addColorStop(0.72, '#8dc6ef');
  sky.addColorStop(1,    '#c8e8f8');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Wind streak lines — restricted to upper sky area
  windT += 0.28;
  ctx.save();
  // Two passes: fast thin streaks + slower wide streaks for layered wind feel
  const skyH = H * 0.55; // wind only in upper 55% of hero
  for (let pass = 0; pass < 2; pass++) {
    ctx.strokeStyle = pass === 0
      ? 'rgba(255,255,255,0.16)'
      : 'rgba(255,255,255,0.07)';
    ctx.lineWidth = pass === 0 ? 1 : 1.8;
    const count = pass === 0 ? 14 : 7;
    for (let i = 0; i < count; i++) {
      const baseY = (i / count) * skyH;
      const len   = (pass === 0 ? 48 : 90) + Math.sin(windT * 0.09 + i) * 30;
      const spd   = pass === 0 ? (18 + i * 3.2) : (10 + i * 2.4);
      const startX = ((windT * spd) % (W + 280)) - 140;
      ctx.beginPath();
      ctx.moveTo(startX, baseY + Math.sin(windT * 0.05 + i) * 8);
      ctx.lineTo(startX + len, baseY + Math.sin(windT * 0.05 + i + 0.5) * 8);
      ctx.stroke();
    }
  }
  ctx.restore();

  // Clouds — far layers first
  clouds.sort((a, b) => (a.far ? 0 : 1) - (b.far ? 0 : 1));
  clouds.forEach(c => {
    const spd = c.far ? c.speed * 0.42 : c.speed;
    c.x += spd;
    if (c.x > W + 260) c.x = -260;
    const al = c.far ? c.alpha * 0.5  : c.alpha;
    const sx = c.far ? c.scaleX * 0.65 : c.scaleX;
    const sy = c.far ? c.scaleY * 0.65 : c.scaleY;
    drawSingleCloud(c.x, c.y, sx, sy, al);
  });
}

/* — Main dispatch loop — */
function draw() {
  if (lightMode) drawClouds();
  else           drawStars();
  requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
resize();
draw();

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); });
}, { threshold: 0.08 });
reveals.forEach(el => revObs.observe(el));

/* ── SKILL CARDS — subtle entry animation ───────────────────── */
document.querySelectorAll('.tc').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateX(-8px)';
  el.style.transition = `opacity .5s ${i * 0.04}s ease, transform .5s ${i * 0.04}s ease`;
});
const tcObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateX(0)';
      tcObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.tc').forEach(el => tcObs.observe(el));

/* ── RADAR SCANNER ──────────────────────────────────────────── */
(function() {
  const rc = document.getElementById('radar');
  if (!rc) return;
  const rx = rc.getContext('2d');
  let angle = 0;
  // Persistent blips: {a: angle_rad, r: radius_fraction, life: 0-1, decay}
  const blips = [
    {a:0.4,  r:.52, life:1, decay:.0018},
    {a:1.1,  r:.31, life:.7,decay:.0014},
    {a:2.3,  r:.68, life:.9,decay:.0016},
    {a:3.8,  r:.42, life:.5,decay:.0012},
    {a:4.5,  r:.75, life:.8,decay:.0020},
    {a:5.1,  r:.22, life:.6,decay:.0015},
    {a:0.9,  r:.60, life:.4,decay:.0013},
    {a:3.2,  r:.38, life:.85,decay:.0017},
  ];
  const RINGS = 4;
  const G = '#39ff14';

  function sz() {
    const s = rc.parentElement.clientWidth;
    rc.width = s; rc.height = s;
  }

  function drawRadar() {
    sz();
    const s = rc.width;
    const cx = s/2, cy = s/2, R = s*0.44;
    rx.clearRect(0,0,s,s);

    // Background glow centre
    const grd = rx.createRadialGradient(cx,cy,0,cx,cy,R);
    grd.addColorStop(0,'rgba(57,255,20,.06)');
    grd.addColorStop(1,'rgba(57,255,20,0)');
    rx.fillStyle=grd; rx.beginPath(); rx.arc(cx,cy,R,0,Math.PI*2); rx.fill();

    // Concentric rings
    for(let i=1;i<=RINGS;i++){
      rx.beginPath();
      rx.arc(cx,cy,(R/RINGS)*i,0,Math.PI*2);
      rx.strokeStyle=`rgba(57,255,20,${.06+i*.025})`;
      rx.lineWidth=.8; rx.stroke();
    }

    // Cross-hairs
    rx.strokeStyle='rgba(57,255,20,.12)'; rx.lineWidth=.6;
    rx.beginPath(); rx.moveTo(cx-R,cy); rx.lineTo(cx+R,cy); rx.stroke();
    rx.beginPath(); rx.moveTo(cx,cy-R); rx.lineTo(cx,cy+R); rx.stroke();

    // Diagonal lines
    rx.strokeStyle='rgba(57,255,20,.05)'; rx.lineWidth=.5;
    const d = R*0.707;
    rx.beginPath(); rx.moveTo(cx-d,cy-d); rx.lineTo(cx+d,cy+d); rx.stroke();
    rx.beginPath(); rx.moveTo(cx+d,cy-d); rx.lineTo(cx-d,cy+d); rx.stroke();

    // Sweep trail (gradient cone behind sweep)
    const sweepGrd = rx.createConicalGradient
      ? null : null; // fallback: use arc fill
    const TRAIL = Math.PI * .52;
    rx.save();
    rx.translate(cx,cy);
    // Draw trail as gradient arc sectors
    const steps = 30;
    for(let i=0;i<steps;i++){
      const t = i/steps;
      const a0 = angle - TRAIL*(1-t);
      const a1 = angle - TRAIL*(1-(i+1)/steps);
      rx.beginPath();
      rx.moveTo(0,0);
      rx.arc(0,0,R,a0,a1);
      rx.closePath();
      rx.fillStyle=`rgba(57,255,20,${t*.08})`;
      rx.fill();
    }
    // Sweep line
    rx.beginPath();
    rx.moveTo(0,0);
    rx.lineTo(Math.cos(angle)*R, Math.sin(angle)*R);
    rx.strokeStyle='rgba(57,255,20,.85)';
    rx.lineWidth=1.5;
    rx.stroke();
    rx.restore();

    // Decay & draw blips
    blips.forEach(b=>{
      b.life -= b.decay;
      if(b.life<=0) b.life=0;
      // re-trigger if sweep passes over blip angle
      const diff = ((angle - b.a) % (Math.PI*2) + Math.PI*2) % (Math.PI*2);
      if(diff<0.08) b.life=1;

      if(b.life>0){
        const bx = cx + Math.cos(b.a)*R*b.r;
        const by = cy + Math.sin(b.a)*R*b.r;
        const al = b.life*.9;
        rx.beginPath();
        rx.arc(bx,by,2.5,0,Math.PI*2);
        rx.fillStyle=`rgba(57,255,20,${al})`;
        rx.fill();
        // Glow halo
        const g2 = rx.createRadialGradient(bx,by,0,bx,by,10);
        g2.addColorStop(0,`rgba(57,255,20,${al*.6})`);
        g2.addColorStop(1,'rgba(57,255,20,0)');
        rx.fillStyle=g2; rx.beginPath(); rx.arc(bx,by,10,0,Math.PI*2); rx.fill();
      }
    });

    // "PK" callsign in centre
    rx.font=`700 ${s*.12}px 'Orbitron',monospace`;
    rx.textAlign='center'; rx.textBaseline='middle';
    rx.fillStyle='rgba(57,255,20,.18)';
    rx.fillText('PK',cx,cy);

    // outer ring tick marks
    rx.strokeStyle='rgba(57,255,20,.25)'; rx.lineWidth=1;
    for(let i=0;i<36;i++){
      const a=i*(Math.PI*2/36);
      const r0=R*.94, r1=i%3===0?R*1.0:R*.97;
      rx.beginPath();
      rx.moveTo(cx+Math.cos(a)*r0, cy+Math.sin(a)*r0);
      rx.lineTo(cx+Math.cos(a)*r1, cy+Math.sin(a)*r1);
      rx.stroke();
    }

    angle += 0.022;
    if(angle>Math.PI*2) angle-=Math.PI*2;
    requestAnimationFrame(drawRadar);
  }
  drawRadar();
})();

const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  navAs.forEach(a => {
    const active = a.getAttribute('href') === '#' + cur;
    a.style.color = active ? 'var(--cyan)' : '';
  });
}, { passive: true });

/* ── SCROLL PROGRESS ────────────────────────────────────────── */
const prog = document.getElementById('scroll-prog');
window.addEventListener('scroll', () => {
  if (!prog) return;
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  prog.style.width = pct + '%';
}, { passive: true });

/* ── CURSOR RING (lagging ring, native cursor stays visible) ── */
const ring = document.getElementById('cursor-ring');
let rx2 = -200, ry2 = -200, rtx = -200, rty = -200;
document.addEventListener('mousemove', e => { rtx = e.clientX; rty = e.clientY; });
(function animRing() {
  rx2 += (rtx - rx2) * 0.10;
  ry2 += (rty - ry2) * 0.10;
  if (ring) { ring.style.left = rx2 + 'px'; ring.style.top = ry2 + 'px'; }
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.btn,.proj-card,.itag,.tl-item,.hud-item').forEach(el => {
  el.addEventListener('mouseenter', () => ring && ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring && ring.classList.remove('hover'));
});

/* ── CURSOR SPARK PARTICLES ─────────────────────────────────── */
(function() {
  const sc = document.getElementById('spark-canvas');
  if (!sc) return;
  const sctx = sc.getContext('2d');
  let sparks = [], lastX = 0, lastY = 0;

  function resizeSC() { sc.width = window.innerWidth; sc.height = window.innerHeight; }
  window.addEventListener('resize', resizeSC); resizeSC();

  document.addEventListener('mousemove', e => {
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    const speed = Math.sqrt(dx*dx + dy*dy);
    lastX = e.clientX; lastY = e.clientY;
    if (speed < 4) return;
    const count = Math.min(Math.floor(speed / 5), 6);
    for (let i = 0; i < count; i++) {
      sparks.push({
        x: e.clientX + (Math.random()-0.5)*6,
        y: e.clientY + (Math.random()-0.5)*6,
        vx: (Math.random()-0.5)*3.5 - dx*0.08,
        vy: (Math.random()-0.5)*3.5 - dy*0.08,
        life: 1,
        size: Math.random()*2+0.5,
        gold: Math.random() < 0.25,
      });
    }
  });

  function animSparks() {
    sctx.clearRect(0, 0, sc.width, sc.height);
    sparks = sparks.filter(s => {
      s.x  += s.vx; s.y  += s.vy;
      s.vy += 0.09;
      s.vx *= 0.97;
      s.life -= 0.048;
      if (s.life <= 0) return false;
      sctx.beginPath();
      sctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI*2);
      sctx.fillStyle = s.gold
        ? `rgba(255,215,0,${s.life})`
        : `rgba(255,24,1,${s.life})`;
      sctx.fill();
      return true;
    });
    requestAnimationFrame(animSparks);
  }
  animSparks();
})();

/* ── SCROLL PARALLAX ────────────────────────────────────────── */
(function() {
  const heroInner = document.querySelector('.hero-inner');
  const scrollHint = document.querySelector('.scroll-hint');

  function onScroll() {
    const sy = window.scrollY;
    if (heroInner) heroInner.style.transform = `translateY(${sy * 0.28}px)`;
    if (scrollHint) scrollHint.style.opacity = Math.max(0, 1 - sy / 200);

    // Subtle background parallax on alternate sections
    document.querySelectorAll('section').forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const offset = rect.top * 0.06;
      sec.style.backgroundPositionY = `${offset}px`;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── HAMBURGER MENU ─────────────────────────────────────────── */
const ham = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');
function toggleMenu(open) {
  ham && ham.classList.toggle('open', open);
  mobileMenu && mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
ham && ham.addEventListener('click', () => toggleMenu(!mobileMenu.classList.contains('open')));
mobileClose && mobileClose.addEventListener('click', () => toggleMenu(false));
document.querySelectorAll('.mob-link').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

/* ── TYPEWRITER HERO LABEL ──────────────────────────────────── */
(function() {
  const el = document.getElementById('hero-label');
  if (!el) return;
  const txt = '// MISSION CONTROL · SYSTEM ONLINE';
  let i = 0;
  const t = setInterval(() => {
    el.textContent = txt.slice(0, ++i);
    if (i >= txt.length) clearInterval(t);
  }, 38);
})();

/* ── F1 PIXEL GAME — MONACO-STYLE CIRCUIT ───────────────────── */
(function() {
  const gc = document.getElementById('f1-game');
  if (!gc) return;
  const gx = gc.getContext('2d');

  const GW = gc.width, GH = gc.height;
  const TRACK_W = 34;   // full track width px
  const HALF_W  = TRACK_W / 2;

  // ── Circuit centerline waypoints (Monaco-inspired) ──────────
  const WP = [
    // S/F line → main straight (going RIGHT along top)
    [80,  46], [160, 40], [255, 40], [335, 40],
    // Turn 1 complex — sweeping right
    [375, 46], [400, 64], [404, 90],
    // Chicane (right side) — quick right-left
    [396, 112], [376, 126], [354, 118],
    // Turn 4 entry → fast right
    [332, 138], [334, 162], [362, 178],
    // Turns 5-6 (right side going down)
    [396, 192], [410, 218],
    // Loews hairpin (tight 180° — bottom right)
    [412, 242], [395, 260], [368, 268], [338, 268],
    // Swimming pool section (bottom)
    [300, 264], [258, 260], [220, 256],
    // Back section — left and up
    [183, 248], [148, 238], [118, 218],
    // Tunnel/esses — left side going up
    [90,  196], [72,  170], [84,  145],
    // Portier-style left
    [60,  120], [52,  94], [62,  68],
    // Anthony Noghes — final right back to S/F
    [72,  50],
  ];
  const N = WP.length;

  // ── Pre-sample path for collision detection ──────────────────
  function samplePath(numPts) {
    const pts = [];
    for (let i = 0; i < numPts; i++) {
      const t = i / numPts;
      const total = N;
      const seg = Math.floor(t * total) % total;
      const lt  = (t * total) - Math.floor(t * total);
      const p0  = WP[(seg - 1 + N) % N];
      const p1  = WP[seg];
      const p2  = WP[(seg + 1) % N];
      const m0x = (p0[0] + p1[0]) / 2, m0y = (p0[1] + p1[1]) / 2;
      const m1x = (p1[0] + p2[0]) / 2, m1y = (p1[1] + p2[1]) / 2;
      const u = 1 - lt;
      pts.push([
        u*u*m0x + 2*u*lt*p1[0] + lt*lt*m1x,
        u*u*m0y + 2*u*lt*p1[1] + lt*lt*m1y,
      ]);
    }
    return pts;
  }
  const SAMPLES = samplePath(600);
  const NS = SAMPLES.length;

  function closestPt(x, y) {
    let minD2 = Infinity, minI = 0;
    for (let i = 0; i < NS; i++) {
      const dx = x - SAMPLES[i][0], dy = y - SAMPLES[i][1];
      const d2 = dx*dx + dy*dy;
      if (d2 < minD2) { minD2 = d2; minI = i; }
    }
    return { dist: Math.sqrt(minD2), idx: minI };
  }

  // ── Car state ────────────────────────────────────────────────
  // Start on main straight, facing right
  const car = { x: 155, y: 40, vx: 1.6, vy: 0, angle: 0 };
  const trail = [];
  const TRAIL_MAX = 35;

  // ── Cursor tracking ──────────────────────────────────────────
  let prevMx = null, prevMy = null, mdx = 0, mdy = 0, hovering = false;
  gc.addEventListener('mouseenter', () => { hovering = true; prevMx = null; });
  gc.addEventListener('mouseleave', () => { hovering = false; mdx = 0; mdy = 0; });
  gc.addEventListener('mousemove', e => {
    const r  = gc.getBoundingClientRect();
    const mx = (e.clientX - r.left) * (GW / r.width);
    const my = (e.clientY - r.top)  * (GH / r.height);
    if (prevMx !== null) { mdx = mx - prevMx; mdy = my - prevMy; }
    prevMx = mx; prevMy = my;
  });

  // ── HUD ──────────────────────────────────────────────────────
  const lapEl    = document.getElementById('g-laps');
  const speedEl  = document.getElementById('g-speed');
  const statusEl = document.getElementById('g-status');
  let lapCount = 0, sfCrossed = false;
  const SF_X = 80;

  function checkLap() {
    const near = Math.abs(car.x - SF_X) < 6 && car.y > 33 && car.y < 55;
    if (near && car.vx > 0.4 && !sfCrossed) {
      lapCount++;
      sfCrossed = true;
      if (lapEl) lapEl.textContent = lapCount;
    }
    if (Math.abs(car.x - SF_X) > 18) sfCrossed = false;
  }

  // ── Draw track ───────────────────────────────────────────────
  function buildPath() {
    gx.beginPath();
    const s0x = (WP[N-1][0] + WP[0][0]) / 2, s0y = (WP[N-1][1] + WP[0][1]) / 2;
    gx.moveTo(s0x, s0y);
    for (let i = 0; i < N; i++) {
      const p  = WP[i];
      const nx = WP[(i + 1) % N];
      gx.quadraticCurveTo(p[0], p[1], (p[0]+nx[0])/2, (p[1]+nx[1])/2);
    }
    gx.closePath();
  }

  function drawKerbs() {
    // Red/white kerb strips at notable corners (painted over track borders)
    const kerbs = [
      { x:400, y:64,  a: Math.PI*0.35, l:22 },  // T1
      { x:376, y:126, a:-Math.PI*0.1,  l:16 },  // chicane left
      { x:354, y:118, a: Math.PI*0.1,  l:16 },  // chicane right
      { x:334, y:162, a: Math.PI*0.4,  l:18 },  // T4
      { x:395, y:260, a: Math.PI*0.55, l:22 },  // Loews hairpin apex
      { x:338, y:268, a: 0,            l:18 },  // Loews exit
      { x:60,  y:120, a:-Math.PI*0.2,  l:16 },  // Portier
      { x:62,  y:68,  a: Math.PI*0.15, l:16 },  // Anthony Noghes
    ];
    kerbs.forEach(k => {
      const segs = 6;
      for (let i = 0; i < segs; i++) {
        gx.save();
        gx.translate(k.x, k.y);
        gx.rotate(k.a);
        gx.fillStyle = i % 2 === 0 ? '#FF1801' : '#f0f0f0';
        gx.fillRect(-k.l/2 + i*(k.l/segs), -(HALF_W+1), k.l/segs, 5);
        gx.fillStyle = i % 2 === 0 ? '#f0f0f0' : '#FF1801';
        gx.fillRect(-k.l/2 + i*(k.l/segs),  (HALF_W-4), k.l/segs, 5);
        gx.restore();
      }
    });
  }

  function drawSF() {
    // Checkered start/finish bar across the track at x=SF_X, y≈40
    const sqH = 5;
    const rows = Math.ceil(TRACK_W / sqH);
    for (let i = 0; i < rows; i++) {
      gx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,.92)' : 'rgba(30,30,30,.85)';
      gx.fillRect(SF_X - 3, 40 - HALF_W + i * sqH, 6, sqH);
    }
    // "S/F" label
    gx.fillStyle = 'rgba(255,24,1,.5)';
    gx.font = "bold 7px 'DM Mono',monospace";
    gx.textAlign = 'center';
    gx.fillText('S/F', SF_X, 23);
  }

  function drawTrack() {
    // Grass
    gx.fillStyle = '#030f03';
    gx.fillRect(0, 0, GW, GH);

    // Pixel grid
    gx.strokeStyle = 'rgba(0,140,0,.03)';
    gx.lineWidth = 1;
    for (let i = 0; i < GW; i += 14) { gx.beginPath(); gx.moveTo(i,0); gx.lineTo(i,GH); gx.stroke(); }
    for (let j = 0; j < GH; j += 14) { gx.beginPath(); gx.moveTo(0,j); gx.lineTo(GW,j); gx.stroke(); }

    gx.lineJoin = 'round'; gx.lineCap = 'round';

    // Runoff zone (sandy/gravel)
    buildPath();
    gx.strokeStyle = '#14140e';
    gx.lineWidth = TRACK_W + 20;
    gx.stroke();

    // Outer white border
    buildPath();
    gx.strokeStyle = 'rgba(255,255,255,.72)';
    gx.lineWidth = TRACK_W + 3.5;
    gx.stroke();

    // Asphalt surface
    buildPath();
    gx.strokeStyle = '#252525';
    gx.lineWidth = TRACK_W;
    gx.stroke();

    // Inner white border (second white strip, then re-fill centre)
    buildPath();
    gx.strokeStyle = 'rgba(255,255,255,.55)';
    gx.lineWidth = TRACK_W - 3.5;
    gx.stroke();

    buildPath();
    gx.strokeStyle = '#252525';
    gx.lineWidth = TRACK_W - 7;
    gx.stroke();

    // Dashed centre line
    gx.setLineDash([10, 13]);
    buildPath();
    gx.strokeStyle = 'rgba(255,255,255,.07)';
    gx.lineWidth = 1;
    gx.stroke();
    gx.setLineDash([]);

    // Corner kerbs
    drawKerbs();

    // S/F line
    drawSF();

    // Circuit name watermark
    gx.fillStyle = 'rgba(255,24,1,.05)';
    gx.font = "bold 9px 'Orbitron',monospace";
    gx.textAlign = 'center'; gx.textBaseline = 'middle';
    gx.fillText('PK.AI CIRCUIT', GW * 0.5, GH * 0.65);
  }

  // ── Draw pixel F1 car (faces +x = right) ────────────────────
  function drawCar(cx, cy, angle, spd) {
    const S = 2.4;
    gx.save();
    gx.translate(cx, cy);
    gx.rotate(angle);

    if (spd > 1) { gx.shadowColor = '#FF1801'; gx.shadowBlur = Math.min(spd * 3, 16); }

    const f = (px, py, pw, ph, col) => {
      gx.fillStyle = col;
      gx.fillRect(px*S, py*S, pw*S, ph*S);
    };

    // Exhaust flame
    if (spd > 2) {
      const exG = gx.createRadialGradient(-6.5*S, 0, 0, -6.5*S, 0, spd*2+3);
      exG.addColorStop(0, `rgba(255,150,0,${Math.min(spd*.15,.8)})`);
      exG.addColorStop(1, 'rgba(255,50,0,0)');
      gx.fillStyle = exG;
      gx.beginPath();
      gx.ellipse(-6.5*S, 0, spd*2+3, spd+1.5, 0, 0, Math.PI*2);
      gx.fill();
    }

    // Rear wing
    f(-7.5, -3.5, 2.5,  7,  '#9a9a9a');
    f(-8.5, -4,   1,    8,  '#777');
    // Main body
    f(-5.5, -1.5, 11,   4,  '#FF1801');
    // Sidepods
    f(-4.5, -3,   7.5,  1.2,'#CC0000');
    f(-4.5,  2.2, 7.5,  1.2,'#CC0000');
    f(-4.5, -3,   2.2,  1.2,'#444');
    f(-4.5,  2.2, 2.2,  1.2,'#444');
    // Cockpit
    f(-0.5, -1.2, 3.5,  3.5,'#111');
    f(-0.5, -1.2, 3.5,  1,  '#0044cc');
    f( 0,   -0.2, 2.5,  1.8,'#e06000');
    // Nose
    f(5.5,  -1,   2.5,  3,  '#FF1801');
    f(8,     0,   1,    1,  '#CC0000');
    // Front wing
    f(4.5,  -3.5, 4,   1.2, '#c0c0c0');
    f(4.5,   2.8, 4,   1.2, '#c0c0c0');
    f(6,    -4.5, 1.2, 1,   '#888');
    f(6,     3.8, 1.2, 1,   '#888');

    gx.shadowBlur = 0;
    gx.fillStyle = '#fff';
    gx.font = `bold ${Math.round(S*2.2)}px monospace`;
    gx.textAlign = 'center'; gx.textBaseline = 'middle';
    gx.fillText('1', 1.5*S, 0.5*S);
    gx.restore();
  }

  // ── Tire trail ───────────────────────────────────────────────
  function drawTrail() {
    trail.forEach((p, i) => {
      const a = (i / trail.length) * 0.5;
      gx.beginPath(); gx.arc(p.x, p.y, 1.5, 0, Math.PI*2);
      gx.fillStyle = `rgba(255,24,1,${a})`;
      gx.fill();
    });
  }

  // ── Game loop ────────────────────────────────────────────────
  let lastTs = 0;
  function loop(ts) {
    // Cap dt at 2 frames to avoid first-frame teleport
    const dt = lastTs === 0 ? 1 : Math.min((ts - lastTs) / 16.67, 2);
    lastTs = ts;

    // Cursor force
    if (hovering) {
      car.vx += mdx * 0.22 * dt;
      car.vy += mdy * 0.22 * dt;
      mdx *= 0.5; mdy *= 0.5;
    }

    // Friction
    const fr = Math.pow(hovering ? 0.92 : 0.96, dt);
    car.vx *= fr; car.vy *= fr;

    // Speed / HUD
    const spd = Math.sqrt(car.vx*car.vx + car.vy*car.vy);
    if (speedEl) speedEl.textContent = Math.min(Math.round(spd * 20), 340);

    // Steer toward velocity direction
    if (spd > 0.4) {
      const target = Math.atan2(car.vy, car.vx);
      let diff = target - car.angle;
      if (diff >  Math.PI) diff -= Math.PI * 2;
      if (diff < -Math.PI) diff += Math.PI * 2;
      car.angle += diff * 0.16 * dt;
    }

    // Move
    car.x += car.vx * dt;
    car.y += car.vy * dt;

    // ── Boundary: distance from closest centerline point ──────
    const { dist, idx } = closestPt(car.x, car.y);
    if (dist > HALF_W - 2) {
      // Direction from closest sample to car (outward normal)
      const dx = car.x - SAMPLES[idx][0];
      const dy = car.y - SAMPLES[idx][1];
      const d  = Math.max(dist, 0.001);
      const nx = dx / d, ny = dy / d;

      // Push car back inside boundary
      car.x = SAMPLES[idx][0] + nx * (HALF_W - 3);
      car.y = SAMPLES[idx][1] + ny * (HALF_W - 3);

      // Reflect velocity along wall normal
      const dot = car.vx * nx + car.vy * ny;
      if (dot > 0) { // only reflect if moving INTO wall
        car.vx -= 2 * dot * nx * 0.45;
        car.vy -= 2 * dot * ny * 0.45;
        car.vx *= 0.72; car.vy *= 0.72;
      }
    }

    // Status
    if (statusEl) {
      const onTrack = dist <= HALF_W;
      statusEl.textContent = onTrack ? 'ON TRACK' : 'IN GRAVEL';
      statusEl.style.color = onTrack ? 'var(--green)' : 'var(--gold)';
    }

    // Trail
    trail.push({ x: car.x, y: car.y });
    if (trail.length > TRAIL_MAX) trail.shift();

    // Lap check
    checkLap();

    // Render
    drawTrack();
    drawTrail();
    drawCar(car.x, car.y, car.angle, spd);

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

/* ── LIGHT / DARK MODE TOGGLE ───────────────────────────────── */
(function() {
  const btn  = document.getElementById('mode-toggle');
  const icon = btn ? btn.querySelector('.mode-icon') : null;
  if (!btn) return;
  btn.addEventListener('click', () => {
    lightMode = !lightMode;
    document.documentElement.classList.toggle('light', lightMode);
    if (icon) icon.textContent = lightMode ? '🌙' : '☀';
    // Wipe canvas so transition is clean
    ctx.clearRect(0, 0, W, H);
    // Ensure clouds are ready
    if (lightMode && clouds.length === 0) {
      clouds = Array.from({length: 10}, () => newCloud(true));
    }
  });
})();
