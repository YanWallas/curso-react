import { useEffect, useState } from "react";
import api from "../../services/api";

// URL da api: /movie/now_playing?api_key=10336075e69e824f4134ca90376b9ed8

function Home(){
  const [filmes, setFilmes] = useState([]);

  useEffect(()=> {
    async function loasdFilmes() {
      const response = await api.get("movie/now_playing", {
        params:{
          api_key: "10336075e69e824f4134ca90376b9ed8",
          language: "pt-BR",
          page: 1,
        }
      })

      console.log(response.data.results);
    }

    loasdFilmes();

  },[])


  return(
    <div>
      <h1>Bem Vindo a Home</h1>
    </div>
  )
}

export default Home;