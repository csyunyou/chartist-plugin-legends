## Legends plugin for Chartist.js

This is a simple plugin for Chartist.js that will add some customizable legends on charts.

**note:make sure extra space have been allocated by setting "padding" of the chart so that the legend-wrapper can be rendered.**

## Download 
The easiest way to get started, using npm
```
npm install chartist-plugin-pointlabels --save
```

## Available options and their defaults
```
var defaultOptions = {
  legendClass: 'ct-legend',
  position: 'bottom',   //position of the legend-wrapper:'bottom' or 'right'
  padding: 10,  //padding between each legend pair
  innerPadding: 2,  //padding bettween legend and text
  shape: 'circle',  //legend shape:'circle' or 'rect' are currently supported
  offset: {
    x: 10,
    y: 40
  },    //offset of the legend-wrapper
  onClick: Chartist.noop,
  onMouseEnter: Chartist.noop,
  onMouseLeave: Chartist.noop,
  colors: [
    '#d70206',
    '#f05b4f',
    '#f4c63d',
    '#d17905',
    '#453d3f',
    '#59922b',
    '#0544d3',
    '#6b0392',
    '#f05b4f',
    '#dda458',
    '#eacf7d',
    '#86797d',
    '#b2c326',
    '#6188e2',
    '#a748ca'
  ], //legend colors
  names:[]  //legend names array
```

## Sample usage in Chartist.js
```
let chart = new Chartist.Line('.ct-chart', data, {
  axisX: {
    // position: 'start'
  },
  chartPadding: { top: 20, left: 50, right: 80, bottom: 20 },//This is important because extra space need to be allocated for rendering the legend-wrapper
  width: 500,
  height: 300,
  plugins: [
    Chartist.plugins.ctPointLabels({
      textAnchor: 'middle'
    }),
    Chartist.plugins.ctLegends({
      names: ['Jan', 'Feb', 'Mar'],
      position: 'right',
      padding: 20,
      shape: 'rect',
      onClick: function(selIdx, chart, evt) {
        // evt.target.style.
      },
      onMouseEnter(selIdx,evt) {
        console.log(chart.svg.querySelectorAll('.ct-line'))
        chart.svg.querySelectorAll('.ct-line').svgElements.forEach(d => {
          // console.log(d,d.parent().classes)
          let seriesClass = d.parent().classes()[1],
            seriesNo = seriesClass[seriesClass.length - 1]
          if (seriesNo.charCodeAt() - 97 === selIdx) {
            d.addClass('hover-line')
          }
        })
        // console.log(evt.target,chart)
      },
      onMouseLeave() {
        chart.svg.querySelectorAll('.ct-line').svgElements.forEach(d => {
          d.removeClass('hover-line')
        })
      }
    })
  ]
})
```