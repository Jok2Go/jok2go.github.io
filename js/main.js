/* ═══════════════════════════════════════
   Jok2Go — Main JavaScript
═══════════════════════════════════════ */

// ── Mobile nav toggle ─────────────────
document.addEventListener('DOMContentLoaded', function () {
  // Support both id="navToggle" and class="nav-toggle" (index.html uses class only)
  const toggle = document.getElementById('navToggle') || document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('mobile-open');
      toggle.textContent = open ? '✕' : '☰';
    });
  }

  // ── Scroll fade-in (for static cards) ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.anim').forEach(el => observer.observe(el));

  // ── Init page-specific modules ──
  if (document.getElementById('menuGrid'))  initMenuPage();
  if (document.getElementById('blogGrid'))  initBlogPage();
});

/* ═══════════════════════════════════════
   MENU PAGE — data + render + filter
═══════════════════════════════════════ */

const MENU_ITEMS = [
  // โจ๊กหลัก
  { id:'j1',  tags:['high-protein'], emoji:'🍚', name:'โจ๊กไก่ออร์แกนิก',    desc:'ไก่สับออร์แกนิก ขิงสด ผักชี ไข่ไก่สด',            cal:280, p:22, c:38, f:5,  badge:'Best Seller',  badgeClass:'orange' },
  { id:'j2',  tags:['low-cal','high-protein'], emoji:'🐟', name:'โจ๊กปลาทับทิม', desc:'ปลาทับทิมสดแล่ ขิงซอย Omega-3 สูง',             cal:240, p:26, c:30, f:4,  badge:'Healthy Pick', badgeClass:'' },
  { id:'j3',  tags:['low-cal'],       emoji:'🥚', name:'โจ๊กไข่ขาว Detox',    desc:'ไข่ขาว 3 ฟอง สมุนไพร สำหรับนักฟิต',              cal:210, p:20, c:28, f:2,  badge:'Low Cal',      badgeClass:'' },
  { id:'j4',  tags:[],                emoji:'🐷', name:'โจ๊กหมูสับ',           desc:'หมูสับสดหมักซีอิ๊ว ขิงอ่อน ไข่ต้มยางมะตูม',      cal:310, p:18, c:40, f:8,  badge:'Classic',      badgeClass:'' },
  { id:'j5',  tags:['vegan','low-cal'], emoji:'🍄', name:'โจ๊กเห็ดรวม Vegan', desc:'เห็ดหอม เห็ดเข็มทอง เห็ดแชมปิญอง ไม่มีเนื้อสัตว์', cal:200, p:8,  c:35, f:3,  badge:'Vegan',        badgeClass:'' },
  { id:'j6',  tags:['high-protein'],  emoji:'🦐', name:'โจ๊กกุ้งแม่น้ำ',      desc:'กุ้งแม่น้ำสด ผักชีฝรั่ง พริกไทยดำ',               cal:260, p:24, c:32, f:4,  badge:'Premium',      badgeClass:'' },
  { id:'j7',  tags:['low-cal','vegan'], emoji:'🥕', name:'โจ๊กผักรวม Detox', desc:'ผักนานาชนิด ขมิ้น พริกไทยขาว อุดมด้วยไฟเบอร์',    cal:180, p:6,  c:32, f:2,  badge:'Detox',        badgeClass:'' },
  { id:'j8',  tags:['high-protein'],  emoji:'🥩', name:'โจ๊กเนื้อวากิว',      desc:'เนื้อวากิวสไลด์ ขิงอ่อน ต้นหอมญี่ปุ่น',           cal:340, p:28, c:38, f:10, badge:'Premium',      badgeClass:'orange' },
  { id:'j9',  tags:['low-cal'],       emoji:'🫘', name:'โจ๊กถั่วเขียว',       desc:'ถั่วเขียวต้มนุ่ม ขิงแก่ น้ำมะพร้าว หวานธรรมชาติ', cal:220, p:10, c:40, f:2,  badge:'Fiber Rich',   badgeClass:'' },
  { id:'j10', tags:['high-protein'],  emoji:'🐔', name:'โจ๊กซี่โครงไก่',      desc:'ซี่โครงไก่ตุ๋น น้ำซุปใส รสกลมกล่อม',              cal:290, p:25, c:36, f:6,  badge:'Hearty',       badgeClass:'' },
  { id:'j11', tags:['vegan'],         emoji:'🌽', name:'โจ๊กข้าวโพดสวีท',     desc:'ข้าวโพดหวาน เห็ดฟาง กะเพราสด',                   cal:230, p:7,  c:44, f:2,  badge:'Vegan',        badgeClass:'' },
  { id:'j12', tags:['high-protein','low-cal'], emoji:'🦑', name:'โจ๊กปลาหมึก', desc:'ปลาหมึกสดสับ กระเทียมเจียว ต้นหอม',              cal:250, p:22, c:30, f:5,  badge:'Seafood',      badgeClass:'' },
];

