import React from 'react';

const Bemvindo = (props) => {
  return (
    <div>
      <h2> Bem Vindo(a) {props.nome} </h2>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      Olá mundo!
      <Bemvindo nome="yan" />
      <h2> Curso React </h2>
    </div>
  );
}
