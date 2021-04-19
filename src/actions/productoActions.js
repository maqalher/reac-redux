import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR
} from '../types';
import Swal from 'sweetalert2';

import clienteAxios from '../config/axios';

// Crear nuevos productos 
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        // console.log(producto);
        dispatch(agregarProducto());

        try {
            // insertar en la API
            await clienteAxios.post('/productos', producto)

            // Si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto))

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamante',
                'success'
            )
        } catch (error) {
            console.log(error);

            // si hay un error cambiar el state
            dispatch(agregarProductoError(true))

            // Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un erroe, intenta nuevamente',
            })
        }

    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

// si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// si hubo un error 
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});


// Fucnio que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            // console.log(respuesta.data)
            dispatch(descargaProductosExitosa(respuesta.data))
        } catch (error) {
            console.log(error)
            dispatch(descargaProductosError())
        }

    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        // console.log(id)

        try {
            // const resultado = await clienteAxios.delete(`/productos/${id}`);
            // console.log(resultado)

            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());

            // Si se elimina mostrar alerta
            Swal.fire("Eliminado!", "El producto se elimino correctamante.", "success");

        } catch (error) {
            console.log(error)
            dispatch(eliminarProductoError());
        }

    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINAR_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: true
});

// Colocar producto en edicion
export function obtnerProductoEditar(producto) {
    return (dispatch) => {
        dispatch( obtnerProductoEditarAction(producto) )
    }
}

const obtnerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

// Editar un regitro en la api y state
export function editarProductoAction(producto) {
    return async(dispatch) => {
        dispatch( editarProducto());

        try {
            // const resultado = await clienteAxios.put(`/productos/${producto.id}`, producto);
            // console.log(resultado)
            await clienteAxios.put(`/productos/${producto.id}`, producto);

            dispatch( editarProductoExito(producto) );
        } catch (error) {
            console.log(error)
            dispatch(editarProductoError());
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type:PRODUCTO_EDITAR_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type:PRODUCTO_EDITAR_ERROR,
    payload: true
})
