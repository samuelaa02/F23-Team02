function signIn(){
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    document.getElementById("warning").innerHTML = "";
    var apiURL = 'https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/sign-in?username=' + username + '&password=' + password;
    fetch(apiURL)
    .then(res => {
        return res.json();
    })
    .then(data=>{
        console.log(data);
        if((data.status === "Success")){
            switch (data.userType){
                case 'Admin':
                    window.location.href ='./admin/admin_dashboard.html';
                    break;
                case 'Sponsor':
                    window.location.href ='./sponsor/sponsor_dashboard.html';
                    break;
                case 'Driver':
                    window.location.href ='./driver/driver_dashboard.html';
                    break;
            }
        }
        else if((data.status === "Failure")){
            document.getElementById("warning").innerHTML = data.reason;
        }
        else{
            document.getElementById("warning").innerHTML = "Something broke.";
        }
    })
    .catch(error=>console.log(error));
}

function checkFormat(type, input){
    switch (type){
        case 'email':
            var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(input);
        case 'password':
            var pattern = /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
            return pattern.test(input);
        case 'username':
            var pattern =/^(?=.*[a-zA-Z0-9]{6,20}$)/; 
            return pattern.test(input);
        case 'word':
            var pattern = /^(?=.*[a-zA-Z'])[A-Za-z']+$/;
            return pattern.test(input);
        default:
            console.log(input);
    }
}

function Register(){
    var fname = document.getElementById('fName').value;
    var lname = document.getElementById('lName').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var password = document.getElementById('password').value;
    var cPassword = document.getElementById('cPassword').value;
    var warning = document.getElementById("warning");

    warning.innerHTML = "";

    if(checkFormat('word',fname) === false){
        warning.innerHTML = "First name must only contain alphabetic letters.";
    }else if(checkFormat('word',lname) === false){
        warning.innerHTML = "Last name must only contain alphabetic letters.";
    }else if(checkFormat('username',username)=== false){
        warning.innerHTML = "Invalid username<ul><li>Must only contains letters and numbers</li><li>Must be between 6-20 characters in length</li></ul>";
    }else if(password !== cPassword){
        warning.innerHTML = "Passwords must match.";
    }else if(checkFormat("password",password) === false){
        warning.innerHTML = "Password must be 8-16 characters, contain at least one letter, one number and one special character.";
    }else if(checkFormat("email",email)=== false){
        warning.innerHTML = "Invalid email."
    }else if(!(fname && lname && username && email && phone && password && cPassword)){
        warning.innerHTML = "Please fill out all fields.";
    }else{
        fetch("https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/register/inUse?username="+username+"&email="+email)
        .then(res =>{
            return res.json();
        })
        .then(data=>{
            if(data.usernameStatus === "Unavailable"){
                warning.innerHTML = "Username is unavailable.";
            }else if (data.emailStatus === "Unavailable"){
                warning.innerHTML = "Email is already being used by another account.";
            }else{
                var queryParams = "?fName="+fname+"&lName="+lname+"&email="+email+"&username="+username+"&password="+password+"&phone"+phone;
                console.log(queryParams);
                fetch("https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/register"+queryParams)
                .then(res => {
                    return res.json();
                })
                .then(data=>{
                    document.cookie = "accountID="+data.results.insertId+";path=/";
                    window.location.href ='./signIn.html';
                })
                .catch(error=>console.log(error));
            }
            
            if(document.getElementById("warning").innerHTML){
                warning.style.visibility = "visible";
            }else{
                warning.style.visibility = "hidden";
            }
        })
    }
    if(document.getElementById("warning").innerHTML){
        warning.style.visibility = "visible";
    }else{
        warning.style.visibility = "hidden";
    }
}

function validateToken(){
    //get username and token cookie
    username = document.cookie.match();
    token = document.cookie.match();

    fetch('function url goes here',{
        Method: 'POST',
        Headers:{
            'Content-type': 'application/json; charset=UTF-8',
        },
        Body: JSON.stringify({
            'type': 'ValidateToken',
            'username': username,
            'token' :token
        }),
    }).then(res =>{
        return res.json;
    }).then(data=>{
        //debugging purpose
        console.log(data);

        if((data.status === "Success") && (data.eventType === "ValidateToken")){
            //call page specific function to get data
        }
        else if((data.status === "Failure") && (data.eventType === "ValidateToken")){
            //redirect to signin page
            window.location.replace('../signIn.html');
        }
        else{
            console.log(data.eventType);
        }

    })
}