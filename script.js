/**
 * Waffle Communications Interactive Engine
 * Antigravity Physics & Dynamic UI
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Antigravity Physics Engine for Hero Section ---
    const antigravityContainer = document.getElementById('antigravity-container');
    const objects = [];
    const OBJECT_COUNT = window.innerWidth < 768 ? 10 : 20;
    const mouse = { x: -1000, y: -1000 };

    class FloatingObject {
        constructor() {
            this.element = document.createElement('div');
            this.element.className = 'floating-obj';
            
            // Random size and position
            this.size = Math.random() * 100 + 40;
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            
            // Random velocity
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            
            // Random opacity/blur for depth
            const blur = Math.random() * 10;
            this.element.style.width = `${this.size}px`;
            this.element.style.height = `${this.size}px`;
            this.element.style.filter = `blur(${blur}px)`;
            this.element.style.opacity = Math.random() * 0.5 + 0.1;

            antigravityContainer.appendChild(this.element);
        }

        update() {
            // Mouse Interaction (Push effect)
            const dx = this.x + this.size / 2 - mouse.x;
            const dy = this.y + this.size / 2 - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 250;

            if (dist < maxDist) {
                const force = (maxDist - dist) / maxDist;
                this.vx += (dx / dist) * force * 1.2;
                this.vy += (dy / dist) * force * 1.2;
            }

            // Natural friction
            this.vx *= 0.98;
            this.vy *= 0.98;

            // Apply velocity
            this.x += this.vx;
            this.y += this.vy;

            // Boundary wrap around
            if (this.x < -this.size) this.x = window.innerWidth;
            if (this.x > window.innerWidth) this.x = -this.size;
            if (this.y < -this.size) this.y = window.innerHeight;
            if (this.y > window.innerHeight) this.y = -this.size;

            // Render
            this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
        }
    }

    // Initialize objects
    for (let i = 0; i < OBJECT_COUNT; i++) {
        objects.push(new FloatingObject());
    }

    // Animation Loop
    function animate() {
        objects.forEach(obj => obj.update());
        requestAnimationFrame(animate);
    }
    animate();

    // Mouse events
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // --- 2. Scroll Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 3. Header Scrolled State ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 4. Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // --- 5. Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = '메시지 전송 중...';
            btn.disabled = true;

            // Simulate API Call
            setTimeout(() => {
                alert('문의가 성공적으로 접수되었습니다. 곧 연락드리겠습니다!');
                btn.textContent = originalText;
                btn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }

    // --- 6. Parallax Effect for About Visual ---
    const floatingImg = document.querySelector('.floating-img');
    if (floatingImg) {
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) / 40;
            const moveY = (e.clientY - window.innerHeight / 2) / 40;
            floatingImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
});
