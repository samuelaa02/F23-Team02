async function loadDashboard(){
    try{
        console.log("Validate token");
        const result = await validateToken('dashboard');
        console.log(result);
        document.getElementById("user-name").innerHTML = result.fName;
        document.getElementById("sponsor-name").innerHTML = result.sponsor;
        document.getElementById("sponsor-desc").innerHTML = result.sponsorDesc;
        document.getElementById("curr-points").innerHTML = result.points;
        
    }
    catch(error){
        console.error("Validate Token Error", error);
    }
    
    switchContent("loading","content","flex");
    return;
}

async function previewSponsor(){
    try{
        var sponID = document.getElementById("sponsor-select").value;
        console.log(sponID);

        if(sponID !== ""){
            var result = await getSponsorInfo(sponID);
            if (result.status === "Success"){
                console.log(result);
                document.getElementById("preview-name").innerHTML = result.sponsorData['Name'];
                document.getElementById("preview-desc").innerHTML = result.sponsorData['Description'];
                switchContent("none","sponsor-preview","flex");
            }
        }

    }
    catch(error){
        console.error("Validate Token Error", error);
    }
    return;
}

async function loadSponsors(){
    try{
        const result = await validateToken('sponsors');
        console.log(result);
        document.getElementById("user-name").innerHTML = result.fName;
        document.getElementById("sponsor-name").innerHTML = result.sponsor;
        document.getElementById("sponsor-desc").innerHTML = result.sponsorDesc;
        document.getElementById("curr-points").innerHTML = result.points;
        
        console.log(result.sponsorList[0]['Name']);
        var sponsorOptions ="<option value=''>Please select a sponsor</option>";
        for(let sponsor of result.sponsorList){
            console.log(sponsor);
            sponsorOptions += "<option value='" + sponsor['SponsorOrgID'] + "'>"+  sponsor['Name'] + "</option>";
        }
        document.getElementById("sponsor-select").innerHTML = sponsorOptions;

    }
    catch(error){
        console.error("Validate Token Error", error);
    }
    return;
}