let menuFilter = 'all';

function initMenuPage() {
  renderMenuGrid();
}

function filterMenu(tag, btn) {
  menuFilter = tag;
  document.querySelectorAll('#menuTabs .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMenuGrid();
}

function renderMenuGrid() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;

  const items = menuFilter === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(m => m.tags.includes(menuFilter));

  grid.innerHTML = items.map((m, i) => `
    <div class="menu-card anim" style="animation-delay:${(i % 4) * 0.08}s">
      <div class="menu-card-img">
        ${m.emoji}
        <span class="menu-badge ${m.badgeClass}">${m.badge}</span>
      </div>
      <div class="menu-card-body">
        <div class="kcal-pill">🔥 ${m.cal} kcal</div>
        <h3>${m.name}</h3>
        <p class="desc">${m.desc}</p>
        <div class="macro-strip">
          <div class="ms-cell"><div class="ms-val">${m.p}g</div><div class="ms-lbl">Protein</div></div>
          <div class="ms-cell"><div class="ms-val">${m.c}g</div><div class="ms-lbl">Carb</div></div>
          <div class="ms-cell"><div class="ms-val">${m.f}g</div><div class="ms-lbl">Fat</div></div>
        </div>
        <div style="margin-top:14px; text-align:center">
          <a href="calories.html" class="btn btn-primary" style="padding:8px 22px; font-size:0.83rem">🔢 คำนวณแคลอรี</a>
        </div>
      </div>
    </div>`).join('');

  // Re-observe new cards
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.05 });
  grid.querySelectorAll('.anim').forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════
   BLOG PAGE — data + render + filter
═══════════════════════════════════════ */

