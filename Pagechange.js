const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 5500;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "Snake and ladder game" directory
app.use(express.static(path.join(__dirname, 'Game Page')));

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'Game Page', 'Enterpage.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    const choice = req.body.choice;
    console.log('Form submitted with choice:', choice); // Debug log
    if (choice === 'Yes') {
        res.sendFile(path.join(__dirname,'Game Page', 'Board.html'));
    }
    else if (choice === 'No') {
        res.sendFile(path.join(__dirname,'Game Page', 'Endpage.html'));
    }else {
        res.status(400).send('Invalid choice');
    }
});

app.listen(port,()=>{
    console.log(`Server listening on port http://localhost:${port}`);
})