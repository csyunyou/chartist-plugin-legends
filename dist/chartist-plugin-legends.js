(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(["chartist"], function(Chartist) {
            return (root.returnExportsGlobal = factory(Chartist));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require("chartist"));
    } else {
        root['Chartist.plugins.ctPointLabels'] = factory(Chartist);
    }
}(this, function(Chartist) {

    /**
     * Chartist.js plugin to add Legends for chart.
     *
     */
    /* global Chartist */
    (function(window, document, Chartist) {
        'use strict';

        function getTextSvgWithSize(arr, tmpSvg) {
            let textArr = []
            for (let i of arr) {
                let textSvg = Chartist.Svg("text").text(i)
                tmpSvg.append(textSvg)
                textArr.push({ elem: textSvg, size: textSvg.getNode().getBBox() })
                textSvg.remove()
            }
            return textArr
        }

        var defaultOptions = {
            legendClass: 'ct-legend',
            position: 'bottom',
            padding: 10,
            innerPadding: 2,
            shape: 'circle',
            offset: {
                x: 10,
                y: 40
            },
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
            ]
        };
        options = Chartist.extend({}, defaultOptions, options);

        let getIcon = {
            circle(attr) {
                let r = 9
                return {
                    elem: Chartist.Svg("circle").attr(Chartist.extend({}, attr, { r })),
                    width: 2 * r,
                    height: 2 * r
                }
            },
            rect(attr) {
                let width = 20,
                    height = 12
                return {
                    elem: Chartist.Svg("rect").attr(Chartist.extend({}, attr, { width, height })),
                    width,
                    height
                }
            }
        }

        return function ctLegends(chart) {
            if (chart instanceof Chartist.Line || chart instanceof Chartist.Bar) {
                let legendG = Chartist.Svg("g").addClass(`${options.legendClass}-wrapper`)

                chart.on('created', function(data) {
                    let textArr = getTextSvgWithSize(options.names, data.svg),
                        chartPadding, pos = 0
                    chartPadding = Chartist.normalizePadding(data.options.chartPadding);
                    // console.log(data)
                    for (let i = 0; i < options.names.length; i++) {
                        let itemG = Chartist.Svg("g").addClass(options.legendClass),
                            icon = getIcon[options.shape]({ fill: options.colors[i] })

                        if (options.position === 'bottom')
                            itemG.getNode().style.transform = `translateX(${pos}px)`
                        else
                            itemG.getNode().style.transform = `translateY(${pos}px)`

                        icon.elem.getNode().style.transform = `translate(${options.shape==='circle'?icon.width/2:0}px,${options.shape==='rect'?-icon.height/2:0}px)`
                        icon.elem.getNode().addEventListener("click", function(evt) {
                            options.onClick(i, evt)
                        })
                        icon.elem.getNode().addEventListener("mouseenter", function(evt) {
                            // options.onClick(i, chart, evt)
                            options.onMouseEnter(i, evt)
                        })
                        icon.elem.getNode().addEventListener("mouseleave", function(evt) {
                            // options.onClick(i, chart, evt)
                            options.onMouseLeave(i, evt)
                        })
                        itemG.append(icon.elem)

                        let textSvg = textArr[i].elem.attr({ dy: textArr[i].size.height / 2 })
                        textSvg.getNode().style.transform = `translateX(${icon.width+options.innerPadding}px)`
                        textSvg.getNode().style.fontSize = "21px"
                        itemG.append(textSvg)

                        if (options.position === 'bottom')
                            pos += icon.width + textArr[i].size.width + options.padding
                        else
                            pos += icon.height + options.padding

                        legendG.append(itemG)
                    }
                    if (options.position === 'bottom') {
                        legendG.getNode().style.transform = `translate(${chartPadding.left+(data.axisX.axisLength - pos+options.padding) / 2+data.options.axisY.offset}px,${data.chartRect.y1+options.offset.y}px)`
                    } else {
                        legendG.getNode().style.transform = `translate(${data.chartRect.x2+options.offset.x}px,${data.chartRect.y2}px)`
                    }

                    data.svg.append(legendG)
                })
            }
        }

    }(window, document, Chartist));

    return Chartist.plugins.ctPointLabels;

}));