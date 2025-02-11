import { useEffect, useState } from "react";


import Header from "../../components/Header";
import Title from '../../components/Title';
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import './dashboard.css';
import { collection, getDocs, orderBy, limit, startAfter, query } from "firebase/firestore";
import { db } from "../../services/firebase";
import { format } from 'date-fns';

const listRef = collection(db, "chamados");

export default function Dashboard(){
  const [chamados, setChamados] = useState([]);//Array para armazenar chamados. 
  const [loading, setLoading] = useState(true);//controlar quando algo estiver carregando.
  const [lastDoc, setLastDocs] = useState(''); ///Armazenar o ultimo item buscar (para controlar as buscas)
  const [loadingMore, setLoadingMore] = useState(false);//Quando tiver buscando mais itens, vai ser true (contralar a busca)

  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    async function loadChamados(){
      const q = query(listRef, orderBy('created', 'desc'), limit(10));

      const querySnapshot = await getDocs(q);
      setChamados([]);
      await updateState(querySnapshot)

      setLoading(false);
    }

    loadChamados();

  },[])

  async function updateState(querySnapshot){
    const isCollectionEmpty = querySnapshot.size === 0;

    if(!isCollectionEmpty){
      let lista = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          complemento: doc.data().complemento,
        })
      })

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];//Pegando ultimo item.

      setChamados(chamados => [...chamados, ...lista]);
      setLastDocs(lastDoc);
    }else{
      setIsEmpty(true);
    }
    setLoadingMore(false);
  }

  async function handleMore(){
    setLoadingMore(true);

    const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDoc), limit(10));
    const querySnapshot = await getDocs(q);
    await updateState(querySnapshot);
  }

  if(loading){// enquanto estiver carregando(true).
    return(
      <div>
        <Header/>
        <div className="content">
          <Title name="Chamados">
            <FiMessageSquare size={25}/>
          </Title>

          <div className="container dashboard">
            <span>Buscando Chamados...</span>
          </div>
        </div>
      </div>
    )
  }

  return(
    <div>
      <Header/>
      <div className="content">
        <Title name="Chamados">
          <FiMessageSquare size={25}/>
        </Title>

        <>
          

          {chamados.length === 0 ? (
            <div className="container dashboard">
              <span>Nenhum chamado encontrado...</span>
              <Link to="/new" className="new">
                <FiPlus color="#FFF" size={25}/>
                Novo Chamado
              </Link>
            </div>
          ) : (
            <>
              <Link to="/new" className="new">
                <FiPlus color="#FFF" size={25}/>
                Novo Chamado
              </Link>

              <table>
                <thead>
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Assuntos</th>
                    <th scope="col">Status</th>
                    <th scope="col">Cadastrado em</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {chamados.map((item, index) => {
                    return(
                      <tr key={index}>
                        <td data-label="Cliente">{item.cliente}</td>
                        <td data-label="Assunto">{item.assunto}</td>
                        <td data-label="Status">
                          <span className="badge" style={{ backgroundColor: item.status === "Aberto" ? '#5cb85c' : '#999'}}>{item.status}</span>
                        </td>
                        <td data-label="Cadastrado">{item.createdFormat}</td>
                        <td data-label="#">
                          <button className="action" style={{ backgroundColor: '#3583f6' }}>
                            <FiSearch color="#FFF" size={17}/>
                          </button>
                          <Link to={`/new/${item.id}`}className="action" style={{ backgroundColor: '#f6a935' }}>
                            <FiEdit2 color="#FFF" size={17}/>
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

            {loadingMore && <h3>Buscando mais chamados...</h3>}
            {!loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar mais</button>}
            </>
          )}

          
        </>
        
      </div>
    </div>
  )
}