const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware zur Verarbeitung von URL-kodierten Daten
app.use(express.urlencoded({ extended: true }));

// GET-Endpunkt, der das Formular anzeigt
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// POST-Endpunkt, der die Formulardaten entgegennimmt und in eine Datei schreibt
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const userData = `Name: ${name}, E-Mail: ${email}, Passwort: ${password}\n`;

    fs.appendFile('users.txt', userData, (err) => {
        if (err) {
            console.error('Fehler beim Schreiben der Datei', err);
            return res.status(500).send('Fehler beim Schreiben der Datei');
        }
        res.send('Registrierung erfolgreich!');
    });
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
