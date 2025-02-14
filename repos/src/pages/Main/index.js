import React, { useState, useCallback } from "react";
import { FaGithub, FaPlus } from "react-icons/fa";
import { Container, Form, SubmitButton } from "./styles";
import api from '../services/api';

export default function Main(){
  const [newRepo, setNewRepo] = useState('');
  const [Repositorios, setRepositorios] = useState([]);

  function handleInputChange(e){
    setNewRepo(e.target.value);
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit(){
      const response = await api.get(`repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      }
      setRepositorios([...Repositorios, data]);
      setNewRepo('');
    }
    
    submit();
  }, [newRepo, Repositorios]);
    
  return(
    <Container>
      <h1>
        <FaGithub size={25}/>
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Adicionar Repositorio"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton>
          <FaPlus color="#FFF" size={14}/>
        </SubmitButton>
      </Form>
    </Container>
  )
}