/* Language switch (EN / RU).
   Loaded BEFORE app.js. Exposes window.AZ:
     AZ.tr("English text")  -> Russian text when RU is on (falls back to the English string)
     AZ.set("ru" | "en")    -> switch language, remember it, notify the page
   The choice is kept in localStorage under "az-lang". */
(function () {
  var KEY = 'az-lang', lang = 'en', subs = [];
  try { var saved = localStorage.getItem(KEY); if (saved === 'ru' || saved === 'en') lang = saved; } catch (e) {}

  /* Russian copy. Keys are the exact English strings used on the page. */
  var RU = {
    /* hero */
    'GRAPHIC': 'ГРАФИЧЕСКИЙ',
    ' DESIGNER': ' ДИЗАЙНЕР',
    'GRAPHIC DESIGNER': 'ГРАФИЧЕСКИЙ ДИЗАЙНЕР',
    'YOU CAN CONTACT ME VIA TELEGRAM ': 'ПИШИТЕ МНЕ В TELEGRAM ',
    'PORTFOLIO': 'ПОРТФОЛИО',
    'Hi, I’m': 'Привет, я',
    'With 3+ years of experience. Creating eye-catching designs for marketplaces, ads, and social media.':
      'Больше 3 лет в деле. Делаю дизайн, который цепляет взгляд: для маркетплейсов, рекламы и соцсетей.',
    'GRAPHIC DESIGNER • 3 YEARS • GRAPHIC DESIGNER • 3 YEARS • ':
      'ГРАФИЧЕСКИЙ ДИЗАЙНЕР • 3 ГОДА • ГРАФИЧЕСКИЙ ДИЗАЙНЕР • 3 ГОДА • ',
    'Azuya — 3D avatar': 'Azuya — 3D-аватар',
    'BANNERS': 'БАННЕРЫ',
    'BRANDING': 'БРЕНДИНГ',
    'MARKETPLACES': 'МАРКЕТПЛЕЙСЫ',
    'ADS': 'РЕКЛАМА',
    'SOCIAL MEDIA': 'СОЦСЕТИ',

    /* works */
    'SOME OF MY WORKS ': 'ИЗБРАННЫЕ РАБОТЫ ',
    'Hover to lean \xB7 Click to open \xB7 Click a work to view it':
      'Наведите — папка наклонится \xB7 Нажмите — откроется \xB7 Нажмите на работу, чтобы посмотреть',
    'Ads & Beauty': 'Реклама и бьюти',
    'Kazakh Lessons': 'Уроки казахского',
    'Alga Taxi': 'Alga Taxi',
    'Infographics': 'Инфографика',
    '4 works': '4 работы',
    '2 works': '2 работы',
    '12 works': '12 работ',
    'Stories 9:16': 'Сторис 9:16',
    'Product card': 'Карточка товара',
    'Infographic 3:4': 'Инфографика 3:4',
    'Infographic 9:16': 'Инфографика 9:16',
    'Fly Dubai — promo': 'Fly Dubai — промо',
    'Short hair': 'Короткая стрижка',
    'Sun protection': 'Защита от солнца',
    'Makeup course': 'Курс макияжа',
    'Free trial — girl': 'Пробный урок — девушка',
    'Free trial — boy': 'Пробный урок — парень',
    'Up to 1M tenge': 'До 1 млн тенге',
    'Instant payout': 'Мгновенные выплаты',
    '5 000 tg bonus': 'Бонус 5 000 ₸',
    'Join the park': 'Присоединяйся к парку',
    'Men\'s watch': 'Мужские часы',
    'Cordless vacuum': 'Беспроводной пылесос',
    'HAVIT gaming headset': 'Игровые наушники HAVIT',
    'Expel — drain cleaner': 'Expel — средство для прочистки труб',
    'Expel — sink siphon': 'Expel — сифон для раковины',
    'Tracksuit 48–62': 'Спортивный костюм 48–62',
    'SPA N°1 — mango massage oil': 'SPA №1 — манговое масло для массажа',
    'K\xF6ttur — massage oil': 'K\xF6ttur — массажное масло',
    'Watermelon coconut tea': 'Арбузный чай с кокосовым молоком',
    'Karaoke wireless mic': 'Беспроводной микрофон для караоке',
    'Previous work': 'Предыдущая работа',
    'Next work': 'Следующая работа',
    'Close': 'Закрыть',
    'Open ': 'Открыть ',
    'Close ': 'Закрыть ',
    ' item': ' шт.',
    ' items': ' шт.',
    ' contents': ': содержимое',

    /* finale */
    'LET’S CREATE': 'СОЗДАДИМ',
    'SOMETHING': 'ЧТО-ТО',
    'UNFORGETTABLE': 'НЕЗАБЫВАЕМОЕ',
    'GET IN TOUCH ': 'КОНТАКТЫ ',
    'I am currently open to freelance projects and collaborations.':
      'Принимаю фриланс-заказы и рассматриваю сотрудничество.',
    'Telegram QR code': 'QR-код Telegram',
    'Instagram QR code': 'QR-код Instagram',
    'QR code': 'QR-код',

    /* my tools slide */
    'My tools': 'Мой софт',
    'My Tools — a set of modern tools for creativity and productivity':
      'Мой софт — современные инструменты для творчества и работы',
    'A SET OF MODERN TOOLS<br>FOR CREATIVITY AND<br>PRODUCTIVITY.':
      'СОВРЕМЕННЫЕ ИНСТРУМЕНТЫ<br>ДЛЯ ТВОРЧЕСТВА<br>И РАБОТЫ.',

    /* price list slide */
    'Price list': 'Прайс-лист',
    'DESIGN SERVICES': 'УСЛУГИ ДИЗАЙНА',
    'PRICE': 'ПРАЙС',
    'LIST': 'ЛИСТ',
    'TURN YOUR IDEAS INTO <b>VISUALS</b>': 'ВОПЛОЩАЮ ИДЕИ В <b>ВИЗУАЛ</b>',
    'INFOGRAPHICS': 'ИНФОГРАФИКА',
    'Clean and engaging visuals': 'Аккуратная и цепляющая подача',
    'Main slide': 'Главный слайд',
    '+ Additional slide': '+ Доп. слайд',
    'From 10 slides': 'От 10 слайдов',
    'STORIES &amp; POSTS': 'СТОРИС И ПОСТЫ',
    'Creative content<br>for social media': 'Креатив<br>для соцсетей',
    'PRESENTATIONS': 'ПРЕЗЕНТАЦИИ',
    'Professional slides<br>for any purpose': 'Слайды<br>под любую задачу',
    '10 slides': '10 слайдов',
    'WHY <b>CHOOSE ME?</b>': 'ПОЧЕМУ <b>ИМЕННО Я?</b>',
    'Fast<br>Delivery': 'Быстрые<br>сроки',
    'Premium<br>Quality': 'Высокое<br>качество',
    'Unlimited<br>Revisions': 'Правки<br>без лимита',
    'Friendly<br>Support': 'Всегда<br>на связи',
    'PL: LET’S CREATE': 'ДАВАЙТЕ СДЕЛАЕМ',
    'SOMETHING NEW!': 'ЧТО-ТО НОВОЕ!',

    /* document */
    '__title': 'Azuya — портфолио графического дизайнера',
    '__desc': 'Azuya — графический дизайнер с опытом больше 3 лет. Карточки для маркетплейсов, реклама и дизайн для соцсетей.'
  };
  var EN_TITLE = document.title, metaDesc = document.querySelector('meta[name="description"]'),
      EN_DESC = metaDesc ? metaDesc.getAttribute('content') : '';

  function apply() {
    document.documentElement.lang = lang;
    document.title = lang === 'ru' ? RU.__title : EN_TITLE;
    if (metaDesc) metaDesc.setAttribute('content', lang === 'ru' ? RU.__desc : EN_DESC);
  }
  apply();

  window.AZ = {
    tr: function (s) { return lang === 'ru' && Object.prototype.hasOwnProperty.call(RU, s) ? RU[s] : s; },
    get: function () { return lang; },
    set: function (l) {
      if (l !== 'ru' && l !== 'en') return;
      if (l === lang) return;
      lang = l;
      try { localStorage.setItem(KEY, l); } catch (e) {}
      apply();
      subs.slice().forEach(function (f) { f(); });
      window.dispatchEvent(new CustomEvent('azlang', { detail: l }));
    },
    subscribe: function (f) {
      subs.push(f);
      return function () { subs = subs.filter(function (x) { return x !== f; }); };
    }
  };
})();

/* The floating button steps aside at the very bottom of the page (it would sit on the QR codes). */
(function () {
  var raf = 0;
  function check() {
    raf = 0;
    var d = document.documentElement, left = d.scrollHeight - (window.scrollY + window.innerHeight);
    d.classList.toggle('az-at-end', left < 160);
  }
  function req() { if (!raf) raf = requestAnimationFrame(check); }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req);
  window.addEventListener('load', req);
})();
