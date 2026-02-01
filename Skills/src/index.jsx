import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import gsap from 'gsap'

// Check if coming from landing page and show surfacing effect
const fromLanding = sessionStorage.getItem('fromLandingPage') === 'true';
if (fromLanding) {
    sessionStorage.removeItem('fromLandingPage');
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, 
            rgba(0, 60, 100, 0.95) 0%, 
            rgba(0, 119, 190, 0.85) 50%, 
            rgba(0, 119, 190, 0.7) 100%);
        z-index: 9999;
        pointer-events: none;
    `;
    document.body.appendChild(overlay);
    
    gsap.to(overlay, {
        top: '100%',
        duration: 1.2,
        ease: 'power2.out',
        onComplete: () => document.body.removeChild(overlay)
    });
}

// Page transition effect
let isTransitioning = false;

function createSlideOutTransition(targetUrl) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    gsap.to(document.body, {
        x: '-100%',
        opacity: 0.8,
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: () => {
            window.location.href = targetUrl;
        }
    });
}

// Add transition to navigation links
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-spoke a, .mobile-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (link.classList.contains('active')) return;
            if (href && href.includes('5173')) return;
            
            if (href && !href.includes('5177')) { // Skills is 5177
                e.preventDefault();
                createSlideOutTransition(href);
            }
        });
    });
    
    // Compass needle follows mouse on navbar (desktop only)
    const compassNeedle = document.querySelector('.compass-needle');
    const compassCenter = document.querySelector('.compass-center');
    const shipWheel = document.querySelector('.ship-wheel');

    if (compassNeedle && compassCenter && shipWheel && window.innerWidth > 768) {
        shipWheel.addEventListener('mouseenter', () => {
            shipWheel.addEventListener('mousemove', handleNeedleRotation);
        });
        
        shipWheel.addEventListener('mouseleave', () => {
            shipWheel.removeEventListener('mousemove', handleNeedleRotation);
            compassNeedle.style.transform = 'rotate(0deg)';
        });
        
        function handleNeedleRotation(e) {
            const rect = compassCenter.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            compassNeedle.style.transform = `rotate(${angle + Math.PI / 2}rad)`;
        }
    }
    
    // Scroll Navigation - Navigate between pages
    let scrollTimeout;
    const pages = [
        'http://localhost:5173', // Landing Page
        'http://localhost:5174', // About Me
        'http://localhost:5175', // Projects
        'http://localhost:5177', // Skills
        'http://localhost:5176'  // Socials
    ];
    const currentPage = window.location.href;
    const currentIndex = pages.findIndex(page => currentPage.includes(page.split(':')[2]));
    
    window.addEventListener('wheel', (e) => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (e.deltaY > 0 && currentIndex < pages.length - 1) {
                createSlideOutTransition(pages[currentIndex + 1]);
            } else if (e.deltaY < 0 && currentIndex > 0) {
                createSlideOutTransition(pages[currentIndex - 1]);
            }
        }, 150);
    }, { passive: true });
});

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        className="r3f"
        camera={ {
            fov: 45,
            near: 0.1,
            far: 2000,
            position: [ -3, 1.5, 4 ]
        } }
    >
        <Experience />
    </Canvas>
)