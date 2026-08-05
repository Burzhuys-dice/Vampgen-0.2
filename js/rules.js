import { characterState } from './state.js';

// Структура всіх характеристик за категоріями
export const TRAITS_LIST = {
    attributes: {
        physical: ['strength', 'dexterity', 'stamina'],
        social: ['charisma', 'manipulation', 'composure'],
        mental: ['intelligence', 'wits', 'resolve']
    },
    skills: {
        physical: ['athletics', 'brawl', 'craft', 'drive', 'firearms', 'melee', 'larceny', 'stealth', 'survival'],
        social: ['animal_ken', 'etiquette', 'insight', 'intimidation', 'leadership', 'performance', 'persuasion', 'streetwise', 'subterfuge'],
        mental: ['academics', 'awareness', 'finance', 'investigation', 'medicine', 'occult', 'politics', 'science', 'technology']
    }
};

// Словник перекладу
export const TRANSLATIONS = {
    strength: 'Міць', dexterity: 'Спритність', stamina: 'Витривалість', 
    charisma: 'Харизма', manipulation: 'Маніпуляція', composure: 'Витримка', 
    intelligence: 'Інтелект', wits: 'Кмітливість', resolve: 'Рішучість',
    athletics: 'Атлетика', brawl: 'Боротьба', craft: 'Ремесло', drive: 'Керування', 
    firearms: 'Стрільба', melee: 'Рукопашний бій', larceny: 'Крадійство', stealth: 'Непомітність', 
    survival: 'Виживання', animal_ken: 'Розуміння тварин', etiquette: 'Етикет', insight: 'Проникливість', 
    intimidation: 'Залякування', leadership: 'Лідерство', performance: 'Виступ', persuasion: 'Переконливість', 
    streetwise: 'Вуличний досвід', subterfuge: 'Хитрість', academics: 'Знання', awareness: 'Спостережливість', 
    finance: 'Фінанси', investigation: 'Розслідування', medicine: 'Медицина', occult: 'Окультизм', 
    politics: 'Політика', science: 'Наука', technology: 'Технології'
};

// Базові ліміти створення персонажа V5
export const V5_RULES = {
    minAttribute: 1, // Кожен атрибут стартує мінімум з 1
    maxAttribute: 4  // Максимум на старті без переваг
};

// Перевірка валідності кліку на атрибут
export function validateAttributeUpgrade(traitName, targetValue) {
    if (targetValue < V5_RULES.minAttribute) {
        return { valid: false, message: "Атрибут не може бути нижче 1." };
    }
    if (targetValue > V5_RULES.maxAttribute) {
        return { valid: false, message: "На етапі створення персонажа атрибут не може перевищувати 4." };
    }
    
    // Додатково тут можна буде перевіряти пули розподілу (наприклад, одне правило на 4, три на 3 тощо)
    return { valid: true };
}
