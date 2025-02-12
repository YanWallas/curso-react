import { useActionState } from "react";

export function NewActionState(){
  
  async function handleSubmit(prevState, formData){
    await new Promise((resolve) => setTimeout(() => resolve(), 2500))
    const nome = formData.get("nome")

    console.log(prevState);

    if(nome.length < 4){
      return {
        text: "Digite um nome maior!"
      }
    }

    return {
      text: `Bem Vindo ${nome}`
    }

  }

  const [state, formAction, pending] = useActionState(handleSubmit, null)

  return(
    <div>
      <h1>useActionState</h1>

      <form action={formAction}>
        <input 
          type="text" 
          placeholder="Digite seu nome"
          name="nome"
        />
        <button type="submit" disabled={pending}>{pending ? "Enviando..." : "Cadastrar"}</button>
      </form>

      {state && <h1>{state.text}</h1>}
    </div>
  )
}
