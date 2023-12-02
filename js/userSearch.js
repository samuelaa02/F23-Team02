async function getUser(){
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
  }
  else{
      alert("Error retrieving user information");
  }

}