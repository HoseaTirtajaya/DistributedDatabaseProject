function loginUser(){
    let login_btn = document.getElementById("login_btn");
    
    login_btn.addEventListener("click", () => {
        let email = document.getElementById("exampleInputEmail1").value;
        let password = document.getElementById("exampleInputPassword1").value;

        axios.post("http://localhost:3007/user/login", {
            email,
            password,
        }).then(async (user) => {
            let jwttoken = await user.data.token;

            localStorage.setItem("jwttoken", jwttoken);
            window.location = "../html/homepage.html"
        }).catch((err) => {
            if(err){
                alert(err.response.data.message);
                window.location.reload();
            }
        });
    });
}

const init = function () {
    loginUser();
};

init()