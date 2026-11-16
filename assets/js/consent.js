/*
 * ListifyAI — çerez onayı (bağımlılıksız, TR + EN)
 *
 * - Meta Pixel ve diğer zorunlu olmayan izleyiciler YALNIZ "Kabul et" tıklanınca yüklenir.
 *   Onaydan önce facebook.net / facebook.com'a hiçbir istek gitmez.
 * - "Reddet" ve "Kabul et" aynı boyut ve aynı görünümdedir.
 * - Tercih localStorage'da saklanır (12 ay sonra yeniden sorulur).
 * - Sayfadaki [data-consent-open] öğesi tercih bandını yeniden açar ("Çerez tercihleri").
 * - Piksel yalnız canlı alan adında (listifyai.com.tr) yüklenir; yerel önizleme ölçümü kirletmez.
 */
(function () {
  'use strict';

  var KEY = 'lf_consent_v1';
  var MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
  var PIXEL_ID = '2729736380696002';
  var LIVE_HOST = /^(www\.)?listifyai\.com\.tr$/;

  var lang = (document.documentElement.getAttribute('lang') || 'tr').slice(0, 2).toLowerCase() === 'en' ? 'en' : 'tr';
  var T = {
    tr: {
      label: 'Çerez tercihleri',
      text: 'Zorunlu olmayan çerezleri yalnız onay verirsen kullanırız. Kabul edersen, reklamlarımızın etkisini ölçmek için Meta Pixel (Meta Platforms) yüklenir. Reddedersen site aynı şekilde çalışır. Tercihini sayfa altındaki “Çerez tercihleri” bağlantısından istediğin zaman değiştirebilirsin.',
      more: 'Ayrıntılar',
      href: '/privacy-policy.html#cerezler',
      accept: 'Kabul et',
      reject: 'Reddet',
      current: { yes: 'Şu anki tercihin: kabul edildi.', no: 'Şu anki tercihin: reddedildi.' }
    },
    en: {
      label: 'Cookie preferences',
      text: 'We use non-essential cookies only with your consent. If you accept, Meta Pixel (Meta Platforms) is loaded to measure how our ads perform. If you reject, the site works just the same. You can change your choice at any time via “Cookie preferences” at the bottom of the page.',
      more: 'Details',
      href: '/en/privacy-policy.html#cookies',
      accept: 'Accept',
      reject: 'Reject',
      current: { yes: 'Your current choice: accepted.', no: 'Your current choice: rejected.' }
    }
  }[lang];

  function readChoice() {
    try {
      var v = JSON.parse(window.localStorage.getItem(KEY));
      if (v && typeof v.ads === 'boolean' && typeof v.ts === 'number' && Date.now() - v.ts < MAX_AGE_MS) return v;
    } catch (e) { /* depolama kapalı ya da bozuk: seçim yok say */ }
    return null;
  }

  function saveChoice(ads) {
    try { window.localStorage.setItem(KEY, JSON.stringify({ ads: ads, ts: Date.now(), v: 1 })); } catch (e) { /* depolama yoksa yalnız bu sayfa için geçerli */ }
  }

  var pixelLoaded = false;
  function pixelAllowedHere() {
    return LIVE_HOST.test(location.hostname) || window.__LF_CONSENT_ANY_HOST === true;
  }

  function loadPixel() {
    if (pixelLoaded || !pixelAllowedHere()) return;
    pixelLoaded = true;
    /* Meta'nın standart piksel kodu (yalnız onaydan sonra çalışır) */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('consent', 'grant');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  function clearMetaCookies() {
    var names = ['_fbp', '_fbc'];
    var host = location.hostname;
    var domains = ['', host, '.' + host.replace(/^www\./, '')];
    for (var i = 0; i < names.length; i++) {
      for (var j = 0; j < domains.length; j++) {
        document.cookie = names[i] + '=; Max-Age=0; path=/' + (domains[j] ? '; domain=' + domains[j] : '');
      }
    }
  }

  function applyChoice(ads) {
    if (ads) {
      loadPixel();
    } else {
      if (pixelLoaded && typeof window.fbq === 'function') window.fbq('consent', 'revoke');
      clearMetaCookies();
    }
  }

  /* Uygulama indirme bağlantısı tıklaması → Lead (yalnız onay varsa) */
  window.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href*="apps.apple.com"], a[href*="play.google.com"], a[href*="sng.link"]');
    var c = readChoice();
    if (a && c && c.ads && pixelLoaded && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', { content_name: 'app_download' });
    }
  }, true);

  var CSS =
    '.lfc{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483000;max-width:640px;margin:0 auto;' +
    'background:#12140F;color:#F5F5F0;border:1px solid rgba(245,245,240,.14);border-radius:16px;' +
    'box-shadow:0 12px 40px rgba(0,0,0,.45);padding:18px 20px;font:14px/1.6 Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif}' +
    '.lfc[hidden]{display:none}' +
    '.lfc h2{margin:0 0 6px;font-size:15px;font-weight:600;color:#F5F5F0;background:none;-webkit-text-fill-color:currentColor}' +
    '.lfc p{margin:0 0 4px;color:rgba(245,245,240,.78);line-height:1.6}' +
    '.lfc a{color:#9EB098;text-decoration:underline}' +
    '.lfc .lfc-now{font-size:12px;color:rgba(245,245,240,.6)}' +
    '.lfc .lfc-btns{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap}' +
    '.lfc button{flex:1 1 140px;min-height:44px;padding:10px 16px;border-radius:999px;cursor:pointer;' +
    'font:600 14px/1.2 inherit;font-family:inherit;background:#F5F5F0;color:#12140F;border:1px solid #F5F5F0}' +
    '.lfc button:hover{background:#9EB098;border-color:#9EB098}' +
    '.lfc button:focus-visible{outline:2px solid #9EB098;outline-offset:3px}';

  var banner = null;

  function buildBanner() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    banner = document.createElement('section');
    banner.className = 'lfc';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', T.label);
    banner.hidden = true;

    var h = document.createElement('h2');
    h.textContent = T.label;
    var p = document.createElement('p');
    p.textContent = T.text + ' ';
    var a = document.createElement('a');
    a.href = T.href;
    a.textContent = T.more;
    p.appendChild(a);
    var now = document.createElement('p');
    now.className = 'lfc-now';

    var btns = document.createElement('div');
    btns.className = 'lfc-btns';
    var rej = document.createElement('button');
    rej.type = 'button';
    rej.setAttribute('data-consent', 'reject');
    rej.textContent = T.reject;
    var acc = document.createElement('button');
    acc.type = 'button';
    acc.setAttribute('data-consent', 'accept');
    acc.textContent = T.accept;
    btns.appendChild(rej);
    btns.appendChild(acc);

    banner.appendChild(h);
    banner.appendChild(p);
    banner.appendChild(now);
    banner.appendChild(btns);
    document.body.appendChild(banner);

    rej.addEventListener('click', function () { decide(false); });
    acc.addEventListener('click', function () { decide(true); });
  }

  function showBanner() {
    if (!banner) buildBanner();
    var c = readChoice();
    var now = banner.querySelector('.lfc-now');
    now.textContent = c ? (c.ads ? T.current.yes : T.current.no) : '';
    now.hidden = !c;
    banner.hidden = false;
  }

  function decide(ads) {
    saveChoice(ads);
    applyChoice(ads);
    if (banner) banner.hidden = true;
  }

  function init() {
    document.addEventListener('click', function (e) {
      var t = e.target && e.target.closest && e.target.closest('[data-consent-open]');
      if (t) { e.preventDefault(); showBanner(); }
    });
    var c = readChoice();
    if (c) applyChoice(c.ads);
    else showBanner();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
