import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// Actions de Redux 
import {crearNuevoProductoAction} from '../actions/productoActions';
import {mostrarAlerta, ocultarAlertaAction} from '../actions/alertaActions';

const NuevoProducto = ({history}) => {

  // state del componente
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState(0)

  // utilizar use dispatch y te crea una funcion
  const dispatch = useDispatch();

  // Acceder al state del store
  const cargando = useSelector ( state => state.productos.loading );
  const error = useSelector ( state => state.productos.error );
  const alerta = useSelector ( state => state.alerta.alerta );

  // const agregarProducto = () => dispatch(crearNuevoProductoAction());
  const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto));

  // cuando el usuario haga submit
  const submitNuevoProdcuto = e => {
    e.preventDefault();

    // validar formulario
    if(nombre.trim() === '' || precio <= 0){

      const alerta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }

      dispatch( mostrarAlerta(alerta) );


      return;
    }

    // si no hay errores
    dispatch( ocultarAlertaAction() );

    // crear nuevo producto
    agregarProducto({
      nombre,
      precio
    });

    // redireccionar 
    history.push('/');

  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
          <div className="card">
              <div className="card-body">
                  <h2 className="text-center mb-4 font-weight-bold">
                    Agregar Nuevo Producto
                  </h2>

                  {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

                  <form
                    onSubmit={submitNuevoProdcuto}
                  >
                    <div className="form-group">
                        <label htmlFor="">Nombre Producto</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Nombre del Producto"
                            name="nombre"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Precio Producto</label>
                        <input 
                            type="number"
                            className="form-control"
                            placeholder="Precio del Producto"
                            name="precio"
                            value={precio}
                            onChange={e => setPrecio(Number(e.target.value))}
                        />
                    </div>
                    <button
                        className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                        type="submit"
                    >Agregar</button>
                  </form>

                  { cargando ? <p>Cargando...</p> : null }
                  { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }

              </div>
          </div>
      </div>
    </div>
  );
}

export default NuevoProducto;
