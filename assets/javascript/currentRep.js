$(document).ready(function() {

    var address = $("#").val();
    address = address.replace(" ", "%20");
    //var address = "30008%20Shadow%20Creek%20Dr%20Westlake%20OH%2044145";
    var apiKey = "AIzaSyCMZgdTS5Ln1SHuAC1n9QnpwMADHeKF02k";
    var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + apiKey + "&address=" + address;
    console.log(queryURL);


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(queryURL);
        console.log(response);
        console.log(response.officials[5].name);
        console.log(response.officials[5].party);
        console.log(response.officials[5].photoUrl);
        presidentDiv = $("<div></div>");
        nameP = $("<p></p>");
        nameP.text(response.officials[5].name);
        presidentDiv.append(nameP);
    })

})