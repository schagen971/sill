// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Reveal Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with 'reveal' class
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };
    
    // Form validation
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = '전송 중...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showFormMessage('상담 신청이 성공적으로 접수되었습니다. 24시간 내에 연락드리겠습니다.', 'success');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Form Validation Function
function validateForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('이름을 2자 이상 입력해주세요.');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('올바른 이메일 주소를 입력해주세요.');
    }
    
    // Phone validation
    const phoneRegex = /^[0-9-+\s()]{10,}$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
        errors.push('올바른 연락처를 입력해주세요.');
    }
    
    if (errors.length > 0) {
        showFormMessage(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

// Show Form Message Function
function showFormMessage(message, type) {
    const messageElement = document.getElementById('formMessage');
    messageElement.textContent = message;
    messageElement.className = `mt-4 text-center ${type === 'error' ? 'text-red-600' : 'text-green-600'}`;
    messageElement.classList.remove('hidden');
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageElement.classList.add('hidden');
    }, 5000);
}

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-light');
        navbar.classList.remove('bg-light/90');
    } else {
        navbar.classList.add('bg-light/90');
        navbar.classList.remove('bg-light');
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.getElementById('hero');
    
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Counter Animation for Statistics (if any are added)
function animateCounter(element, target, duration = 2000) {
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (target - startValue) * progress);
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Initialize counters when they come into view
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
});

// Observe counter elements (add data-target attribute to elements with counters)
document.querySelectorAll('[data-target]').forEach(counter => {
    counterObserver.observe(counter);
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
    
    // Form submission with Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.form) {
            activeElement.form.dispatchEvent(new Event('submit'));
        }
    }
});

// Performance Optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Navbar background change
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-light');
        navbar.classList.remove('bg-light/90');
    } else {
        navbar.classList.add('bg-light/90');
        navbar.classList.remove('bg-light');
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const rate = scrolled * -0.1; // Reduced intensity for better performance
        heroSection.style.transform = `translateY(${rate}px)`;
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Error Handling for Images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Failed to load image:', this.src);
    });
});

// Focus Management for Accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Apply focus trapping to modal-like elements (mobile menu)
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenu) {
    trapFocus(mobileMenu);
}

// Console message for developers
console.log('🚀 포미서비스 웹사이트가 로드되었습니다!');
console.log('💡 AI SNS 마케팅의 새로운 기준을 경험해보세요.');

// Service Worker Registration (for PWA capabilities if needed later)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered: ', registration))
        //     .catch(registrationError => console.log('SW registration failed: ', registrationError));
    });
}
