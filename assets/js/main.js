/* ============================================
   ListifyAI — Fashion-first landing
   ============================================ */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Smooth scroll with nav offset ---------- */
    var nav = document.getElementById('primary-nav');
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            var target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            var offset = nav ? nav.offsetHeight + 12 : 80;
            var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    });

    /* ---------- Scroll reveal ---------- */
    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length && 'IntersectionObserver' in window && !reduceMotion) {
        var revealObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(function (el) { revealObs.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('visible'); });
    }

    /* ---------- Counter animation ---------- */
    function animateCounters(root) {
        root.querySelectorAll('[data-count]').forEach(function (el) {
            var target = parseInt(el.getAttribute('data-count'), 10) || 0;
            var suffix = el.getAttribute('data-suffix') || '';
            if (reduceMotion) { el.textContent = target + suffix; return; }
            var duration = 1600;
            var startTime = null;
            function step(ts) {
                if (!startTime) startTime = ts;
                var progress = Math.min((ts - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 4);
                el.textContent = Math.floor(eased * target) + suffix;
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }
    var statsSections = document.querySelectorAll('.stats-section');
    if (statsSections.length && 'IntersectionObserver' in window) {
        var counterObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounters(entry.target);
                    counterObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        statsSections.forEach(function (el) { counterObs.observe(el); });
    }

    /* ---------- Mobile sticky CTA visibility ---------- */
    var stickyCta = document.getElementById('sticky-cta');
    var hero = document.getElementById('hero');
    if (stickyCta && hero && 'IntersectionObserver' in window) {
        var stickyObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                stickyCta.classList.toggle('visible', !entry.isIntersecting);
                stickyCta.setAttribute('aria-hidden', entry.isIntersecting ? 'true' : 'false');
            });
        }, { threshold: 0.1 });
        stickyObs.observe(hero);
    }

    /* ---------- Device detection (soft preference on mobile) ---------- */
    (function detectDevice() {
        var ua = navigator.userAgent || '';
        var isIOS = /iPad|iPhone|iPod/.test(ua);
        var isAndroid = /Android/.test(ua);
        if (isIOS) document.body.dataset.platform = 'ios';
        else if (isAndroid) document.body.dataset.platform = 'android';
        else document.body.dataset.platform = 'web';
    })();

    /* ---------- Before/After slider + tabs ---------- */
    function initBeforeAfter() {
        var panel = document.getElementById('ba-panel');
        if (!panel) return;
        var slider = panel.querySelector('.ba-slider');
        if (!slider) return;

        var caption = document.getElementById('ba-caption');
        var eyebrow = caption ? caption.querySelector('[data-ba-eyebrow]') : null;
        var titleEl = caption ? caption.querySelector('[data-ba-title]') : null;
        var bodyEl  = caption ? caption.querySelector('[data-ba-body]') : null;
        var bulletsEl = caption ? caption.querySelector('[data-ba-bullets]') : null;

        var beforeImg = slider.querySelector('[data-role="before"]');
        var afterImg  = slider.querySelector('[data-role="after"]');

        var modulesRaw = document.getElementById('ba-modules-data');
        var MODULES = {};
        try { MODULES = JSON.parse(modulesRaw.textContent); } catch (err) { return; }

        function setClip(pct) {
            pct = Math.max(0, Math.min(100, pct));
            slider.style.setProperty('--ba-clip', (100 - pct) + '%');
        }

        function pctFromEvent(e) {
            var rect = slider.getBoundingClientRect();
            var x = (e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX);
            return ((x - rect.left) / rect.width) * 100;
        }

        // Drag
        var dragging = false;
        function start(e) {
            dragging = true;
            slider.classList.add('dragging');
            setClip(pctFromEvent(e));
        }
        function move(e) {
            if (!dragging) return;
            if (e.cancelable && e.type === 'mousemove') e.preventDefault();
            setClip(pctFromEvent(e));
        }
        function end() {
            dragging = false;
            slider.classList.remove('dragging');
        }

        slider.addEventListener('mousedown', start);
        slider.addEventListener('touchstart', start, { passive: true });
        window.addEventListener('mousemove', move);
        window.addEventListener('touchmove', move, { passive: true });
        window.addEventListener('mouseup', end);
        window.addEventListener('touchend', end);
        window.addEventListener('touchcancel', end);

        // Click/tap to jump
        slider.addEventListener('click', function (e) {
            // if drag just ended, click fires too — ignore if we were dragging
            if (e.detail === 0) return;
            setClip(pctFromEvent(e));
        });

        // Keyboard support for accessibility
        slider.setAttribute('tabindex', '0');
        slider.setAttribute('role', 'slider');
        slider.setAttribute('aria-label', 'Öncesi / Sonrası karşılaştırma');
        slider.setAttribute('aria-valuemin', '0');
        slider.setAttribute('aria-valuemax', '100');
        slider.setAttribute('aria-valuenow', '50');
        slider.addEventListener('keydown', function (e) {
            var cur = parseFloat((slider.style.getPropertyValue('--ba-clip') || '50%').replace('%', ''));
            var pct = 100 - cur;
            if (e.key === 'ArrowLeft')  { pct = Math.max(0, pct - 5);  setClip(pct); slider.setAttribute('aria-valuenow', Math.round(pct)); e.preventDefault(); }
            if (e.key === 'ArrowRight') { pct = Math.min(100, pct + 5); setClip(pct); slider.setAttribute('aria-valuenow', Math.round(pct)); e.preventDefault(); }
            if (e.key === 'Home') { setClip(0);   slider.setAttribute('aria-valuenow', 0);   e.preventDefault(); }
            if (e.key === 'End')  { setClip(100); slider.setAttribute('aria-valuenow', 100); e.preventDefault(); }
        });

        // Tabs
        var tabs = document.querySelectorAll('[data-tab]');
        function selectTab(key) {
            var mod = MODULES[key];
            if (!mod) return;
            tabs.forEach(function (t) { t.setAttribute('aria-selected', t.dataset.tab === key ? 'true' : 'false'); });
            if (beforeImg) beforeImg.src = mod.before;
            if (afterImg)  afterImg.src  = mod.after;
            if (eyebrow)   eyebrow.textContent = mod.eyebrow;
            if (titleEl)   titleEl.textContent = mod.title;
            if (bodyEl)    bodyEl.textContent  = mod.body;
            if (bulletsEl) {
                bulletsEl.innerHTML = mod.bullets.map(function (b) {
                    return '<li class="flex items-center gap-3"><span class="material-symbols-outlined text-primary text-base" style="font-variation-settings:\'FILL\' 1;">check_circle</span>' + b + '</li>';
                }).join('');
            }
            // Reset to middle for new module
            setClip(50);
            slider.setAttribute('aria-valuenow', '50');
        }
        tabs.forEach(function (t) {
            t.addEventListener('click', function () { selectTab(t.dataset.tab); });
        });

        // Teaser on first viewport entry
        if (!reduceMotion && 'IntersectionObserver' in window) {
            var teased = false;
            var teaseObs = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting && !teased) {
                        teased = true;
                        setTimeout(function () { setClip(68); }, 400);
                        setTimeout(function () { setClip(32); }, 1100);
                        setTimeout(function () { setClip(50); }, 1800);
                        teaseObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.4 });
            teaseObs.observe(slider);
        }
    }
    initBeforeAfter();

    /* ---------- Video: pause off-screen (bandwidth + battery) ---------- */
    (function manageVideos() {
        if (!('IntersectionObserver' in window)) return;
        var videos = document.querySelectorAll('video[autoplay]');
        if (!videos.length) return;
        var vObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var v = entry.target;
                if (entry.isIntersecting) {
                    if (v.paused) { v.play().catch(function () { /* autoplay blocked, ignore */ }); }
                } else {
                    if (!v.paused) v.pause();
                }
            });
        }, { threshold: 0.25 });
        videos.forEach(function (v) { vObs.observe(v); });
    })();

    /* ---------- Meta Pixel: CTA click events ---------- */
    document.querySelectorAll('[data-pixel-event]').forEach(function (el) {
        el.addEventListener('click', function () {
            var name = el.getAttribute('data-pixel-event');
            if (window.fbq && name) {
                try { window.fbq('trackCustom', name, { store: el.getAttribute('data-store') || 'unknown' }); }
                catch (err) { /* noop */ }
            }
        });
    });

    /* ---------- Nav shadow on scroll ---------- */
    if (nav) {
        var lastScroll = 0;
        window.addEventListener('scroll', function () {
            var y = window.scrollY;
            if (y > 20) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
            lastScroll = y;
        }, { passive: true });
    }

})();
