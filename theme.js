const themes = [
    { id: 'dark', name: '[Dark]', desc: 'Well... It\'s just a dark theme, a regular dark theme. It\'s simply set as the default on the website.' },
    { id: 'light', name: '[Light]', desc: 'A hell for programmers, a paradise for all mothers.' },
    { id: 'night', name: '[Night]', desc: 'A dark night with fireflies... What could be better?' }
];

let currentIndex = 0;

(function() {
    const savedTheme = localStorage.getItem('folltawn-theme');
    if (savedTheme && ['dark', 'light', 'night'].includes(savedTheme)) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('folltawn-theme', 'dark');
    }
})();

function updateCarousel() {
    const theme = themes[currentIndex];
    const display = document.getElementById('themeDisplay');
    const desc = document.getElementById('themeDesc');
    const indicators = document.querySelectorAll('.indicator-dot');
    
    if (!display) return;
    
    display.classList.remove('slide-left', 'slide-right');
    void display.offsetWidth;
    
    display.textContent = theme.name;
    display.classList.add('slide-right');
    if (desc) desc.textContent = theme.desc;
    
    indicators.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    
    const savedTheme = localStorage.getItem('folltawn-theme') || 'dark';
    currentIndex = themes.findIndex(t => t.id === savedTheme);
    if (currentIndex === -1) currentIndex = 0;
    updateCarousel();
    
    const prevBtn = document.getElementById('prevTheme');
    const nextBtn = document.getElementById('nextTheme');
    const applyBtn = document.getElementById('applyTheme');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + themes.length) % themes.length;
            document.getElementById('themeDisplay').classList.add('slide-left');
            updateCarousel();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % themes.length;
            document.getElementById('themeDisplay').classList.add('slide-right');
            updateCarousel();
        });
    }
    
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            const themeId = themes[currentIndex].id;
            localStorage.setItem('folltawn-theme', themeId);
            document.documentElement.setAttribute('data-theme', themeId);
            
            const originalText = applyBtn.textContent;
            applyBtn.textContent = '✓ Применено!';
            applyBtn.style.background = 'rgba(var(--accent), 0.3)';
            
            setTimeout(() => {
                applyBtn.textContent = originalText;
                applyBtn.style.background = '';
            }, 2000);
        });
    }
    
    document.querySelectorAll('.indicator-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
});