// scripts.js
import { initLandingPage } from './landingPage.js';

document.addEventListener('DOMContentLoaded', () => {
    // Create and style the dogecoinArcade container
    const dogecoinArcade = document.createElement('div');
    dogecoinArcade.id = 'dogecoinArcade';
    dogecoinArcade.style.width = '1280px';
    dogecoinArcade.style.height = '720px';
    dogecoinArcade.style.backgroundColor = 'skyblue';
    dogecoinArcade.style.position = 'relative';
    dogecoinArcade.style.zIndex = '0';
    
    // Append dogecoinArcade to the body
    document.body.appendChild(dogecoinArcade);

    // Initialize the landing page elements
    initLandingPage(dogecoinArcade);
});
