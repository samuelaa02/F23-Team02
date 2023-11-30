async function loadDashboard(){
    try{
        const result = await validateToken('dashboard');
        document.getElementById("user-name").innerHTML = result.fName;
        document.getElementById("sponsor-name").innerHTML = result.sponsor;
        document.getElementById("driver-count").innerHTML =result.driverCount;
        document.getElementById("sponsor-desc").innerHTML = result.sponsorDesc;
        
    }
    catch(error){
        console.error("Validate Token Error", error);
    }
    
    document.getElementById("loading").style.display = 'none';
    document.getElementById("content").style.display = 'flex';
    return;
}

async function loadManagement(){
    try{
        const result = await validateToken('user-management');

    }
    catch(error){
        console.error("Validate Token Error", error);
    }
    
    document.getElementById("loading").style.display = 'none';
    document.getElementById("content").style.display = 'flex';
    return;
}

async function searchForUser(){
    try{
        //get user data and send to api
        
        var userType = document.getElementById("search-user-type").value;
        var userDiscrim = document.getElementById("search-user-identity").value;
        var userTerm = document.getElementById("search-user-string").value;

        //if fields are filled
        if(userType && userDiscrim && userTerm){
            //send to api
            //succesfful match
                //populate
                switchContent("none","user-result","flex");

        }
        else{
            alert("Please supply all search terms.")
        }
    }
    catch(error){
        console.error("User search error",error);
    }
}

async function awardPoints(type){
    var amount = document.getElementById("amount").value;
    var reason = document.getElementById("reason").value;
    var user = document.getElementById("result-username").innerHTML;
    if(amount && reason){
        var queryParams = "?amount="+amount+"&reason="+reason+"&awardType="+type+"&userID="+user;
        const res = await fetch('https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/awardPoints'+queryParams);
        const data = await res.json();
        console.log(data);
    }
}
