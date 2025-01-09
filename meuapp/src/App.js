import React, { Component } from 'react';

class Equipe extends Component {
  render() {
    return (
      <div>
        <Sobre
          nome={this.props.nome}
          cargo={this.props.cargo}
          idade={this.props.idade}
        />
        <Social />
        <hr />
      </div>
    );
  }
}

class Sobre extends Component {
  render() {
    return (
      <div>
        <h2>Olá sou o(a) {this.props.nome} </h2>
        <h3>Cargo: {this.props.cargo} </h3>
        <h3>Idade: {this.props.idade} anos </h3>
      </div>
    );
  }
}

const Social = () => {
  return (
    <div>
      <a>Facebook</a>
      <a>Instagram</a>
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
