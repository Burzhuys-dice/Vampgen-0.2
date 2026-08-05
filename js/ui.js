import { updateAttribute } from './state.js';
import { validateAttributeUpgrade } from './rules.js';

const messageBox = document.getElementById('message-box');

export function initUI() {
    // 1. Делегування подій для ВСІХ атрибутів одночасно
    document.getElementById('attributes-container').addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            const attr = e.target.dataset.attr;
            const value = parseInt(e.target.dataset.value);

            // Перевіряємо правила перед зміною стану
            const validation = validateAttributeUpgrade(attr, value);
            
            if (validation.valid) {
                messageBox.textContent = ""; // Очищаємо помилки
                updateAttribute(attr, value); // Змінюємо стан
            } else {
                showMessage(validation.message);
            }
        }
    });

    // 2. Слухаємо зміни стану і оновлюємо візуал
    document.addEventListener('stateChanged', (e) => {
        if (e.detail.type === 'attribute') {
            renderDots(e.detail.attr, e.detail.value);
        }
    });
}

// Функція зафарбовування кружечків
function renderDots(attr, value) {
    const dots = document.querySelectorAll(`.dot[data-attr="${attr}"]`);
    dots.forEach(dot => {
        const dotVal = parseInt(dot.dataset.value);
        if (dotVal <= value) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

// Функція для виводу повідомлень без використання alert()
function showMessage(text) {
    messageBox.textContent = text;
    setTimeout(() => { messageBox.textContent = ""; }, 3000);
}
