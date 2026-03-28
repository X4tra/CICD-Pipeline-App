const display = document.getElementById('response-text');


async function handleButtonClick(index) {
    display.innerText = "Loading...";

    display.innerText = "Loading...";

    try {
        // Change 'localhost' to your IP if testing on different devices
        const response = await fetch(`http://localhost:8000${index}`);
        const data = await response.json();

        // Update the screen with the message from Python
        display.innerText = data.message;
        display.style.color = "#4CAF50"; // Make it green on success
    } catch (error) {
        display.innerText = "Error: Could not reach the server.";
        display.style.color = "red";
        console.error(error);
    }
};

document.getElementById('api-button').addEventListener('click', async () =>
    handleButtonClick('/hello'));
document.getElementById('status-button').addEventListener('click', async () =>
    handleButtonClick('/status'));
