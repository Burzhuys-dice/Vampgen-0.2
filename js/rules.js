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
    maxAttribute: 4, // Максимум на старті без переваг
    // Допустимі кількості кожного рівня точок для 9 атрибутів: один '4', три '3', чотири '2', один '1'
    attributePoolPattern: [1, 3, 4, 1] 
};

// Перевірка валідності кліку на атрибут з урахуванням лімітів пулу
export function validateAttributeUpgrade(traitName, targetValue) {
    if (targetValue < V5_RULES.minAttribute) {
        return { valid: false, message: "Атрибут не може бути нижче 1." };
    }
    if (targetValue > V5_RULES.maxAttribute) {
        return { valid: false, message: "На етапі створення персонажа атрибут не може перевищувати 4." };
    }

    // Збираємо поточні значення всіх атрибутів (крім того, що редагується зараз)
    const currentAttributes = { ...characterState.attributes };
    currentAttributes[traitName] = targetValue;

    // Рахуємо кількість кожного значення (від 1 до 4)
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (const attr in currentAttributes) {
        const val = currentAttributes[attr];
        if (counts[val] !== undefined) {
            counts[val]++;
        }
    }

    // Перевіряємо суворі ліміти V5 (1х4, 3х3, 4х2, 1х1)
    if (counts[4] > 1) return { valid: false, message: "Дозволено лише один атрибут на рівні 4." };
    if (counts[3] > 3) return { valid: false, message: "Дозволено максимум три атрибути на рівні 3." };
    if (counts[2] > 4) return { valid: false, message: "Дозволено максимум чотири атрибути на рівні 2." };
    if (counts[1] > 1) return { valid: false, message: "Лише один атрибут може залишатися на рівні 1." };

    return { valid: true };
}
