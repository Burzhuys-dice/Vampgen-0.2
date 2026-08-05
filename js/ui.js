import { updateAttribute } from './state.js';
import { validateAttributeUpgrade } from './rules.js';

const messageBox = document.getElementById('message-box');
const clanSelect = document.getElementById('clan-select');

export function initUI() {
    // 1. Делегування подій для ВСІХ атрибутів одночасно
    document.getElementById('attributes-container').addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            const attr = e.target.dataset.attr;
            const value = parseInt(e.target.dataset.value);
            
    if (clanSelect) {
        clanSelect.addEventListener('change', (e) => {
            const selectedClan = e.target.value;
            updateClan(selectedClan);
        });
    }
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
        if (e.detail.type === 'clan') {
            showMessage(`Клан змінено на: ${e.detail.value || "Не вибрано"}`);
            // У майбутньому тут буде виклик функції, яка малює кланові дисципліни
        }
    });
}

export function populateClansUI(clansArray) {
    if (!clanSelect) return;
    
    clansArray.forEach(clan => {
        const option = document.createElement('option');
        option.value = clan.name; // або id
        option.textContent = clan.name; // Назва клану українською чи англійською
        clanSelect.appendChild(option);
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
