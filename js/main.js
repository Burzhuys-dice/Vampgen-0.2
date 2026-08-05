mport { initUI, populateClansUI, renderCoreTraits } from './ui.js'; // Додано імпорт
import { characterState } from './state.js';
import { loadClans } from './dataLoader.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Ініціалізуємо базові слухачі
    initUI();
    
    // 2. Генеруємо лист персонажа (Атрибути та Навички)
    renderCoreTraits(); 
    
    // 3. Асинхронно завантажуємо дані
    console.log("Завантаження ігрових даних...");
    const clans = await loadClans();
    
    // 4. Передаємо завантажені дані в UI
    populateClansUI(clans);
    
    console.log("VtM 5e Character Creator готовий.");
});
