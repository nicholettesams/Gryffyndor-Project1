$(document).on("click", "#submit", function() {

    var address = $("#addressInput").val();
    address = address.replace(" ", "%20");
    address = address.replace(",", "");
    var roleHOG = "headOfGovernment";
    var apiKey = "AIzaSyCMZgdTS5Ln1SHuAC1n9QnpwMADHeKF02k";
    var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + apiKey + "&address=" + address + "&roles=" + roleHOG;
    console.log(queryURL);


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(queryURL);
        console.log(response);
        //console.log(response.officials[5].name);
        //console.log(response.officials[5].party);
        //console.log(response.officials[5].photoUrl);
        presidentDiv = $("#rep-info");
        nameP = $("<p></p>");
        nameP.text(response.officials[5].name);
        presidentDiv.append(nameP);
    })

});