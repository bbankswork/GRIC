/* ============================================================
   GRICPD prototype — shared site script
   - One sitemap drives the nav, mobile menu, and footer on every page.
   - One image map for every page (photos load from the shared Drive folder).
   To add a page: build the HTML file, then change its href in PAGES below
   from soon('...') to the filename. Every page's nav updates automatically.
   ============================================================ */
(function () {
  /* ---------- Pages ---------- */
  /* ROOT = path back to the site root; each page sets <body data-root="../"> etc. */
  const ROOT = document.body.dataset.root || '';
  window.GRIC_ROOT = ROOT;
  const soon = name => ROOT + `coming-soon/?page=${encodeURIComponent(name)}`;
  const R = {
    home:         '',
    about:        'about/',
    mission:      'about/mission/',
    leadership:   'about/leadership/',
    fallen:       'about/fallen-officers/',
    community:    'about/community/',
    cpa:          'about/community/citizens-police-academy/',   // not in nav
    rideAlong:    'about/community/ride-along/',                // not in nav
    app:          'about/community/mobile-app/',                // not in nav
    coffee:       'about/community/coffee-with-a-cop/',         // not in nav
    join:         'join-the-team/',
    cadet:        'join-the-team/cadet-program/',
    patrol:       'services/patrol/',
    traffic:      'services/traffic/',
    k9:           'services/k9-unit/',
    sro:          'services/school-resource-officers/',
    rangers:      'services/rangers/',
    blockWatch:   'crime-prevention/neighborhood-watch/',
    vacation:     'crime-prevention/vacation-house-checks/',
    offenders:    'crime-prevention/sex-offender-info/',
    blueEnvelope: 'crime-prevention/blue-envelope-program/',
    alerts:       'crime-prevention/emergency-alert-sign-up/',
    evidence:     'online-forms/property-evidence/',
    records:      'online-forms/records-requests/',
    commend:      'online-forms/commendations-complaints/',
    commReq:      'online-forms/police-community-request/',
    news:         'news/',
    newsPost:     'news/grpd-is-hiring/',                       // sample article
    missing:      'news/missing-persons/',
    contact:      'contact/',
  };
  const PAGES = Object.fromEntries(Object.entries(R).map(([k, v]) => [k, ROOT + v || './']));
  PAGES.privacy = soon('Privacy Policy');
  PAGES.terms = soon('Terms of Use');
  window.GRIC_PAGES = PAGES;
  const isSoon = href => href.includes('coming-soon/');

  /* key = matches <body data-section="..."> for the active top-level item */
  const NAV = [
    { label: 'About', key: 'about', href: PAGES.about, items: [
      ['About Us', PAGES.about], ['Mission', PAGES.mission], ['Leadership', PAGES.leadership], ['Fallen Officers', PAGES.fallen],
      ['Gila River Indian Community', PAGES.community] ] },
    { label: 'Join the Team', key: 'join', href: PAGES.join, items: [
      ['Application Requirements', PAGES.join], ['Cadet Program', PAGES.cadet] ] },
    { label: 'Services', key: 'services', href: PAGES.patrol, items: [
      ['Patrol', PAGES.patrol], ['Traffic', PAGES.traffic], ['K-9 Unit', PAGES.k9], ['School Resource Officer', PAGES.sro], ['Rangers', PAGES.rangers] ] },
    { label: 'Crime Prevention', key: 'crime', href: PAGES.blockWatch, items: [
      ['Neighborhood Watch', PAGES.blockWatch], ['Vacation House Checks', PAGES.vacation], ['Sex Offender Info', PAGES.offenders],
      ['Blue Envelope Program', PAGES.blueEnvelope], ['Emergency Alert Sign-Up', PAGES.alerts] ] },
    { label: 'Online Forms', key: 'forms', href: PAGES.evidence, items: [
      ['Property & Evidence', PAGES.evidence], ['Records Requests', PAGES.records], ['Commendations & Complaints', PAGES.commend],
      ['Police Community Request', PAGES.commReq] ] },
    { label: 'News', key: 'news', href: PAGES.news, items: [
      ['GRIC Police News', PAGES.news], ['Missing Persons', PAGES.missing] ] },
    { label: 'Contact', key: 'contact', href: PAGES.contact, items: [] },
  ];

  /* ---------- Images ---------- */
  const D = (id, w) => `https://lh3.googleusercontent.com/d/${id}=w${w}`;
  const P = {
    p8831: '1XhufQ8j2YPcR-RFlLQDguqpNog9LbUDN', // officers in front of HQ
    p9891: '14Tvh4MCMeCKTh-ZOH_JY3wzf0OkaePd5', // officer group
    p4634: '1xMW1VLs7D-t2yQyk2om6P4OKvXTrg_Vm', // emergency scene / staff
    p1380: '17dHwJJ_tOa9AJz8WX7szOMc1T4-AeJL9', // community (portrait)
    p8598: '1s6kBXmL2fcFfM112gRLhlJ1YUbc1ds8D', // night patrol
    p8480: '1BfXgyJb88D3JyhGrOAJhvWXDH3XnnL9g', // K-9 (matched to Figma SpecialtyUnits)
    chief: '1qkF0v_QxxhHYFa0u-9P6R2WmY-ZpRLQq', // media-box-image-police-department-meet-the-command-staff…
    seal:  '1cH1aH9DGy31mJsl4M61_TgupHPL1tsZ4',
  };
  const IG = ['1RjDH3y27eB2jCUiKj6HKh69Ki1Db3b3n','1ZoNbvG3XEvIlADjj_sVEfQjOV_b54Y09','1_Z3C-uy7RVjyJ5Vwt7xD7iLIfXNMBhy_',
              '1XzlMdUZpqFbMDHEGcaf5BI7zTw2eVp65','14PTie7Am5tNmFPQbhU_2Bw8Z8MOXuJD9','1m31hX7aq6M3hhrijme0WDRt_tf6hLXxs'];
  /* Instagram Images folder (matched by eye to each page) */
  const IGF = {
    i0: '1XCfK94aY2k7r2ToYYDJ4Zp1EgtvuesmL',
    i15: '1aBLC93QCPjuY9r6jjeWaNy1DD9jo94cZ',
    i17: '1BNZYrJXuhD8YGKlmt7Nmx8-Yg_ZFfno2',
    i20: '1zPMtaEoWQHODMtrA-7h8yPRXCy_5xdfx',
    i24: '1ERCK4A7D5mRKKY0DqF9aDLUONJtwnbMC',
    i29: '1NU35Oz9sFZE5mxAGfqviiZ41eiSixX28',
    i32: '114TY59tCeAs47q_UkH8kkre78s3wahuX',
    i33: '1PVJAIFkIBgocCrxN9UhTJa0zXZ7bfCOj',
    i35: '14zZ5WcdqUVY4kCQIWbzVevJxNJKhcmb7',
    i36: '1qLEcG3SiygmdzFaLs8wpYzsDhd3pRchK',
    i37: '19wDK2zMtok6qLIpV_KTW0QeQACoxp7XD',
    i39: '17BwDvdYqy6Cz65o3XLCMkxPC_NobTGiM',
    i45: '1-KHE4HoM0B110WF3rOlr_nQZ_j3OSrl6',
    i48: '1Uwwmy7l8p4nOgNvwKy5MT28VHjVFao-i',
    i49: '1wUVdKZlB1x6dZelp8SMP9JqwTxXBzHIB',
    i50: '1UxVbN9UuA15c82WNenfuYW3dLMH11sQ1',
    i54: '1YLW52oQgY8vD_vPVMisogENpMzWwi4Lf',
    i55: '1f52OYHtxg9s3jWbGP75JwEpArc0yOOxI',
    i58: '1kIU88PqdjDumRCIpa75Uj70yIv-1O5hc',
    i61: '1DWRByCUJcxOdwI7yDN6wCY2c2YgGP5dD',
    i62: '1gxTvdzyYNlQ_ddVA580oQ5ihL5QKGMNH',
  };
  const svg = (body, filled) => 'data:image/svg+xml,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ${filled ? 'fill="#fff"' : 'fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'}>${body}</svg>`);

  window.IMG = {
    seal: D(P.seal, 400),
    /* homepage */
    hero: D(P.p8831, 2400), tile1: D(P.p9891, 1200), tile2: D(P.p4634, 1200), tile3: D(P.p1380, 1200), about: D(P.p8598, 1400),
    recruit: D(P.p9891, 2000),
    chief: D(P.chief, 1400),
    unitK9: D(P.p8480, 900), unitSwat: D(P.p8598, 900), unitSiu: D(P.p9891, 900), unitDispatch: D(P.p4634, 900),
    news1: D(IG[5], 800), news2: D(P.p8598, 800), news3: D(P.p4634, 800),
    /* join the team */
    joinHero:  ROOT + 'images/arizona-desert-wide.jpg',   // video poster
    desert:    ROOT + 'images/arizona-desert-wide.jpg',
    joinStaff: D(P.p8831, 1400), // staff photo (client: show department diversity)
    lifestyle: ROOT + 'images/arizona-desert-crop.jpg',
    pos1: D(P.p9891, 900), pos2: D(P.p8598, 900), pos3: D(P.p4634, 900),
    /* about us */
    aboutHero: D(P.p8598, 2400), aboutWho: D(P.p9891, 1400), aboutRoots: D(P.p8831, 1400),
    /* mission */
    missionHero: D(P.p1380, 2400), missionVision: D(P.p4634, 1400),
    /* leadership */
    leaderHero: D(P.p9891, 2400),
    /* generic keys for any page: img-p8831, img-p9891 … img-ig1 … */
    ...Object.fromEntries(Object.entries(P).filter(([k]) => k.startsWith('p')).map(([k, id]) => [k, D(id, 1600)])),
    ...Object.fromEntries(IG.map((id, i) => ['igL' + (i + 1), D(id, 1400)])),
    /* coming soon */
    soonHero: D(P.p8831, 2000),
    /* instagram */
    ...Object.fromEntries(Object.entries(IGF).map(([k, id]) => [k, D(id, 1400)])),
    ig1: D(IG[0], 700), ig2: D(IG[1], 700), ig3: D(IG[2], 700), ig4: D(IG[3], 700), ig5: D(IG[4], 700), ig6: D(IG[5], 700),
    /* icons */
    fb: svg('<path d="M14 8.5V7c0-.7.4-1 1-1h2V2.5h-3C11.5 2.5 10 4.2 10 6.8v1.7H7.5V12H10v9.5h4V12h2.8l.5-3.5H14z"/>', true),
    insta: svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="#fff"/>'),
    yt: svg('<path fill-rule="evenodd" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z"/>', true),
    icphone: svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'),
    icmail: svg('<rect x="2.5" y="4.5" width="19" height="15" rx="1.5"/><path d="M3 6l9 7 9-7"/>'),
    icpin: svg('<path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>'),
  };

  /* ---------- Render helpers ---------- */
  const norm = p => p.replace(/index\.html$/, '');
  const isCurrent = href => !href.includes('#') && !href.includes('?') && norm(new URL(href, location.href).pathname) === norm(location.pathname);
  const section = document.body.dataset.section || '';
  const soonTag = href => isSoon(href) ? '<span class="soon">Soon</span>' : '';

  const headerHTML = `
<header class="nav">
  <div class="nav-top">
    <a href="${PAGES.home}" class="brand" aria-label="Gila River Police Department home">
      <img class="img-seal" alt="Gila River Indian Community Public Safety seal">
      <div><small>Gila River Indian Community</small><strong>Police Department</strong></div>
    </a>
    <div class="nav-cta">
      <a href="tel:5205624511" class="btn-sm btn-outline">Non-Emergency: 520-562-4511</a>
      <a href="tel:911" class="btn-sm btn-red"><i class="pulse"></i>Emergency 911</a>
      <button class="burger" aria-label="Open menu" aria-controls="drawer" aria-expanded="false" data-open-drawer>☰</button>
    </div>
  </div>
  <nav class="nav-menu" aria-label="Primary">
    <ul>${NAV.map(g => `
      <li><a href="${g.href}"${g.key === section ? ' class="active" aria-current="true"' : ''}>${g.label}${g.items.length ? ' <span>▾</span>' : ''}</a>${g.items.length ? `
        <div class="dropdown">${g.items.map(([t, h, sub]) => `<a href="${h}" class="${[sub ? 'sub' : '', isCurrent(h) ? 'current' : ''].join(' ').trim()}"${isCurrent(h) ? ' aria-current="page"' : ''}>${t}${soonTag(h)}</a>`).join('')}</div>` : ''}</li>`).join('')}
    </ul>
  </nav>
</header>
<div class="drawer" id="drawer" aria-hidden="true">
  <button class="x-close" aria-label="Close menu" data-close-drawer>×</button>
  <ul>
    <li><a href="${PAGES.home}" style="display:block;padding:16px 0;font-weight:800;font-size:16px;letter-spacing:.12em;text-transform:uppercase">Home</a></li>${NAV.map(g => `
    <li>${g.items.length ? `<details${g.key === section ? ' class="active" open' : ''}><summary>${g.label}</summary>
      <ul>${g.items.map(([t, h, sub]) => `<li><a href="${h}" class="${[sub ? 'sub' : '', isCurrent(h) ? 'current' : ''].join(' ').trim()}">${t}${soonTag(h)}</a></li>`).join('')}</ul></details>` : `<a href="${g.href}" style="display:block;padding:16px 0;font-weight:800;font-size:16px;letter-spacing:.12em;text-transform:uppercase${g.key === section ? ';color:var(--gold)' : ''}">${g.label}</a>`}</li>`).join('')}
  </ul>
  <a href="tel:5205624511" class="btn-sm btn-outline">Non-Emergency: 520-562-4511</a>
</div>`;

  const footerHTML = `
<section class="insta">
  <div class="insta-head"><h2>Instagram</h2><a href="https://www.instagram.com/gilariverpd/" target="_blank" rel="noopener">@gilariverpd</a></div>
  <div class="feed">${[1,2,3,4,5,6].map(n => `<a href="https://www.instagram.com/gilariverpd/" target="_blank" rel="noopener"><img class="img-ig${n}" alt="Instagram post from @gilariverpd"></a>`).join('')}</div>
</section>
<footer class="footer">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <div class="brand"><img class="img-seal" alt="GRIC Public Safety seal"><div><small>Gila River Indian Community</small><strong>Police Department</strong></div></div>
        <p>Protecting the life, property, and sovereignty of all members of the Gila River Indian Community since 1939.</p>
        <div class="socials">
          <a href="#" aria-label="Facebook"><img class="img-fb" alt=""></a>
          <a href="https://www.instagram.com/gilariverpd/" target="_blank" rel="noopener" aria-label="Instagram"><img class="img-insta" alt=""></a>
          <a href="#" aria-label="YouTube"><img class="img-yt" alt=""></a>
        </div>
      </div>
      <div class="foot-col"><h4>Quick Links</h4>
        <ul><li><a href="${PAGES.about}">About Us</a></li><li><a href="${PAGES.join}">Join the Team</a></li><li><a href="${PAGES.patrol}">Services</a></li>
            <li><a href="${PAGES.blockWatch}">Crime Prevention</a></li><li><a href="${PAGES.evidence}">Online Forms</a></li><li><a href="${PAGES.news}">News</a></li><li><a href="${PAGES.contact}">Contact</a></li></ul></div>
      <div class="foot-col"><h4>Online Services</h4>
        <ul><li><a href="${PAGES.evidence}">Property &amp; Evidence</a></li><li><a href="${PAGES.records}">Records Requests</a></li><li><a href="${PAGES.commend}">Commendations &amp; Complaints</a></li>
            <li><a href="${PAGES.commReq}">Police Community Request</a></li><li><a href="${PAGES.alerts}">Emergency Alert Sign-Up</a></li></ul></div>
      <div class="foot-col"><h4>Contact</h4>
        <div class="fcontact">
          <p><b>Mailing Address:</b><span>P.O. Box 2186 | Sacaton, AZ 85147</span></p>
          <p><b>Sacaton Headquarters</b><span>637 W. Gu’u Ki Street Drive<br>Sacaton, AZ 85147</span></p>
          <p><b class="inline">Non-Emergency: </b><a href="tel:5205624511"><span>520-562-4511</span></a></p>
          <p><b class="inline">Email: </b><a href="mailto:police@gric.nsn.us"><span>police@gric.nsn.us</span></a></p>
        </div>
      </div>
    </div>
    <div class="foot-bottom"><span>© 2026 Gila River Indian Community Police Department. All rights reserved.</span>
      <nav><a href="${PAGES.privacy}">Privacy Policy</a><a href="${PAGES.terms}">Terms of Use</a></nav></div>
  </div>
</footer>`;

  const mount = (id, html) => { const el = document.getElementById(id); if (el) el.outerHTML = html; };
  mount('site-header', headerHTML);
  mount('site-footer', footerHTML);

  /* ---------- Images (Drive lh3 link, falls back to Drive thumbnail endpoint) ---------- */
  const altSrc = src => { const m = src.match(/googleusercontent\.com\/d\/([^=]+)=w(\d+)/); return m ? `https://drive.google.com/thumbnail?id=${m[1]}&sz=w${m[2]}` : null; };
  window.GRIC_loadImages = (root = document) => {
    Object.entries(window.IMG).forEach(([k, src]) => root.querySelectorAll('.img-' + k).forEach(el => {
      if (el.dataset.loaded) return;
      el.dataset.loaded = '1';
      el.referrerPolicy = 'no-referrer';
      el.addEventListener('error', function retry() { const alt = altSrc(el.src); if (alt) el.src = alt; else el.removeEventListener('error', retry); });
      el.src = src;
    }));
  };
  window.GRIC_loadImages();

  /* ---------- Background-video hero ----------
     GRIC_heroVideo('heroId', ['videos/a.mp4','videos/b.mp4'], 'imgKey')
     Plays the list in order and loops back (a montage). Missing files are skipped;
     if none load, the poster photo stays. Respects reduced motion + has a pause button. */
  window.GRIC_heroVideo = (bgId, playlist, posterKey, opts = {}) => {
    const bg = document.getElementById(bgId); if (!bg) return;
    const vid = bg.querySelector('video'), btn = bg.parentElement.querySelector('.vid-toggle');
    bg.classList.add('has-video');
    if (posterKey && window.IMG[posterKey]) vid.poster = window.IMG[posterKey];
    let i = 0, failed = 0;
    const load = () => { vid.src = playlist[i]; vid.load(); if (!reduce) vid.play().catch(() => {}); };
    const next = () => { i = (i + 1) % playlist.length; load(); };
    /* opts.fallback: loop one video; later list items are only tried if earlier ones fail */
    vid.loop = opts.fallback || playlist.length === 1;
    vid.addEventListener('playing', () => { if (!opts.fallback) failed = 0; bg.classList.add('playing'); btn && btn.classList.add('show'); });
    vid.addEventListener('ended', () => { if (!opts.fallback) next(); });
    vid.addEventListener('error', () => { if (++failed < playlist.length) { i = (i + 1) % playlist.length; load(); } else bg.classList.remove('playing'); });
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (btn) {
      if (reduce) { btn.classList.add('show'); btn.textContent = '▶'; btn.setAttribute('aria-label', 'Play background video'); }
      btn.addEventListener('click', () => {
        if (vid.paused) { vid.play().catch(() => {}); btn.textContent = '❚❚'; btn.setAttribute('aria-label', 'Pause background video'); }
        else { vid.pause(); btn.textContent = '▶'; btn.setAttribute('aria-label', 'Play background video'); }
      });
    }
    load();
  };

  /* ---------- Mobile drawer ---------- */
  const drawer = document.getElementById('drawer');
  const burger = document.querySelector('[data-open-drawer]');
  const setDrawer = open => { drawer.classList.toggle('open', open); drawer.setAttribute('aria-hidden', String(!open)); burger.setAttribute('aria-expanded', String(open)); };
  burger.addEventListener('click', () => setDrawer(true));
  drawer.querySelector('[data-close-drawer]').addEventListener('click', () => setDrawer(false));
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setDrawer(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setDrawer(false); });

  /* ---------- Opening files straight from disk (file://): folder links need index.html ---------- */
  if (location.protocol === 'file:') document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href]').forEach(a => {
      const h = a.getAttribute('href');
      if (/^(https?:|mailto:|tel:|#)/.test(h)) return;
      const u = new URL(h, location.href);
      if (u.pathname.endsWith('/')) { u.pathname += 'index.html'; a.href = u.href; }
    });
  });
})();
