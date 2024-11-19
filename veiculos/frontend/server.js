const express = require('express'); // Importa o framework Express.
const bodyParser = require('body-parser'); // Importa o middleware body-parser para processar dados do corpo da requisição.
const routes = require('./routes'); // Importa as rotas definidas em um arquivo separado.
const cors = require('cors'); // Importa o middleware CORS para permitir requisições de diferentes origens.

const app = express(); // Cria uma instância do aplicativo Express.

// Middleware para processar requisições com corpo em formato JSON
app.use(bodyParser.json());

// Middleware para permitir CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Define que as rotas importadas serão utilizadas a partir da raiz ('/')
app.use('/', routes);

// Define a porta em que o servidor irá escutar
const port = 3000;

// Inicia o servidor e escuta na porta definida
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`); // Loga uma mensagem no console indicando que o servidor está ativo.
});