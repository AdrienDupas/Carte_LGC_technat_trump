import * as d3 from 'd3'

interface Ocean {
  name: string
  coords: [number, number] // [longitude, latitude]
}

interface ToponymeProps {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
  projection: d3.GeoProjection
}

const oceans: Ocean[] = [
  { name: "Océan Atlantique", coords: [-20, 30] },
  { name: "Océan Pacifique", coords: [180, 0] },
  { name: "Océan Indien", coords: [80, -20] },
  { name: "Océan Arctique", coords: [0, 80] },
  { name: "Océan Austral", coords: [0, -60] }
]

export const addOceanLabels = ({ svg, projection }: ToponymeProps) => {
  // Supprimer les labels existants
  svg.selectAll('.ocean-label').remove()

  // Ajouter les nouveaux labels
  svg.selectAll('.ocean-label')
    .data(oceans)
    .join('text')
    .attr('class', 'ocean-label')
    .attr('x', d => {
      const coords = projection(d.coords)
      return coords ? coords[0] : 0
    })
    .attr('y', d => {
      const coords = projection(d.coords)
      return coords ? coords[1] : 0
    })
    .text(d => d.name)
    .style('font-size', '10px')
    .style('fill', '#4682b4')
    .style('font-weight', '500')
    .style('text-anchor', 'middle')
    .style('font-family', 'Arial, sans-serif')
    .style('text-shadow', '1px 1px 2px rgba(255,255,255,0.8)')
    .style('pointer-events', 'none')
    .style('user-select', 'none')
}