import React, { Component } from "react";
import Imagen from "./Imagen";
import Paginacion from "./Paginacion";

class Resultado extends Component {
  mostrarImagenes = () => {
    const imagenes = this.props.imagenes;
    if (imagenes.length === 0) return null;

    return (
      <React.Fragment>
        <div className="col-12 p-5 row">
          {imagenes.map(imagen => (
            <Imagen key={imagen.id} imagen={imagen} />
          ))}
        </div>
        <div className="row justify-content-center">
          <Paginacion
            paginaAnterior={this.props.paginaAnterior}
            paginaSiguiente={this.props.paginaSiguiente}
          />
        </div>
      </React.Fragment>
    );
  };
  render() {
    return <React.Fragment>{this.mostrarImagenes()}</React.Fragment>;
  }
}

export default Resultado;
