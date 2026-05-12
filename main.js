// ===== REFERENCIAS AL DOM =====
const cuerpoTabla = document.getElementById('cuerpo-tabla')
const totalIngresosElement = document.getElementById('total-ingresos')
const totalUnidadesElement = document.getElementById('total-unidades')

// ===== CARGAR DATOS DESDE ventas.json =====
fetch('./ventas.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo ventas.json')
    }
    return response.json()
  })
  .then((ventas) => {
    // ===== MOSTRAR TABLA =====
    cuerpoTabla.innerHTML = ''

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

    // ===== CALCULAR RESUMEN GENERAL =====
    let totalIngresos = 0
    let totalUnidades = 0

    ventas.forEach((venta) => {
      totalIngresos += venta.total
      totalUnidades += venta.cantidad
    })

    // ===== MOSTRAR RESUMEN GENERAL =====
    totalIngresosElement.textContent = totalIngresos
    totalUnidadesElement.textContent = totalUnidades
  })
  .catch((error) => {
    console.error('Error:', error)
  })
