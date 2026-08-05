import { initUI, populateClansUI } from './ui.js';
import { characterState } from './state.js';
import { loadClans } from './dataLoader.js'; // Імпортуємо завантажувач

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Ініціалізуємо базові слухачі подій інтерфейсу
    initUI();
    
    // 2. Асинхронно завантажуємо дані
    console.log("Завантаження ігрових даних...");
    const clans = await loadClans();
    
    // 3. Передаємо завантажені дані в UI
    populateClansUI(clans);
    
    console.log("VtM 5e Character Creator готовий. Початковий стан:", characterState);
});
