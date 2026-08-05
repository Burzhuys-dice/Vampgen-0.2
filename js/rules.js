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
}
