/* My Tools slide: inserted between "works" and the contact finale.
   Does not modify app.js / app.css — it only adds one section to the DOM. */
(function () {
  var W = 1672, H = 941;
  // sprite boxes cut from the design (px in the 1672x941 design)
  var ICONS = [
    { f: 'gpt', x: 227,  y: 85, w: 175, h: 164, d: 5.2, dl: 0,    s: 0.00 },
    { f: 'pin', x: 533,  y: 56, w: 135, h: 127, d: 4.6, dl: -1.2, s: 0.07 },
    { f: 'fig', x: 782,  y: 55, w: 144, h: 137, d: 5.6, dl: -2.1, s: 0.14 },
    { f: 'ps',  x: 1040, y: 93, w: 166, h: 154, d: 4.9, dl: -0.6, s: 0.21 }
  ];
  var LENSES = [
    { cx: 1105, cy: 386, rx: 25, ry: 21, rot: -6, gd: 1.0 },
    { cx: 1192, cy: 383, rx: 36, ry: 22, rot: 8,  gd: 1.12 }
  ];
  var base = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/[^\/]*$/, '') : './tools/';
  })();
  var pct = function (v, t) { return (v / t * 100).toFixed(3) + '%'; };
  var T = function (s) { return window.AZ ? window.AZ.tr(s) : s; };
  var isRU = function () { return !!window.AZ && window.AZ.get() === 'ru'; };
  var LONG = 'My Tools \u2014 a set of modern tools for creativity and productivity';
  var SUB = 'A SET OF MODERN TOOLS<br>FOR CREATIVITY AND<br>PRODUCTIVITY.';

  function build() {
    var sec = document.createElement('section');
    sec.className = 'mt'; sec.id = 'my-tools'; sec.setAttribute('aria-label', T('My tools'));
    var h = '<div class="mt-stage"><img class="mt-bg" alt="' + T(LONG) + '" src="' + base + (isRU() ? 'bg-ru.jpg' : 'bg.jpg') + '" draggable="false"><div class="mt-ru">' + (isRU() ? ruDesk() : '') + '</div>';
    LENSES.forEach(function (l) {
      h += '<div class="mt-lens" style="left:' + pct(l.cx - l.rx, W) + ';top:' + pct(l.cy - l.ry, H) +
           ';width:' + pct(l.rx * 2, W) + ';height:' + pct(l.ry * 2, H) + ';transform:rotate(' + l.rot + 'deg);--gd:' + l.gd + 's"></div>';
    });
    h += '<span class="mt-star" style="left:' + pct(1112, W) + ';top:' + pct(376, H) + ';--gd:1.2s"></span>';
    h += '<span class="mt-star" style="left:' + pct(1212, W) + ';top:' + pct(374, H) + ';--gd:1.32s;width:1.8cqw;height:1.8cqw"></span>';
    ICONS.forEach(function (i) {
      h += '<div class="mt-ico" data-s="' + i.s + '" style="left:' + pct(i.x, W) + ';top:' + pct(i.y, H) +
           ';width:' + pct(i.w, W) + ';height:' + pct(i.h, H) + '"><div class="mt-ico-in" style="--d:' + i.d + 's;--dl:' + i.dl +
           's"><img alt="" src="' + base + i.f + '.png" draggable="false"></div></div>';
    });
    sec.innerHTML = h + '</div><div class="mt-m" role="img" aria-label="' + T(LONG) + '">' + buildMobile() + '</div>';
    return sec;
  }


  /* ---------- mobile layout (rebuilt, not a shrunk picture) ---------- */
  var GLYPHS = {
    M: ['1100011','1110111','1111111','1101011','1100011','1100011','1100011'],
    Y: ['110011','110011','111111','001100','001100','001100','001100'],
    T: ['111111','111111','001100','001100','001100','001100','001100'],
    O: ['111111','111111','110011','110011','110011','111111','111111'],
    L: ['110000','110000','110000','110000','110000','111111','111111'],
    S: ['111111','111111','110000','111111','000011','111111','111111']
  };
  /* Cyrillic pixel letters, drawn in the same 7-row style (rows 0-1 are headroom for the breve of Й) */
  function cg(rows, acc) {
    var b = new Array(rows[0].length + 1).join('0');
    return [acc ? acc[0] : b, acc ? acc[1] : b].concat(rows);
  }
  var RG = {
    'М': cg(GLYPHS.M), 'О': cg(GLYPHS.O), 'Т': cg(GLYPHS.T),
    'С': cg(['111111','111111','110000','110000','110000','111111','111111']),
    'Й': cg(['110011','110011','110111','111011','110011','110011','110011'], ['010010','001100']),
    'Ф': cg(['00111100','11111111','11011011','11011011','11011011','11111111','00111100'])
  };
  function wordRects(word, G) {
    var r = '', ox = 0;
    for (var k = 0; k < word.length; k++) {
      var g = G[word.charAt(k)], gw = g[0].length;
      for (var y = 0; y < g.length; y++) for (var x = 0; x < gw; x++)
        if (g[y].charAt(x) === '1') r += '<rect x="' + (ox + x) + '" y="' + y + '" width="1.02" height="1.02"/>';
      ox += gw + 1;
    }
    return { r: r, cols: ox - 1 };
  }
  function pixelWord(word, cls) {
    var cyr = /[Ѐ-ӿ]/.test(word), w = wordRects(word, cyr ? RG : GLYPHS), y0 = 0, h = 7;
    if (cyr) { var acc = word.indexOf('Й') >= 0; y0 = acc ? 0 : 2; h = acc ? 9 : 7; }
    return '<svg class="mt-m-word ' + cls + '" viewBox="0 ' + y0 + ' ' + w.cols + ' ' + h + '" shape-rendering="crispEdges" style="width:' +
           (w.cols / 34 * 84).toFixed(2) + 'cqw"><g class="sh" transform="translate(.28 .28)">' + w.r + '</g><g class="fg">' + w.r + '</g></svg>';
  }
  var CELL = 23.6; // one pixel of the title in the 1672-wide design
  function ruDesk() {
    function word(txt, cls, x, y) {
      var w = wordRects(txt, RG);
      return '<g class="' + cls + '" transform="translate(' + x + ' ' + (y - 2 * CELL).toFixed(1) + ') scale(' + CELL + ')"><g class="sh" transform="translate(.28 .28)">' + w.r + '</g><g class="fg">' + w.r + '</g></g>';
    }
    return '<svg viewBox="0 0 1672 941" preserveAspectRatio="none" shape-rendering="crispEdges" aria-hidden="true">' +
           word('МОЙ', 'my', 122, 278) + word('СОФТ', 'tl', 105, 430) + '</svg>' +
           '<i class="mt-ru-bar"></i><p class="mt-ru-sub">' + T(SUB) + '</p>';
  }
  function mTitle() {
    return isRU() ? pixelWord('МОЙ', 'my') + pixelWord('СОФТ', 'tools')
                  : pixelWord('MY', 'my') + pixelWord('TOOLS', 'tools');
  }
  var MI = [ // mobile icons: x/y/width in cqw
    { f: 'gpt', x: 2,    y: 9,  w: 27.1, d: 5.2, dl: 0,    s: 0.00 },
    { f: 'pin', x: 31,   y: 3.5,  w: 20.9, d: 4.6, dl: -1.2, s: 0.07 },
    { f: 'fig', x: 54,   y: 12, w: 22.3, d: 5.6, dl: -2.1, s: 0.14 },
    { f: 'ps',  x: 73,   y: 3,  w: 25.7, d: 4.9, dl: -0.6, s: 0.21 }
  ];
  var SPR = { gpt: [175, 164], pin: [135, 127], fig: [144, 137], ps: [166, 154] };
  // glasses on the mobile character (px inside the 963x1180 image)
  var CW = 963, CH = 1180;
  var MLENS = [
    { cx: 352, cy: 155, rx: 35, ry: 23, rot: -3, gd: 1.0 },
    { cx: 455, cy: 150, rx: 38, ry: 23, rot: -3, gd: 1.12 }
  ];
  function buildMobile() {
    var h = '<div class="mt-m-bg" aria-hidden="true">' +
      '<svg class="mt-m-deco" viewBox="0 0 100 188" preserveAspectRatio="xMidYMin slice" fill="none">' +
        '<path d="M-6 34 C 22 -8, 78 -8, 106 34" stroke="#ff7a1c" stroke-opacity=".55" stroke-width=".35"/>' +
        '<path d="M-10 150 C 30 112, 80 120, 112 96" stroke="#ff7a1c" stroke-opacity=".4" stroke-width=".3"/>' +
        '<g fill="#ff6a10">' +
          '<rect x="88" y="40" width="12" height="6" opacity=".55"/><rect x="94" y="46" width="6" height="14" opacity=".5"/>' +
          '<rect x="82" y="60" width="6" height="6" opacity=".35"/><rect x="0" y="96" width="5" height="10" opacity=".35"/>' +
          '<rect x="0" y="106" width="10" height="5" opacity=".3"/><rect x="92" y="120" width="8" height="8" opacity=".4"/>' +
          '<rect x="86" y="128" width="6" height="14" opacity=".35"/><rect x="0" y="150" width="8" height="8" opacity=".3"/>' +
          '<rect x="6" y="158" width="6" height="6" opacity=".3"/><rect x="10" y="36" width="2.4" height="2.4" opacity=".8"/>' +
          '<rect x="52" y="70" width="2.4" height="2.4" opacity=".7"/><rect x="90" y="84" width="2.4" height="2.4" opacity=".8"/>' +
        '</g>' +
        '<g stroke="#ff9a4a" stroke-width=".5" opacity=".9"><path d="M29 6h3M30.5 4.5v3"/><path d="M84 38h3M85.5 36.5v3"/><path d="M6 82h3M7.5 80.5v3"/><path d="M93 100h3M94.5 98.5v3"/></g>' +
      '</svg></div>';
    h += '<div class="mt-m-title">' + mTitle() + '</div>';
    h += '<p class="mt-m-sub"><i></i><span>' + T(SUB) + '</span></p>';
    h += '<div class="mt-m-char"><img alt="" src="' + base + 'char-m.webp" draggable="false">';
    MLENS.forEach(function (l) {
      h += '<div class="mt-lens" style="left:' + pct(l.cx - l.rx, CW) + ';top:' + pct(l.cy - l.ry, CH) + ';width:' + pct(l.rx * 2, CW) +
           ';height:' + pct(l.ry * 2, CH) + ';transform:rotate(' + l.rot + 'deg);--gd:' + l.gd + 's"></div>';
    });
    h += '<span class="mt-star" style="left:' + pct(365, CW) + ';top:' + pct(138, CH) + ';--gd:1.2s"></span>';
    h += '<span class="mt-star" style="left:' + pct(483, CW) + ';top:' + pct(134, CH) + ';--gd:1.32s;width:5cqw;height:5cqw;margin:-2.5cqw 0 0 -2.5cqw"></span></div>';
    MI.forEach(function (i) {
      var hh = i.w * SPR[i.f][1] / SPR[i.f][0];
      h += '<div class="mt-ico" data-rise=".62" data-s="' + i.s + '" style="left:' + i.x + 'cqw;top:' + i.y + 'cqw;width:' + i.w + 'cqw;height:' + hh.toFixed(2) +
           'cqw"><div class="mt-ico-in" style="--d:' + i.d + 's;--dl:' + i.dl + 's"><img alt="" src="' + base + i.f + '.png" draggable="false"></div></div>';
    });
    return h;
  }

  var clamp = function (v) { return Math.max(0, Math.min(1, v)); };
  var ease = function (t) { return 1 - Math.pow(1 - t, 3); };

  function init(sec) {
    var stage = sec.querySelector('.mt-stage');
    var icons = [].slice.call(sec.querySelectorAll('.mt-ico'));
    var raf = 0;
    function update() {
      raf = 0;
      var r = sec.getBoundingClientRect(), vh = window.innerHeight || 800;
      // enter: icons rise from the bottom of the slide while it scrolls into view
      var enter = clamp((vh * 0.95 - r.top) / (vh * 0.75));
      // exit: they fade away as we scroll down towards "Get in touch"
      var exit = clamp((vh * 0.9 - r.bottom) / (vh * 0.55));
      icons.forEach(function (el) {
        var s = parseFloat(el.dataset.s) || 0;
        var e = ease(clamp((enter - s) / (1 - s)));
        var x = ease(clamp((exit - s * 0.5) / (1 - s * 0.5)));
        var sh = el.parentNode.clientHeight, k = parseFloat(el.dataset.rise) || 0.85;
        var up = (1 - e) * sh * k - x * sh * 0.22;
        el.style.opacity = (e * (1 - x)).toFixed(3);
        el.style.transform = 'translate3d(0,' + up.toFixed(1) + 'px,0) scale(' + (0.7 + 0.3 * e - 0.12 * x).toFixed(3) + ')';
      });
    }
    function req() { if (!raf) raf = requestAnimationFrame(update); }
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    update();
  }

  function applyLang(sec) {
    var ru = isRU();
    sec.setAttribute('aria-label', T('My tools'));
    var img = sec.querySelector('.mt-bg');
    img.alt = T(LONG); img.src = base + (ru ? 'bg-ru.jpg' : 'bg.jpg');
    sec.querySelector('.mt-ru').innerHTML = ru ? ruDesk() : '';
    var m = sec.querySelector('.mt-m');
    m.setAttribute('aria-label', T(LONG));
    m.querySelector('.mt-m-title').innerHTML = mTitle();
    m.querySelector('.mt-m-sub span').innerHTML = T(SUB);
  }

  var tries = 0;
  (function place() {
    var fin = document.querySelector('.finale');
    if (fin && fin.parentNode) {
      if (document.getElementById('my-tools')) return;
      var sec = build();
      fin.parentNode.insertBefore(sec, fin);
      init(sec);
      window.addEventListener('azlang', function () { applyLang(sec); });
      return;
    }
    if (++tries < 200) setTimeout(place, 50);
  })();
})();
