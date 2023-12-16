// forgotPass.js
export function initForgotPassPage(dogecoinArcade) {
    createArcadeImageBubble(dogecoinArcade);
    loadSubmitButton(dogecoinArcade);
}

function loadSubmitButton(dogecoinArcade) {
    const submitButton = document.createElement('button');
    submitButton.id = 'submitButton';
    submitButton.style.width = '141px';
    submitButton.style.height = '56px';
    submitButton.style.backgroundImage = 'url("/static/images/submitButton.png")';
    submitButton.style.position = 'absolute';
    submitButton.style.top = '62%';
    submitButton.style.left = '50%';
    submitButton.style.transform = 'translate(-50%, -50%)';
    submitButton.style.zIndex = '1';
    // Add event listeners or functionality for the submit process here

    dogecoinArcade.appendChild(submitButton);
}


function createArcadeImageBubble(dogecoinArcade) {
    const bubbleImage = createElementWithStyles('img', {
        src: '/static/images/emailBubble.png', // Correct path for Flask
        width: '358px',
        height: '192px',
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1'
    });
        const emailInput = createElementWithStyles('input', {
        type: 'text',
        placeholder: 'email',
        position: 'absolute',
        top: '38%', // Adjust as needed
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '2'
    });
    dogecoinArcade.appendChild(emailInput);


    dogecoinArcade.appendChild(emailInput);
    dogecoinArcade.appendChild(bubbleImage);
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

