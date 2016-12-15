d3.csv("../data/cities.csv", function(error, data) {csvDataViz(data);});

function csvDataViz(incomingData) {
    var maxPopulation = d3.max(incomingData, function(el) {
       return parseInt(el.population);
    });

    var yScale = d3.scale.linear().domain([0,maxPopulation]).range([0,460]);

    d3.select("svg").attr("style", "height: 480px; width: 600px; border: 1px solid #F2F2F2");
    d3.select("svg.cities-csv-histogram")
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

d3.json("/data/tweets.json", function(error, data) {jsonDataViz(data.tweets)});


function jsonDataViz(incomingData) {

    var nestedTweets = d3.nest()
        .key(function(el) {return el.user})
        .entries(incomingData);

    nestedTweets.forEach(function(el) {
        el.numTweets = el.values.length;
    });

    var maxTweets = d3.max(nestedTweets, function(el) {return el.numTweets;});

    var yScale = d3.scale.linear().domain([0,maxTweets]).range([0,480]);

    d3.select("svg.tweets-json-histogram").attr("style", "height: 480px; width: 600px; border: 1px solid #F2F2F2");
    d3.select("svg.tweets-json-histogram")
        .selectAll("rect")
        .data(nestedTweets)
        .enter()
        .append("rect")
        .attr("width", 50)
        .attr("height", function(d) {return yScale(parseInt(d.numTweets));})
        .attr("x", function(d,i) {return i * 60;})
        .attr("y", function(d) {return 480 - yScale(d.numTweets);})
        .style("fill", "red")
        .style("stroke", "blue")
        .style("stroke-width", "1px")
        .style("opacity", .25)
}

