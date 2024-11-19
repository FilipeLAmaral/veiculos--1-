const veiculos = []; // Cria um array vazio para armazenar os veículos.

// Função para obter todos os veículos
function getVeiculos(req, res) { 
    res.json(veiculos); // Retorna a lista de veículos em formato JSON.
} 

// Função para obter um veículo específico por placa
function getVeiculosByPlaca(req, res) {
    const { placa } = req.params; // Extrai a placa da URL.
    const veiculo = veiculos.find(v => v.placa === placa); // Busca o veículo correspondente à placa.
    if (veiculo) { 
        res.json(veiculo); // Retorna o veículo encontrado em formato JSON.
    } else {
        res.status(404).json({ message: 'Veículo não encontrado.' }); // Retorna erro 404 se o veículo não for encontrado.
    } 
} 

// Função para cadastrar um novo veículo
function createVeiculos(req, res) { 
    const { placa, marca, modelo, ano } = req.body; // Extrai os dados do veículo do corpo da requisição.
    
    const veiculo = { placa, marca, modelo, ano }; // Cria um objeto veículo.
    veiculos.push(veiculo); // Adiciona o novo veículo à lista.
    res.status(201).json({ message: 'Veículo cadastrado com sucesso.' }); // Retorna status 201 e mensagem de sucesso.
} 

// Função para atualizar as informações de um veículo
function updateVeiculos(req, res) { 
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
} 

// Função para excluir um veículo
function deleteVeiculos(req, res) { 
    const { placa } = req.params; // Extrai a placa da URL.
    const veiculoIndex = veiculos.findIndex(v => v.placa === placa); // Busca o índice do veículo na lista.
    if (veiculoIndex !== -1) { 
        veiculos.splice(veiculoIndex, 1); // Remove o veículo da lista.
        res.json({ message: 'Veículo excluído com sucesso.' }); // Retorna mensagem de sucesso.
    } else { 
        res.status(404).json({ message: 'Veículo não encontrado.' }); // Retorna erro 404 se o veículo não for encontrado.
    } 
} 

// Exporta as funções para serem usadas em outras partes da aplicação
module.exports = { getVeiculos, getVeiculosByPlaca, createVeiculos, updateVeiculos, deleteVeiculos };