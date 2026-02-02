/**
 * KaiSync Tech Solutions – Nav, scroll, form, reveal animations
 */

(function () {
    'use strict';

    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const contactForm = document.getElementById('contactForm');

    // Navbar scroll effect
    function onScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // Smooth scroll + active link
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const id = href.slice(1);
                const section = document.getElementById(id);
                if (section) {
                    const top = section.getBoundingClientRect().top + window.pageYOffset - 70;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
                navLinks.forEach(function (l) { l.classList.remove('active'); });
                this.classList.add('active');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger && hamburger.classList.remove('active');
                }
            }
        });
    });

    // Update active nav on scroll
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.scrollY + 120;
        let current = '';
        sections.forEach(function (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // Mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            if (name && email && message && name.value && email.value && message.value) {
                alert('Thanks for your message! We\'ll get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Reveal on scroll (Intersection Observer)
    const revealOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.service-card, .about-content, .about-card, .section-header').forEach(function (el) {
        revealObserver.observe(el);
    });

    // Parallax hero (subtle)
    window.addEventListener('scroll', function () {
        const hero = document.querySelector('.hero');
        if (hero && window.innerWidth > 768) {
            const y = window.pageYOffset * 0.2;
            hero.style.setProperty('--hero-parallax', y + 'px');
        }
    });

    // Button ripple (optional)
    document.querySelectorAll('.btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var ripple = document.createElement('span');
            var rect = this.getBoundingClientRect();
            var size = Math.max(rect.width, rect.height);
            var x = e.clientX - rect.left - size / 2;
            var y = e.clientY - rect.top - size / 2;
            ripple.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;background:rgba(255,255,255,0.3);border-radius:50%;transform:scale(0);pointer-events:none;';
            ripple.classList.add('ripple');
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            requestAnimationFrame(function () {
                ripple.style.transition = 'transform 0.5s ease-out';
                ripple.style.transform = 'scale(4)';
                ripple.style.opacity = '0';
            });
            setTimeout(function () { ripple.remove(); }, 500);
        });
    });

    // Page load fade
    window.addEventListener('load', function () {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.4s ease';
        requestAnimationFrame(function () {
            document.body.style.opacity = '1';
        });
    });
})();
