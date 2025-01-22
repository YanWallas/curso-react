import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Bem vindo a pagina Home</h1>

      <Link to="/sobre">Pagina Sobre</Link> <br/>
      <Link to="/contato">Pagina Contato</Link>

    </div>
  );
}

export default Home;
