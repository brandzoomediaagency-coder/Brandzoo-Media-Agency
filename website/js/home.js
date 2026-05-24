/* ═══════════════════════════════════════════════════════════════
   Brandzoo Media — Premium Motion Engine (2026)
   Hero parallax · 3D tilt · cursor glow · magnetic · SVG draw ·
   ring fills · stagger reveal · counters · accordions · forms.
   No external libs. Pure performant DOM.
   ═══════════════════════════════════════════════════════════════ */

(() => {
'use strict';

const $  = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => Array.from(p.querySelectorAll(s));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch       = !window.matchMedia('(hover: hover)').matches;
const isMobile      = window.innerWidth < 820;

const ready = (fn) =>
    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', fn, { once: true })
        : fn();

ready(() => {

    /* ──────────────────────────────────────────────────────────
       0.  PAGE LOADER (very fast fade — keeps perceived perf)
       ────────────────────────────────────────────────────────── */
    document.documentElement.classList.add('bz-ready');

    /* ──────────────────────────────────────────────────────────
       1.  MOBILE MENU
       ────────────────────────────────────────────────────────── */
    const menuToggle = $('#menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.body.classList.toggle('menu-open');
            menuToggle.setAttribute('aria-expanded', document.body.classList.contains('menu-open'));
        });
        $$('.main-nav a').forEach(a => {
            a.addEventListener('click', () => document.body.classList.remove('menu-open'));
        });
    }

    /* ──────────────────────────────────────────────────────────
       2.  HEADER + SCROLL FX (sticky, fab, sticky audit, popup)
       ────────────────────────────────────────────────────────── */
    const header = $('#main-header');
    const fabTop = $('#fabTop');
    const stickyAudit = $('#stickyAudit');
    let popupShown = false;

    const onScroll = () => {
        const y = window.scrollY;
        if (header) header.classList.toggle('scrolled', y > 60);
        if (fabTop) fabTop.classList.toggle('visible', y > 500);
        if (stickyAudit) stickyAudit.classList.toggle('show', y > 800);

        // page progress for top progress bar
        const doc = document.documentElement;
        const max = (doc.scrollHeight - window.innerHeight) || 1;
        document.documentElement.style.setProperty('--bz-scroll', (y / max).toFixed(4));

        if (!popupShown && y > 2200 && !sessionStorage.getItem('auditDismissed')) showPopup();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    if (fabTop) {
        fabTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ──────────────────────────────────────────────────────────
       3.  HERO PARTICLES (multi-color, brighter, depth)
       ────────────────────────────────────────────────────────── */
    const pc = $('#heroParticles');
    if (pc && !reducedMotion) {
        const count = isMobile ? 22 : 42;
        const palette = ['#00E5FF', '#7C3AED', '#FF3D8B', '#B6F03A', '#FFB020'];
        for (let i = 0; i < count; i++) {
            const s = document.createElement('span');
            const size = 2 + Math.random() * 4;
            const color = palette[i % palette.length];
            s.style.width = s.style.height = size + 'px';
            s.style.left  = (Math.random() * 100) + '%';
            s.style.top   = (60 + Math.random() * 60) + '%';
            s.style.animationDuration = (10 + Math.random() * 18) + 's';
            s.style.animationDelay = (-Math.random() * 15) + 's';
            s.style.opacity = (0.25 + Math.random() * 0.55).toFixed(2);
            s.style.background = color;
            s.style.boxShadow = `0 0 ${6 + size * 2}px ${color}`;
            pc.appendChild(s);
        }
    }

    /* ──────────────────────────────────────────────────────────
       4.  SCROLL REVEAL (stagger + direction)
       ────────────────────────────────────────────────────────── */
    const revealEls = $$('[data-reveal]');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => io.observe(el));
        // Hero text should show immediately, never wait
        $$('.hero [data-reveal]').forEach(el => {
            setTimeout(() => el.classList.add('revealed'), 60);
        });
    } else {
        revealEls.forEach(el => el.classList.add('revealed'));
    }

    /* ──────────────────────────────────────────────────────────
       5.  COUNTERS (KPI, stats, audit scores)
       ────────────────────────────────────────────────────────── */
    const fmt = (n) => n >= 1000 ? n.toLocaleString('en-IN') : String(n);
    const animateCount = (el) => {
        const target  = parseFloat(el.getAttribute('data-count')) || 0;
        const suffix  = el.getAttribute('data-suffix') || '';
        const prefix  = el.getAttribute('data-prefix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const dur = 1700;
        const start = performance.now();
        const tick = (t) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            const v = target * eased;
            const out = decimals
                ? v.toFixed(decimals)
                : fmt(Math.floor(v));
            el.textContent = prefix + out + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = prefix + (decimals ? target.toFixed(decimals) : fmt(target)) + suffix;
        };
        requestAnimationFrame(tick);
    };
    const counters = $$('[data-count]');
    if ('IntersectionObserver' in window) {
        const ic = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    animateCount(e.target);
                    ic.unobserve(e.target);
                }
            });
        }, { threshold: 0.3 });
        counters.forEach(c => ic.observe(c));
    } else {
        counters.forEach(animateCount);
    }

    /* ──────────────────────────────────────────────────────────
       6.  FAQ ACCORDION (single-open)
       ────────────────────────────────────────────────────────── */
    $$('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-q');
        if (!q) return;
        q.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            $$('.faq-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    /* ──────────────────────────────────────────────────────────
       7.  CASE / PORTFOLIO / UGC FILTERS
       ────────────────────────────────────────────────────────── */
    const wireFilters = (filterSel, cardSel) => {
        const filters = $$(filterSel);
        const cards   = $$(cardSel);
        if (!filters.length) return;
        filters.forEach(btn => {
            btn.addEventListener('click', () => {
                filters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const f = btn.getAttribute('data-filter') || 'all';
                cards.forEach(c => {
                    const cats = (c.getAttribute('data-cat') || '').split(/\s+/);
                    c.classList.toggle('hide', !(f === 'all' || cats.includes(f)));
                });
            });
        });
    };
    wireFilters('.case-filter', '.case-card');
    wireFilters('.pf-filter',   '.portfolio-card');

    $$('.ugc-tab').forEach(t => {
        t.addEventListener('click', () => {
            $$('.ugc-tab').forEach(x => x.classList.remove('active'));
            t.classList.add('active');
        });
    });

    /* ──────────────────────────────────────────────────────────
       8.  VISION / MISSION / VALUES TABS (about page)
       ────────────────────────────────────────────────────────── */
    const vmvTabs   = $$('.vmv-tab');
    const vmvPanels = $$('.vmv-panel');
    vmvTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const id = tab.getAttribute('data-panel');
            vmvTabs.forEach(t => t.classList.remove('active'));
            vmvPanels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById(id);
            if (target) target.classList.add('active');
        });
    });

    /* ──────────────────────────────────────────────────────────
       9.  FORM VALIDATION (LEAD + CONTACT + POPUP) — single handler
            (Fixes prior leadForm-before-init ReferenceError.)
       ────────────────────────────────────────────────────────── */
    const validateForm = (form, fields, onSuccess) => {
        let ok = true;
        fields.forEach(id => {
            const el = $('#' + id);
            if (!el) return;
            const v = (el.value || '').trim();
            let bad = !v && el.hasAttribute('required');
            if (el.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) bad = true;
            if (el.type === 'tel'   && v && v.replace(/[^0-9]/g, '').length < 7) bad = true;
            el.classList.toggle('err-field', bad);
            if (el.parentElement) el.parentElement.classList.toggle('err', bad);
            if (bad) ok = false;
        });
        if (ok && typeof onSuccess === 'function') onSuccess();
        return ok;
    };

    const leadForm = $('#leadForm');
    const formSuccess = $('#formSuccess');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            validateForm(leadForm, ['lf-name','lf-email','lf-phone','lf-service'], () => {
                leadForm.style.display = 'none';
                if (formSuccess) formSuccess.classList.add('show');
            });
        });
        $$('.lead-form input, .lead-form select, .lead-form textarea').forEach(el => {
            el.addEventListener('input', () => el.parentElement && el.parentElement.classList.remove('err'));
        });
    }

    const contactForm    = $('#contactForm');
    const contactSuccess = $('#contactSuccess');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Collect required fields dynamically
            const requiredIds = $$('input[required], select[required], textarea[required]', contactForm)
                .map(el => el.id).filter(Boolean);
            validateForm(contactForm, requiredIds, () => {
                const wrap = $('#contactFormWrap');
                if (contactSuccess) {
                    contactForm.style.display = 'none';
                    contactSuccess.classList.add('show');
                } else if (wrap) {
                    contactForm.style.display = 'none';
                    wrap.insertAdjacentHTML('beforeend',
                        '<div class="form-success show"><i class="fas fa-check-circle"></i>' +
                        '<h4>Thanks! We\'ve got your details.</h4>' +
                        '<p>Our team will reach out within 24 hours.</p></div>');
                }
            });
        });
        $$('input, select, textarea', contactForm).forEach(el => {
            el.addEventListener('input', () => el.parentElement && el.parentElement.classList.remove('err'));
        });
    }

    /* ──────────────────────────────────────────────────────────
       10. AUDIT POPUP (scroll + exit-intent)
       ────────────────────────────────────────────────────────── */
    const popup = $('#auditPopup');
    const popupClose = $('#popupClose');
    const popupForm  = $('#popupForm');

    function showPopup() {
        if (!popup || popupShown) return;
        popupShown = true;
        popup.classList.add('show');
    }
    function hidePopup() {
        if (!popup) return;
        popup.classList.remove('show');
        sessionStorage.setItem('auditDismissed', '1');
    }
    if (popupClose) popupClose.addEventListener('click', hidePopup);
    if (popup) {
        popup.addEventListener('click', (e) => { if (e.target === popup) hidePopup(); });
    }
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hidePopup(); });
    document.addEventListener('mouseout', (e) => {
        if (popupShown || sessionStorage.getItem('auditDismissed')) return;
        if (!e.relatedTarget && e.clientY < 10) showPopup();
    });
    if (popupForm) {
        popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            validateForm(popupForm, ['pp-name','pp-email','pp-phone'], () => {
                popupForm.innerHTML =
                    '<div class="form-success show"><i class="fas fa-check-circle"></i>' +
                    '<h4>Got it!</h4><p>Your audit is on the way within 24h.</p></div>';
                setTimeout(hidePopup, 2500);
            });
        });
    }

    /* ──────────────────────────────────────────────────────────
       11. SMOOTH IN-PAGE ANCHORS
       ────────────────────────────────────────────────────────── */
    $$('a[href^="#"]').forEach(a => {
        const href = a.getAttribute('href');
        if (!href || href.length < 2) return;
        a.addEventListener('click', (e) => {
            const target = $(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* ──────────────────────────────────────────────────────────
       12. MAGNETIC CTAs   (desktop only)
       ────────────────────────────────────────────────────────── */
    if (!reducedMotion && !isTouch) {
        $$('.btn-magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const r = btn.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top  - r.height / 2;
                btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            });
            btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
        });
    }

    /* ──────────────────────────────────────────────────────────
       13. BENTO HOVER SPOTLIGHT + CARD CURSOR-TRACK
       ────────────────────────────────────────────────────────── */
    if (!reducedMotion && !isTouch) {
        $$('.bento-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top)  / r.height) * 100;
                card.style.setProperty('--mx', x + '%');
                card.style.setProperty('--my', y + '%');
            });
        });

        /* ──────────────────────────────────────────────────────
           14. 3D TILT (lightweight VanillaTilt-style)
           ────────────────────────────────────────────────────── */
        const tiltTargets = [
            '.dashboard-card', '.cmd-card', '.bento-card', '.trust-card',
            '.case-card', '.web-card', '.engine-node', '.phone-mock',
            '.laptop-mock', '.seo-audit', '[data-tilt]'
        ];
        $$(tiltTargets.join(',')).forEach(el => {
            const max = parseFloat(el.getAttribute('data-tilt-max')) || 6;
            const scale = 1.01;
            let raf = 0;
            el.style.transformStyle = 'preserve-3d';
            el.style.willChange = 'transform';
            const onMove = (e) => {
                if (raf) cancelAnimationFrame(raf);
                raf = requestAnimationFrame(() => {
                    const r = el.getBoundingClientRect();
                    const px = (e.clientX - r.left) / r.width;
                    const py = (e.clientY - r.top)  / r.height;
                    const ry = (px - 0.5) * (max * 2);
                    const rx = -(py - 0.5) * (max * 2);
                    el.style.transform =
                        `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`;
                    el.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
                    el.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
                });
            };
            const onLeave = () => {
                if (raf) cancelAnimationFrame(raf);
                el.style.transform = '';
            };
            el.addEventListener('mousemove', onMove);
            el.addEventListener('mouseleave', onLeave);
        });

        /* ──────────────────────────────────────────────────────
           15. CURSOR GLOW SPOTLIGHT
           ────────────────────────────────────────────────────── */
        const cursor = document.createElement('div');
        cursor.className = 'bz-cursor-glow';
        document.body.appendChild(cursor);
        let cx = 0, cy = 0, tx = 0, ty = 0;
        document.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
        const lerp = () => {
            cx += (tx - cx) * 0.18;
            cy += (ty - cy) * 0.18;
            cursor.style.transform = `translate3d(${cx - 200}px, ${cy - 200}px, 0)`;
            requestAnimationFrame(lerp);
        };
        requestAnimationFrame(lerp);
    }

    /* ──────────────────────────────────────────────────────────
       16. HERO MOUSE PARALLAX (floating cards drift)
       ────────────────────────────────────────────────────────── */
    if (!reducedMotion && !isTouch) {
        const hero = $('.hero');
        const floaters = $$('.float-card');
        const dash    = $('.dashboard-card');
        if (hero && floaters.length) {
            hero.addEventListener('mousemove', (e) => {
                const r = hero.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width  - 0.5;
                const py = (e.clientY - r.top)  / r.height - 0.5;
                floaters.forEach((f, i) => {
                    const depth = 10 + (i % 4) * 6;
                    f.style.transform =
                        `translate3d(${(-px * depth).toFixed(1)}px, ${(-py * depth).toFixed(1)}px, 0)`;
                });
                if (dash) {
                    dash.style.setProperty('--bzpx', (-px * 12).toFixed(1) + 'px');
                    dash.style.setProperty('--bzpy', (-py * 8).toFixed(1) + 'px');
                }
            });
            hero.addEventListener('mouseleave', () => {
                floaters.forEach(f => { f.style.transform = ''; });
                if (dash) { dash.style.removeProperty('--bzpx'); dash.style.removeProperty('--bzpy'); }
            });
        }
    }

    /* ──────────────────────────────────────────────────────────
       17. ANIMATED SVG CHART DRAW + BAR GROW + RING FILL
       ────────────────────────────────────────────────────────── */
    if ('IntersectionObserver' in window) {
        const drawObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const root = e.target;
                root.classList.add('in-view');

                // SVG line drawing
                $$('svg path', root).forEach(p => {
                    try {
                        const len = p.getTotalLength();
                        if (!len) return;
                        if (p.getAttribute('fill') && p.getAttribute('fill') !== 'none') return;
                        p.style.strokeDasharray  = len;
                        p.style.strokeDashoffset = len;
                        // re-flow
                        // eslint-disable-next-line no-unused-expressions
                        p.getBoundingClientRect();
                        p.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.4,.0,.2,1)';
                        p.style.strokeDashoffset = '0';
                    } catch (err) { /* svg not measurable */ }
                });

                // Bar mini grow
                $$('.bar-mini span, .db-bar', root).forEach((b, i) => {
                    b.style.animationDelay = (i * 80) + 'ms';
                });

                // Audit bar fill
                $$('.audit-bar i', root).forEach(bar => {
                    const target = bar.style.width;
                    bar.style.width = '0';
                    requestAnimationFrame(() => {
                        bar.style.transition = 'width 1.4s cubic-bezier(.4,.0,.2,1)';
                        bar.style.width = target;
                    });
                });

                // Circular ring fill
                $$('.bz-ring', root).forEach(ring => {
                    const pct = parseFloat(ring.getAttribute('data-score')) || 0;
                    ring.style.setProperty('--p', '0');
                    let from = 0;
                    const dur = 1400;
                    const start = performance.now();
                    const step = (t) => {
                        const k = Math.min(1, (t - start) / dur);
                        const eased = 1 - Math.pow(1 - k, 3);
                        const val = Math.round(pct * eased);
                        ring.style.setProperty('--p', val);
                        const lbl = ring.querySelector('.bz-ring-val');
                        if (lbl) lbl.textContent = val;
                        if (k < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                });

                drawObs.unobserve(root);
            });
        }, { threshold: 0.15 });
        $$('.dashboard-card, .cmd-card, .seo-audit, .spark, .db-chart, [data-anim]').forEach(el => drawObs.observe(el));
    }

    /* ──────────────────────────────────────────────────────────
       18. MARQUEE CLONING (ensures ticker fills wide screens)
       ────────────────────────────────────────────────────────── */
    $$('.ticker').forEach(t => {
        if (t.children.length < 4) {
            const html = t.innerHTML;
            t.innerHTML = html + html;
        }
    });

    /* ──────────────────────────────────────────────────────────
       19. PHONE-MOCK FLOATING REACTIONS
       ────────────────────────────────────────────────────────── */
    if (!reducedMotion) {
        $$('.phone-mock').forEach((p, i) => {
            p.style.setProperty('--phone-bob-delay', (i * 0.4) + 's');
        });
    }

    onScroll();
});
})();
