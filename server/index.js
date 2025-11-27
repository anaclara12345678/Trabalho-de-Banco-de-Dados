const express = require('express');
const cors = require('cors');
const professorRoutes = require('./routes/professorRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/', professorRoutes);

app.listen(PORT, () => {
    console.log(`Deu bom demais ${PORT}`);
});