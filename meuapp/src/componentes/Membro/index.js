import React, { Component } from 'react';

class Membro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 1,
    };
  }

  render() {
    return (
      <div>
        {this.state.status === 1 && <h2>Bem-vindo(a) ao Sistema!!</h2>}

        <h2>Curso React JS</h2>
      </div>
    );
  }
}

export default Membro;
