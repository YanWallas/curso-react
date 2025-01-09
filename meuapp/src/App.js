import React from 'react';

const Equipe = (props) => {
  return (
    <div>
      <Sobre nome={props.nome} cargo={props.cargo} idade={props.idade} />
      <Social fb={props.facebook} />
      <hr />
    </div>
  );
};

const Sobre = (props) => {
  return (
    <div>
      <h2>Olá sou o(a) {props.nome}</h2>
      <h3>Cargo: {props.cargo}</h3>
      <h3>Idade: {props.idade} anos</h3>
    </div>
  );
};

const Social = (props) => {
  return (
    <div>
      <a href={props.fb}> Facebook </a>
      <a href={props.fb}>LinkedIn </a>
      <a href={props.fb}>Youtube </a>
    </div>
  );
};

function App() {
  return (
    <div>
      <h1>Conheça nossa equipe:</h1>
      <Equipe
        nome="Lucas"
        cargo="Programador"
        idade="29"
        facebook="https://google.com"
      />
      <Equipe
        nome="Lima"
        cargo="T.I"
        idade="27"
        facebook="https://google.com"
      />
      <Equipe
        nome="Amanda"
        cargo="Front-End"
        idade="22"
        facebook="https://google.com"
      />
    </div>
  );
}

export default App;
