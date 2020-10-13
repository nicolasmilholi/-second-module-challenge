import React, {useState, useEffect} from 'react';


import api from './services/api';

import "./styles.css";





function App() {

  const [repositories, setRepository] = useState([]);

// useState retorna um array com 2 posições
//
// 1. Variável com seu valor inicial
// 2. Função para atualizarmos esse valor

useEffect(() => {
  api.get('repositories').then(response => {
    setRepository(response.data);
  })
}, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: 'https://github.com/nicolasmilholi',
      techs: ['node.js', 'React.js']
    });

    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
   await api.delete(`repositories/${id}`)

   setRepository(repositories.filter(
     repository => repository.id !== id
   ))
  }


  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository=> (<li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
