function registerUser(){
    let register_btn = document.getElementById("submit_btn");
    
    register_btn.addEventListener("click", () => {
        let nama_lengkap = document.getElementById("nama_lengkap").value;
        let email = document.getElementById("email").value;
        let phone_no = document.getElementById("phone_no").value;
        let password = document.getElementById("exampleInputPassword1").value;
        let gender = document.getElementById("gender_male")
        let gender2 = document.getElementById("gender_female")
        let pass_checker = document.getElementById("exampleInputPassword2").value;
        
        if(password == pass_checker){
            if(gender.checked == false && gender2.checked == false){
                alert("You must choose one of the gender.");
                window.location.reload();
            } else if(gender.checked == true && gender2.checked == false){
                axios.post("http://localhost:3007/user/register", {
                    full_name: nama_lengkap,
                    email: email,
                    phone_no: phone_no,
                    password: password,
                    gender: gender.value
                }).then((user) => {
                    console.log(user);
                }).catch((err) => {
                    if(err){
                        alert(err.response.data.message);
                        window.location.reload();
                    }
                });
            } else {
                axios.post("https://backend-distributed-database.herokuapp.com/user/register", {
                    full_name: nama_lengkap,
                    email: email,
                    phone_no: phone_no,
                    password: password,
                    gender: gender2.value
                }).then(async (user) => {
                    await alert(user.data.message)
                    window.location = "../html/login.html";
                }).catch((err) => {
                    if(err){
                        alert(err.response.data.message);
                        window.location.reload();
                    }
                });
            }
        } else {
            alert("Confirm password and password didn't match");
            window.location.reload();
        }
        
    });
}

const init = function () {
    registerUser();
};

init()