import React, { useState } from 'react';
import { ProductosTable } from './ProductosTable';
import { productos, detallesVenta } from '../datos/Datos';
function ProductosMasVendidos() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [productosVendidos, setProductosVendidos] = useState([]);

  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleFechaFinChange = (event) => {
    setFechaFin(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Filtrar las ventas por el rango de fechas seleccionado
    const ventasEnRango = detallesVenta.filter(
      detalle => detalle.fecha >= fechaInicio && detalle.fecha <= fechaFin
    );

    // Contar la cantidad vendida de cada producto
    const productosVendidosMap = new Map();
    ventasEnRango.forEach(detalle => {
      if (productosVendidosMap.has(detalle.productoId)) {
        productosVendidosMap.set(detalle.productoId, productosVendidosMap.get(detalle.productoId) + detalle.cantidadVendida);
      } else {
        productosVendidosMap.set(detalle.productoId, detalle.cantidadVendida);
      }
    });

    // Ordenar los productos por cantidad vendida
    const productosVendidosArray = Array.from(productosVendidosMap.entries());
    productosVendidosArray.sort((a, b) => b[1] - a[1]);

    // Obtener los detalles completos de los productos más vendidos
    const productosMasVendidos = productosVendidosArray.slice(0, 3).map(([productoId, cantidadVendida]) => {
      const producto = productos.find(producto => producto.id === productoId);
      return { ...producto, cantidadVendida };
    });

    setProductosVendidos(productosMasVendidos);
  };

  return (
    <div>
      <h1>Reportes de productos mas vendidos</h1>
      <p>Selecciona un rango de fechas</p>
      <form onSubmit={handleSubmit}>
        <label>
          Fecha de inicio:
          <input type="date" value={fechaInicio} onChange={handleFechaInicioChange} />
        </label>
        <label>
          Fecha de fin:
          <input type="date" value={fechaFin} onChange={handleFechaFinChange} />
        </label>
        <button type="submit">Buscar</button>
      </form>

      {/* Renderizar el componente ProductosTable y pasarle productosVendidos como una prop */}
      <ProductosTable productosVendidos={productosVendidos} />
    </div>
  );
}

export default ProductosMasVendidos;
