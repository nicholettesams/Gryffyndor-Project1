/************************/
/*     Voting           */
/************************/

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCduG32qZuTRqTyefAQnB9AC-d0fIXNg4I",
    authDomain: "gryffyndor-project1.firebaseapp.com",
    databaseURL: "https://gryffyndor-project1.firebaseio.com",
    projectId: "gryffyndor-project1",
    storageBucket: "gryffyndor-project1.appspot.com",
    messagingSenderId: "920489072493"
    };
 
firebase.initializeApp(config);

var database = firebase.database();
var yesCount = 0
var noCount = 0
var unsureCount = 0

$( document ).ready(function() {   

    var displayResults = function(){
    
        //Use Chart.js to make a graphical chart
    
        //set configuration of the chart
        var data = {
            datasets: [{
                data: [
                    yesCount,
                    noCount,
                    unsureCount
                ],
                backgroundColor: [
                    "green", 
                    "red", 
                    "yellow"
                ]
            }],
            labels: ["Yes", "No", "Unsure"]
        };
    
        var options = {
            responsive: true,
            title: {
                display: true,
                text: "Poll Results"
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    
        //doughnut chart
        var ctx = $("#myChart");
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });
    }
    
    $("#vote").on("click", function(event) {
        event.preventDefault();
    
        //increase count depending on which radio button is selected
        if ($("#optYes").is(":checked")){
            yesCount++
        } else if ($("#optNo").is(":checked")){
            noCount++
        } else if ($("#optUnsure").is(":checked")){
            unsureCount++
        } else {
            console.log("no selection")
        }
    
        //update database
        database.ref().set({
            yesCount: yesCount,
            noCount: noCount,
            unsureCount: unsureCount
        });
    
    });
    
    
    database.ref().on("value", function(snapshot) {
    
        var sv = snapshot.val()
    
        //set local counts with counts from database
        yesCount = sv.yesCount
        noCount = sv.noCount
        unsureCount = sv.unsureCount
    
        //display to HTML
        displayResults()
    
    }, function(err){
        console.log("Database read error: " + err.code)
    });
});