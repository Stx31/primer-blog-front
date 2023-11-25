document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

function fetchData() {
    fetch('/getData')
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.error('Error al obtener datos:', error));
}

function displayData(data) {
    var container = document.getElementById('dataContainer');
    container.innerHTML = '';


    data.forEach(function (item) {
        var newItem = document.createElement('div');
        newItem.textContent = `${item.author} - ${item.title} - ${item.message}`;
        container.appendChild(newItem);
    });
}
