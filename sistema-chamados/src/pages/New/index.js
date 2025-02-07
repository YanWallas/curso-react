import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle } from 'react-icons/fi';
import './new.css';
import { db } from '../../services/firebase';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

const listRef = collection(db, "customers"); 

export default function New(){
  const { user } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);
  const [loadCustomer, setLoadCustomer] = useState(true);
  const [customerSelected, setCustomerSelected] = useState(0);

  const [complemento, setComplemento] = useState('');
  const [assunto, setAssunto] = useState('suporte');
  const [status, setStatus] = useState('Aberto');

  useEffect(()=> {
    async function loadCustomers(){
      const querySnapshot = await getDocs(listRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nomeFantasia: doc.data().nomeFantasia
          })
        })

        if(snapshot.docs.size === 0){
          console.log("NENHUMA EMPRESA ENCONTRADA.")
          setCustomers([ { id: '1', nomeFantasia: 'FREELA'} ])
          setLoadCustomer(false);
          return;
        }

        setCustomers(lista);
        setLoadCustomer(false);
      })
      .catch((error) => {
        console.log("ERROR AO BUSCAR OS CLIENTES",error)
        setLoadCustomer(false);
        setCustomers([ { id: '1', nomeFantasia: 'FREELA'} ])
      })
    }
    loadCustomers();
  }, [])

  function handleOptionChange(e){
    setStatus(e.target.value);
  }

  function handleChangeSelect(e){
    setAssunto(e.target.value);
  }

  function handleChangeCustomer(e){
    setCustomerSelected(e.target.value);
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
              {
                loadCustomer ? (
                  <input type="text" disabled={true} value="Carregando..."/>
                ) : (
                  <select value={customerSelected} onChange={handleChangeCustomer}>
                    {customers.map((item, index) => {
                      return(
                        <option key={index} value={index}>
                          {item.nomeFantasia}
                        </option>
                      )
                    })}
                  </select>
                )
              }
            <label>Assuntos</label>
            <select value={assunto} onChange={handleChangeSelect}>
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