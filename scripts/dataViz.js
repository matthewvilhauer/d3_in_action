d3.csv("../data/cities.csv", function(error, data) {dataViz(data);});

function dataViz(incomingData) {
    d3.select("body").selectAll("div.cities")
        .data(incomingData)
        .enter()
        .append("div")
        .attr("class", "cities")
        .html(function(d, i) { return d.label; });
}

d3.select("svg")
    .selectAll("rect")
    .data([15, 50, 22, 8, 100, 10])
    .enter()
    .append("rect")
    .attr("width", 10)
    .attr("height", function(d) {return d;})
    .style("fill", "blue")
    .style("stroke", "red")
    .style("stroke-width", "1px")
    .style("opacity", .25)
    .attr("x", function(d,i) {return i * 10});
