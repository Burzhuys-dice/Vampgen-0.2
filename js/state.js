export const characterState = {
    concept: { name: "", clan: null, predatorType: null },
    attributes: { strength: 1, dexterity: 1, stamina: 1, charisma: 1, manipulation: 1, composure: 1, intelligence: 1, wits: 1, resolve: 1 },
    skills: {}, // Заповниться динамічно
    disciplines: {} // Наприклад: { "Celerity": 2, "Potence": 1 }
};

export function updateClan(clanName) {
    characterState.concept.clan = clanName;
    // Скидаємо вибрані дисципліни при зміні клану
    characterState.disciplines = {}; 
    
    document.dispatchEvent(new CustomEvent('stateChanged', { detail: { type: 'clan', value: clanName } }));
}

// Універсальна функція для будь-яких характеристик
export function updateTrait(category, trait, value) {
    if (!characterState[category]) characterState[category] = {};
    characterState[category][trait] = value;
    
    document.dispatchEvent(new CustomEvent('stateChanged', { 
        detail: { type: category, trait: trait, value: value } 
    });
}

export function updateConcept(field, value) {
    characterState.concept[field] = value;
    
    document.dispatchEvent(new CustomEvent('stateChanged', { 
        detail: { type: 'concept', field: field, value: value } 
    }));
}
