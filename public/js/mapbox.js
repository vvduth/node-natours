/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken = 'pk.eyJ1IjoiZHVjdGhhaSIsImEiOiJja3oxc3psZmkxaGhvMnZtdnFlZDB6Y3F0In0.DP3vPX3qj37UWkTmSEoLIA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
  });

