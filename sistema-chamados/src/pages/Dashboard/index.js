import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";
import Title from '../../components/Title';
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import './dashboard.css';
import { collection, getDocs, orderBy, limit, startAfter, query } from "firebase/firestore";
import { db } from "../../services/firebase";

const listRef = collection(db, "chamados");

export default function Dashboard(){
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    async function loadChamados(){
      const q = query(listRef, orderBy('created', 'desc'), limit(5));

      const querySnapshot = await getDocs(q)
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
          status: doc.data().status,
          complemento: doc.data().complemento,
        })
      })

      setChamados(chamados => [...chamados, ...lista])
    }else{
      setIsEmpty(true);
    }
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
                  <tr>
                    <td data-label="Cliente">mercado esquina</td>
                    <td data-label="Assunto">Suporte</td>
                    <td data-label="Status">
                      <span className="badge" style={{ backgroundColor: '#999'}}>Em aberto</span>
                    </td>
                    <td data-label="Cadastrado">12/05/2022</td>
                    <td data-label="#">
                      <button className="action" style={{ backgroundColor: '#3583f6' }}>
                        <FiSearch color="#FFF" size={17}/>
                      </button>
                      <button className="action" style={{ backgroundColor: '#f6a935' }}>
                        <FiEdit2 color="#FFF" size={17}/>
                      </button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </>
          )}

          
        </>
        
      </div>
    </div>
  )
}