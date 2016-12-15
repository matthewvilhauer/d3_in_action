d3.csv("../data/cities.csv", function(error, data) {dataViz(data);});

function dataViz(incomingData) {
    var maxPopulation = d3.max(incomingData, function(el) {
       return parseInt(el.population);
    });

    var yScale = d3.scale.linear().domain([0,maxPopulation]).range([0,460]);

    d3.select("svg").attr("style", "height: 480px; width: 600px");
    d3.select("svg")
        .selectAll("rect")
        .data(incomingData)
        .enter()
        .append("rect")
        .attr("width", 50)
        .attr("height", function(d) {return yScale(parseInt(d.population));})
        .attr("x", function(d,i) {return i * 60;})
        .attr("y", function(d) {return 480 - yScale(d.population);})
        .style("fill", "blue")
        .style("stroke", "red")
        .style("stroke-width", "1px")
        .style("opacity", .25)
}




