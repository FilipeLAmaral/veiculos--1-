const express = require('express'); // Importa o framework Express.
const router = express.Router(); // Cria um roteador para definir as rotas da API.

const controller = require('./controller'); // Importa o módulo 'controller', que contém as funções para manipular veículos.

router.get('/veiculos', controller.getVeiculos); // Define a rota para obter todos os veículos 


router.get('/veiculos/:placa', controller.getVeiculosByPlaca); // Define a rota para obter um veículo específico por placa


router.post('/veiculos', controller.createVeiculos); // Define a rota para cadastrar um novo veículo


router.put('/veiculos/:placa', controller.updateVeiculos); // Define a rota para atualizar as informações de um veículo existente


router.delete('/veiculos/:placa', controller.deleteVeiculos); // Define a rota para excluir um veículo


module.exports = router; // Exporta o roteador para que possa ser utilizado em outras partes da aplicação