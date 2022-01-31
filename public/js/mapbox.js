/* eslint-disable */
export const dispalyMap = (locations) => {
  mapboxgl.accessToken =
  'pk.eyJ1IjoiZHVjdGhhaSIsImEiOiJja3oyMTQ5dmgxanB1MnZtdmRzOGVjM2w1In0.5r98pRX3M-fiGuvkkm3Mow';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  // scrollZoom : false
});

const bounds = new mapboxgl.LngLatBounds();
locations.forEach(loc => {
  //create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // add pop up
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);
  //extend map bound to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
});
}

