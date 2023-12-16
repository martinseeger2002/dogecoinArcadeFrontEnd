// landingPage.js

export function initLandingPage(dogecoinArcade) {
    createWelcomeImage(dogecoinArcade);
    createArcadeImage(dogecoinArcade);
    createLoginButton(dogecoinArcade);
    createRegisterButton(dogecoinArcade);
}
function createWelcomeImage(dogecoinArcade) {
    const welcomeImage = createElementWithStyles('img', {
        src: '/static/images/welcomeToThe.png', // Correct path for Flask
        width: '356px',
        height: '50px',
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1'
    });
    dogecoinArcade.appendChild(welcomeImage);
}

function createArcadeImage(dogecoinArcade) {
    const arcadeImage = createElementWithStyles('img', {
        src: '/static/images/dogecoinArcade.png', // Correct path for Flask
        width: '358px',
        height: '192px',
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1'
    });
    dogecoinArcade.appendChild(arcadeImage);
}

function createLoginButton(dogecoinArcade) {
    const loginButton = createElementWithStyles('button', {
        width: '141px',
        height: '56px',
        backgroundImage: 'url("/static/images/loginButton.png")', // Correct path for Flask
        position: 'absolute',
        top: '62%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1'

    });
    loginButton.id = 'loginButton';
        
    // When login button is clicked, clear the content and load the elements from login.js
    loginButton.addEventListener('click', () => {
        clearDogecoinArcade().then(() => {
            import('./login.js')
                .then(module => {
                    module.initLoginPage(dogecoinArcade); // Assuming initLoginPage is the correct function name
                })
                .catch(err => {
                    console.error("Failed to load the login module", err);
                });
        });
    });
        
    dogecoinArcade.appendChild(loginButton);
}
    
    

function createRegisterButton(dogecoinArcade) {
    const registerButton = createElementWithStyles('button', {
        width: '173px',
        height: '56px',
        backgroundImage: 'url("/static/images/registerButton.png")', // Correct path for Flask
        position: 'absolute',
        top: '75%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1'
    });
    registerButton.id = 'registerButton';
    // When register button is clicked, clear the content and load the elements from register.js
    registerButton.addEventListener('click', () => {
        clearDogecoinArcade().then(() => {
            import('./register.js')
                .then(module => {
                    module.initRegisterPage(dogecoinArcade); // Assuming initRegisterPage is the correct function name
                })
                .catch(err => {
                    console.error("Failed to load the register module", err);
                });
        });
    });
        
    dogecoinArcade.appendChild(registerButton);
}
    
//Function to clear the elements from dogecoinArcade
function clearDogecoinArcade() {
    return new Promise((resolve) => {
        while (dogecoinArcade.firstChild) {
            dogecoinArcade.removeChild(dogecoinArcade.firstChild);
        }
        resolve(); // Resolve the promise after all children are removed
    });
}




// Helper function to create an element with given styles and attributes
function createElementWithStyles(tag, properties) {
    const element = document.createElement(tag);

    // List of common attributes for input and img tags
    const commonAttributes = ['src', 'alt', 'type', 'placeholder'];

    Object.entries(properties).forEach(([key, value]) => {
        if (commonAttributes.includes(key)) {
            // Apply as an attribute
            element.setAttribute(key, value);
        } else {
            // Apply as a style
            element.style[key] = value;
        }
    });

    return element;
}