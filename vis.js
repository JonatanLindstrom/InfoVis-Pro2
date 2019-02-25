d3.csv('Data/W5/happiness.csv', dataset => {

    // Create data object
    var dataObj = {};
    var countries = Datamap.prototype.worldTopo.objects.world.geometries;

    d3.entries(dataset).map(d => {
        for (key in d.value) { 
            for (var i = 0, j = countries.length; i < j; i++) {
                if (key == countries[i].properties.name) {
                    currentID = countries[i].id;
                    if (d.value[''] == 'Very happy') {
                        if (d.value[key] > 40) dataObj[currentID] = { "fillKey": "HIGHEST" }
                        if (d.value[key] > 30 && d.value[key] < 40) dataObj[currentID] = { "fillKey": "HIGH" }
                        if (d.value[key] > 20 && d.value[key] < 30) dataObj[currentID] = { "fillKey": "MEDIUM" }
                        if (d.value[key] > 10 && d.value[key] < 20) dataObj[currentID] = { "fillKey": "LOW" }
                        if (d.value[key] < 10) dataObj[currentID] = { "fillKey": "LOWEST" }
                        dataObj[currentID].happiness = d.value[key];
                    }
                    else if (d.value[''] == 'Quite happy') {
                        dataObj[currentID].quitehappiness = d.value[key];
                    }
                    else if (d.value[''] == 'Not very happy') {
                        dataObj[currentID].nothappiness = d.value[key];
                    }
                    else if (d.value[''] == 'Not at all happy') {
                        dataObj[currentID].notatallhappiness = d.value[key];
                    }
                }
            }
        }
    });


    // Create map module
    var worldmap = new Datamap({
        scope: 'world',
        element: document.getElementById('mapContainer'),
        projection: 'mercator',
        data: dataObj,
        height: 500,
        fills: {
            defaultFill: '#aaa',
            HIGHEST: '#00FF00',
            HIGH: '#B0FF00',
            MEDIUM: '#FFFF00',
            LOW: '#FF8C00',
            LOWEST: '#FF0000'
        },


        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                country.text(geography.properties.name);
                console.log(dataObj[geography.id])
                countryData.html(`  Very happy: ${dataObj[geography.id].happiness}%<br/>
                                    Quite happy: ${dataObj[geography.id].quitehappiness}%<br/>
                                    Not very happy: ${dataObj[geography.id].nothappiness}%<br/>
                                    Not at all happy: ${dataObj[geography.id].notatallhappiness}%`);
            });
        }
    })



    // Legends
    var legendsConainer = d3.select('#mapLegends')
        legendsConainer.style('text-align', 'center')
        
    var country = legendsConainer.append('h1')

    var countryData = legendsConainer.append('p')



    // Shows the intro to the website
    var intro = d3.select('#overlay')
        intro.append('h1').text('Project 2: World Values')
        intro.append('h5').text('by Jonatan Lindström')
        intro.append('p').html(`As far as D3 goes I made an attempt, however a couple of things got in the way.
                                <br/><br/>
                                The data given by WVS was split amongs multiple csv files. Something which was hard to handle in
                                d3 version 3, but possible in version 5. However tools such as DataMaps only had support for old
                                versions of d3 and not the newer ones.
                                <br/><br/>
                                Here is a demo of what the visualization could have looked like (with static data).`)
        intro.append('p').text('(Click anywhere to remove overlay)')
        intro.style('display', 'block')
        .on('click', function(d) { intro.style('display','none') })




})

