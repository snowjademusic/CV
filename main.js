// ── CV Data ──────────────────────────────────────────────────────────────────
const cv = {
  name: 'Shadi Vandeventer',
  tagline: 'Computer Science Student',
  location: 'Zurich, Switzerland',
  about:
    'CS student at the University of Zurich with a background in audio engineering and music production. Passionate about discrete neural networks, digital signal processing, and building elegant software solutions — from custom language interpreters to audio VST plugins.',
  contact: {
    phone: '078 830 56 61',
    email: ['shavdv', 'gmail.com'].join('@'),
    linkedin: { label: 'LinkedIn', url: 'https://linkedin.com/in/shadi-vandeventer' },
    gitlab:   { label: 'GitLab',   url: 'https://gitlab.uzh.ch/shadisamuelthierry.vandeventer' },
  },
  skills: [
    { group: 'Languages', tags: ['Python', 'C', 'Java', 'C++', 'JavaScript'] },
    { group: 'Tools',     tags: ['Git', 'Gurobipy', 'VST SDK'] },
    {
      group: 'Interests',
      tags: ['Discrete Neural Networks', 'Digital Signal Processing', 'Emulation', 'Android Programming', 'Network Applications'],
    },
  ],
  education: [
    {
      title: 'B.S. Computer Science – Computer Linguistics minor',
      period: 'Sep 2024 – Present',
      subtitle: 'University of Zurich · Zurich, Switzerland',
      bullets: [
        'GPA: 5.3',
        'Courses: Data Structures & Algorithms, Foundations of Computing 1 & 2 (5.75), Intro to AI, Computer Networks and Distributed Systems (6.0), Intro to Operations Research, Database Systems',
      ],
    },
    {
      title: 'Diploma – Audio Engineering & Music Production',
      period: 'Sep 2022 – Aug 2023',
      subtitle: 'SAE Institute Zurich · Zurich, Switzerland',
      bullets: [],
    },
  ],
  experience: [
    {
      title: 'Substitute Teacher',
      period: 'Feb 2025',
      subtitle: 'Zurich International School · Zurich, Switzerland',
      bullets: [
        'Instructed high school students in Java and JavaScript programming fundamentals, adapting lesson plans to ensure comprehension across varying skill levels.',
        'Facilitated hands-on coding exercises and debugging sessions, fostering problem-solving skills and best practices in software development.',
      ],
    },
  ],
  projects: [
    {
      title: 'Custom Programming Language Interpreter',
      period: '2025',
      subtitle: 'Python',
      bullets: [
        'Created a custom programming language interpreter with arithmetic operators, boolean logic, control flow (do-until loops), and data structures (arrays, sets).',
        'Implemented functional programming paradigms (map, reduce, filter) and built a visual execution tracer with timing analysis for debugging and profiling.',
      ],
    },
    {
      title: 'Hash-Based Backup System',
      period: '2025',
      subtitle: 'Python',
      bullets: [
        'Engineered a file backup system that tracks folder content through cryptographic hashing to detect file modifications efficiently.',
        'Implemented incremental backup and restoration functionality, optimising storage by only backing up changed files.',
      ],
    },
    {
      title: 'Audio Distortion VST Plugin',
      period: '2024',
      subtitle: 'C++ / VST SDK',
      bullets: [
        'Created a custom audio distortion and clipping plugin using the VST SDK, implementing real-time digital signal processing algorithms.',
      ],
    },
  ],
  activities: [
    {
      title: 'Parkour Instructor',
      period: '2024 – Present',
      subtitle: 'ASVZ (Academic Sports Association Zurich) · Zurich, Switzerland',
      bullets: [
        'Lead parkour training sessions for students, teaching movement fundamentals, safety protocols, and progressive skill development.',
        'Design and supervise training programs that build strength, coordination, and confidence through parkour techniques.',
      ],
    },
    {
      title: 'Active Member',
      period: '2024 – Present',
      subtitle: 'ICU – Informatics Club UZH (CS Student Association) · Zurich, Switzerland',
      bullets: [
        'Participate in computer science student community events, workshops, and collaborative learning initiatives.',
        'Engage with fellow CS students to share knowledge and build professional networks within the university.',
      ],
    },
  ],
  // Placeholder photo slots — captions are editable in-page
  photos: [
    { caption: 'Parkour training' },
    { caption: 'At UZH campus' },
    { caption: 'Studio session' },
    { caption: 'Coding setup' },
    { caption: 'ICU event' },
    { caption: '' },
  ],
};

