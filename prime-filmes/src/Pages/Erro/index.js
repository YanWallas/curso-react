import { Link } from "react-router-dom";
import './erro.css';

function Erro(){
  return(
    <div className="not-found">
      <h1>ERROR 404</h1>
      <h2>Pagina não encontrada</h2>
      <Link to="/">Pagina Inicial</Link>
    </div>
  )
}

export default Erro;