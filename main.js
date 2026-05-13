// ===== REFERENCIAS AL DOM =====
const cuerpoTabla = document.getElementById('cuerpo-tabla')
const totalIngresosElement = document.getElementById('total-ingresos')
const totalUnidadesElement = document.getElementById('total-unidades')
const filtroMes = document.getElementById('filtro-mes')

let ventasGlobal = []

function formatearNumero(numero) {
  return 'S/ ' + numero.toLocaleString()
}

// ===== RENDER TABLA =====
function renderTabla(ventas) {
  cuerpoTabla.innerHTML = ''

  ventas.forEach((venta) => {
    const fila = document.createElement('tr')

    fila.innerHTML = `
      <td>${venta.mes}</td>
      <td>${venta.categoria}</td>
      <td>${venta.cantidad}</td>
      <td>${formatearNumero(venta.total)}</td>
    `

    cuerpoTabla.appendChild(fila)
  })
}

// ===== CALCULAR RESUMEN =====
function calcularResumen(ventas) {
  let totalIngresos = 0
  let totalUnidades = 0

  ventas.forEach((venta) => {
    totalIngresos += venta.total
    totalUnidades += venta.cantidad
  })

  totalIngresosElement.textContent = formatearNumero(totalIngresos)
  totalUnidadesElement.textContent = totalUnidades
}

// ===== GENERAR FILTRO DINÁMICO =====
function llenarFiltroMeses(ventas) {
  const mesesUnicos = [...new Set(ventas.map((v) => v.mes))]

  mesesUnicos.forEach((mes) => {
    const option = document.createElement('option')
    option.value = mes
    option.textContent = mes

    filtroMes.appendChild(option)
  })
}

// ===== CREAR GRÁFICO =====
let grafico // variable global

function crearGrafico(ventas) {
  const totalesPorMes = {}

  ventas.forEach((venta) => {
    if (!totalesPorMes[venta.mes]) {
      totalesPorMes[venta.mes] = 0
    }
    totalesPorMes[venta.mes] += venta.total
  })

  const meses = Object.keys(totalesPorMes)
  const totales = Object.values(totalesPorMes)

  const ctx = document.getElementById('graficoVentas').getContext('2d')

  // 🔥 destruir gráfico anterior si existe
  if (grafico) {
    grafico.destroy()
  }

  grafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: meses,
      datasets: [
        {
          label: 'Ventas mensuales',
          data: totales,
          backgroundColor: '#3498db',
        },
      ],
    },
  })
}

// ===== CARGAR DATOS =====
fetch('./ventas.json')
  .then((res) => res.json())
  .then((ventas) => {
    ventasGlobal = ventas

    renderTabla(ventasGlobal)
    calcularResumen(ventasGlobal)
    llenarFiltroMeses(ventasGlobal)
    crearGrafico(ventasGlobal)
  })
  .catch((error) => console.error('Error:', error))

// ===== FILTRO =====
filtroMes.addEventListener('change', () => {
  const mesSeleccionado = filtroMes.value

  if (mesSeleccionado === '') {
    renderTabla(ventasGlobal)
    calcularResumen(ventasGlobal)
    crearGrafico(ventasGlobal)
    return
  }

  const filtradas = ventasGlobal.filter((v) => v.mes === mesSeleccionado)

  renderTabla(filtradas)
  calcularResumen(filtradas)
  crearGrafico(filtradas)
})
