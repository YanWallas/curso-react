import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "./styles";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Repositorio(){
  let { repositorio } = useParams();

  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function load(){
    const nomeRepo = repositorio;

    const [repoData, issuesData] = await Promise.all([
      api.get(`/repos/${nomeRepo}`),
      api.get(`/repos/${nomeRepo}/issues`, {
        params:{
          state: 'open',
          per_page: 15
        }
      })
    ]);

    setRepo(repoData.data);
    setIssues(issuesData.data);
    setLoading(false);
  }

  load();

  }, [repositorio]);

  return(
    <Container>

    </Container>
  )
}