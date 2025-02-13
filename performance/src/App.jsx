import { useState } from 'react'
import './App.css'
import { MemorizeHeader } from './Header';
//import { UseSchema } from './SchemaValidations';


function App() {
  const [name, setName] = useState('');
  const [email,setEmail] = useState('');

  return (
    <div className="container">
      <MemorizeHeader name={name}/>
      {/* <UseSchema/> */}

      <p>name:</p>
      <input
        placeholder='Digite seu nome...'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p>email:</p>
      <input
        placeholder='Digite seu email...'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  )
}

export default App;
