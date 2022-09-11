import React, { Component } from 'react'

export default class Saudacao extends Component {

    state = {
        tipo: 'Fala',
        nome: 'Pedro',
    }

    setTipo(e){
        this.setState({tipo: e.target.value})
    }

    setNome(e){
      this.setState({nome: e.target.value})
    }
  
  constructor(props) {
    super(props)
    
    this.setNome = this.setNome.bind(this)
    this.setTipo = this.setTipo.bind(this)
    }
    
    render() {
      const { tipo, nome } = this.state

      
      return (
          <div>
              <h1>{tipo} {nome}</h1>
              <hr />
              <input type="text" placeholder='tipo' value={tipo} onChange={this.setTipo} />
              <input type="text" placeholder='nome' value={nome} onChange={this.setNome}/>
        </div>
        )
  }
}
