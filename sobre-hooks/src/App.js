import React, { useState } from "react";

function App() {

  const [tarefas, setTarefas] = useState(['Pagar a conta de luz', 'Estudar React Hooks']);

  function handleAdd(){
    alert('Olá')
  }

  return (
    <div>
      <ul>{tarefas.map(tarefa => (<li key={tarefa}>{tarefa}</li>))}</ul>

      <button type="button" onClick={handleAdd}>Adicionar</button>
    </div>
  );
}

export default App;
