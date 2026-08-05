// Глобальне сховище для завантажених даних
export const gameData = {
    clans: []
};

export async function loadClans() {
    try {
        const response = await fetch('./data/vtm_clans.json');
        if (!response.ok) throw new Error('Помилка завантаження кланів');
        const data = await response.json();
        
        gameData.clans = data; // Зберігаємо в кеш
        return data;
    } catch (error) {
        console.error("Помилка:", error);
        return [];
    }
}
