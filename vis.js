d3.csv('Data/W1/happiness.csv', dataset => {

    var data = d3.entries(dataset).map(d => {
        var val = d.value;
        val.key = d.key;
        return val;
    })

    // Create map module
    var worldmap = new Datamap({
        scope: 'world',
        element: document.getElementById('mapContainer'),
        projection: 'mercator',
        height: 500,
        fills: {
            defaultFill: '#aaa',
            HIGHEST: '#00FF00',
            HIGH: '#B0FF00',
            MEDIUM: '#FFFF00',
            LOW: '#FF8C00',
            LOWEST: '#FF0000'
        },

        data: {
            
            USA: {fillKey: 'HIGHEST' },
            SWE: {fillKey: 'LOWEST' },
            RUS: {fillKey: 'HIGH' },
            ARG: {fillKey: 'MEDIUM'},
            COL: {fillKey: 'LOW' }     
        },

        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                country.text(geography.properties.name);
            });
        }
    })

    var countries = Datamap.prototype.worldTopo.objects.world.geometries;
    for (var i = 0, j = countries.length; i < j; i++) {
        // console.log(countries[i]);
    }


    d3.entries(data).map(d => {
        for (key in d.value) { 
            for (var i = 0, j = countries.length; i < j; i++) {
                if (key == countries[i].properties.name) {
                    currentID = countries[i].id;
                    worldmap.updateChoropleth({
                        currentID: {fillKey: 'LOW'}
                    });
                }
            }
        }
    });
    

    // Legends
    var legendsConainer = d3.select('#mapLegends')
        legendsConainer.style('text-align', 'center')
        
    var country = legendsConainer.append('h1')



    // Shows the intro to the website
    var intro = d3.select('#overlay')
        intro.append('h1').text('Project 2: World Values')
        intro.append('h5').text('by Jonatan Lindström')
        intro.append('p').html(`Possibly some introductory text.`)
        intro.append('p').text('(Click anywhere to begin)')
        intro.style('display', 'block')
        .on('click', function(d) { intro.style('display','none') })




})

