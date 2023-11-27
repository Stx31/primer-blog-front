const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = [];

app.post('/saveData', (req, res) => {
    try {
        const { author, title, message } = req.body;

        if (!author || !title || !message) {
            throw new Error('Invalid data. Please provide all fields.');
        }

        data.push({ author, title, message });
        console.log('Data received:', { author, title, message });
        res.json({ message: 'Data saved successfully!' });
    } catch (error) {
        console.error('Error saving data:', error.message);
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});