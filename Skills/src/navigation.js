/**
 * Navigation Interactivity
 */
// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle')
const mobileMenu = document.querySelector('.mobile-menu')

if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active')
        mobileToggle.classList.toggle('active')
    })

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active')
            mobileToggle.classList.remove('active')
        })
    })
}

// Compass needle follows mouse (desktop only)
const compassNeedle = document.querySelector('.compass-needle')
const compassCenter = document.querySelector('.compass-center')

if (compassNeedle && compassCenter && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        const rect = compassCenter.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
        compassNeedle.style.transform = `rotate(${angle + Math.PI / 2}rad)`
    })
}
