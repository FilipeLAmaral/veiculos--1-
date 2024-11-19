import React, { useState, useEffect } from 'react'; // Importa o React e hooks useState e useEffect para gerenciar estado e efeitos colaterais.
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP.
import './App.css'; // Importa o arquivo CSS para estilização do componente.

const App = () => {
  const [veiculos, setVeiculos] = useState([]); // Estado para armazenar a lista de veículos.
  const [formData, setFormData] = useState({ // Estado para armazenar os dados do formulário.
    placa: '',
    marca: '',
    modelo: '',
    ano: ''
  });
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar se estamos em modo de edição ou criação.

  useEffect(() => {
    // Efeito colateral que é executado ao montar o componente.
    fetchVeiculos(); // Chama a função para carregar os veículos.
  }, []); // O array vazio significa que o efeito será executado apenas uma vez.

  const fetchVeiculos = async () => { // Função assíncrona para buscar veículos do servidor.
    try {
      const response = await axios.get('http://localhost:3000/veiculos'); // Faz uma requisição GET para buscar os veículos.
      setVeiculos(response.data); // Atualiza o estado com os dados recebidos.
    } catch (error) {
      console.error(error); // Trata erros de requisição.
    }
  };

  const handleInputChange = e => { // Função para lidar com mudanças nos campos do formulário.
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Atualiza o estado com o valor do campo alterado.
  };

  const handleCreateVeiculos = async e => { // Função para criar um novo veículo.
    e.preventDefault(); // Previne o comportamento padrão do formulário.
    try {
      await axios.post('http://localhost:3000/veiculos', formData); // Faz uma requisição POST para criar um veículo.
      setFormData({ // Reseta os campos do formulário.
        placa: '',
        marca: '',
        modelo: '',
        ano: ''
      });
      fetchVeiculos(); // Atualiza a lista de veículos.
    } catch (error) {
      console.error(error); // Trata erros de requisição.
    }
  };

  const handleUpdateVeiculos = async e => { // Função para atualizar um veículo existente.
    e.preventDefault(); // Previne o comportamento padrão do formulário.
    try {
      await axios.put(`http://localhost:3000/veiculos/${formData.placa}`, formData); // Faz uma requisição PUT para atualizar o veículo.
      setFormData({ // Reseta os campos do formulário.
        placa: '',
        marca: '',
        modelo: '',
        ano: ''
      });
      setIsEditing(false); // Define o estado de edição como falso.
      fetchVeiculos(); // Atualiza a lista de veículos.
    } catch (error) {
      console.error(error); // Trata erros de requisição.
    }
  };

  const handleDeleteVeiculos = async placa => { // Função para excluir um veículo.
    try {
      await axios.delete(`http://localhost:3000/veiculos/${placa}`); // Faz uma requisição DELETE para excluir o veículo.
      fetchVeiculos(); // Atualiza a lista de veículos.
    } catch (error) {
      console.error(error); // Trata erros de requisição.
    }
  };

  const handleEditVeiculo = veiculo => { // Função para iniciar a edição de um veículo.
    setFormData({ // Atualiza os campos do formulário com os dados do veículo selecionado.
      placa: veiculo.placa,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: veiculo.ano
    });
    setIsEditing(true); // Define o estado de edição como verdadeiro.
  };

  return ( // Renderiza o componente.
    <div>
      <h1>Veículos</h1> // Título da aplicação.
      <form onSubmit={isEditing ? handleUpdateVeiculos : handleCreateVeiculos}> // Formulário que chama a função apropriada dependendo do estado.
        <label>
          Placa:
          <input
            type="text"
            name="placa"
            value={formData.placa}
            onChange={handleInputChange}
            disabled={isEditing} // Desabilita o campo de placa durante a edição.
          />
        </label>
        <label>
          Marca:
          <input
            type="text"
            name="marca"
            value={formData.marca} 
            onChange={handleInputChange} // Atualiza o estado quando o valor do campo muda.
            />
          </label>
          <label>
            Modelo:
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleInputChange} // Atualiza o estado quando o valor do campo muda.
            />
          </label>
          <label>
            Ano:
            <input
              type="text"
              name="ano"
              value={formData.ano}
              onChange={handleInputChange} // Atualiza o estado quando o valor do campo muda.
            />
          </label>
          <button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</button> // Botão que exibe "Atualizar" se estiver editando e "Cadastrar" caso contrário.
        </form>
  
        <ul>
          {veiculos.map(veiculo => ( // Mapeia a lista de veículos e renderiza um item para cada veículo.
            <li key={veiculo.placa}> // Cada item da lista possui uma chave única (placa do veículo).
              {veiculo.placa} - {veiculo.marca} - {veiculo.modelo} - {veiculo.ano} // Exibe os detalhes do veículo.
              <button onClick={() => handleEditVeiculo(veiculo)}>Editar</button> // Botão para editar o veículo, chama a função handleEditVeiculo.
              <button onClick={() => handleDeleteVeiculos(veiculo.placa)}>Excluir</button> // Botão para excluir o veículo, chama a função handleDeleteVeiculos.
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default App; // Exporta o componente App para ser utilizado em outros arquivos.