let currentLat = 0;
let currentLng = 0;


function checkAuthentication() {
    if(localStorage.getItem("jwttoken") !== null){
        axios.get("http://localhost:3007/user/checkauth", {
            headers: {
                jwttoken: localStorage.getItem("jwttoken")
            }
        })
        .then((user) => {
            if(user.data.user == null){
                alert("You need to login first as user.");
                window.location = "../html/login.html"
            }
        }).catch(err => {
            if(err){
                console.log(err)
            }
        });
    } else {
        alert("You need to login first as user.");
        window.location = "../html/login.html"
    }
}

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
    radius: 50000,
    rankby: google.maps.places.RankBy.DISTANCE,
    opennow: true,
    types: ['zoo', 'lodging', 'amusement_park', 'tourist_attraction']
  };
  let ol = document.getElementById("list-places");
  
  
  const places = document.getElementById('places');
  const service = new google.maps.places.PlacesService(places);
  
  service.nearbySearch(request, (data) => {
    console.log(data);
    for(let i = 0; i < data.length; i++){
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("style", "text-decoration: none;color: black;");
        a.setAttribute("href", `./detailwisata.html?id=${data[i].place_id}`);
        li.setAttribute('class','item');
        ol.appendChild(li);
        li.appendChild(a);
        let text = document.createTextNode(data[i]);
        a.innerHTML = a.innerHTML + data[i].name;
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
  document.getElementById("locate-me").addEventListener("click", () => {
    location.reload();
  });
  currentLat = position.coords.latitude;
  currentLng = position.coords.longitude;
  initMap();
  getNearbyAttractions();
}

function logoutUser() {
  let logout_btn = document.getElementById("logout_btn");

  logout_btn.addEventListener("click", () => {
    console.log("masuk add event listener");
    localStorage.removeItem("jwttoken");
    window.location = "../index.html"
  });
}

const init = function () {
  checkAuthentication();
  getLocation();
  logoutUser();
};

init();