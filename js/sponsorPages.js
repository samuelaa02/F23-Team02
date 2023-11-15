async function loadDashboard(){
    try{
        const result = await validateToken('dashboard');
        document.getElementById("user-name").innerHTML = "Welcome, " + result.fName;
        document.getElementById("sponsor-name").innerHTML = result.sponsor;
        document.getElementById("driver-count").innerHTML = "Encouraging "+ result.driverCount+" drivers to drive safely!";
        document.getElementById("spon-desc").innerHTML = result.sponsorDesc;
        
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