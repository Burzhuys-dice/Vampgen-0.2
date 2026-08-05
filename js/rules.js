import { characterState } from './state.js';

// Константи з правилами
export const V5_RULES = {
    maxAttributeStart: 4,
    minAttributeStart: 1
};

// Функція валідації: чи можна поставити таку кількість точок?
export function validateAttributeUpgrade(attr, newValue) {
    if (newValue > V5_RULES.maxAttributeStart) {
        return { valid: false, message: "На старті атрибут не може бути вище 4." };
    }
    if (newValue < V5_RULES.minAttributeStart) {
        return { valid: false, message: "Атрибут не може бути нижче 1." };
    }
    
    // Тут можна додати перевірку на кількість доступних точок для розподілу
    return { valid: true };
};
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

// Словник перекладу (на основі вашого файлу)
export const TRANSLATIONS = {
    // Атрибути
    strength: 'Міць', dexterity: 'Спритність', stamina: 'Витривалість', 
    charisma: 'Харизма', manipulation: 'Маніпуляція', composure: 'Витримка', 
    intelligence: 'Інтелект', wits: 'Кмітливість', resolve: 'Рішучість',
    // Навички
    athletics: 'Атлетика', brawl: 'Боротьба', craft: 'Ремесло', drive: 'Керування', 
    firearms: 'Стрільба', melee: 'Рукопашний бій', larceny: 'Крадійство', stealth: 'Непомітність', 
    survival: 'Виживання', animal_ken: 'Розуміння тварин', etiquette: 'Етикет', insight: 'Проникливість', 
    intimidation: 'Залякування', leadership: 'Лідерство', performance: 'Виступ', persuasion: 'Переконливість', 
    streetwise: 'Вуличний досвід', subterfuge: 'Хитрість', academics: 'Знання', awareness: 'Спостережливість', 
    finance: 'Фінанси', investigation: 'Розслідування', medicine: 'Медицина', occult: 'Окультизм', 
    politics: 'Політика', science: 'Наука', technology: 'Технології'
}
