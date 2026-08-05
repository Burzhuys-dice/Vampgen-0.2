export const gameData = {
    clans: [],
    predatorTypes: [] // Додали масив для типів хижака
};

export async function loadClans() {
    try {
        const response = await fetch('./data/vtm_clans.json');
        if (!response.ok) throw new Error('Помилка завантаження кланів');
        const data = await response.json();
        gameData.clans = data;
        return data;
    } catch (error) {
        console.error("Помилка кланів:", error);
        return [];
    }
}

// Нова функція
export async function loadPredatorTypes() {
    try {
        const response = await fetch('./data/vtm_predator_types.json');
        if (!response.ok) throw new Error('Помилка завантаження типів хижака');
        const data = await response.json();
        gameData.predatorTypes = data;
        return data;
    } catch (error) {
        console.error("Помилка типів хижака:", error);
        return [];
    }
}
