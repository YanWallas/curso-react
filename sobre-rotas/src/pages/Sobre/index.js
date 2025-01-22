import React from "react";
import { Link } from "react-router-dom";

function Sobre() {
  return (
    <div>
      <h1>Sobre a Empresa </h1>

      <Link to="/">Pagina Home</Link> <br/>
      <Link to="/contato">Pagina Contato</Link>
    </div>
  );
}

export default Sobre;
