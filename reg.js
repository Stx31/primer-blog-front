const data = [];

function saveData() {
    try {
        const author = document.getElementById('author').value;
        const title = document.getElementById('title').value;
        const message = document.getElementById('message').value;

        if (!author || !title || !message) {
            throw new Error('Please fill out all fields.');
        }

        data.push({ author, title, message });
        displayData();
        saveToServer(); // Add this line to save data to the server
        document.getElementById('messageForm').reset();
    } catch (error) {
        console.error('Error saving data:', error.message);
    }
}

function deleteData() {
    try {
        data.length = 0;
        displayData();
        deleteFromServer();
    } catch (error) {
        console.error('Error deleting data:', error.message);
    }
}

function displayData() {
    const container = document.getElementById('dataContainer');
    container.innerHTML = '';

    data.forEach(({ author, title, message }) => {
        const newItem = document.createElement('div');
        newItem.textContent = `${author} - ${title} - ${message}`;
        container.appendChild(newItem);
    });
}

async function saveToServer() {
    try {
        const { value: author } = document.getElementById('author');
        const { value: title } = document.getElementById('title');
        const { value: message } = document.getElementById('message');

        const response = await axios.post('http://localhost:3000/saveData', { author, title, message });
        console.log(response.data.message);
    } catch (error) {
        console.error('Error saving to the server:', error);
    }
}

async function deleteFromServer() {
    try {
        const response = await axios.delete('http://localhost:3000/deleteData');
        console.log(response.data.message);
    } catch (error) {
        console.error('Error deleting from the server:', error);
    }
}

