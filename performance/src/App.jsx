import { useState, useRef } from 'react'
import './App.css'
import { Header } from './Header';


function App() {
  // NÃO PRECISA MAIS SE USARMOS A USEREF 
  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [username, setUsername] = useState("")
  // const [description, setDescription] = useState("")
  // const [type, setType] = useState("user")

  // ========================================
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const userNameRef = useRef(null);
  const descriptionRef = useRef(null);
  const typeRef = useRef("user");

  const [input, setInput] = useState('');

  function handleSave(e){
    e.preventDefault();

    console.log({
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      username: userNameRef.current?.value,
      description: descriptionRef.current?.value,
      type: typeRef.current?.value,
    })
  }


  return (
    <div className="container">
      <h1>React</h1>
      <Header/>


      <form className="form" onSubmit={handleSave}>
      <input
          type="text"
          placeholder="Teste de renderização com Sates"
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <input
          type="text"
          placeholder="Digite seu nome..."
          className="input"
          ref={nameRef}
        />

        <input
          type="text"
          placeholder="Digite seu email..."
          className="input"
          ref={emailRef}
        />

        <input
          type="text"
          placeholder="Digite seu username..."
          className="input"
          ref={userNameRef}
        />

        <textarea
          type="text"
          placeholder="Digite sua descriçao..."
          className="input"
          ref={descriptionRef}
        ></textarea>


        <select  
          className="select"
          ref={typeRef}
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
