import { useState, useEffect } from 'react';
import { auth, db } from './firebasec';
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import './app.css';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPost = [];

      snapshot.forEach((doc) => {
        listaPost.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
      })

      setPosts(listaPost);
      })
    }

    loadPosts();
  }, [])

  useEffect(() => {
    async function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if(user){
          //Se tem usuario logado ele entra aqui...
          console.log(user);
          setUser(true);
          setUserDetail({
            uid: user.uid,
            email: user.email
          })
        }else{
          //Não possui nenhum user logado.
          setUser(false);
          setUserDetail({})
        }
      })
    }

    checkLogin();
  }, [])

  async function handleAdd(){
    // ADICIONANDO REGISTRADO NA MAO 
    // await setDoc(doc(db, "posts", "12345"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    // .then(() => {
    //   console.log("DADOS REGISTRADOS NO BANCO!")
    // })
    // .catch((error) => { console.log("GEROU ERRO" + error)})

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      console.log("CADASTRADO COM SUCESSO")
      setAutor('');
      setTitulo('');

    })
    .catch((error) => { console.log("ERROR" + error)})
  }

  async function buscarPost() {
    // BUSCANDO POST ESPECIFICO (NA MAO)
    // const postRef = doc(db, "posts", "12345")

    // await getDoc(postRef)
    // .then((snapshot)=> {
    //   setAutor(snapshot.data().autor)
    //   setTitulo(snapshot.data().titulo)
    // })
    // .catch(()=>{console.log("ERRO AO BUSCAR")})

    const postsRef = collection(db, "posts")
    await getDocs(postsRef)
    .then((snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
      })

      setPosts(lista);
    })
    .catch((error) => {
      console.log("DEU ALGUM ERRO AO BUSCAR" + error)
    })

  }

  async function editarPost(){
    const docRef = doc(db, "posts", idPost)
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      console.log("POST AUALIZADO!")
      setIdPost('')
      setTitulo('')
      setAutor('')
    })
    .catch((e) => { console.log("ERRO AO ATUALIZAR O POST" + e) })
  }


  async function excluirPost(id){
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)
    .then(() => {
      alert("POST DELETADO COM SUCESSO!")
    })
  }

  async function novoUsuario(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(() => { 
      console.log("CADASTRADO COM SUCESSO")
      setEmail('')
      setSenha('')
    })
    .catch((e) => { 
      if(e.code === 'auth/weak-password'){
        alert("Senha muito fraca.")
      }else if(e.code === 'auth/email-already-in-use'){
        alert("Email já existe!")
      }
    })
  }

  async function logarUsuario(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      console.log("USER LOGADO COM SUCESSO")
      console.log(value.user);

      setUserDetail({
        uid: value.user.uid,
        email: value.user.email
      })
      setUser(true);

      setEmail('')
      setSenha('')
    })
    .catch(() => { console.log("ERRO AO FAZER O LOGIN") })
  }

  async function fazerLogout() {
    await signOut(auth)
    setUser(false);
    setUserDetail({})
  }

  return (
    <div>
      <h1>ReactJS + Firebase :) </h1>

      { user && (
        <div>
          <strong>Seja Bem-vindo(a) (Você está logado)</strong> <br/>
          <span>ID: {userDetail.uid}</span><br/>
          <span>EMAIL: {userDetail.email}</span><br/>
          <button onClick={fazerLogout}>Logout</button>
          <br/>
        </div>
      )}

      <div className='container'> 
        <h2>USUÁRIOS</h2>
        <label>Email</label>
        <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder='Digite um email'
        /><br/>

        <label>Senha</label>
        <input 
        value={senha} 
        onChange={(e) => setSenha(e.target.value)} 
        placeholder='Digite uma senha'
        /><br/>

        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logarUsuario}>Fazer Login</button>
      </div>

      <hr/>

      <div className='container'>
        <h2>POSTS</h2>
        <label>ID do Post:</label>
        <input 
          placeholder='Digite o ID do post'
          value={idPost}
          onChange={ (e) => setIdPost(e.target.value) }
        /><br/>

        <label>Titulo:</label>
        <textarea 
        type="text" 
        placeholder='Digite o titulo' 
        value={titulo} 
        onChange={ (e) => setTitulo(e.target.value) }
        />

        <label>Auto:</label>
        <input 
        type='text' 
        placeholder='Autor do post'
        value={autor}
        onChange={ (e) => setAutor(e.target.value) }
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar Cadastros</button><br/>
        <button onClick={editarPost}>Atualizar Post</button>

        <ul>
          {posts.map((post) => {
            return(
              <li key={post.id}>
                <strong>ID: {post.id}</strong><br/>
                <span>Titulo: {post.titulo}</span><br/>
                <span>Autor: {post.autor}</span><br/>
                <button onClick={ () => excluirPost(post.id) }>Excluir</button><br/> <br/>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default App;
