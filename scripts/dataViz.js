d3.csv("../data/cities.csv", function(error, data) {csvDataViz(data);});
d3.json("/data/tweets.json", function(error, data) {jsonDataViz(data.tweets)});
d3.json("/data/tweets.json", function(error, data) {scatterDataViz(data.tweets)});

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

function scatterDataViz(incomingData) {

    incomingData.forEach(function(el) {
        el.impact = el.favorites.length + el.retweets.length; //Creates impact score by totalling favorites and retweets
        el.tweetTime = new Date(el.timestamp); //Transforms the ISO 8906 compliant string into a date datatype
    });

    var maxImpact = d3.max(incomingData, function(el) {return el.impact;});
    var startEnd = d3.extent(incomingData, function(el) {
        return el.tweetTime;
    });

    var timeRamp = d3.time.scale().domain(startEnd).range([20,480]);
    var yScale = d3.scale.linear().domain([0,maxImpact]).range([0,460]);
    var radiusScale = d3.scale.linear().domain([0,maxImpact]).range([1,20]);
    var colorScale = d3.scale.linear().domain([0,maxImpact]).range(["white","#990000"]);

    d3.select("svg.tweets-scatter-plot").attr("style", "height: 480px; width: 600px; border: 1px solid #F2F2F2");
    d3.select("svg.tweets-scatter-plot")
        .selectAll("circle")
        .data(incomingData)
        .enter()
        .append("circle")
        .attr("r", function(d) {return radiusScale(d.impact);})
        .attr("cx", function(d,i) {return timeRamp(d.tweetTime);})
        .attr("cy", function(d) {return 480 - yScale(d.impact);})
        .style("fill", function(d) {return colorScale(d.impact);})
        .style("stroke", "black")
        .style("stroke-width", "1px")
}
