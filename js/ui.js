import { updateTrait, updateClan, updateConcept, characterState } from './state.js'; // Додано updateConcept
import { validateAttributeUpgrade, TRAITS_LIST, TRANSLATIONS } from './rules.js';
import { gameData } from './dataLoader.js';

const messageBox = document.getElementById('message-box');
const clanSelect = document.getElementById('clan-select');
// Нові змінні DOM
const predatorSelect = document.getElementById('predator-select');
const charNameInput = document.getElementById('char-name');
const predatorInfo = document.getElementById('predator-info');

// Універсальна функція створення треку з кружечками
function createDotTrack(label, category, traitName, maxDots = 5) {
    const row = document.createElement('div');
    row.className = 'attribute-row';
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = label;
    
    const track = document.createElement('div');
    track.className = 'dot-track';
    
    // Отримуємо поточне значення зі стану (якщо є), інакше 0
    const currentValue = characterState[category]?.[traitName] || 0;

    for (let i = 1; i <= maxDots; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i <= currentValue ? 'filled' : ''}`;
        dot.dataset.category = category; // 'attributes', 'skills' або 'disciplines'
        dot.dataset.trait = traitName;   // 'strength', 'brawl' тощо
        dot.dataset.value = i;
        track.appendChild(dot);
    }
    
    row.appendChild(nameSpan);
    row.appendChild(track);
    return row;
}

export function initUI() {
    // Слухаємо кліки по всьому додатку, щоб охопити і динамічно створені елементи
    document.getElementById('app-container').addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            const category = e.target.dataset.category;
            const trait = e.target.dataset.trait;
            const value = parseInt(e.target.dataset.value);

            // TODO: Додати валідацію для навичок та дисциплін у rules.js
            let isValid = true;
            if (category === 'attributes') {
                isValid = validateAttributeUpgrade(trait, value).valid;
            }
            
            if (isValid) {
                messageBox.textContent = "";
                updateTrait(category, trait, value);
            }
        }
    });

    if (clanSelect) {
        clanSelect.addEventListener('change', (e) => updateClan(e.target.value));
    }
 // Нові слухачі подій для Концепту
    if (predatorSelect) {
        predatorSelect.addEventListener('change', (e) => updateConcept('predatorType', e.target.value));
    }
    if (charNameInput) {
        charNameInput.addEventListener('input', (e) => updateConcept('name', e.target.value));
    }

    // Розширений обробник змін стану
    document.addEventListener('stateChanged', (e) => {
        if (['attributes', 'skills', 'disciplines'].includes(e.detail.type)) {
            renderDots(e.detail.trait, e.detail.value);
        }
        if (e.detail.type === 'clan') {
            renderClanDisciplines(e.detail.value);
        }
        if (e.detail.type === 'concept' && e.detail.field === 'predatorType') {
            renderPredatorInfo(e.detail.value);
        }
    });
}

// Заповнення кланів
export function populateClansUI(clansArray) {
    if (!clanSelect) return;
    clansArray.forEach(clan => {
        const option = document.createElement('option');
        option.value = clan.name;
        option.textContent = clan.name;
        clanSelect.appendChild(option);
    });
}

// Динамічне відображення дисциплін вибраного клану
function renderClanDisciplines(clanName) {
    const container = document.getElementById('disciplines-list');
    container.innerHTML = ''; // Очищаємо попередні
    
    if (!clanName) return;

    // Шукаємо клан у закешованих даних
    const clanData = gameData.clans.find(c => c.name === clanName);
    if (clanData && clanData.disciplines) {
        clanData.disciplines.forEach(disc => {
            // disc - це рядок, наприклад "Auspex"
            const track = createDotTrack(disc, 'disciplines', disc.toLowerCase());
            container.appendChild(track);
        });
    }
}

function renderDots(trait, value) {
    const dots = document.querySelectorAll(`.dot[data-trait="${trait}"]`);
    dots.forEach(dot => {
        const dotVal = parseInt(dot.dataset.value);
        dot.classList.toggle('filled', dotVal <= value);
    });
}
export function populatePredatorsUI(predatorsArray) {
    if (!predatorSelect) return;
    predatorsArray.forEach(pred => {
        const option = document.createElement('option');
        option.value = pred.name;
        option.textContent = pred.name; // Якщо у JSON є переклад, можна юзати pred.name_uk
        predatorSelect.appendChild(option);
    });
}

function renderPredatorInfo(predatorName) {
    if (!predatorName) {
        predatorInfo.innerHTML = '';
        return;
    }
    
    const predData = gameData.predatorTypes.find(p => p.name === predatorName);
    if (predData) {
        // Структура залежить від вашого JSON. Це базовий приклад:
        let infoHtml = `<strong>Бонуси Хижака (${predatorName}):</strong><br>`;
        if (predData.disciplines) infoHtml += `<em>Дисципліни (на вибір):</em> ${predData.disciplines.join(' або ')}<br>`;
        if (predData.specialties) infoHtml += `<em>Спеціалізації:</em> ${predData.specialties.join(', ')}<br>`;
        // Якщо у JSON є загальне поле 'description', можна просто вивести його
        predatorInfo.innerHTML = infoHtml;
    }
}

// Функція для побудови сітки характеристик (Атрибутів або Навичок)
export function renderCoreTraits() {
    const categories = ['physical', 'social', 'mental'];
    const categoryNames = { physical: 'Фізичні', social: 'Соціальні', mental: 'Ментальні' };

    // 1. Генеруємо Атрибути
    const attrGrid = document.getElementById('attributes-grid');
    attrGrid.innerHTML = ''; // Очищаємо
    categories.forEach(cat => {
        const col = document.createElement('div');
        col.className = 'trait-column';
        col.innerHTML = `<h4>${categoryNames[cat]}</h4>`;
        
        TRAITS_LIST.attributes[cat].forEach(attr => {
            const label = TRANSLATIONS[attr] || attr;
            // Атрибути за замовчуванням мають 1 точку мінімум
            col.appendChild(createDotTrack(label, 'attributes', attr, 5));
        });
        attrGrid.appendChild(col);
    });

    // 2. Генеруємо Навички
    const skillsGrid = document.getElementById('skills-grid');
    skillsGrid.innerHTML = '';
    categories.forEach(cat => {
        const col = document.createElement('div');
        col.className = 'trait-column';
        col.innerHTML = `<h4>${categoryNames[cat]}</h4>`;
        
        TRAITS_LIST.skills[cat].forEach(skill => {
            const label = TRANSLATIONS[skill] || skill;
            col.appendChild(createDotTrack(label, 'skills', skill, 5));
        });
        skillsGrid.appendChild(col);
    });
}
