const express = require('express'); // Importa o framework Express para criar o servidor.
const bodyParser = require('body-parser'); // Importa o middleware body-parser para analisar o corpo das requisições.
const cors = require('cors');  // Importa o pacote CORS para permitir requisições de diferentes origens.

const app = express(); // Cria uma instância do aplicativo Express.

// Habilita CORS para todas as origens
app.use(cors());  // Permite que o servidor aceite requisições de qualquer origem. 
// Alternativamente, você pode especificar uma origem específica usando: app.use(cors({ origin: 'http://localhost:5173' }))

// Usando body-parser para entender o corpo das requisições em JSON
app.use(bodyParser.json()); // Configura o middleware para analisar requisições com conteúdo JSON.

const veiculos = []; // Cria um array vazio para armazenar os veículos.

// Rota para obter todos os veículos
app.get('/veiculos', (req, res) => {
    res.json(veiculos); // Retorna a lista de veículos em formato JSON.
});

// Rota para obter um veículo específico por placa
app.get('/veiculos/:placa', (req, res) => {
    const { placa } = req.params; // Extrai a placa da URL.
    const veiculo = veiculos.find(v => v.placa === placa); // Busca o veículo correspondente à placa.
    if (veiculo) {
        res.json(veiculo); // Retorna o veículo encontrado em formato JSON.
    } else {
        res.status(404).json({ message: 'Veículo não encontrado.' }); // Retorna erro 404 se o veículo não for encontrado.
    }
});

// Rota para cadastrar um novo veículo
app.post('/veiculos', (req, res) => {
    const { placa, marca, modelo, ano } = req.body; // Extrai os dados do veículo do corpo da requisição.
    const veiculo = { placa, marca, modelo, ano }; // Cria um objeto veículo.
    veiculos.push(veiculo); // Adiciona o novo veículo à lista.
    res.status(201).json({ message: 'Veículo cadastrado com sucesso.' }); // Retorna status 201 e mensagem de sucesso.
});

// Rota para atualizar as informações de um veículo
app.put('/veiculos/:placa', (req, res) => {
    const { placa } = req.params; // Extrai a placa da URL.
    const { marca, modelo, ano } = req.body; // Extrai os dados do corpo da requisição.
    const veiculo = veiculos.find(v => v.placa === placa); // Busca o veículo correspondente à placa.
    if (veiculo) {
        // Atualiza os campos do veículo apenas se novos valores forem fornecidos.
        veiculo.marca = marca || veiculo.marca;
        veiculo.modelo = modelo || veiculo.modelo;
        veiculo.ano = ano || veiculo.ano;
        res.json({ message: 'Informações do veículo atualizadas com sucesso.' }); // Retorna mensagem de sucesso.
    } else {
        res.status(404).json({ message: 'Veículo não encontrado.' }); // Retorna erro 404 se o veículo não for encontrado.
    }
});

// Rota para excluir um veículo
app.delete('/veiculos/:placa', (req, res) => {
    const { placa } = req.params; // Extrai a placa da URL.
    const veiculoIndex = veiculos.findIndex(v => v.placa === placa); // Busca o índice do veículo na lista.
    if (veiculoIndex !== -1) {
        veiculos.splice(veiculoIndex, 1); // Remove o veículo da lista.
        res.json({ message: 'Veículo excluído com sucesso.' }); // Retorna mensagem de sucesso.
    } else {
        res.status(404).json({ message: 'Veículo não encontrado.' }); // Retorna erro 404 se o veículo não for encontrado.
    }
});

const port = 3000; // Define a porta em que o servidor irá escutar.
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`); // Inicia o servidor e imprime mensagem no console.
});