//user id is 'accountID'
function getCookie(cookieID){
    const cookie = document.cookie.split("; ").find((row) => row.startsWith(cookieID+"="))?.split("=")[1];
    console.log(cookieID +": "+cookie);
    return cookie;
}


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
            document.cookie = "accountID="+data.accountId+";path=/";
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

function logout(){
    //clear cookies
    document.cookie = "accountID=;path=/";
    window.location.replace('../signIn.html');

    //redirect
}

async function validateToken(pageType){
    //get accountId token
    const accountToken = document.cookie.split("; ").find((row) => row.startsWith("accountID="))?.split("=")[1];
    if(accountToken===''){
        window.location.href ='../signIn.html';
    }
    else{
        var apiURL = 'https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/load-page?page=' + pageType + '&token=' + accountToken;
        const res = await fetch(apiURL);
        const data = await res.json();
        console.log(data);
        return data;
    }
    
}

// Toggles the element with id1 off and id2 on with display_type display
function switchContent(element_id1, element_id2, display_type){
    if(element_id1 !== "none"){
        document.getElementById(element_id1).style.display = "none";
        document.getElementById(element_id2).style.display = display_type;
    }else{
        document.getElementById(element_id2).style.display = display_type;
    }
}



async function saveAccountInfo(){
    const accountID = getCookie('accountID');
    //get necessary fields
    var fname = document.getElementById('fname-new').value;
    var lname = document.getElementById('lname-new').value;
    var email = document.getElementById('email-new').value;
    var phone = document.getElementById('phone-new').value;
    var username = document.getElementById('username-new').value;
    var password = document.getElementById('password-new').value;
    var cPassword = document.getElementById('cPassword-new').value;
    console.log({first:fname,last:lname,email:email,phone:phone,username:username,password:password});
    
    //check if info is valid
    if(checkFormat('word',fname) === false){
        alert("First name must only contain alphabetic letters.");
    }else if(checkFormat('word',lname) === false){
        alert("Last name must only contain alphabetic letters.");
    }else if(checkFormat('username',username)=== false){
        alert("Invalid username\nMust only contains letters and numbers\nMust be between 6-20 characters in length");
    }else if(password !== cPassword){
        alert("Passwords must match.");
    }else if(checkFormat("password",password) === false){
        alert("Password must be 8-16 characters, contain at least one letter, one number and one special character.");
    }else if(checkFormat("email",email)=== false){
        alert("Invalid email.");
    }else if(!(fname && lname && username && email && phone && password && cPassword)){
        alert("Please fill out all fields.");
    }else{
        //true
        //send info to lambda
        var queryParams = "?token="+accountID+"&FirstName="+fname+"&LastName="+lname+"&Email="+email+"&Phone="+phone+"&Username="+username+"&Password="+password;
        const res = await fetch('https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/updateAccount'+queryParams)
        const data = await res.json();
        console.log(data);
        //was change successful?
        if(data.status === "Success"){
            alert("Successly updated information.");
            //refresh data on page
            switchContent("editable","static",'flex');
        }
        else{
            alert("Error updating information");
        }
    }
}

async function loadAccountSettings(){
    try{
        const data = await validateToken('account');
        
        if(data.status==="Success"){
            document.getElementById('user-name').innerHTML = data.userInfo.FirstName;

            document.getElementById('fname').innerHTML = data.userInfo.FirstName;
            document.getElementById('lname').innerHTML = data.userInfo.LastName;
            document.getElementById('email').innerHTML = data.userInfo.Email;
            document.getElementById('phone').innerHTML = data.userInfo.Phone;
            document.getElementById('username').innerHTML = data.userInfo.Username;
            document.getElementById('password').innerHTML = data.userInfo.Password;
            
            document.getElementById('fname-new').value = data.userInfo.FirstName;
            document.getElementById('lname-new').value = data.userInfo.LastName;
            document.getElementById('email-new').value = data.userInfo.Email;
            document.getElementById('phone-new').value = data.userInfo.Phone;
            document.getElementById('username-new').value = data.userInfo.Username;
            document.getElementById('password-new').value = data.userInfo.Password;
            document.getElementById('cPassword-new').value = data.userInfo.Password;

            switchContent("loading","content","flex");
        }
        else{
            console.log("Error");
        }

    }
    catch(err){
        console.log("Validate token error",err);
    }
    return;
}

async function getSponsorInfo(sponsorID){
    var apiURL = 'https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/get-sponsor-info?SponsorOrgID=' + sponsorID;
    const res = await fetch(apiURL);
    const data = await res.json();
    console.log(data);
    return data;
}

async function switchSponsor(accountID, sponsorID){
    console.log({AccountID:accountID,SponsorID:sponsorID});
    var apiURL = 'https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/change-user-sponsor?accountID='+accountID+"&sponsorOrgID="+sponsorID;
    const res = await fetch(apiURL);
    const data = await res.json();
    console.log(data);
}