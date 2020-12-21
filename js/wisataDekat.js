let currentLat = 0;
let currentLng = 0;


// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: currentLat, lng: currentLng };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

function getNearbyAttractions() {
  const request = {
    location: new google.maps.LatLng(currentLat, currentLng),
    radius: 10000,
    rankby: google.maps.places.RankBy.DISTANCE,
    opennow: true,
    type: ['landmark', 'town_square', 'locality']
  };
  let ol = document.getElementById("list-places");
  
  
  const places = document.getElementById('places');
  const service = new google.maps.places.PlacesService(places);
  
  service.nearbySearch(request, (data) => {
    console.log(data);
    for(let i = 0; i < data.length; i++){
      if(i ==  0 || i == 19){
        continue
      } else {
        let li = document.createElement("li");
        li.setAttribute('class','item');
        ol.appendChild(li);
        let text = document.createTextNode(data[i]);
        li.innerHTML = li.innerHTML + data[i].name;
      }
      }
    });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  currentLat = position.coords.latitude;
  currentLng = position.coords.longitude;
  initMap();
  getNearbyAttractions();

}

const init = function () {
  getLocation();
};

init();