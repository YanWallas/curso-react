import { Link } from "react-router-dom";

function Erro(){
  return(
    <div>
      <h2>Ops!!! Not Found... Pagina nao Existe.</h2>

      <span>Encontramos essas paginas aqui:</span><br/>
      <Link to="/">Pagina Home</Link><br/>
      <Link to="/sobre">Pagina Sobre</Link><br/>
      <Link to="/contato">Pagina Contato</Link>
    </div>
  )
}

export default Erro;