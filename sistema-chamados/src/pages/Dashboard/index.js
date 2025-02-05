import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";

export default function Dashboard(){
  const { logout } = useContext(AuthContext);

  async function handleLogout(){
    await logout();
  }

  return(
    <div>
      <Header/>
      <div className="content">
        <h1>Pagina Dashboard</h1>
        <button onClick={handleLogout}>Sair da conta</button>
      </div>
    </div>
  )
}