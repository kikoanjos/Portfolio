const express = require('express');
const fs = require('fs'); // Adicionando a importação do módulo fs

// criar uma app express
const app = express();

// Configurar o motor de templates EJS
app.set('view engine', 'ejs');

// Configurar o middleware para servir arquivos estáticos
app.use(express.static('view'));

// Rota para servir o HTML principal
app.get('/', (request, response) => {
  fs.readFile('view/index.ejs', 'utf8', (err, html) => {

    if (err) {
      return response.status(500).send('sorry, out of order');
    }

    response.send(html);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App available on http://localhost:${PORT}`));
