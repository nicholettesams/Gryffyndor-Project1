/************************/
/*  Ariticle Search     */
/************************/
var getArticles = function(searchTerm) {

    //URL to API
    //Requirement: API #1
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

    //API key
    var queryParams = { "api-key": "b9f91d369ff59547cd47b931d8cbc56b:0:74623931" };

    //query parameters
    if (searchTerm === "election")  //called from index page
    {
        queryParams.q = "Ohio+Governor+Election+2018"
        
        //sorting: default is sort by relevance
        if ($("#sort-input").val() === "newest"){
            queryParams.sort = "newest"
        } else if ($("#sort-input").val() === "oldest") {
            queryParams.sort = "oldest"
        }

        //dates
        var beginDate = $("#begin-input").val()
        if (beginDate){
            queryParams.begin_date = dateFns.format(beginDate, "YYYYMMDD")
        }
        var endDate = $("#end-input").val()
        if (endDate){
            queryParams.end_date = dateFns.format(endDate, "YYYYMMDD")
        }

    } else { //called from candidate pages
        queryParams.q = searchTerm
    }

    //return full URL
    queryURL += $.param(queryParams);

    //ajax request and then call updatePage function
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(updatePage);
}

/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} NYTData - object containing NYT API data
 */

var updatePage = function(NYTData) {

    //Loop through articles and display on page
    //Requirement: Repeating element
    for (var i = 0; i < 10; i++) {
        var article = NYTData.response.docs[i];

        // Create the  list group to contain the articles and add the article content for each
        var $articleList = $("<ul>");
        $articleList.addClass("list-group");

        // Add the newly created element to the DOM
        $("#article-list").append($articleList);

        // If the article has a headline, log and append to $articleList
        var headline = article.headline;
        var $articleListItem = $("<li class='list-group-item articleHeadline'>");
        if (headline && headline.main) {
            $articleListItem.append(
            "<a href='" + article.web_url + "' target='_blank'><strong>" + headline.main + "</strong></a>");
        }

        // Append a byline to document if exists
        var byline = article.byline;
        if (byline && byline.original) {
            $articleListItem.append("<h6>" + byline.original + "</h6>");
        }

        // Append section to document if exists
        var section = article.section_name;
        if (section) {
            $articleListItem.append("<h6>Section: " + section + "</h6>");
        }

        // Append published date to document if exists
        var pubDate = article.pub_date
        if (pubDate) {
            pubDate = dateFns.format(pubDate, "YYYY-MM-DD");
            $articleListItem.append("<h6>" + pubDate + "</h6>");
        }

        // Append the article
        $articleList.append($articleListItem);
    }

}

$("#search").on("click", function(event) {

    event.preventDefault();

    //When user clicks search, reload the articles 
    $("#article-list").empty();
    
    getArticles("election")

});

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