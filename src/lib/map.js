// map

ymaps.ready(init);
var myMap;
var coords = [
  [59.961368, 30.288778],
  [59.913992, 30.302168],
  [59.944665, 30.373579],
  [59.931572, 30.435377]
];

function init(){     
  myMap = new ymaps.Map("map", {
    center: [59.941392, 30.293756],
    zoom: 12,
    controls: ['zoomControl']
  });  
  myMap.behaviors.disable('scrollZoom');

  var placemarks = createPlacemarks(coords);

  placemarks.forEach((placemark) => {
    myMap.geoObjects.add(placemark);
  });

  function createPlacemarks(array) {
    let placemarks = [];
  
    array.forEach((coord) => {
      let oneMark = new ymaps.Placemark([coord[0], coord[1]], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/icons/map-marker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [0, 0]
      });  
      placemarks.push(oneMark);
    });
  
    return placemarks;
  }
  
}