const BLOG_POSTS = [
  {
    id:'b1', cat:'nutrition', emoji:'🌾', tag:'โภชนาการ',
    title:'โจ๊กกับการลดน้ำหนัก — วิทยาศาสตร์พิสูจน์แล้ว',
    excerpt:'ทำไมนักโภชนาการถึงแนะนำโจ๊กเป็นอาหารเช้าสำหรับคนควบคุมน้ำหนัก ข้อมูลที่ได้รับการพิสูจน์จากงานวิจัยนานาชาติ',
    date:'20 เม.ย. 2569', readTime:'5 นาที',
  },
  {
    id:'b2', cat:'fitness', emoji:'💪', tag:'ฟิตเนส',
    title:'กินโจ๊กก่อน/หลังออกกำลังกาย ต่างกันยังไง?',
    excerpt:'เวลากินส่งผลต่อ performance และ recovery อย่างไร เลือกให้ถูกช่วงเวลา ผลลัพธ์ต่างกันมาก',
    date:'15 เม.ย. 2569', readTime:'4 นาที',
  },
  {
    id:'b3', cat:'story', emoji:'🧑‍🍳', tag:'เรื่องเล่า',
    title:'เราเลือกข้าวยังไง? เรื่องที่คุณอาจไม่รู้',
    excerpt:'กระบวนการคัดเลือกข้าวจากเกษตรกรรายย่อย ทำไมเราถึงใช้ข้าวหักอ้วนแทนข้าวสวย',
    date:'10 เม.ย. 2569', readTime:'6 นาที',
  },
  {
    id:'b4', cat:'nutrition', emoji:'🧬', tag:'โภชนาการ',
    title:'โปรตีนในโจ๊ก — ครบหรือยัง?',
    excerpt:'เจาะลึก amino acid profile ของโจ๊กไก่ออร์แกนิก เปรียบเทียบกับอาหารเช้าประเภทอื่น',
    date:'5 เม.ย. 2569', readTime:'7 นาที',
  },
  {
    id:'b5', cat:'fitness', emoji:'🏃', tag:'ฟิตเนส',
    title:'แผนอาหาร 7 วัน สำหรับคนวิ่ง Marathon',
    excerpt:'จากประสบการณ์นักวิ่งจริง — วางแผนอาหารยังไงให้มี energy ตลอดการฝึกซ้อม',
    date:'1 เม.ย. 2569', readTime:'8 นาที',
  },
  {
    id:'b6', cat:'story', emoji:'🌿', tag:'เรื่องเล่า',
    title:'ขิงสด vs ขิงผง — ทำไม Jok2Go ถึงเลือกขิงสดทุกวัน',
    excerpt:'ต้นทุนสูงกว่า 3 เท่า แต่คุณค่าสารอาหารและรสชาติที่แตกต่าง ทำให้เราไม่เคยประนีประนอม',
    date:'25 มี.ค. 2569', readTime:'5 นาที',
  },
  {
    id:'b7', cat:'nutrition', emoji:'📊', tag:'โภชนาการ',
    title:'GI ต่ำ ดีต่อสุขภาพยังไง? อธิบายแบบเข้าใจง่าย',
    excerpt:'Glycemic Index คืออะไร ทำไมโจ๊กถึงมี GI ต่ำกว่าข้าวสวยถึง 30% และนั่นหมายความว่าอะไร',
    date:'20 มี.ค. 2569', readTime:'6 นาที',
  },
  {
    id:'b8', cat:'fitness', emoji:'🥗', tag:'ฟิตเนส',
    title:'Meal Prep สำหรับคนไม่มีเวลา — โจ๊กช่วยได้',
    excerpt:'เทคนิค batch cooking สำหรับคนทำงาน ใช้เวลาแค่ 30 นาที/สัปดาห์ กินดีได้ทุกเช้า',
    date:'15 มี.ค. 2569', readTime:'5 นาที',
  },
  {
    id:'b9', cat:'story', emoji:'🏡', tag:'เรื่องเล่า',
    title:'จาก Idea สู่ชาม — เส้นทาง 2 ปีของ Jok2Go',
    excerpt:'เรื่องราวเบื้องหลังการสร้าง Jok2Go จากความฝันของคนรักสุขภาพ สู่โจ๊กที่คนกรุงเทพรู้จัก',
    date:'10 มี.ค. 2569', readTime:'9 นาที',
  },
];

let blogFilter = 'all';

function initBlogPage() {
  renderBlogGrid();
}

function filterBlog(cat, btn) {
  blogFilter = cat;
  document.querySelectorAll('#blogTabs .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderBlogGrid();
}

function renderBlogGrid() {
  const grid = document.getElementById('blogGrid');
  if (!grid) return;

  const posts = blogFilter === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.cat === blogFilter);

  grid.innerHTML = posts.map((p, i) => `
    <div class="blog-card anim" style="animation-delay:${(i % 3) * 0.1}s">
      <div class="blog-img">${p.emoji}</div>
      <div class="blog-body">
        <span class="blog-tag">${p.tag}</span>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <div class="blog-meta">
          <span>📅 ${p.date}</span>
          <span>⏱ ${p.readTime}</span>
        </div>
      </div>
    </div>`).join('');

  // Re-observe new cards
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.05 });
  grid.querySelectorAll('.anim').forEach(el => obs.observe(el));
}