// ── DOM Helpers ───────────────────────────────────────────────────────────────
function el(tag, attrs, ...children) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'className')  node.className  = v;
      else if (k === 'innerHTML') node.innerHTML = v;
      else node.setAttribute(k, v);
    }
  }
  for (const child of children.flat()) {
    if (child == null) continue;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

function card(children) {
  const d = el('div', { className: 'card' });
  [children].flat().forEach(c => c && d.appendChild(c));
  return d;
}

function sectionTitle(text) {
  return el('h2', { className: 'section-title' }, text);
}

function divider() {
  return el('hr', { className: 'divider' });
}

function renderBullets(bullets) {
  if (!bullets || !bullets.length) return null;
  const ul = el('ul', { className: 'entry-bullets' });
  bullets.forEach(b => ul.appendChild(el('li', null, b)));
  return ul;
}

function renderEntry(entry) {
  const wrap = el('div', { className: 'entry' });
  const header = el('div', { className: 'entry-header' },
    el('span', { className: 'entry-title' }, entry.title),
    el('span', { className: 'entry-period' }, entry.period),
  );
  wrap.appendChild(header);
  wrap.appendChild(el('p', { className: 'entry-subtitle' }, entry.subtitle));
  const bullets = renderBullets(entry.bullets);
  if (bullets) wrap.appendChild(bullets);
  return wrap;
}

function renderEntries(container, list) {
  list.forEach((entry, i) => {
    container.appendChild(renderEntry(entry));
    if (i < list.length - 1) container.appendChild(divider());
  });
}

// ── Photos Section ────────────────────────────────────────────────────────────
function renderPhotos() {
  const section = el('section', { id: 'photos', className: 'reveal' });
  const c = card([
    sectionTitle('Photos'),
    el('p', { className: 'photos-hint' }, 'Click any slot to upload a photo — images are stored locally in your browser.'),
  ]);

  const grid = el('div', { className: 'photos-grid' });

  cv.photos.forEach((photo, idx) => {
    const slot = el('div', { className: 'photo-slot', 'data-idx': idx });

    // Hidden file input
    const input = el('input', { type: 'file', accept: 'image/*', title: 'Upload photo' });

    // Placeholder icon + label (visible when empty)
    const icon  = el('span', { className: 'upload-icon' }, '＋');
    const label = el('span', null, 'Add photo');

    // Overlay (visible on hover when image exists)
    const overlay = el('div', { className: 'photo-overlay' });
    const overlayLabel = el('span', { className: 'photo-overlay-label' }, '');
    overlay.appendChild(overlayLabel);

    // Caption input
    const caption = el('input', { className: 'photo-caption-input', type: 'text', placeholder: 'Add a caption…', value: photo.caption || '' });
    caption.addEventListener('click', e => e.stopPropagation());

    slot.appendChild(input);
    slot.appendChild(icon);
    slot.appendChild(label);
    slot.appendChild(overlay);
    slot.appendChild(caption);

    // Load from localStorage if available
    const stored = (() => { try { return localStorage.getItem(`cv_photo_${idx}`); } catch { return null; } })();
    if (stored) applyImage(slot, stored, icon, label, overlayLabel, caption);

    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        const dataURL = e.target.result;
        try { localStorage.setItem(`cv_photo_${idx}`, dataURL); } catch {}
        applyImage(slot, dataURL, icon, label, overlayLabel, caption);
      };
      reader.readAsDataURL(file);
    });

    grid.appendChild(slot);
  });

  c.appendChild(grid);
  section.appendChild(c);
  return section;
}

function applyImage(slot, src, icon, label, overlayLabel, caption) {
  // Remove any existing img
  const existing = slot.querySelector('img');
  if (existing) existing.remove();

  const img = el('img', { src, alt: caption.value || 'Photo' });
  slot.insertBefore(img, slot.firstChild);
  slot.classList.add('has-image');
  icon.style.display  = 'none';
  label.style.display = 'none';
  overlayLabel.textContent = caption.value || 'Click to replace';
}

