async function loadDashboard(){
    try{
        console.log("Validate token");
        const result = await validateToken('dashboard');
        console.log(result);
        document.getElementById("user-name").innerHTML = "Welcome, " + result.fName;
        document.getElementById("sponsor-name").innerHTML = result.sponsor;
        document.getElementById("curr-points").innerHTML = result.points;
        
    }
    catch(error){
        console.error("Validate Token Error", error);
    }
    
    document.getElementById("loading").style.display = 'none';
    document.getElementById("content").style.display = 'flex';
    return;
}
