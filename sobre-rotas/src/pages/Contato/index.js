import React from "react";
import { Link } from "react-router-dom";

 function Contato(){
  return(
    <div>
      <h1>Pagina de Contato</h1>
      <span>Contato da empresa (dd) xxxx-xxxx</span><br/> 

      <Link to="/">Pagina Home</Link> <br/>
      <Link to="/sobre">Pagina Sobre</Link>
    </div>
  );
 }

 export default Contato;