import { useState } from 'react'
import { ButtonSubmit } from './Button'
import { NewUser } from './Transition'
import { NewActionState } from './NewActionState'

function App() {
  const [message, setMessage] = useState("")

  async function handleRegister(formData){
    // FAKE DELAY
    await new Promise(resolve => setTimeout(resolve, 2500))

    const nome = formData.get("nome")
    const tarefa = formData.get("tarefa")

    console.log(nome)
    console.log(tarefa)

    setMessage("Bem vindo " + nome + " Tarefa atual " + tarefa)

  }

  return (
    <div>
      <h1>Form + Action</h1>

      <form action={handleRegister} >
        <input 
          type="text" 
          name="nome"
          placeholder="Digite seu nome..."
          required
        /><br/>

        <input 
          type="text" 
          name="tarefa"
          placeholder="Digite a terafa..."
          required
        /><br/>

        <ButtonSubmit/>
      </form>

      <h2>{message}</h2>

      <hr/>

      <NewUser/>
      <hr/>

      <NewActionState/>
    </div>
  )
}

export default App