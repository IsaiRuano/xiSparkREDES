document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.loader');
    createParticles();
    addTiltEffect();
    animateOnScroll();
    setupBackToTop();
    setupButtonEffects();
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    });
    if (document.readyState === 'complete') {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    }
});

window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
    document.querySelector('.loader').classList.add('hidden');
});
