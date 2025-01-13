import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hora: '00:00:00',
    };
  }

  componentDidMount() {
    // componente montado....
    setInterval(() => {
      this.setState({ hora: new Date().toLocaleTimeString() });
    }, 1000);
  }

  componentDidUpdate() {
    //Verificar update de algum componentDidMount, Quando verifica, pode escolher fazer algo,
    console.log('Atualizou!!!!');
  }

  shouldComponentUpdate() {
    //return true ou false
    console.log('OK!!!!');
  }

  render() {
    return (
      <div>
        <h1>Meu Projeto {this.state.hora} </h1>
      </div>
    );
  }
}

export default App;
