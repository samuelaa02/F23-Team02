function sendEmail()
{
    var email = document.getElementById('email').value;
    document.getElementById("errMessage").innerHTML = "";
    var apiURL = 'https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/email' + '?email' + email;

    fetch(apiURL)
    .then(res =>
        {
            return res.json();
        })

    .then(data => 
        {
            console.log(data);
            if((data.status === "Success") && (data.eventType === "EmailSent"))
            {
                switch (data.userType)
                {
                    case 'SentEmail':
                        window.location.href = '/email_sent.html';
                        break;
                }
            }

            else if((data.status === "Failure") && (data.eventType === "EmailSent"))
            {
                document.getElementById("errMessage").innerHTML = data.reason;
            }

            else
            {
                document.getElementById("errMessage").innerHTML = "Something went wrong."
            }
        })

        .catch(error=>console.log(error));
}