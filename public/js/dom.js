const sidebar = document.getElementById("sidebar")
var sidebarState = false

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

document.getElementById("nav").addEventListener("click", (evt) =>{
if(!sidebarState) {
sidebar.style.transform = (window.mobileCheck()) ? "translateX(0%)" : "translateX(-10%)"
sidebarState = true
} else {
sidebar.style.transform = "translateX(100%)"
sidebarState = false
}
})
maptilersdk.config.apiKey = 'bV5jY5PMe3WW4KwkaFlc';

const map = new maptilersdk.Map({
container: 'map', // container's id or the HTML element in which the SDK will render the map
style: maptilersdk.MapStyle.DATAVIZ.DARK,
center: [16.62662018, 49.2125578], // starting position [lng, lat]
zoom: 2, // starting zoom
navigationControl:"bottom-left",
geolocateControl: false
});


map.on('load', function() {
  map.addSource('country', {
  'type': 'geojson',
  'data':'http://localhost:3000/api/geo',
  });

  map.addLayer(
  {
  'id': 'IDcountry',
  'source': 'country',
  'type': 'fill',
  'paint': {
  'fill-color': [
  'interpolate',
  ['linear'],
  ['get', 'status'],
  1,
  '#FFEDA0',
  100,
  '#E31A1C',
  1000,
  '#BD0026',
  10000,
  '#800026'
  ],
  'fill-opacity': 0.5,
  'fill-outline-color': '#FFFFFF'
  }
  });

  map.on('click', 'IDcountry', function (e) {
    let text
    let color
    switch(e.features[0].properties.state){
      case 0:
        text = "Improving"
        break;
      case 1:
        text = "Stalling"
        break;
      case 2:
        text = "Worsening"
        break;
    }
    new maptilersdk.Popup().setLngLat(e.lngLat).setHTML(`<div class="popup">
  <a href="www.google.com">
    <div class="-img">
      <img src="${e.features[0].properties.thumb}" alt="">

      <div class="-img-gradient">
      </div>
      <h3>${e.features[0].properties.title}</h3>
    </div>
    <div class="-status">
      <span>Conflict status: ${text}</span>
      <hr>
      <span>Deaths: ${e.features[0].properties.deaths ? e.features[0].properties.deaths : "Not Estimated Yet"}</span>
    </div>
  </a>
  </div>`).addTo(map);
  });
});

// Change the cursor to a pointer when the mouse is over the layer.
map.on('mouseenter', 'IDcountry', function () {
map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'IDcountry', function () {
map.getCanvas().style.cursor = '';
});