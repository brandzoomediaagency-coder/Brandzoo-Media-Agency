/* ═══════════════════════════════════════════════════════════════
   Brandzoo Media — Homepage Interactions (2026)
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const $ = (s, p = document) => p.querySelector(s);
    const $$ = (s, p = document) => Array.from(p.querySelectorAll(s));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── Mobile menu ─────────────────────────────────────────── */
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

    /* ── Sticky header shrink ────────────────────────────────── */
    const header = $('#main-header');
    const onScroll = () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 60);
        const fabTop = $('#fabTop');
        if (fabTop) fabTop.classList.toggle('visible', window.scrollY > 500);
        const stickyAudit = $('#stickyAudit');
        if (stickyAudit) stickyAudit.classList.toggle('show', window.scrollY > 800);

        // Show audit popup once user scrolls deep
        if (!popupShown && window.scrollY > 2200 && !sessionStorage.getItem('auditDismissed')) {
            showPopup();
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── Back to top ─────────────────────────────────────────── */
    const fabTop = $('#fabTop');
    if (fabTop) {
        fabTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ── Hero particles ──────────────────────────────────────── */
    const pc = $('#heroParticles');
    if (pc && !reducedMotion) {
        const count = window.innerWidth < 768 ? 16 : 30;
        for (let i = 0; i < count; i++) {
            const s = document.createElement('span');
            const size = 2 + Math.random() * 3;
            s.style.width = s.style.height = size + 'px';
            s.style.left = (Math.random() * 100) + '%';
            s.style.top = (Math.random() * 100) + '%';
            s.style.animationDuration = (8 + Math.random() * 14) + 's';
            s.style.animationDelay = (Math.random() * 8) + 's';
            s.style.opacity = 0.15 + Math.random() * 0.35;
            if (i % 3 === 0) { s.style.background = '#7C3AED'; s.style.boxShadow = '0 0 8px #7C3AED'; }
            if (i % 5 === 0) { s.style.background = '#FF3D8B'; s.style.boxShadow = '0 0 8px #FF3D8B'; }
            pc.appendChild(s);
        }
    }

    /* ── Scroll Reveal ───────────────────────────────────────── */
    const revealEls = $$('[data-reveal]');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('revealed'));
    }

    /* ── KPI Counters (hero) ─────────────────────────────────── */
    const counters = $$('[data-count]');
    const fmt = (n) => n >= 1000 ? n.toLocaleString('en-IN') : String(n);
    const animateCount = (el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const dur = 1800;
        const start = performance.now();
        const tick = (t) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = fmt(Math.floor(target * eased)) + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = fmt(target) + suffix;
        };
        requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
        const ic = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); ic.unobserve(e.target); } });
        }, { threshold: 0.4 });
        counters.forEach(c => ic.observe(c));
    } else {
        counters.forEach(animateCount);
    }

    /* ── FAQ Accordion ───────────────────────────────────────── */
    $$('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-q');
        if (!q) return;
        q.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            $$('.faq-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    /* ── Case Filters ────────────────────────────────────────── */
    const caseFilters = $$('.case-filter');
    const caseCards = $$('.case-card');
    caseFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            caseFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.getAttribute('data-filter');
            caseCards.forEach(c => {
                const cats = (c.getAttribute('data-cat') || '').split(/\s+/);
                c.classList.toggle('hide', !(f === 'all' || cats.includes(f)));
            });
        });
    });

    /* ── UGC Tabs (visual filter) ────────────────────────────── */
    $$('.ugc-tab').forEach(t => {
        t.addEventListener('click', () => {
            $$('.ugc-tab').forEach(x => x.classList.remove('active'));
            t.classList.add('active');
        });
    });

    /* ── Vision / Mission / Values Tabs ──────────────────────── */
    const vmvTabs = $$('.vmv-tab');
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

    /* ── Portfolio filter (shared with case filter) ──────────── */
    const pfFilters = $$('.pf-filter');
    const pfCards = $$('.portfolio-card');
    pfFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            pfFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.getAttribute('data-filter');
            pfCards.forEach(c => {
                const cats = (c.getAttribute('data-cat') || '').split(/\s+/);
                c.classList.toggle('hide', !(f === 'all' || cats.includes(f)));
            });
        });
    });

    /* ── Generic page-form (contactForm/blog/etc) ────────────── */
    const genericForm = $('#contactForm');
    if (genericForm && genericForm !== leadForm) {
        genericForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let ok = true;
            $$('input[required], select[required], textarea[required]', genericForm).forEach(el => {
                const v = el.value.trim();
                let bad = !v;
                if (el.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) bad = true;
                if (el.type === 'tel' && v && v.replace(/[^0-9]/g,'').length < 7) bad = true;
                el.classList.toggle('err-field', bad);
                el.style.borderColor = bad ? 'var(--neon-pink)' : '';
                if (bad) ok = false;
            });
            if (!ok) return;
            const btn = genericForm.querySelector('button[type="submit"]');
            const success = $('#contactSuccess');
            if (success) {
                genericForm.style.display = 'none';
                success.classList.add('show');
            } else if (btn) {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent! We\'ll reply within 24h';
                btn.style.background = 'linear-gradient(135deg, #B6F03A, #00E5FF)';
                setTimeout(() => genericForm.reset(), 600);
            }
        });
    }

    /* ── Magnetic Button Hover ───────────────────────────────── */
    if (!reducedMotion && window.matchMedia('(hover: hover)').matches) {
        $$('.btn-magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const r = btn.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top - r.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });

        /* Bento hover spotlight */
        $$('.bento-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                card.style.setProperty('--mx', x + '%');
                card.style.setProperty('--my', y + '%');
            });
        });
    }

    /* ── Lead Form Validation ────────────────────────────────── */
    const leadForm = $('#leadForm');
    const formSuccess = $('#formSuccess');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let ok = true;
            ['lf-name','lf-email','lf-phone','lf-service'].forEach(id => {
                const el = $('#' + id);
                if (!el) return;
                const v = el.value.trim();
                let bad = !v;
                if (id === 'lf-email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) bad = true;
                if (id === 'lf-phone' && v && v.replace(/[^0-9]/g, '').length < 7) bad = true;
                el.parentElement.classList.toggle('err', bad);
                if (bad) ok = false;
            });
            if (!ok) return;
            leadForm.style.display = 'none';
            if (formSuccess) formSuccess.classList.add('show');
        });
        $$('.lead-form input, .lead-form select, .lead-form textarea').forEach(el => {
            el.addEventListener('input', () => el.parentElement.classList.remove('err'));
        });
    }

    /* ── Audit Popup ─────────────────────────────────────────── */
    let popupShown = false;
    const popup = $('#auditPopup');
    const popupClose = $('#popupClose');
    const popupForm = $('#popupForm');

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

    // Exit-intent popup
    document.addEventListener('mouseout', (e) => {
        if (popupShown) return;
        if (sessionStorage.getItem('auditDismissed')) return;
        if (!e.toElement && !e.relatedTarget && e.clientY < 10) showPopup();
    });

    if (popupForm) {
        popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let ok = true;
            ['pp-name','pp-email','pp-phone'].forEach(id => {
                const el = $('#' + id);
                if (!el) return;
                const v = el.value.trim();
                let bad = !v;
                if (id === 'pp-email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) bad = true;
                if (id === 'pp-phone' && v && v.replace(/[^0-9]/g, '').length < 7) bad = true;
                el.parentElement.classList.toggle('err', bad);
                if (bad) ok = false;
            });
            if (!ok) return;
            popupForm.innerHTML = '<div class="form-success show"><i class="fas fa-check-circle"></i><h4>Got it!</h4><p>Your audit is on the way within 24h.</p></div>';
            setTimeout(hidePopup, 2500);
        });
    }

    /* ── Smooth in-page anchors ──────────────────────────────── */
    $$('a[href^="#"]').forEach(a => {
        const href = a.getAttribute('href');
        if (href.length < 2) return;
        a.addEventListener('click', (e) => {
            const target = $(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    onScroll();
});
