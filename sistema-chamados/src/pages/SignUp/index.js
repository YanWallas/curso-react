import { useState } from 'react';
import './signup.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

export default function SignUp(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] =  useState('');

  function handleSubmit(e){
    e.preventDefault();

    if(name !== '' && email !== '' && password !== ''){
      alert("Fazer cadastro");
    }
  }

  return(
    <div className='container-center'>
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt='Logo do sistema de chamadosc'/>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Nova conta</h1>

          <input
            type='text'
            placeholder='Digite seu nome...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <input
            type='text'
            placeholder='email@email.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input
            type='password'
            placeholder='******'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type='submit'>Cadastrar</button>
        </form>

        <Link to="/">Ja possui uma conta? Faça login</Link>
      </div>
    </div>
  )
}