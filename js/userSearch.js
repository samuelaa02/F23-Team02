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
    var user = "<p>" + data.result.LastName + ", " + data.result.FirstName + "</p>";
    document.getElementById("user-info").innerHTML = user;
  }
  else{
      alert("Error retrieving user information");
  }

}