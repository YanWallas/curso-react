import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle } from 'react-icons/fi';
import './new.css';
import { db } from '../../services/firebase';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const listRef = collection(db, "customers"); 

export default function New(){
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loadCustomer, setLoadCustomer] = useState(true);
  const [customerSelected, setCustomerSelected] = useState(0);

  const [complemento, setComplemento] = useState('');
  const [assunto, setAssunto] = useState('suporte');
  const [status, setStatus] = useState('Aberto');
  const [idCustomers, setIdCustomers] = useState(false);

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

        if(id){
          loadId(lista);
        }
      })
      .catch((error) => {
        console.log("ERROR AO BUSCAR OS CLIENTES",error)
        setLoadCustomer(false);
        setCustomers([ { id: '1', nomeFantasia: 'FREELA'} ])
      })
    }
    loadCustomers();
  }, [id])

  async function loadId(lista){
    const docRef = doc(db, "chamados", id);
    await getDoc(docRef)
    .then((snapshot) => {
      setAssunto(snapshot.data().assunto);
      setStatus(snapshot.data().status);
      setComplemento(snapshot.data().complemento);

      let index = lista.findIndex(item => item.id === snapshot.data().clienteId)
      setCustomerSelected(index);
      setIdCustomers(true);
    })
    .catch((error) => { 
      console.log(error); 
      setIdCustomers(false);
    })
  }

  function handleOptionChange(e){
    setStatus(e.target.value);
  }

  function handleChangeSelect(e){
    setAssunto(e.target.value);
  }

  function handleChangeCustomer(e){
    setCustomerSelected(e.target.value);
  }

  async function handleRegister(e){
    e.preventDefault();

    if(idCustomers){
      //Atualizando chamado
      const docRef = doc(db, "chamados", id)
      await updateDoc(docRef, {
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        complemento: complemento,
        status: status,
        userId: user.uid,
      })
      .then(() => {
        toast.info("Chamado atualizando com sucesso!")
        setCustomerSelected(0);
        setComplemento('');
        navigate('/dashboard');
      })
      .catch((error) => {
        toast.error("Ops! Erro ao tentar atulizar!!!")
        console.log(error);
      })
      return;
    }
    
    //RESGISTRAR CHAMADO
    await addDoc(collection(db, "chamados"),{
      created: new Date(),
      cliente: customers[customerSelected].nomeFantasia,
      clienteId: customers[customerSelected].id,
      assunto: assunto,
      complemento: complemento,
      status: status,
      userId: user.uid,
    })
    .then(() => {
      toast.success("Chamado Registrado!");
      setComplemento('');
      setCustomerSelected(0);
      navigate('/dashboard');
    })
    .catch((error) => {
      console.log(error);
      toast.error("OPS! Chamado não Registrado, Tente novamente mais tarde!!!")
    })
  }

  return(
    <div> 
      <Header/>

      <div className='content'>
        <Title name={id ? 'Editando Chamado' : 'Novo Chamado'}>
          <FiPlusCircle size={25}/>
        </Title>

        <div className='container'>
          <form className='form-profile' onSubmit={handleRegister}>
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
              <option value="Desenvolvimento">Desenvolvimento</option>
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