// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Skill bars animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            const skillValue = skillProgress.getAttribute('data-skill');
            skillProgress.style.width = skillValue + '%';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    skillObserver.observe(card);
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        setTimeout(() => {
            typeWriter(line, line.textContent, 150);
        }, index * 1000);
    });
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-cube, .floating-sphere, .floating-pyramid');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform = `translateY(${scrolled * speed}px) rotateX(${scrolled * 0.1}deg) rotateY(${scrolled * 0.1}deg)`;
    });
});

// Dynamic background particles
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'dynamic-particle';
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: ${Math.random() > 0.5 ? '#00ffff' : '#ff0080'};
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        opacity: 0.7;
    `;
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0.7 },
        { transform: `translateY(-100vh) rotate(360deg)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'linear'
    });
    
    animation.onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 300);

// Matrix rain effect
function createMatrixRain() {
    const matrixContainer = document.querySelector('.matrix-rain');
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.style.cssText = `
            position: absolute;
            color: #00ff00;
            font-family: monospace;
            font-size: 14px;
            left: ${Math.random() * 100}%;
            animation: matrixFall ${Math.random() * 3 + 2}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        drop.textContent = characters[Math.floor(Math.random() * characters.length)];
        matrixContainer.appendChild(drop);
    }
}

// Add matrix fall animation
const style = document.createElement('style');
style.textContent = `
    @keyframes matrixFall {
        0% { top: -20px; opacity: 1; }
        100% { top: 100vh; opacity: 0; }
    }
`;
document.head.appendChild(style);

createMatrixRain();

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields!', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    this.reset();
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#00ff00' : type === 'error' ? '#ff0080' : '#00ffff'};
        color: #000;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add glitch effect to title on hover
document.querySelector('.hero-title').addEventListener('mouseenter', function() {
    this.style.animation = 'glitch 0.3s ease-in-out';
});

// Add glitch animation
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(glitchStyle);

// 3D tilt effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Cursor trail effect
let mouseX = 0, mouseY = 0;
let trailElements = [];

for (let i = 0; i < 10; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, #00ffff, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: ${1 - i * 0.1};
        transform: scale(${1 - i * 0.1});
    `;
    document.body.appendChild(trail);
    trailElements.push(trail);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateTrail() {
    trailElements.forEach((trail, index) => {
        setTimeout(() => {
            trail.style.left = mouseX + 'px';
            trail.style.top = mouseY + 'px';
        }, index * 50);
    });
    requestAnimationFrame(updateTrail);
}

updateTrail();

// Add loading screen
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid #00ffff; border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <p style="color: #00ffff; font-family: Orbitron, monospace; font-size: 1.2rem;">Loading...</p>
        </div>
    `;
    
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 2000);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    showNotification('🎌 Konami Code Activated! You found the secret! 🎌', 'success');
    
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

console.log('🎌 Welcome to the Digital Ninja Portfolio! 🎌');
console.log('Try the Konami Code: ↑↑↓↓←→←→BA');