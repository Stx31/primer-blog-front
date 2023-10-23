// app.js
// Configurar Firebase (reemplaza con tu propia configuración)
const firebaseConfig = {
    apiKey: "TUAUTHAPIKEY",
    authDomain: "tudominio.firebaseapp.com",
    databaseURL: "https://tudominio.firebaseio.com",
    projectId: "tu-proyecto-id",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const input = document.getElementById('pokemon-input');
const guardarBtn = document.getElementById('guardar-btn');

guardarBtn.addEventListener('click', () => {
    const pokemonName = input.value;
    // Guarda el nombre en la base de datos
    database.ref('pokemons').push().set({ name: pokemonName });
    input.value = '';
});
