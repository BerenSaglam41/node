
console.log('Hello from the client side!');
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);


  mapboxgl.accessToken = 'pk.eyJ1IjoiYmVyZW5zYWdsYW00MTQxIiwiYSI6ImNtNjQ0NGpxdTFhdjcya3I0bXhlNG90cXIifQ.yOUsK5-1taoGggbx--X3oQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/berensaglam4141/cm643tdph009w01sf4bt60bhq',
    scrollZoom : false
    // center : [-118.113491,34.111745],
    // zoom : 10,
    // interactive : false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc =>{
    // Add market
    const el = document.createElement('div');
    el.className = 'market';
    new mapboxgl.Marker({
        element : el,
        anchor : 'bottom'
        })
        .setLngLat(loc.coordinates)
        .addTo(map);   
    new mapboxgl.Popup({
        offset : 30
    })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day} : ${loc.description} </p>`)
        .addTo(map);
    bounds.extend(loc.coordinates)

  });
  map.fitBounds(bounds,{
    padding : {
        top : 200,
        bottom : 150,
        left : 100,
        right : 100
    }
});