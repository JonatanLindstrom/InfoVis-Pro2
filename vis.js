var loadData = d3.csv('Data/W1/Feeling_of_happiness.csv', dataset => {
    //Load data and map it
    var data = d3.entries(dataset).map(d => {
        var val = d.value;
        val.key = d.key;
        return val;
    })


// Create map module
var map = new Datamap({
    scope: 'world',
    element: document.getElementById('mapContainer'),
    projection: 'mercator',
    height: 500,
    fills: {
      defaultFill: '#eee',
      lt50: 'rgba(0,244,244,0.9)',
      gt50: 'red'
    },

    data: {
        USA: {fillKey: 'lt50' },
        RUS: {fillKey: 'lt50' },
        ARG: {fillKey: 'gt50'},
        COL: {fillKey: 'gt50' }     
      }
})

console.log(data)


// Shows the intro to the website
var intro = d3.select('#overlay')
    intro.append('h1').text('Project 2: World Values')
    intro.append('h5').text('by Jonatan Lindström')
    intro.append('p').html(`Possibly some introductory text.`)
    intro.append('p').text('(Click anywhere to begin)')
    intro.style('display', 'block')
    .on('click', function(d) { intro.style('display','none') })




})

