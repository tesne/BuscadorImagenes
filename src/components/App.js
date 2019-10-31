import React, { Component } from "react";
import Buscador from "./Buscador";
import Resultado from "./Resultado";

class App extends Component {
  state = {
    termino: " ",
    imagenes: [],
    pagina: ""
  };
  scroll = () => {
    const elemento = document.querySelector(".jumbotron");
    elemento.scrollIntoView("smooth", "start");
  };

  consultarApi = () => {
    //const busqueda = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=YOUR_API_KEY&q=${
      this.state.termino
    }&page=${pagina}`;
    //console.log(url);
    fetch(url)
      .then(repuesta => repuesta.json())
      .then(resultado => this.setState({ imagenes: resultado.hits }));
  };

  paginaAnterior = () => {
    //leer state de la página actual
    let pagina = this.state.pagina;
    //leer si la página es 1 no ir hacia atras
    if (pagina === 1) return null;
    //restar 1 a la página actual
    pagina -= 1;
    //agregar cambio al state
    this.setState(
      {
        pagina
      },
      () => {
        this.consultarApi();
        this.scroll();
      }
    );
    // console.log(pagina);
  };
  paginaSiguiente = () => {
    //leer state de la página actual
    let pagina = this.state.pagina;
    //sumar 1 a la página actual
    pagina += 1;
    //agregar cambio al state
    this.setState(
      {
        pagina
      },
      () => {
        this.consultarApi();
        this.scroll();
      }
    );
    //console.log(pagina);
  };

  datosBusqueda = termino => {
    this.setState(
      {
        termino: termino,
        pagina: 1
      },
      () => {
        this.consultarApi();
        this.scroll();
      }
    );
  };

  render() {
    return (
      <div className="App container">
        <div className="jumbotron">
          <p className="lead text-center">
            <b>Buscador de imágenes</b>
          </p>
          <Buscador datosBusqueda={this.datosBusqueda} />
        </div>
        <Resultado
          imagenes={this.state.imagenes}
          paginaAnterior={this.paginaAnterior}
          paginaSiguiente={this.paginaSiguiente}
        />
      </div>
    );
  }
}
export default App;
