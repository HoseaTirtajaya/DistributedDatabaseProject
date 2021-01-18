function checkAuthentication() {
    let username = document.getElementById("username_profile");
    if(localStorage.getItem("jwttoken") !== null){
        axios.get("https://backend-distributed-database.herokuapp.com/user/checkauth", {
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

function getMyWishlists(){
    axios.get("https://backend-distributed-database.herokuapp.com/wishlist/my", {
        headers: {
            jwttoken: localStorage.getItem("jwttoken")
        }
    }).then((wishlists) => {
        let wishlists_data = wishlists.data.wishlists;
        let wishlist_length = document.getElementById("wishlist_length");
        let wishlist_container = document.getElementById("wishlist_container");

        for(let i=0; i < wishlists_data.length; i++){
            wishlist_container.innerHTML = ` <div class="cart-item d-md-flex justify-content-between"><span class="remove-item"><i class="fa fa-times"></i></span>
                <div class="px-3 my-3">
                    <a class="cart-item-product" href="#">

                    <div class="cart-item-product-info">
                        <h4 class="cart-item-product-title">${wishlists_data[i].name_place}</h4>
                        <div class="text-lg text-body font-weight-medium pb-1"></div><span>Rencana : <span class="${wishlists_data[i].isDone == true ? "text-success" : "text-danger"} font-weight-medium">${wishlists_data[i].isDone == true ? "Sudah Dikunjungi" : "Belum dikunjungi"}</span></span>
                    </div>
                    </a>
                </div>
                </div>`
        }


        wishlist_length.innerHTML = wishlists_data.length;

    }).catch(err => {
        if(err){
            console.log(err);
        }
    }); 
}


const init = function () {
    checkAuthentication();
    getMyWishlists();
};

init();