import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';
import { useHistory } from 'react-router-dom';

const EditarProducto = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  // producto editar
  const productoeditar = useSelector( state => state.productos.productoeditar);
  // console.log(productoeditar)

  // nuevo state de producto
  const [producto, setProducto] = useState({
    nombre: '',
    precio: ''
  })
  const { nombre, precio } = producto;


  // llenar el state automaticamante
  useEffect( () => {
    setProducto(productoeditar);
    //eslint-disable-next-line
  }, []);

  // Leer los datos del formulario
  const onChangeFormulario = e => {
    setProducto({
      ...producto,
      [e.target.name] : e.target.value
    })
  }
 

  const submitEditarProducto = e => {
    e.preventDefault();

    dispatch( editarProductoAction(producto) );

    history.push('/');
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
          <div className="card">
              <div className="card-body">
                  <h2 className="text-center mb-4 font-weight-bold">
                    Editar Producto
                  </h2>

                  <form
                    onSubmit={submitEditarProducto}
                  >
                    <div className="form-group">
                        <label htmlFor="">Nombre Producto</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Nombre del Producto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeFormulario}
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
                            onChange={onChangeFormulario}
                        />
                    </div>
                    <button
                        className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                        type="submit"
                    >Guardar Cambios</button>
                  </form>
              </div>
          </div>
      </div>
    </div>
  );
}

export default EditarProducto;
