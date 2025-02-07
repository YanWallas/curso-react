import { useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle } from 'react-icons/fi';
import './new.css';

export default function New(){
const [customers, setCustomers] = useState([])

  const [complemento, setComplemento] = useState('');
  const [assunto, setAssunto] = useState('suporte');
  const [status, setStatus] = useState('Aberto');

  function handleOptionChange(e){
    setStatus(e.target.value);
  }

  return(
    <div> 
      <Header/>

      <div className='content'>
        <Title name='Novo Chamado'>
          <FiPlusCircle size={25}/>
        </Title>

        <div className='container'>
          <form className='form-profile'>
            <label>Clientes</label>
            <select>
              <option key={1} value={1}>Mercado Esquina</option>
              <option key={2} value={2}>Loja Informatica</option>
            </select>

            <label>Assuntos</label>
            <select>
              <option value="Suporte">Suporte</option>
              <option value="Visita Técnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className='status'>
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={ status === "Aberto" }
              />
              <span>Em Aberto</span>

              <input
                type="radio"
                name="radio"
                value="EmAndamento"
                onChange={handleOptionChange}
                checked={ status === "EmAndamento" }
              />
              <span>Em Andamento</span>

              <input
                type="radio"
                name="radio"
                value="Finalizado"
                onChange={handleOptionChange}
                checked={ status === "Finalizado" }
              />
              <span>Finalizado</span>
            </div>

            <label>Complemento</label>
            <textarea
              type='text'
              placeholder='Descreva seu problema (opcional).'
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
            <button type='submit'>Registrar</button>
          </form>
        </div>
      </div>
    </div>
  )
}