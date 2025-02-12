import { useState, useTransition } from 'react'

export function NewUser(){
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [user, setUser] = useState("")
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(){
    startTransition(async () => {
        try{
          await new Promise((resolve, reject) => setTimeout(() => {
            resolve();
           //reject("Falha ao cadastrar esse usuario")
          }, 2500))

          setUser("Bem vindo " + name)

        }catch(error){
          setError(error)
        }

    })
  }

  return(
    <div>
      <h1>Conhecendo useTransition</h1>

      <input 
        type="text" 
        value={name}
        onChange={ (e) => setName(e.target.value) }
      />
      <button onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Enviando usuario..." : "Cadastrar"}
      </button>

      {user && <p>{user}</p>}

      {error && <p>{error}</p>}

    </div>
  )
}