import { initUI, populateClansUI, populatePredatorsUI, renderCoreTraits } from './ui.js'; 
import { characterState } from './state.js';
import { loadClans, loadPredatorTypes } from './dataLoader.js'; // Додали імпорт

document.addEventListener('DOMContentLoaded', async () => {
    initUI();
    renderCoreTraits(); 
    
    console.log("Завантаження ігрових даних...");
    
    // Завантажуємо обидва файли одночасно для швидкості
    const [clans, predators] = await Promise.all([
        loadClans(),
        loadPredatorTypes()
    ]);
    
    populateClansUI(clans);
    populatePredatorsUI(predators); // Передаємо хижаків у UI
    
    console.log("VtM 5e Character Creator готовий.");
});
