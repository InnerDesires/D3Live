
/**
 * params are:
  {
    d3 object,
    parent svg,
    chart params,
    coordinates,
    prevData,
    width and height 
    data to draw,
  }
 */
let d3;
let selArr;
export default drawChart;

function drawChart(params) {
    d3 = params.d3;
    let data = params.data;
    let svg = params.svg;
    selArr = params.selArr;
    
    const width = parseInt(params.width, 10);
    const height = parseInt(params.height, 10);

    let xStep = (width - 30) / (data.values.length);
    
    let max = d3.max(data.values, d => d.val);
    let min = d3.min(data.values, d => d.val);

    let myScale = d3.scaleLinear()
        .domain([min / 2, max])
        .range([0, height * 0.6]);


    var lineCustom = d3.line()
        .x(function (d, i) { return 20 + d.oldX || 0 })
        .y(function (d) { return d.oldY  })
        .curve(d3.curveCatmullRom.alpha(0.5));
    var line = d3.line()
        .x(function (d, i) { return 20 + i * xStep })
        .y(function (d) { return height - myScale(d.val) - 10; })
        .curve(d3.curveCatmullRom.alpha(0.5));

    let delay = 300 / data.values.length;

    d3.select(params.mstrApi.domNode)
        .select('#' + svg)
        .append("path")
        .style("stroke", "black")
        .style("stroke-opacity", "0.3")
        .style("stroke-width", "5")
        .style("fill", "none")
        .attr("d", lineCustom(params.prevData))
        .transition()
        .duration(700)
        .style("stroke", "black")
        .style("stroke-opacity", "1")
        .style("stroke-width", "5")
        .style("fill", "none")
        .attr("d", line(data.values))
    d3.select(params.mstrApi.domNode)
        .select('#' + svg)
        .selectAll('.circle')
        .data(data.values)
        .enter()
        .append('circle')
        .attr("class", 'circle')
        .style("stroke", "#AAAAAA")
        .style('stroke-width', '5px')
        .style("fill", "grey")
        .attr("r", 4)
        .attr("cx", (d, i) => { return 20 + xStep * i; })
        .attr("cy", d => height - myScale(d.val) - 10)
        .on("mouseover", function (d, i) {
            let coords = { x: d3.event.pageX, y: d3.event.pageY };
            d3.select(this)
                .transition()
                .duration(200)
                .attr('r', 8)
                .style("fill-opacity", "0.5")
                .style("opacity", "1")
                .style("fill", "grey")

            params.mstrApi.showTooltip(d, coords);
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .transition()
                .duration(600)
                .style("opacity", "0")
            params.mstrApi.hideTooltip()

        })
        .on('click', function (d, i) {
            try {
                if (d3.event.ctrlKey) {
                    selArr.push(d.metricSelector);
                } else {
                    selArr.clear(d.metricSelector);
                }
                params.mstrApi.applySelection(selArr.get(), false)
            } catch (e) {
                alert(e)
            }
        })
    d3.select(params.mstrApi.domNode)
        .select('#' + svg)
        .selectAll('circle')
        .style("opacity", 0)
        .transition()
        .delay((d, i) => 500 + i * delay)
        .duration(600)
        .style("opacity", 0.8)
        .attr("r", 10)
        .transition()
        .delay((d, i) => 100 + i * delay)
        .duration(600)
        .style("opacity", 0)
        .attr('r', 0)
        .transition()
        .duration(0)
        .attr('r', 8)
    let svg1 = document.getElementById(svg);
    svg1.style = "margin: 0; padding: 0; vertical-align: top;border:none";/* 
    let rect = svg1.getBoundingClientRect();
    alert(`${rect.x} ${rect.y} ${rect.width} ${rect.height}`); */
}
