import { useFormStatus } from 'react-dom'

export function ButtonSubmit(){
  const { pending } = useFormStatus(); 

  return(
    <div>
      <button type="submit" disabled={pending}>
        {pending ? "Enviando dados..." : "Cadastrar"}
      </button>

      { pending && <p>Estamos enviando seu formulário...</p> }
    </div>
  )
}