import { initUI } from './ui.js';
import { characterState } from './state.js';

// Чекаємо повного завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
    // Ініціалізуємо інтерфейс
    initUI();
    
    // Тут у майбутньому можна додати виклик dataLoader.js 
    // для завантаження кланів та дисциплін
    console.log("VtM 5e Character Creator завантажено. Початковий стан:", characterState);
});
