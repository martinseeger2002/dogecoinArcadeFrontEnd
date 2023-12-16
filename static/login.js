// login.js
export function initLoginPage(dogecoinArcade) {
    createArcadeImageBubble(dogecoinArcade);
    loadLoginButton(dogecoinArcade);
    loadForgotButton(dogecoinArcade);
}

function loadLoginButton(dogecoinArcade) {
    const loginButton = document.createElement('button');
    loginButton.id = 'loginButton';
    loginButton.style.width = '141px';
    loginButton.style.height = '56px';
    loginButton.style.backgroundImage = 'url("/static/images/loginButton.png")';
    loginButton.style.position = 'absolute';
    loginButton.style.top = '62%';
    loginButton.style.left = '50%';
    loginButton.style.transform = 'translate(-50%, -50%)';
    loginButton.style.zIndex = '1';
    loginButton.addEventListener('click', async function(event) {
        event.preventDefault(); // Prevent the default form submission
        console.log("Login button clicked");
    
        try {
            const data = await userAuth();
            console.log("User authenticated successfully:", data);
            // Handle successful authentication
            // e.g., redirect to a dashboard or show a success message
        } catch (err) {
            // Handle authentication errors
            console.error("Authentication failed:", err);
            // Display an error message to the user
        }
    });

    dogecoinArcade.appendChild(loginButton);
}
function loadForgotButton(dogecoinArcade) {
    const forgotButton = document.createElement('button');
    forgotButton.id = 'forgotButton';
    forgotButton.style.width = '173px';
    forgotButton.style.height = '56px';
    forgotButton.style.backgroundImage = 'url("/static/images/forgotButton.png")';
    forgotButton.style.position = 'absolute';
    forgotButton.style.top = '75%';
    forgotButton.style.left = '50%';
    forgotButton.style.transform = 'translate(-50%, -50%)';
    forgotButton.style.zIndex = '1';

        // When forgot button is clicked, clear the content and load the elements from login.js
    forgotButton.addEventListener('click', () => {
        clearDogecoinArcade().then(() => {
            import('./forgotPass.js')
                .then(module => {
                    module.initForgotPassPage(dogecoinArcade); // Assuming initforgotPass Page is the correct function name
                })
                .catch(err => {
                    console.error("Failed to load the forgotPass module", err);
                });
        });
    });

    dogecoinArcade.appendChild(forgotButton);
}

function clearDogecoinArcade() {
    return new Promise((resolve) => {
        while (dogecoinArcade.firstChild) {
            dogecoinArcade.removeChild(dogecoinArcade.firstChild);
        }
        resolve(); // Resolve the promise after all children are removed
    });
}

function createArcadeImageBubble(dogecoinArcade) {
    const arcadeImage = createElementWithStyles('img', {
        src: '/static/images/usernamePasswordBubble.png', // Correct path for Flask
        width: '358px',
        height: '192px',
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1'
    });
        const usernameInput = createElementWithStyles('input', {
        id: 'username',
        type: 'text',
        placeholder: 'Username',
        position: 'absolute',
        top: '38%', // Adjust as needed
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '2'
    });
    dogecoinArcade.appendChild(usernameInput);

    // Create password input field
    const passwordInput = createElementWithStyles('input', {
        id: 'password',
        type: 'password',
        placeholder: 'Password',
        position: 'absolute',
        top: '47%', // Adjust as needed
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '2'
    });
    dogecoinArcade.appendChild(passwordInput);
    dogecoinArcade.appendChild(arcadeImage);
}

// Helper function to create an element with given styles and attributes
function createElementWithStyles(tag, properties) {
    const element = document.createElement(tag);

    // Added 'id' to the list of common attributes
    const commonAttributes = ['src', 'alt', 'type', 'placeholder', 'id'];

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


// Function to authenticate user
async function userAuth() {
    try {
        const usernameElement = document.getElementById('username');
        const passwordElement = document.getElementById('password');

        if (!usernameElement || !passwordElement) {
            console.error('Username or password field not found');
            return; // Exit if fields are not found
        }

        const username = usernameElement.value;
        const password = passwordElement.value;

        // Ensure the response variable is properly defined in this scope
        const response = await fetch('/userAuth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Authentication failed");
        }

        return await response.json();
    } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
}
