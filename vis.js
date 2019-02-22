d3.csv('', function(dataset) {
    //Load data and map it
    var data = d3.entries(dataset).map(function(d) {
        var val = d.value;
        val.key = d.key;
        return val;
    })

    // Shows the intro to the website
    var intro = d3.select('#overlay')
        intro.append('h1').text('Project 2: World Values')
        intro.append('h5').text('by Jonatan Lindström')
        intro.append('p').html(`Possibly some introductory text.`)
        intro.append('p').text('(Click anywhere to begin)')
        intro.style('display', 'block')
        .on('click', function(d) { intro.style('display','none') })
})




