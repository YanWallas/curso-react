import React from 'react';

const Bemvindo = (props) => {
  // Conhecendo Props.
  return (
    <div>
      <h2> Bem Vindo(a) {props.nome} </h2>
      <h3> Tenho {props.idade} Anos </h3>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      Olá mundo!
      <Bemvindo
        nome="Yan"
        idade="26" /* Rederizando Const Bem vindo, com os props */
      />
      <Bemvindo nome="Lima" idade="27" />
      <Bemvindo nome="Maria" idade="24" />
      <h2> Curso React </h2>
    </div>
  );
}
