/**
 * copy.js — чистый функционал копирования без всплывашек
 * Кликнул на код -> код скопировался -> элемент моргнул зелёным -> тост внизу
 */

(function() {
    // Создаём уведомление (toast) для показа сообщений
    function createToast() {
        let toast = document.getElementById('copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'copy-toast';
            toast.style.cssText = `
                position: fixed;
                bottom: 24px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background: var(--accent-orange, #f97316);
                color: white;
                padding: 10px 20px;
                border-radius: 40px;
                font-family: 'JetBrains Mono', monospace;
                font-size: 14px;
                font-weight: 500;
                box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                z-index: 9999;
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
                display: flex;
                align-items: center;
                gap: 8px;
                backdrop-filter: blur(8px);
                border: 1px solid rgba(255,255,255,0.2);
            `;
            document.body.appendChild(toast);
        }
        return toast;
    }

    // Показываем уведомление
    function showToast(message, isError = false) {
        const toast = createToast();
        
        clearTimeout(window.toastTimeout);
        
        toast.style.background = isError 
            ? '#ef4444' 
            : 'linear-gradient(135deg, var(--accent-orange, #f97316), #ea580c)';
        
        toast.innerHTML = isError 
            ? '<i class="fa-solid fa-circle-exclamation"></i> ' + message
            : '<i class="fa-solid fa-check-circle"></i> ' + message;
        
        toast.style.transform = 'translateX(-50%) translateY(0)';
        toast.style.opacity = '1';
        
        window.toastTimeout = setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            toast.style.opacity = '0';
        }, 2000);
    }

    // Функция копирования текста
    async function copyText(text, element) {
        try {
            await navigator.clipboard.writeText(text);
            
            // Визуальный фидбек — элемент моргает зелёным
            element.style.transition = 'all 0.15s ease';
            element.style.transform = 'scale(0.97)';
            element.style.backgroundColor = 'var(--accent-green)';
            element.style.color = 'white';
            element.style.borderColor = 'var(--accent-green)';
            
            setTimeout(() => {
                element.style.transform = '';
                element.style.backgroundColor = '';
                element.style.color = '';
                element.style.borderColor = '';
                
                // Сбрасываем transition после возврата
                setTimeout(() => {
                    element.style.transition = '';
                }, 150);
            }, 150);
            
            showToast('Скопировано!');
            
        } catch (err) {
            // Fallback для старых браузеров
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                showToast('Скопировано!');
            } catch (e) {
                showToast('Не удалось скопировать', true);
            }
            
            document.body.removeChild(textarea);
        }
    }

    // Обработчик клика на code/pre элемент
    function handleCodeClick(event) {
        const element = event.currentTarget;
        let textToCopy = '';
        
        if (element.tagName === 'PRE') {
            const codeElement = element.querySelector('code');
            if (codeElement) {
                textToCopy = codeElement.textContent || codeElement.innerText;
            } else {
                textToCopy = element.textContent || element.innerText;
            }
        } else if (element.tagName === 'CODE') {
            textToCopy = element.textContent || element.innerText;
            
            if (element.parentElement.tagName === 'PRE') {
                textToCopy = element.textContent || element.innerText;
            }
        }
        
        textToCopy = textToCopy.trim();
        
        if (textToCopy) {
            copyText(textToCopy, element);
        }
    }

    // Инициализация
    function initCopyButtons() {
        const codeElements = document.querySelectorAll('code:not(.no-copy), pre:not(.no-copy)');
        
        codeElements.forEach(element => {
            // Удаляем старые обработчики
            element.removeEventListener('click', handleCodeClick);
            // Добавляем новый
            element.addEventListener('click', handleCodeClick);
            
            // Просто меняем курсор, без подсказок
            element.style.cursor = 'pointer';
            
            // Удаляем все остатки старых подсказок, если были
            const oldHints = element.querySelectorAll('.copy-hint');
            oldHints.forEach(hint => hint.remove());
        });
    }

    // Запускаем после загрузки DOM
    document.addEventListener('DOMContentLoaded', initCopyButtons);
    
    // Наблюдаем за новыми элементами
    const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                shouldInit = true;
            }
        });
        
        if (shouldInit) {
            initCopyButtons();
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Небольшие стили
    const style = document.createElement('style');
    style.textContent = `
        code, pre {
            user-select: all;
            transition: transform 0.15s ease, background-color 0.15s ease, color 0.15s ease !important;
        }
        
        code:active, pre:active {
            transform: scale(0.98);
        }
        
        #copy-toast {
            font-family: 'JetBrains Mono', monospace;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.2);
            z-index: 10000;
        }
    `;
    document.head.appendChild(style);

})();