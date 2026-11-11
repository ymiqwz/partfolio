/* Price list slide: inserted after "My Tools" and before the contact finale.
   Does not modify app.js / app.css — it only adds one section to the DOM. */
(function () {
  var IC = {
    img: '<svg class="pl-ic" viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="6" width="38" height="36" rx="5"/><circle cx="17" cy="18" r="3.6"/><path d="M5 36l12-11 9 8 6-6 11 10"/></svg>',
    phone: '<svg class="pl-ic" viewBox="0 0 48 48" aria-hidden="true"><rect x="13" y="4" width="22" height="40" rx="5"/><path d="M21 8h6M22 38h4"/><path d="M19 28l10-14" opacity=".7"/></svg>',
    deck: '<svg class="pl-ic" viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="6" width="38" height="26" rx="3"/><path d="M21 14l9 5-9 5z"/><path d="M24 3v3M24 32v6M16 44l8-6 8 6"/></svg>',
    bolt: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M27 3L10 27h12l-3 18 19-26H26z"/></svg>',
    gem: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 6h22l9 12-20 25L4 18z"/><path d="M4 18h40M17 6l-4 12 11 25 11-25-4-12M13 18l11-12 11 12"/></svg>',
    inf: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 24c-4-6-8-9-12-9a9 9 0 100 18c4 0 8-3 12-9s8-9 12-9a9 9 0 110 18c-4 0-8-3-12-9z"/></svg>',
    head: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 28v-6a16 16 0 0132 0v6"/><rect x="5" y="26" width="8" height="13" rx="3"/><rect x="35" y="26" width="8" height="13" rx="3"/><path d="M39 39c0 4-4 6-10 6h-3"/></svg>'
  };
  var T = function (x) { return window.AZ ? window.AZ.tr(x) : x; };
  var isRU = function () { return !!window.AZ && window.AZ.get() === 'ru'; };
  var CUR = function (a, b, c) { return a + ' <u>\u0441\u043e\u043c</u> / ' + b + ' \u20b8'; };
  var row = function (label, n, a, k, r) {
    return '<li style="--r:' + r + 's"><span>' + label + '</span><div class="pl-pr"><b><i class="pl-n" data-n="' + n + '">' + n + '</i> \u20bd</b><small>' + a + ' <u>\u0441\u043e\u043c</u> / ' + k + ' \u20b8</small></div></li>';
  };
  var feat = function (svg, t, d) { return '<div class="pl-feat" data-rv style="--d:' + d + 's">' + svg + '<span>' + t + '</span></div>'; };

  function html() {
    return '<div class="pl-stage">' +
      '<div class="pl-bg" aria-hidden="true"><i class="pl-glow g1"></i><i class="pl-glow g2"></i>' +
        '<i class="pl-beam b1"></i><i class="pl-beam b2"></i><i class="pl-beam b3"></i><i class="pl-beam b4"></i><i class="pl-beam b5"></i>' +
        '<i class="pl-spark s1"></i><i class="pl-spark s2"></i><i class="pl-spark s3"></i></div>' +
      '<p class="pl-top" data-rv style="--d:.05s"><span>AZUYA</span><i>/</i><span>' + T('DESIGN SERVICES') + '</span></p>' +
      '<h2 class="pl-title" data-rv style="--d:.15s" aria-label="' + T('Price list') + '"><span class="pl-tw" aria-hidden="true"><span class="pl-g p" data-text="' + T('PRICE') + '">' + T('PRICE') + '</span> <span class="pl-g l" data-text="' + T('LIST') + '">' + T('LIST') + '</span></span></h2>' +
      '<p class="pl-sub" data-rv style="--d:.45s">' + T('TURN YOUR IDEAS INTO <b>VISUALS</b>') + '</p>' +
      '<div class="pl-cards">' +
        '<article class="pl-card c1" data-rv style="--d:.6s"><div class="pl-ch">' + IC.img + '<div><h3>' + T('INFOGRAPHICS') + '</h3><p>' + T('Clean and engaging visuals') + '</p></div></div>' +
          '<ul class="pl-rows">' + row(T('Main slide'), 500, 500, '2\u00a0500', .95) + row(T('+ Additional slide'), 450, 450, '2\u00a0250', 1.1) + row(T('From 10 slides'), 400, 400, '2\u00a0000', 1.25) + '</ul></article>' +
        '<article class="pl-card c2" data-rv style="--d:.75s"><div class="pl-ch">' + IC.phone + '<div><h3>' + T('STORIES &amp; POSTS') + '</h3><p>' + T('Creative content<br>for social media') + '</p></div></div>' +
          '<div class="pl-big"><b style="--r:1.1s"><i class="pl-n" data-n="500">500</i> \u20bd</b><small style="--r:1.25s">500 <u>\u0441\u043e\u043c</u> / 2\u00a0500 \u20b8</small></div></article>' +
        '<article class="pl-card c3" data-rv style="--d:.9s"><div class="pl-ch">' + IC.deck + '<div><h3>' + T('PRESENTATIONS') + '</h3><p>' + T('Professional slides<br>for any purpose') + '</p></div></div>' +
          '<div class="pl-big"><span style="--r:1s">' + T('10 slides') + '</span><b style="--r:1.15s"><i class="pl-n" data-n="3000">3\u00a0000</i> \u20bd</b><small style="--r:1.3s">3\u00a0000 <u>\u0441\u043e\u043c</u> / 15\u00a0000 \u20b8</small></div></article>' +
      '</div>' +
      '<div class="pl-why">' +
        '<h3 class="pl-wh" data-rv style="--d:1.1s">' + T('WHY <b>CHOOSE ME?</b>') + '</h3>' +
        '<div class="pl-feats">' + feat(IC.bolt, T('Fast<br>Delivery'), 1.25) + feat(IC.gem, T('Premium<br>Quality'), 1.35) + feat(IC.inf, T('Unlimited<br>Revisions'), 1.45) + feat(IC.head, T('Friendly<br>Support'), 1.55) + '</div>' +
        '<p class="pl-cta" data-rv style="--d:1.7s"><span>' + T('PL: LET\u2019S CREATE') + '</span> <b>' + T('SOMETHING NEW!') + '</b></p>' +
      '</div></div>';
  }

  var fmt = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0'); };
  function count(root) {
    var els = root.querySelectorAll ? [].slice.call(root.querySelectorAll('.pl-n')) : [];
    if (root.classList && root.classList.contains('pl-n')) els.push(root);
    els.forEach(function (el) {
      var to = +el.getAttribute('data-n'), t0 = null, dur = 1400;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = fmt(to); return; }
      cancelAnimationFrame(el.__raf || 0);
      var delay = 350;
      (function step(ts) {
        if (t0 === null) t0 = ts + delay;
        var p = Math.max(0, Math.min(1, (ts - t0) / dur)), e = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(Math.round(to * e));
        if (p < 1) el.__raf = requestAnimationFrame(step);
      })(performance.now());
    });
  }


  /* make the headline fit its design box whatever font actually loads */
  function fitAll(sec) {
    var st = sec.querySelector('.pl-stage'), mob = window.matchMedia('(max-width:819px)').matches;
    var cv = document.createElement('canvas').getContext('2d'); if (!cv) return;
    cv.font = (isRU() ? '700 100px Anton, Oswald, Impact, "Arial Narrow", sans-serif' : '400 100px Anton, Impact, "Arial Narrow", sans-serif');
    var txt = mob ? T('PRICE') : T('PRICE') + ' ' + T('LIST'), m = cv.measureText(txt), h = cv.measureText('H');
    var w = m.width / 100, cap = (h.actualBoundingBoxAscent || 73) / 100;
    var asc = (h.fontBoundingBoxAscent || 88) / 100, des = (h.fontBoundingBoxDescent || 12) / 100;
    var lh = mob ? 0.86 : 1, fs, sx;
    if (mob) { sx = 1.12; fs = 80 / (w * sx); } else { fs = 9.9 / cap; sx = 70 / (w * fs); }
    // distance from the top of the line box to the top of the capital letters
    var off = ((lh - (asc + des)) / 2 + asc - cap) * fs;
    st.style.setProperty('--tfs', fs.toFixed(3) + 'cqw'); st.style.setProperty('--tsx', sx.toFixed(3));
    st.style.setProperty('--toff', off.toFixed(3) + 'cqw');
    // shrink single-line display headings that would overflow their box (fallback fonts are wider than Anton)
    [].forEach.call(sec.querySelectorAll('.pl-ch h3,.pl-wh b,.pl-wh,.pl-cta b,.pl-cta span'), function (el) {
      el.style.fontSize = '';
      var pn = el.parentNode, pad = parseFloat(getComputedStyle(pn).paddingLeft) || 0;
      var avail = (el.tagName === 'B' || el.tagName === 'SPAN') ? pn.clientWidth - pad : el.clientWidth;
      if (el.scrollWidth > avail + 1 && avail > 0) el.style.fontSize = (parseFloat(getComputedStyle(el).fontSize) * (avail - 2) / el.scrollWidth) + 'px';
    });
  }

  function init(sec) {
    var mq = window.matchMedia('(max-width:819px)');
    var items = [];
    var inView = new IntersectionObserver(function (es) { es.forEach(function (e) { sec.classList.toggle('live', e.isIntersecting); }); }, { rootMargin: '200px 0px' });
    inView.observe(sec);

    // desktop: the whole slide staggers in together; mobile: each block comes in by itself
    var io;
    function setup() {
      if (io) io.disconnect();
      items = [].slice.call(sec.querySelectorAll('[data-rv]'));
      items.forEach(function (el) { el.classList.remove('in'); });
      if (mq.matches) {
        io = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            var el = e.target;
            if (e.isIntersecting) { if (!el.classList.contains('in')) { el.classList.add('in'); count(el); } }
            else if (e.boundingClientRect.top > 0) el.classList.remove('in'); // below the screen again -> replay next time
          });
        }, { rootMargin: '0px 0px -16% 0px', threshold: 0.12 });
        items.forEach(function (el) { io.observe(el); });
      } else {
        io = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) { items.forEach(function (el) { el.classList.add('in'); }); count(sec); }
            else if (e.intersectionRatio === 0) items.forEach(function (el) { el.classList.remove('in'); });
          });
        }, { threshold: [0, 0.3] });
        io.observe(sec.querySelector('.pl-stage'));
      }
    }
    setup();
    var refit = function () { fitAll(sec); };
    refit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refit);
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', refit);
    window.addEventListener('resize', refit);
    window.addEventListener('azlang', function () {
      sec.innerHTML = html();
      setup(); refit();
    });
    (mq.addEventListener ? mq.addEventListener('change', setup) : mq.addListener(setup));
  }

  var tries = 0;
  (function place() {
    var fin = document.querySelector('.finale'), tools = document.getElementById('my-tools');
    if (fin && fin.parentNode && (tools || tries > 80)) {
      if (document.getElementById('price')) return;
      var sec = document.createElement('section');
      sec.className = 'pl'; sec.id = 'price'; sec.innerHTML = html();
      if (tools && tools.parentNode) tools.parentNode.insertBefore(sec, tools.nextSibling); else fin.parentNode.insertBefore(sec, fin);
      init(sec);
      return;
    }
    if (++tries < 240) setTimeout(place, 50);
  })();
})();
