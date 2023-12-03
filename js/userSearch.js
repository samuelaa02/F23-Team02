/**async function getUser(){
  var userType = document.getElementById("userType").value;
  var searchType = document.getElementById("searchType").value;
  var userName = document.getElementById("userName").value;

  var queryParams = "?userType="+userType+"&searchType="+searchType+"&user="+userName;

  const res = await fetch('https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/UserSearch'+queryParams)
  const data = await res.json();
  console.log(data);

  if(data.status === "Success"){
    //refresh data on page
    var username = data.result.Username;
    var email = data.result.Email;
    var fName = data.result.FirstName;
    var lName = data.result.LastName;
    var phone = data.result.Phone;
    var password = data.result.Password;
    var points = data.result.Points;

    document.getElementById("user-result").style.visibility = "visible";
    switchContent("none","user-result","flex");

    document.getElementById("search-term").innerHTML = userName;
    document.getElementById("result-usertype").innerHTML = userType;
    document.getElementById("result-username").innerHTML = username;
    document.getElementById("result-email").innerHTML = email;
    document.getElementById("result-fName").innerHTML = fName;
    document.getElementById("result-lName").innerHTML = lName;
    document.getElementById("result-phone").innerHTML = phone;
    document.getElementById("result-password").innerHTML = password;
    document.getElementById("result-points").innerHTML = points;

    document.getElementById("edit-username").placeholder = username;
    document.getElementById("edit-email").placeholder = email;
    document.getElementById("edit-fName").placeholder = fName;
    document.getElementById("edit-lName").placeholder = lName;
    document.getElementById("edit-phone").placeholder = phone;
    document.getElementById("edit-password").placeholder = password;
    
    
    document.getElementById("edit-username").value = username;
    document.getElementById("edit-email").value = email;
    document.getElementById("edit-fName").value = fName;
    document.getElementById("edit-lName").value = lName;
    document.getElementById("edit-phone").value = phone;
    document.getElementById("edit-password").value = password;
  }
  else{
      alert("Error retrieving user information");
  }

}*/

async function getUser(){
  try{
    var searchUserType,searchTerm,searchValue;
    var sponsorFilter;

    const accountID = getCookie('accountID');
    const resSponsor = await fetch('https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/manage-user/get-user-info?UserID='+accountID);
    const dataSponsor = await resSponsor.json();

    if(dataSponsor.status==="Success"){
      sponsorFilter = dataSponsor.UserInfo.SponsorOrgID;

      searchUserType = document.getElementById("userType").value;
      searchTerm = document.getElementById("searchType").value;
      searchValue = document.getElementById("userName").value;

      if(searchUserType && searchTerm && searchValue){
        var queryParams = "?SponsorFilter="+sponsorFilter+"&UserType="+searchUserType;
        switch (searchTerm){
          case 'Username':
            queryParams += "&Username="+searchValue;
            break;
          case 'Email':
            queryParams += "&Email="+searchValue;
            break;
        }

        const res = await fetch('https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/manage-user/get-user-info'+queryParams);
        const data = await res.json();
        console.log(data);
        if(data.status==="Success"){
          document.getElementById("search-term").innerHTML = searchValue;
          document.getElementById("result-usertype").innerHTML = data.UserInfo.Type;
          document.getElementById("result-username").innerHTML = data.UserInfo.Username;
          document.getElementById("result-email").innerHTML = data.UserInfo.Email;
          document.getElementById("result-fName").innerHTML = data.UserInfo.FirstName;
          document.getElementById("result-lName").innerHTML = data.UserInfo.LastName;
          document.getElementById("result-phone").innerHTML = data.UserInfo.Phone;
          document.getElementById("result-password").innerHTML = data.UserInfo.Password;

          
          document.getElementById("search-term").innerHTML = searchValue;
          //document.getElementById("edit-usertype").value = data.UserInfo.Type;
          document.getElementById("edit-username").value = data.UserInfo.Username;
          document.getElementById("edit-email").value = data.UserInfo.Email;
          document.getElementById("edit-fName").value = data.UserInfo.FirstName;
          document.getElementById("edit-lName").value = data.UserInfo.LastName;
          document.getElementById("edit-phone").value = data.UserInfo.Phone;
          document.getElementById("edit-password").value = data.UserInfo.Password;
          
          switchContent("none","user-result","flex");
        }
        else{
          switchContent("none","user-result","none");
          alert("Error searching: 'No User Found in your organization.'");
        }
      }
      else{
        alert("Error searching: 'Please fill out all fields.");
      }
      
    }
    else{
      alert("Error searching: 'Get Current User's Organization.'");
    }
  }
  catch(err){
    console.log(err);
  }
}