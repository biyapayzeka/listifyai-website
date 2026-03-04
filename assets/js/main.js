/* ============================================
   ListifyAI - Main JavaScript
   ============================================ */

(function () {
    'use strict';

    /* ---------- Navbar scroll effect ---------- */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    /* ---------- Mobile menu ---------- */
    const menuBtn = document.querySelector('.nav-menu-btn');
    const overlay = document.querySelector('.nav-mobile-overlay');
    if (menuBtn && overlay) {
        menuBtn.addEventListener('click', function () {
            const isOpen = overlay.classList.toggle('active');
            menuBtn.textContent = isOpen ? '\u2715' : '\u2630';
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        overlay.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                overlay.classList.remove('active');
                menuBtn.textContent = '\u2630';
                document.body.style.overflow = '';
            });
        });
    }

    /* ---------- Smooth scroll for anchor links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var offset = navbar ? navbar.offsetHeight + 16 : 80;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    /* ---------- Scroll reveal (Intersection Observer) ---------- */
    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(function (el) { observer.observe(el); });
    }

    /* ---------- Counter animation ---------- */
    function animateCounters() {
        document.querySelectorAll('[data-count]').forEach(function (el) {
            var target = parseInt(el.getAttribute('data-count'), 10);
            var suffix = el.getAttribute('data-suffix') || '';
            var prefix = el.getAttribute('data-prefix') || '';
            var duration = 2000;
            var start = 0;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 4);
                var current = Math.floor(eased * target);
                el.textContent = prefix + current + suffix;
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }

    var counters = document.querySelectorAll('.stats-section');
    if (counters.length && 'IntersectionObserver' in window) {
        var counterDone = false;
        var cObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !counterDone) {
                    counterDone = true;
                    animateCounters();
                    cObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        counters.forEach(function (el) { cObserver.observe(el); });
    }

    /* ---------- FAQ accordion ---------- */
    document.querySelectorAll('.faq-question').forEach(function (q) {
        q.addEventListener('click', function () {
            var item = this.parentElement;
            var isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(function (i) {
                i.classList.remove('active');
                var btn = i.querySelector('.faq-question');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });
            if (!isActive) {
                item.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* ---------- Mobile sticky CTA visibility ---------- */
    var stickyCta = document.querySelector('.mobile-sticky-cta');
    var heroSection = document.querySelector('.hero');
    if (stickyCta && heroSection && 'IntersectionObserver' in window) {
        var stickyObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                stickyCta.classList.toggle('visible', !entry.isIntersecting);
            });
        }, { threshold: 0.1 });
        stickyObs.observe(heroSection);
    }

    /* ---------- Carousel arrow buttons ---------- */
    document.querySelectorAll('.carousel-wrap').forEach(function (wrap) {
        var track = wrap.querySelector('.carousel-track');
        var leftBtn = wrap.querySelector('.carousel-btn--left');
        var rightBtn = wrap.querySelector('.carousel-btn--right');
        if (track && leftBtn && rightBtn) {
            var scrollAmount = 220;
            leftBtn.addEventListener('click', function () {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
            rightBtn.addEventListener('click', function () {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
    });

    /* ---------- Video carousel drag-to-scroll ---------- */
    document.querySelectorAll('.carousel-track').forEach(function (track) {
        var isDown = false, startX, scrollLeft;
        track.addEventListener('mousedown', function (e) {
            isDown = true;
            track.style.cursor = 'grabbing';
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });
        track.addEventListener('mouseleave', function () { isDown = false; track.style.cursor = 'grab'; });
        track.addEventListener('mouseup', function () { isDown = false; track.style.cursor = 'grab'; });
        track.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            e.preventDefault();
            var x = e.pageX - track.offsetLeft;
            track.scrollLeft = scrollLeft - (x - startX) * 1.5;
        });
    });

})();
