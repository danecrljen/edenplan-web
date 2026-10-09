// Ikone po temi natječaja (inline SVG, tanka linija, bez biblioteka). Koriste ih index.html (vrtuljak) i natjecaji.html (popis).
// Svaka tema ima boju, pozadinu i crtež; dijelovi s klasom "mv" imaju pokret na prelazak mišem (CSS u style.css).
window.IKONE = (function () {
  var T = {
    inovacije: { b: '#0071e3', bg: '#e9f2fc', naziv: 'Inovacije',
      svg: '<path d="M9 18h6M10 21h4" pathLength="100"/><path class="mv glow" d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.3 1 2.1h5c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3z" pathLength="100"/><path class="mv tw" d="M12 7v3M10 9h4" pathLength="100"/>' },
    digitalizacija: { b: '#5856d6', bg: '#eeedfb', naziv: 'Digitalizacija',
      svg: '<rect x="3" y="4" width="18" height="12" rx="2" pathLength="100"/><path d="M8 20h8M12 16v4" pathLength="100"/><path class="mv type" d="M7 8h6M7 11h10" pathLength="100"/>' },
    energija: { b: '#ff9500', bg: '#fff3e0', naziv: 'Energija',
      svg: '<circle class="mv" cx="12" cy="12" r="4" pathLength="100"/><g class="mv spin"><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" pathLength="100"/></g>' },
    okoliš: { b: '#34c759', bg: '#e8f8ec', naziv: 'Okoliš',
      svg: '<g class="mv sway"><path d="M5 20c0-8 5-13 14-14-1 9-6 14-14 14z" pathLength="100"/><path d="M5 20c3-5 7-8 11-11" pathLength="100"/></g>' },
    proizvodnja: { b: '#636366', bg: '#f0f0f2', naziv: 'Proizvodnja',
      svg: '<path d="M3 21V10l6 4v-4l6 4v-4l6 4v7z" pathLength="100"/><path class="mv up" d="M7 7V4h3v3" pathLength="100"/><path d="M7 17h2M11 17h2M15 17h2" pathLength="100"/>' },
    turizam: { b: '#32ade6', bg: '#e6f5fc', naziv: 'Turizam',
      svg: '<path d="M3 20h18" pathLength="100"/><path d="M5 20V9l4-3 4 3v11" pathLength="100"/><path d="M13 20V12l6-2v10" pathLength="100"/><g class="mv spin"><circle cx="19" cy="5" r="2" pathLength="100"/></g><path d="M8 12h2M8 16h2M16 15h1" pathLength="100"/>' },
    poljoprivreda: { b: '#30b84f', bg: '#eaf7ec', naziv: 'Poljoprivreda',
      svg: '<path d="M3 21h18" pathLength="100"/><g class="mv grow"><path d="M12 21V9" pathLength="100"/><path d="M12 15c-4 0-6-2-6-6 4 0 6 2 6 6zM12 11c0-4 2-6 6-6 0 4-2 6-6 6z" pathLength="100"/></g>' },
    infrastruktura: { b: '#8e8e93', bg: '#f1f1f3', naziv: 'Infrastruktura',
      svg: '<path d="M2 20h20" pathLength="100"/><path d="M4 20V9l8-5 8 5v11" pathLength="100"/><path d="M9 20v-6h6v6" pathLength="100"/><path class="mv up" d="M12 4V2" pathLength="100"/>' },
    zapošljavanje: { b: '#ff2d55', bg: '#ffe9ee', naziv: 'Zapošljavanje',
      svg: '<circle cx="9" cy="8" r="3.5" pathLength="100"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" pathLength="100"/><g class="mv up"><circle cx="17.5" cy="9" r="2.5" pathLength="100"/><path d="M16 14.5c3 0 5.5 2 5.5 5.5" pathLength="100"/></g>' },
    internacionalizacija: { b: '#007aff', bg: '#e7f0ff', naziv: 'Internacionalizacija',
      svg: '<g class="mv spin"><circle cx="12" cy="12" r="9" pathLength="100"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" pathLength="100"/></g>' },
    istraživanje: { b: '#af52de', bg: '#f5ebfb', naziv: 'Istraživanje',
      svg: '<path d="M10 3h4" pathLength="100"/><path d="M11 3v6L5.5 19a1.5 1.5 0 0 0 1.3 2.2h10.4a1.5 1.5 0 0 0 1.3-2.2L13 9V3" pathLength="100"/><g class="mv bub"><circle cx="10" cy="16" r="1" pathLength="100"/><circle cx="13.5" cy="18" r=".8" pathLength="100"/></g>' },
    krediti: { b: '#1f2f46', bg: '#eceff4', naziv: 'Krediti i jamstva',
      svg: '<g class="mv flip"><ellipse cx="12" cy="7" rx="7" ry="3" pathLength="100"/><path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7" pathLength="100"/><path d="M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" pathLength="100"/></g>' },
    kultura: { b: '#ff6482', bg: '#ffeaef', naziv: 'Kultura',
      svg: '<path d="M4 21h16" pathLength="100"/><path d="M5 21V10h14v11" pathLength="100"/><path d="M3 10l9-6 9 6" pathLength="100"/><g class="mv up"><path d="M8 21v-7M12 21v-7M16 21v-7" pathLength="100"/></g>' },
    obrazovanje: { b: '#ffcc00', bg: '#fff8d6', naziv: 'Obrazovanje',
      svg: '<path class="mv sway" d="M2 9l10-5 10 5-10 5z" pathLength="100"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" pathLength="100"/><path d="M22 9v6" pathLength="100"/>' }
  };
  var zadano = { b: '#0071e3', bg: '#e9f2fc', naziv: 'Natječaj',
    svg: '<path d="M6 3h8l5 5v13H6z" pathLength="100"/><path d="M14 3v5h5" pathLength="100"/><path class="mv type" d="M9 13h7M9 17h7" pathLength="100"/>' };
  // Ikona po najspecifičnijoj temi (poljoprivreda ispred kredita, proizvodnja ispred digitalizacije i slično), ne po prvoj u popisu.
  var PRIORITET = ['poljoprivreda', 'turizam', 'kultura', 'obrazovanje', 'zapošljavanje', 'energija', 'istraživanje', 'proizvodnja', 'infrastruktura', 'okoliš', 'internacionalizacija', 'digitalizacija', 'inovacije', 'krediti'];
  function tema(p) {
    var teme = p.tema || [];
    // krediti su ikona samo kad su jedina ili prva tema (kreditne linije), inače ih sadržaj bolje opisuje
    if (teme[0] === 'krediti' && (teme.length === 1 || p.status === 'trajno otvoren do iskorištenja')) return 'krediti';
    for (var i = 0; i < PRIORITET.length; i++) if (teme.indexOf(PRIORITET[i]) >= 0 && T[PRIORITET[i]]) return PRIORITET[i];
    return null;
  }
  function html(p, velicina) {
    var k = tema(p), d = k ? T[k] : zadano, s = velicina || 44;
    return '<span class="tik" style="--tb:' + d.b + ';--tbg:' + d.bg + '" title="' + d.naziv + '"><svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" aria-hidden="true">' + d.svg + '</svg></span>';
  }
  return { T: T, html: html, tema: tema, zadano: zadano };
})();
