// Zajednički pomoćnici za stranice natječaja (naslovnica, popis, stranica natječaja). Bez biblioteka.
// Ovisi o ikone.js (teme) i scene.js (animirane scene); ako scene.js nije učitan, kartica ide bez scene.
window.NAT = (function () {
  var danas = new Date(); danas.setHours(0, 0, 0, 0);
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function kratko(s, n) { s = String(s || ''); return s.length > n ? s.slice(0, n).replace(/[\s,;:(]+\S*$/, '') + '…' : s; }
  function dana(rok) { return Math.round((new Date(rok + 'T00:00:00') - danas) / 86400000); }
  function datum(iso) { if (!iso) return ''; var p = iso.split('-'); return (+p[2]) + '.' + (+p[1]) + '.' + p[0] + '.'; }
  function rijecDan(n) { return (n % 10 === 1 && n % 100 !== 11) ? 'dan' : 'dana'; }
  function aktivan(p) { return p.zemlja !== 'Crna Gora' && (!p.rok || new Date(p.rok + 'T23:59:59') >= danas); }
  // oznaka statusa: tekst i klasa (hot = rok za manje od 3 tjedna, naj = najava)
  function status(p) {
    if (p.status === 'najavljen') return { t: 'najava', c: 'naj' };
    if (p.status === 'obustavljen') return { t: 'privremeno obustavljen', c: '' };
    if (!p.rok) return { t: 'do iskorištenja sredstava', c: '' };
    var d = dana(p.rok); if (d <= 0) return { t: 'rok je danas', c: 'hot' };
    return { t: 'još ' + d + ' ' + rijecDan(d), c: d <= 21 ? 'hot' : '' };
  }
  function red(p) { return (p.istaknuto ? 0 : 10) + (p.status === 'najavljen' ? 2 : (p.rok ? 0 : 1)); }
  function poredaj(a, b) { var d = red(a) - red(b); if (d) return d; var ra = a.rok || '9999-12-31', rb = b.rok || '9999-12-31'; return ra < rb ? -1 : (ra > rb ? 1 : (a.naziv < b.naziv ? -1 : 1)); }
  var KOGA = { 'firme': 'firme', 'javna tijela': 'gradovi i općine', 'ustanove': 'ustanove', 'poljoprivreda': 'poljoprivreda', 'udruge': 'udruge', 'fizičke osobe': 'pojedinci' };
  function temaInfo(p) {
    var k = window.IKONE && window.IKONE.tema(p), T = k ? window.IKONE.T[k] : (window.IKONE ? window.IKONE.zadano : { b: '#0071e3', bg: '#e9f2fc', naziv: 'Natječaj' });
    return { k: k, b: T.b, bg: T.bg, naziv: T.naziv };
  }
  function link(p) { return 'natjecaj.html?id=' + encodeURIComponent(p.id); }
  function scena(p, klasa) { return window.SCENE ? window.SCENE.html(p, { klasa: klasa || '' }) : '<div class="scena scena-prazna" style="--sc-bg:' + temaInfo(p).bg + '"></div>'; }
  // kartica natječaja za mreže (popis, srodni natječaji)
  function kartica(p) {
    var s = status(p), t = temaInfo(p), koga = (p.za_koga || []).map(function (k) { return KOGA[k] || k; }).filter(function (k) { return k !== 'pojedinci'; }).slice(0, 2).join(', ');
    return '<article class="nk">' +
      '<a class="nk-slika" href="' + link(p) + '" aria-label="' + esc(p.naziv) + '">' + scena(p, 'nk-scena') +
      '<span class="nk-status ' + s.c + '">' + s.t + '</span></a>' +
      '<div class="nk-tijelo">' +
      '<div class="nk-oznake"><span class="nk-tema" style="--tb:' + t.b + '"><i></i>' + esc(t.naziv) + '</span><span>' + (p.zemlja === 'EU' ? 'Program EU' : 'Hrvatska') + '</span>' + (koga ? '<span>' + esc(koga) + '</span>' : '') + '</div>' +
      '<h3><a href="' + link(p) + '">' + esc(p.naziv) + '</a></h3>' +
      '<p class="nk-iznos">' + esc(kratko(p.iznos, 120)) + '</p>' +
      '<div class="nk-dno"><span class="nk-rok">' + (p.rok ? 'Rok ' + datum(p.rok) : (p.status === 'najavljen' ? 'Najava' : 'Do iskorištenja')) + '</span><a class="link" href="' + link(p) + '">Detalji</a></div>' +
      '</div></article>';
  }
  var predmemorija = null;
  function ucitaj() {
    if (predmemorija) return predmemorija;
    predmemorija = fetch('pozivi.json', { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
    return predmemorija;
  }
  return { esc: esc, kratko: kratko, dana: dana, datum: datum, rijecDan: rijecDan, aktivan: aktivan, status: status, poredaj: poredaj, temaInfo: temaInfo, link: link, scena: scena, kartica: kartica, ucitaj: ucitaj, KOGA: KOGA, danas: danas };
})();

// Izbornik na mobitelu: otvara se i zatvara glatko (CSS), zatvara se dodirom na poveznicu, dodirom izvan izbornika ili tipkom Esc.
(function () {
  function init() {
    var b = document.querySelector('.burger'), m = document.getElementById('menu');
    if (!b || !m) return;
    function postavi(otvoren) { m.classList.toggle('open', otvoren); b.classList.toggle('open', otvoren); b.setAttribute('aria-expanded', otvoren ? 'true' : 'false'); }
    b.addEventListener('click', function (e) { e.stopPropagation(); postavi(!m.classList.contains('open')); });
    m.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('a')) postavi(false); });
    document.addEventListener('click', function (e) { if (m.classList.contains('open') && !m.contains(e.target) && !b.contains(e.target)) postavi(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') postavi(false); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
