let text = document.getElementById('text');
let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1');
let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5');
let parallaxSection = document.querySelector('.parallax');

// Add a resize event listener to adjust the parallax effect based on screen size
let isMobile = window.innerWidth <= 768;

window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
});

window.addEventListener('scroll', () => {
    let value = window.scrollY;
    let parallaxHeight = parallaxSection.offsetHeight;
    
    // Adjust parallax intensity based on device
    let textFactor = isMobile ? 1.5 : 2.5;
    let leafTopFactor = isMobile ? -1.0 : -1.5;
    let leafLeftFactor = isMobile ? 1.0 : 1.5;
    let hillFactor = isMobile ? 1.0 : 1.5;
    
    if (value <= parallaxHeight) {
        text.style.marginTop = value * textFactor + 'px';
        leaf.style.top = value * leafTopFactor + 'px';
        leaf.style.left = value * leafLeftFactor + 'px';
        hill5.style.left = value * hillFactor + 'px';
        hill4.style.left = value * -hillFactor + 'px';
        hill1.style.top = value * 1 + 'px';
    }
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    // This helps with smoother scrolling on iOS devices
    touchEndY = e.touches[0].clientY;
});

// Add hamburger menu functionality for mobile
function setupResponsiveNav() {
    // Create hamburger menu for very small screens (optional enhancement)
    if (window.innerWidth <= 480) {
        const header = document.querySelector('header');
        const nav = document.querySelector('.navigation');
        
        // Check if we already added the hamburger
        if (!document.querySelector('.hamburger-menu')) {
            // Create hamburger icon
            const hamburger = document.createElement('div');
            hamburger.className = 'hamburger-menu';
            hamburger.innerHTML = '☰';
            hamburger.style.fontSize = '2em';
            hamburger.style.cursor = 'pointer';
            hamburger.style.color = '#359381';
            hamburger.style.position = 'absolute';
            hamburger.style.right = '20px';
            hamburger.style.top = '20px';
            
            // Initially hide navigation
            nav.style.display = 'none';
            
            // Toggle navigation when hamburger is clicked
            hamburger.addEventListener('click', () => {
                if (nav.style.display === 'none') {
                    nav.style.display = 'flex';
                    hamburger.innerHTML = '✕';
                } else {
                    nav.style.display = 'none';
                    hamburger.innerHTML = '☰';
                }
            });
            
            header.appendChild(hamburger);
        }
    } else {
        // Remove hamburger for larger screens
        const hamburger = document.querySelector('.hamburger-menu');
        if (hamburger) {
            hamburger.remove();
            document.querySelector('.navigation').style.display = 'flex';
        }
    }
}

// Call this function on load and resize
window.addEventListener('load', setupResponsiveNav);
window.addEventListener('resize', setupResponsiveNav);