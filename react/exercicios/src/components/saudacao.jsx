import React, { Component } from 'react'

export default class Saudacao extends Component {

    state = {
        tipo: 'Fala',
        nome: 'Pedro',
    }

    setTipo(e){
        console.log(e.target.value)
    }

    setNome(e){
      console.log(e.target.value)
    }
    
    render() {
      const { tipo, nome } = this.state

      
      return (
          <div>
              <h1>{tipo} {nome}</h1>
              <hr />
              <input type="text" placeholder='tipo' value={this.tipo} onChange={e => this.setTipo(e)} />
              <input type="text" placeholder='nome' value={this.nome} onChange={e => this.setNome(e)}/>
        </div>
        )
  }
}
