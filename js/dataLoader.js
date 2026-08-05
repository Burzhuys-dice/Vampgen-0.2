// Функція для завантаження списку кланів
export async function loadClans() {
    try {
        const response = await fetch('./data/vtm_clans.json');
        if (!response.ok) throw new Error('Мережева помилка при завантаженні кланів');
        const clansData = await response.json();
        return clansData;
    } catch (error) {
        console.error("Помилка завантаження кланів:", error);
        return [];
    }
}

// В майбутньому тут будуть функції: loadDisciplines(), loadMerits() тощо
