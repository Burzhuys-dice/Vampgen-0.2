// Початковий стан персонажа
export const characterState = {
    concept: {
        name: "",
        clan: null,
        predatorType: null
    },
    attributes: {
        strength: 1, 
        dexterity: 1, 
        stamina: 1,
        charisma: 1,
        manipulation: 1,
        composure: 1,
        intelligence: 1,
        wits: 1,
        resolve: 1
    },
    skills: {},
    disciplines: []
};

// Централізована функція оновлення атрибутів
export function updateAttribute(attr, value) {
    characterState.attributes[attr] = value;
    
    // Генеруємо подію, щоб UI знав, що дані змінилися і їх треба перемалювати
    const event = new CustomEvent('stateChanged', { 
        detail: { type: 'attribute', attr: attr, value: value } 
    });
    document.dispatchEvent(event);
}
export function updateClan(clanName) {
    characterState.concept.clan = clanName;
    
    // Сповіщаємо систему, що клан змінився (щоб UI міг показати кланові дисципліни тощо)
    const event = new CustomEvent('stateChanged', { 
        detail: { type: 'clan', value: clanName } 
    });
    document.dispatchEvent(event);
}
