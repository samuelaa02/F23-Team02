async function getSponsorList(){
    try{
        const res = await fetch("https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/manage-sponsor/get-sponsor-list");
        const data = await res.json();
        if(data.status === "Success"){
            var sponsorOptions;
            for(let sponsor of data.SponsorList){
                sponsorOptions += "<option value='" + sponsor['SponsorOrgID'] + "'>"+  sponsor['Name'] + "</option>";
            }
            document.getElementById('sponsor-list').innerHTML += sponsorOptions;
        }
        else{
            alert("Error fetching data.");
        }

    }
    catch(err){
        console.log(err);
    }
}

async function getSponsorInfo(){
    try{
        var selectedSponsor = document.getElementById('sponsor-list').value;
        if(selectedSponsor){
            var queryParams = "?SponsorOrgID=" + selectedSponsor;
            const res = await fetch("https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/manage-sponsor/get-sponsor-info" + queryParams);
            const data = await res.json();
            console.log(data);
            if(data.status === "Success"){
                document.getElementById("search-term").innerHTML = data.Sponsor.Name;
                document.getElementById("sponsor-name").innerHTML = data.Sponsor.Name;
                document.getElementById("sponsor-desc").innerHTML = data.Sponsor.Description;
                document.getElementById("sponsor-rate").innerHTML = data.Sponsor.ConversionRate;
                document.getElementById("sponsor-rules").innerHTML = data.Sponsor.BehaviorRules;

                
                document.getElementById("edit-sponsor-name").value = data.Sponsor.Name;
                document.getElementById("edit-sponsor-desc").value = data.Sponsor.Description;
                document.getElementById("edit-sponsor-rate").value = data.Sponsor.ConversionRate;
                document.getElementById("edit-sponsor-rules").value = data.Sponsor.BehaviorRules;
                
                switchContent("none","sponsor-result","flex");
            }
            else{
                alert("Error fetching data.");
            }
        }
        else{
            alert("Make a selection.");
        }
        

    }
    catch(err){
        console.log(err);
    }
}

async function updateSponsor(){
    try{
        var selectedSponsor = document.getElementById('sponsor-list').value;
        var name = document.getElementById("edit-sponsor-name").value;
        var description = document.getElementById("edit-sponsor-desc").value;
        var rate = document.getElementById("edit-sponsor-rate").value;
        var rules = document.getElementById("edit-sponsor-rules").value;

        if(name && description && rate && rules && selectedSponsor){
            var queryParams = "?SponsorOrgID=" + selectedSponsor +"&Name="+ name +"&Description="+ description +"&ConversionRate="+ rate+"&BehaviorRules="+ rules;
            const res = await fetch("https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/manage-sponsor/update-sponsor" + queryParams);
            const data = await res.json();
            console.log(data);
            if(data.status === "Success"){
                alert("Sucessfully updated sponsor organization.");
                location.reload();
            }
            else{
                alert("Error updating sponsor.");
            }
        }
         else{
            alert("Please fill out all fields.");
         }
    }
    catch(err){
        console.log(err);
    }
}

async function createSponsor(){
    try{
        var name =document.getElementById("new-sponsor-name").value;
        var description =document.getElementById("new-sponsor-desc").value;
        var rate = document.getElementById("new-sponsor-rate").value;
        var rules = document.getElementById("new-sponsor-rules").value;
        if(name && description && rate && rules){
            var queryParams = "?Name="+ name +"&Description="+ description +"&ConversionRate="+ rate+"&BehaviorRules="+ rules;
            console.log(queryParams);
            const res = await fetch("https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/manage-sponsor/create-sponsor" +queryParams);
            const data = await res.json();
            console.log(data);
            if(data.status === "Success"){
                alert("Sucessfully created new sponsor.");
                location.reload();
            }
            else{
                alert("Error creating new sponsor. Ensure there are no apostrophes in the fields.");
            }
        }
        else{
            alert("Please fill out all fields.");
        }
    }
    catch(err){
        console.log(err);
    }
}