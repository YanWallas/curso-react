function Nome({ nome, mudaNome }) {
  return (
    <div>
      <span style={{ color: '#FF0000' }} >Bem vindo: {nome} </span>
      <br/>
      <button onClick={() => mudaNome('Sujeito Programador') } >Trocar nome</button>
    </div>
  );
}

export default Nome;