// ── Main Render ───────────────────────────────────────────────────────────────
function render() {
  const app = document.getElementById('app');

  // ── Hero ──
  const heroSec = el('section', { id: 'top', className: 'reveal' });
  const heroCard = el('div', { className: 'card hero' });
  heroCard.appendChild(el('h1', null, cv.name));
  const taglineEl = el('p', { className: 'tagline' },
    cv.tagline,
    el('span', null, ' · '),
    cv.location,
  );
  heroCard.appendChild(taglineEl);

  const nav = el('nav', { className: 'nav-buttons', 'aria-label': 'Sections' });
  const navLinks = [
    ['#about',      'About',      ''],
    ['#skills',     'Skills',     ''],
    ['#experience', 'Experience', ''],
    ['#projects',   'Projects',   ''],
    ['#education',  'Education',  ''],
    ['#activities', 'Activities', ''],
    ['#photos',     'Photos',     ''],
    ['#contact',    'Contact',    'btn-primary'],
  ];
  navLinks.forEach(([href, lbl, cls]) => {
    nav.appendChild(el('a', { className: `btn ${cls}`.trim(), href }, lbl));
  });
  heroCard.appendChild(nav);
  heroSec.appendChild(heroCard);
  app.appendChild(heroSec);

  // ── About ──
  const aboutSec = el('section', { id: 'about', className: 'reveal' });
  aboutSec.appendChild(card([sectionTitle('About'), el('p', { className: 'about-text' }, cv.about)]));
  app.appendChild(aboutSec);

  // ── Skills ──
  const skillsSec = el('section', { id: 'skills', className: 'reveal' });
  const skillsCard = card([sectionTitle('Skills')]);
  cv.skills.forEach(group => {
    const g = el('div', { className: 'skills-group' });
    g.appendChild(el('p', { className: 'skills-group-label' }, group.group));
    const grid = el('div', { className: 'skills-grid' });
    group.tags.forEach(tag => grid.appendChild(el('span', { className: 'skill-tag' }, tag)));
    g.appendChild(grid);
    skillsCard.appendChild(g);
  });
  skillsSec.appendChild(skillsCard);
  app.appendChild(skillsSec);

  // ── Experience ──
  const expSec = el('section', { id: 'experience', className: 'reveal' });
  const expCard = card([sectionTitle('Experience')]);
  renderEntries(expCard, cv.experience);
  expSec.appendChild(expCard);
  app.appendChild(expSec);

  // ── Projects ──
  const projSec = el('section', { id: 'projects', className: 'reveal' });
  const projCard = card([sectionTitle('Projects')]);
  renderEntries(projCard, cv.projects);
  projSec.appendChild(projCard);
  app.appendChild(projSec);

  // ── Education ──
  const eduSec = el('section', { id: 'education', className: 'reveal' });
  const eduCard = card([sectionTitle('Education')]);
  renderEntries(eduCard, cv.education);
  eduSec.appendChild(eduCard);
  app.appendChild(eduSec);

  // ── Activities ──
  const actSec = el('section', { id: 'activities', className: 'reveal' });
  const actCard = card([sectionTitle('Activities')]);
  renderEntries(actCard, cv.activities);
  actSec.appendChild(actCard);
  app.appendChild(actSec);

  // ── Photos ──
  app.appendChild(renderPhotos());

  // ── Contact ──
  const contactSec = el('section', { id: 'contact', className: 'reveal' });
  const contactCard = card([sectionTitle('Contact')]);
  const links = el('div', { className: 'contact-links' });
  links.appendChild(el('a', { className: 'btn', href: `mailto:${cv.contact.email}` }, '✉  ' + cv.contact.email));
  links.appendChild(el('a', { className: 'btn', href: `tel:${cv.contact.phone.replace(/\s/g,'')}` }, '📞  ' + cv.contact.phone));
  links.appendChild(el('a', { className: 'btn', href: cv.contact.linkedin.url, target: '_blank', rel: 'noopener' }, cv.contact.linkedin.label));
  links.appendChild(el('a', { className: 'btn', href: cv.contact.gitlab.url,   target: '_blank', rel: 'noopener' }, cv.contact.gitlab.label));
  contactCard.appendChild(links);
  contactSec.appendChild(contactCard);
  app.appendChild(contactSec);
}

// ── Scroll Reveal ─────────────────────────────────────────────────────────────
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.04}s`;
    observer.observe(el);
  });
}

// ── Boot ──────────────────────────────────────────────────────────────────────
render();
initReveal();
