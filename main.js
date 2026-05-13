// ===== REFERENCIAS =====
const cuerpoTabla = document.getElementById('cuerpo-tabla')
const totalIngresosElement = document.getElementById('total-ingresos')
const totalUnidadesElement = document.getElementById('total-unidades')
const filtroMes = document.getElementById('filtro-mes')

let ventasGlobal = []

// ===== RENDER TABLA =====
function renderTabla(ventas) {
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
}

// ===== RESUMEN =====
function calcularResumen(ventas) {
  let totalIngresos = 0
  let totalUnidades = 0

  ventas.forEach((venta) => {
    totalIngresos += venta.total
    totalUnidades += venta.cantidad
  })

  totalIngresosElement.textContent = totalIngresos
  totalUnidadesElement.textContent = totalUnidades
}

// ===== GENERAR MESES DINÁMICOS =====
function llenarFiltroMeses(ventas) {
  const mesesUnicos = [...new Set(ventas.map((v) => v.mes))]

  mesesUnicos.forEach((mes) => {
    const option = document.createElement('option')
    option.value = mes
    option.textContent = mes
    filtroMes.appendChild(option)
  })
}

// ===== FETCH =====
fetch('./ventas.json')
  .then((res) => res.json())
  .then((ventas) => {
    ventasGlobal = ventas

    renderTabla(ventasGlobal)
    calcularResumen(ventasGlobal)
    llenarFiltroMeses(ventasGlobal) // 👈 NUEVO 🔥
  })

// ===== FILTRO =====
filtroMes.addEventListener('change', () => {
  const mesSeleccionado = filtroMes.value

  if (mesSeleccionado === '') {
    renderTabla(ventasGlobal)
    calcularResumen(ventasGlobal)
    return
  }

  const filtradas = ventasGlobal.filter((v) => v.mes === mesSeleccionado)

  renderTabla(filtradas)
  calcularResumen(filtradas)
})
;``
