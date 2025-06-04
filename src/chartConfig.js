const labels = ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120']
const dataOrange = [120, 100, 98, 95, 92, 88, 85, 80, 75, 70, 65, 60, 55, 50]
const dataPurple = [120, 100, 90, 80, 65, 50, 40, 30, 25, 20, 18, 15, 12, 10]

function rgbToRgba(rgb, alpha = 0.15) {
  return rgb.replace('rgb', 'rgba').replace(')', `, ${alpha})`)
}

const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div.custom-chart-tooltip')

  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.className = 'custom-chart-tooltip'

    const table = document.createElement('table')
    table.style.margin = '0px'
    table.style.width = '100%'

    tooltipEl.appendChild(table)
    chart.canvas.parentNode.appendChild(tooltipEl)
  }

  return tooltipEl
}

const externalTooltipHandler = (context) => {
  const { chart, tooltip } = context
  const tooltipEl = getOrCreateTooltip(chart)

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0
    return
  }

  if (tooltip.body) {
    const titleLines = tooltip.title || []
    const bodyLines = tooltip.body.map((b) => b.lines)

    const tableHead = document.createElement('thead')

    titleLines.forEach((title) => {
      const tr = document.createElement('tr')
      tr.style.borderWidth = 0

      const th = document.createElement('th')

      const text = document.createTextNode(`${title} Days`)

      th.appendChild(text)
      tr.appendChild(th)
      tableHead.appendChild(tr)
    })

    const tableBody = document.createElement('tbody')
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i]

      const tr = document.createElement('tr')
      tr.style.backgroundColor = 'inherit'
      tr.style.borderWidth = 0

      const td = document.createElement('td')
      td.style.borderWidth = 0

      const [label, value] = body[0].split(':').map((s) => s.trim())

      const labelNode = document.createTextNode(label + ': ')

      const valueBox = document.createElement('span')
      valueBox.textContent = value
      valueBox.style.display = 'inline-block'
      valueBox.style.padding = '0px 2px'
      valueBox.style.marginLeft = '4px'
      valueBox.style.backgroundColor = rgbToRgba(colors.borderColor, 0.2)
      valueBox.style.color = colors.borderColor
      valueBox.style.border = `1px solid ${colors.borderColor}`
      valueBox.style.borderRadius = '4px'

      td.appendChild(labelNode)
      td.appendChild(valueBox)
      tr.appendChild(td)
      tableBody.appendChild(tr)
    })

    const tableRoot = tooltipEl.querySelector('table')

    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove()
    }

    tableRoot.appendChild(tableHead)
    tableRoot.appendChild(tableBody)
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas

  tooltipEl.style.opacity = 1
  tooltipEl.style.left = positionX + tooltip.caretX + 'px'
  tooltipEl.style.top = positionY + tooltip.caretY + 'px'
  tooltipEl.style.font = tooltip.options.bodyFont.string
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px'
}

export const data = {
  labels: labels,
  datasets: [
    {
      label: 'Spotter AI',
      data: dataOrange,
      borderColor: 'rgb(255, 165, 0)', // Orange color
      backgroundColor: 'rgba(255, 165, 0, 0.2)', // Slightly transparent orange fill
      borderWidth: 1,
      pointStyle: 'circle',
      pointBackgroundColor: 'rgba(255, 255, 255)',
      pointRadius: 0,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 4,
    },
    {
      label: 'Competitors', //
      data: dataPurple,
      borderColor: 'rgb(128, 0, 128)', // Purple color
      pointBorderColor: 'rgb(128, 0, 128)',
      backgroundColor: 'rgba(128, 0, 128, 0.2)', //  Slightly transparent purple fill 'rgba(128, 0, 128, 0.2)'
      borderWidth: 1,
      pointBackgroundColor: 'rgba(255, 255, 255)',
      pointBorderWidth: 0,
      fill: false,
      tension: 0.3,
      pointStyle: 'circle',
      pointRadius: 0,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 4,
    },
  ],
}

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
      position: 'average',
      external: externalTooltipHandler,
    },
  },
}
