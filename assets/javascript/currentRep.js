$(document).ready(function() {

    var address = "&address=30008%20Shadow%20Creek%20Dr%20Westlake%20OH%2044145";
    var apiKey = "AIzaSyCMZgdTS5Ln1SHuAC1n9QnpwMADHeKF02k";
    var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + apiKey + address
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(queryURL);
        console.log(response);
    })

})