import React, { useContext, useState } from "react";
import { CategoriasContext } from "../context/CategoriasContext";
import { RecetasContext } from "../context/RecetasContext";
import Error from "./Error";

const Formulario = () => {
  const [busqueda, guardarBusqueda] = useState({
    nombre: "",
    categoria: "",
  });

  const [error, guardarError] = useState(false);

  const { categorias } = useContext(CategoriasContext);
  const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);

  // función para leer los contenidos
  const obtenerDatosReceta = (e) => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  // Validar Formulario
  const {nombre, categoria} = busqueda;
  const validarFormulario = e => {
      e.preventDefault();
      if(nombre.trim() === '' || categoria.trim() === '') {
          guardarError(true);
          return;
      }
      guardarError(false);
      buscarRecetas(busqueda);
      guardarConsultar(true);

  }

  return (
    <form
      className="col-12"
      onSubmit={validarFormulario}
    >
      {error ? <Error mensaje="All fields are required" /> : null}  
      <fieldset className="text-center">
        <legend>Search by Ingredient and Category</legend>
      </fieldset>

      <div className="row mt-4">
        <div className="col-md-4">
          <input
            name="nombre"
            className="form-control"
            type="text"
            placeholder="Buscar por Ingrediente"
            onChange={obtenerDatosReceta}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            name="categoria"
            onChange={obtenerDatosReceta}
          >
            <option value="">-- Selecciona Categoría --</option>
            {categorias.map((categoria) => (
              <option key={categoria.strCategory} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Search Drinks"
          />
        </div>
      </div>
    </form>
  );
};

export default Formulario;
