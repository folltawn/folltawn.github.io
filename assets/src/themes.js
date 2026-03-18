(function() {
    const themes = ['light', 'dark', 'night'];
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        currentTheme = theme;
        
        const btnIcon = document.querySelector('#globalThemeToggle i');
        if (btnIcon) {
            btnIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                if (theme === 'light') btnIcon.className = 'fa-regular fa-sun';
                else if (theme === 'dark') btnIcon.className = 'fa-regular fa-moon';
                else if (theme === 'night') btnIcon.className = 'fa-regular fa-star';
                btnIcon.style.transform = '';
            }, 150);
        }
    }
    
    function cycleTheme() {
        let idx = themes.indexOf(currentTheme);
        idx = (idx + 1) % themes.length;
        setTheme(themes[idx]);
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        setTheme(currentTheme);
        
        const themeBtn = document.getElementById('globalThemeToggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', cycleTheme);
        }
    });
})();