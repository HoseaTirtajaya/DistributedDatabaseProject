function checkAuthentication() {
    let username = document.getElementById("username");
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
                username.innerHTML = user.data.user.full_name;
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
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            let nama_tempat = document.getElementById("nama_tempat");
            let alamat_tempat = document.getElementById("alamat_tempat");
            let no_hp = document.getElementById("no_hp");
            let website_addr = document.getElementById("website_addr");
            let deskripsi_tempat = document.getElementById("deskripsi_tempat");

            if(place.website == undefined){
                website_addr.setAttribute("href", "#");
                website_addr.setAttribute("style", "text-decoration: none; color: black;");
                nama_tempat.innerHTML = place.name;
                alamat_tempat.innerHTML = place.formatted_address;
                no_hp.innerHTML = place.formatted_phone_number;
                website_addr.innerHTML = "No Website Available."
            } else {
                website_addr.setAttribute("href", place.website);
                website_addr.setAttribute("style", "text-decoration: none; color: black;");
                website_addr.setAttribute("target", "_blank");
                nama_tempat.innerHTML = place.name;
                alamat_tempat.innerHTML = place.formatted_address;
                no_hp.innerHTML = place.formatted_phone_number;
                website_addr.innerHTML = place.website;
            }
        }
    });
}

function reviewPlace() {
    const stars = document.querySelectorAll(".star");
    const rating = document.querySelector(".rating");

    for(let i = 0; i < stars.length; i++) {
        stars[i].starValue = (i+1);
        ["mouseover", "mouseout", "click"].forEach(function(e) {
            stars[i].addEventListener(e, starRate)
        })
    }

    function starRate(e){
        let type = e.type;
        let starValue = this.starValue;
        if(type === "click") {
            if(starValue >= 1) {
                let place_id = location.search.substring(1, location.search.length).split("=")[1];
                let review_btn = document.getElementById("review_btn");
                review_btn.addEventListener("click", () => {
                    let review_status = document.getElementById("review_status").value;
                    let link = `https://backend-distributed-database.herokuapp.com/review/create?id=${place_id}`
                    axios.post(link, {
                        rate: starValue,
                        review: review_status
                    }, {
                        headers: {
                          jwttoken: localStorage.getItem("jwttoken")  
                        }
                    })
                    .then(async (review) => {
                        await review;
                        alert("Your review has been recorded");
                    }).catch(err => {
                        if(err){
                            console.log(err);
                        }
                    });
                });
                rating.innerHTML = "You rate this " + starValue + " stars";
            }
        }
        stars.forEach(function(ele, ind) {
            if(type === "click") {
                if(ind < starValue) {
                    ele.classList.add("fix");
                } else {
                    ele.classList.remove("fix");
                }
            }
            if(type === "mouseover") {
                if(ind < starValue) {
                    ele.classList.add("over");
                } else {
                    ele.classList.remove("over");
                }
            }
            if(type === "mouseout") {
                ele.classList.remove("over");
            }
        });
    }
}

function getReviews() {
    let place_id = location.search.substring(1, location.search.length).split("=")[1];
    let link = `https://backend-distributed-database.herokuapp.com/review/details?id=${place_id}`

    axios.get(link, {
        headers: {
            jwttoken: localStorage.getItem("jwttoken"),
        }
    }).then(reviews => {
        let review_data = reviews.data.reviews;
        let review_length = reviews.data.reviews.length;
        let review_container = document.getElementById("review_container");
        
        for(let i = 0; i < review_length; i++) {
            let first_div = document.createElement("div");
            let first_p = document.createElement("p");
            let desc_review = document.createElement("span");

            first_div.setAttribute("class", "user-info");
            first_p.setAttribute("class", "user-title");
            desc_review.setAttribute("class", "user-subtitle");
            first_p.innerHTML = review_data[i].user.full_name;
            desc_review.innerHTML = "<br><span class='user-subtitle'>Rate: " + review_data[i].rate +"<br> <span class='user-subtitle'>Description: " + review_data[i].review; 
            first_p.appendChild(desc_review);
            first_div.appendChild(first_p);

            review_container.appendChild(first_div)
        }
    }).catch(err => {
        if(err){
            console.log(err);
        }
    });
}

const init = function () {
    checkAuthentication();
    reviewPlace()
    getReviews();
};

init();