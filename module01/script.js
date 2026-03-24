// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll-based navbar styling
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe module cards
    document.querySelectorAll('.module-card, .feature-card, .use-case-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Active navigation highlight
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.style.color = 'var(--primary-light)';
        }
    });

    // Add parallax effect to hero blocks
    const blocks = document.querySelectorAll('.block');
    if (blocks.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            blocks.forEach((block, index) => {
                const depth = (index + 1) * 5;
                block.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
            });
        });
    }

    // Reading time calculator for content pages
    const contentBody = document.querySelector('.content-body');
    if (contentBody) {
        const text = contentBody.textContent;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);

        const metaElement = document.createElement('p');
        metaElement.className = 'reading-time';
        metaElement.style.cssText = 'color: var(--text-muted); font-size: 0.85rem; margin-top: 1rem;';
        metaElement.innerHTML = `📖 ${readingTime} min read`;

        const header = document.querySelector('.content-header');
        if (header) {
            header.appendChild(metaElement);
        }
    }
});