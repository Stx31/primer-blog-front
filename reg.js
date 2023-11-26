var data = [];

function saveData() {
    var author = document.getElementById('author').value;
    var title = document.getElementById('title').value;
    var message = document.getElementById('message').value;

    data.push({ author, title, message });

    document.getElementById('messageForm').reset();

    displayData();
}

function deleteData() {
    data = [];
    displayData();
}

function displayData() {
    var container = document.getElementById('dataContainer');
    container.innerHTML = '';

    data.forEach(function(item) {
        var newItem = document.createElement('div');
        newItem.textContent = `${item.author} - ${item.title} - ${item.message}`;
        container.appendChild(newItem);
    });
}



async function saveToServer() {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;

    try {
        const response = await axios.post('http://localhost:3000/saveData', { author, title, message });
        console.log(response.data.message);
    } catch (error) {
        console.error('Error al guardar el mensaje', error);
    }
}

async function deleteFromServer() {
    try {
        const response = await axios.delete('http://localhost:3000/deleteData');
        console.log(response.data.message);
    } catch (error) {
        console.error('Error al borrar los datos', error);
    }
}
