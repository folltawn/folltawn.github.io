// ===== res/js/theme.js =====
// Управление темой на всех страницах

class ThemeManager {
    constructor() {
        this.themes = ['dark', 'light', 'night-lc'];
        this.currentTheme = localStorage.getItem('site-theme') || 'dark';
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.setupListeners();
        this.updateSettingsUI();
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-th', theme);
        localStorage.setItem('site-theme', theme);
        this.currentTheme = theme;
        
        // Обновляем чекбоксы на странице настроек
        this.updateSettingsUI();
    }
    
    setupListeners() {
        // Слушаем клики по переключателям темы
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-theme]')) {
                const theme = e.target.dataset.theme;
                this.applyTheme(theme);
            }
            
            if (e.target.matches('.theme-radio')) {
                const theme = e.target.value;
                this.applyTheme(theme);
            }
        });
        
        // Слушаем изменение радио-кнопок
        document.addEventListener('change', (e) => {
            if (e.target.matches('[name="theme"]')) {
                this.applyTheme(e.target.value);
            }
        });
    }
    
    updateSettingsUI() {
        // Обновляем радио-кнопки на странице настроек
        const radios = document.querySelectorAll('[name="theme"]');
        radios.forEach(radio => {
            radio.checked = (radio.value === this.currentTheme);
        });
        
        // Обновляем превью
        const preview = document.querySelector('.theme-preview');
        if (preview) {
            preview.className = `theme-preview theme-preview-${this.currentTheme}`;
        }
    }
    
    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.theme = new ThemeManager();
});

