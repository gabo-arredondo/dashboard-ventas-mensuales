// 1. Obtener referencia al cuerpo de la tabla
const cuerpoTabla = document.getElementById('cuerpo-tabla')

// 2. Cargar los datos desde ventas.json
fetch('./ventas.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo ventas.json')
    }
    return response.json()
  })
  .then((ventas) => {
    // 3. Recorrer las ventas y crear filas en la tabla
    ventas.forEach((venta) => {
      const fila = document.createElement('tr')

      fila.innerHTML = `
        <td>${venta.mes}</td>
        <td>${venta.categoria}</td>
        <td>${venta.cantidad}</td>
        <td>${venta.total}</td>
      `

      cuerpoTabla.appendChild(fila)
    })
  })
  .catch((error) => {
    console.error('Error:', error)
  })
