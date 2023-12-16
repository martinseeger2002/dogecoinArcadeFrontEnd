// register.js
export function initRegisterPage(dogecoinArcade) {
    console.log("initRegisterPage called"); // Debugging line
    createArcadeImageBubble(dogecoinArcade);
    createRegistrationForm(dogecoinArcade);
    loadRegisterButton(dogecoinArcade);
}

let inProcess = false;


function createRegistrationForm(dogecoinArcade) {
    // Create form
    const form = document.createElement('form');
    form.id = 'registrationForm';
    form.style.position = 'absolute'; // Position form absolutely
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.alignItems = 'center'; // Center items in form
    form.style.justifyContent = 'center'; // Center form content
    form.style.width = '300px'; // Set a fixed width
    form.style.top = '50%'; // Center vertically relative to ArcadeImageBubble
    form.style.left = '50%'; // Center horizontally relative to ArcadeImageBubble
    form.style.transform = 'translate(-50%, -50%)'; // Adjust for perfect centering
    form.style.zIndex = '2'; // Ensure form is above the ArcadeImageBubble


    // Create and append input elements
    const inputs = [
        { id: 'username', type: 'text', placeholder: 'Username', margin: '24px 0' },
        { id: 'email', type: 'email', placeholder: 'Email', margin: '24px 0' },
        { id: 'password', type: 'password', placeholder: 'Password', margin: '24px 0' },
        { id: 'confirmPassword', type: 'password', placeholder: 'Confirm Password', margin: '24px 0' }
    ];

    inputs.forEach(inputInfo => {
        const input = createElementWithStyles('input', inputInfo);
        form.appendChild(input);
    });

    // Create and append the submit button
    const submitButton = createElementWithStyles('button', {
        innerText: 'Register',
        type: 'button', // Prevent form from auto submitting
        onClick: createUser // Attach the createUser function to the button's onclick event
    });
    form.appendChild(submitButton);

    // Append the form to the dogecoinArcade container
    dogecoinArcade.appendChild(form);
}

function createArcadeImageBubble(dogecoinArcade) {
    const arcadeImage = createElementWithStyles('img', {
        src: '/static/images/registerBubble.png',
        width: '358px',
        height: '292px',
        position: 'absolute',
        top: '47%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1'
    });

    dogecoinArcade.appendChild(arcadeImage);
}

function loadRegisterButton(dogecoinArcade) {
    const registerButton = document.createElement('button');
    registerButton.id = 'registerButton';
    registerButton.style.width = '173px';
    registerButton.style.height = '56px';
    registerButton.style.backgroundImage = 'url("/static/images/registerButton.png")';
    registerButton.style.position = 'absolute';
    registerButton.style.top = '75%';
    registerButton.style.left = '50%';
    registerButton.style.transform = 'translate(-50%, -50%)';
    registerButton.style.zIndex = '1';
    registerButton.addEventListener('click', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        if (inProcess) {
            console.log("Registration in progress...");
            return; // Exit if already in process
        }

        inProcess = true;
        console.log("Register button clicked");

        try {
            await createUser();
            inProcess = false; // Reset inProcess after successful or failed registration
            clearDogecoinArcade().then(() => {
                import('./login.js')
                    .then(module => {
                        module.initLoginPage(dogecoinArcade); // Assuming initLoginPage is the correct function name
                    })
                    .catch(err => {
                        console.error("Failed to load the login module", err);
                    });
            });
        } catch (err) {
            console.error("Error during registration:", err);
            inProcess = false; // Reset inProcess in case of error
        
        }
    });

    dogecoinArcade.appendChild(registerButton);
}


//Function to clear the elements from dogecoinArcade
function clearDogecoinArcade() {
    return new Promise((resolve) => {
        console.log("Clearing Dogecoin Arcade..."); // Debug log
        const arcadeContainer = document.getElementById('dogecoinArcade');
        if (!arcadeContainer) {
            console.error("Dogecoin Arcade container not found!");
            return resolve(); // Resolve even if container is not found
        }
        while (arcadeContainer.firstChild) {
            arcadeContainer.removeChild(arcadeContainer.firstChild);
        }
        console.log("Dogecoin Arcade cleared."); // Debug log
        resolve(); // Resolve the promise after all children are removed
    });
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


// Function to post user to flask
async function createUser() {
    try {
        const usernameElement = document.getElementById('username');
        const passwordElement = document.getElementById('password');
        const confirmPasswordElement = document.getElementById('confirmPassword');
        const emailElement = document.getElementById('email');

        if (!usernameElement || !passwordElement || !confirmPasswordElement || !emailElement) {
            console.error('One or more form elements could not be found.');
            return;
        }

        const username = usernameElement.value;
        const password = passwordElement.value;
        const confirmPassword = confirmPasswordElement.value;
        const email = emailElement.value;

        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return; // Exit if passwords don't match
        }

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&email=${encodeURIComponent(email)}`
    });

    const data = await response.json();
    console.log(data);
} catch (error) {
    console.error('Error during user creation:', error);
}
}