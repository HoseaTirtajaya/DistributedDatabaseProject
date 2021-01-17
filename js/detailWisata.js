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
            } else {
                initMap();
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

async function getDetailWisata() {
    let service = new google.maps.places.PlacesService()
    let place_id = location.search.substring(1, location.search.length).split("=")[1];

    let url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=AIzaSyCH6xXf8d9SpQ-bO-IYmARYC89dpMqJ69w`;
    console.log(url);

    // await fetch(url, {
    //     method: "GET"
    // }).then((place) => {
    //     console.log(place);
    // }).catch(err => {
    //     if(err){
    //         console.log(err);
    //     }
    // });
}

function initMap() {
    let place_id = location.search.substring(1, location.search.length).split("=")[1];

    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.866, lng: 151.196 },
        zoom: 15,
    });

    const request = {
        placeId: place_id,
    };

    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, (place, status) => {
        console.log(place);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            let nama_tempat = document.getElementById("nama_tempat");
            let alamat_tempat = document.getElementById("alamat_tempat");
            let deskripsi_tempat = document.getElementById("deskripsi_tempat");

            nama_tempat.innerHTML = place.name;
            alamat_tempat.innerHTML = place.formatted_address;
        }
    });
}


const init = function () {
    checkAuthentication();
};

init();