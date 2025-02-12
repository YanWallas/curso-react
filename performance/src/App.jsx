// import { useState, useRef } from 'react'
import './App.css'
import { Header } from './Header';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório."),
  email: z.string().email("Digite um email valido.").nonempty("O campo email é obrigatório"),
  username: z.string().min(3, "No minimo 2 caracteres").max(10, "No maximo 10 caracteres").nonempty("O campo username é obrigatório"),
  telefone: z.string().refine((value) => /^\d{2} ?\d{9}$/.test(value), {
    message: "Digite um telefone valido no formato DD +9 números."
  })
})

function App() {
  // AQUI USANDO USESTATE
  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [username, setUsername] = useState("")
  // const [description, setDescription] = useState("")
  // const [type, setType] = useState("user")

  // AQUI E USANDO USEREF
  // const nameRef = useRef(null);
  // const emailRef = useRef(null);
  // const userNameRef = useRef(null);
  // const descriptionRef = useRef(null);
  // const typeRef = useRef("user");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  function handleSave(data){
    console.log(data);
  }

  return (
    <div className="container">
      <h1>React</h1>
      <Header/>

      <form className="form" onSubmit={handleSubmit(handleSave)}>
        <input
          type="text"
          placeholder="Digite seu nome..."
          className="input"
          {...register("name")}
          id='name'
        />
        {errors.name && <p className='error'>{errors.name.message}</p>}

        <input
          type="text"
          placeholder="Digite seu telefone..."
          className="input"
          {...register("telefone")}
          id='telefone'
        />
        {errors.telefone && <p className='error'>{errors.telefone.message}</p>}

        <input
          type="text"
          placeholder="Digite seu email..."
          className="input"
          {...register("email")}
          id='email'
        />
        {errors.email && <p className='error'>{errors.email.message}</p>}

        <input
          type="text"
          placeholder="Digite seu username..."
          className="input"
          {...register("username")}
          id='username'
        />
        {errors.username && <p className='error'>{errors.username.message}</p>}

        <textarea
          type="text"
          placeholder="Digite sua descriçao..."
          className="input"
          {...register("description")}
          id='description'
        ></textarea>

        <select  
          className="select"
          {...register("type")}
          id='type'
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        <button className="button" type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default App
