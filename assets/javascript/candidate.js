
var getArticles = function(searchTerm) {

    //URL to API
    //Requirement: API #1
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

    //API key
    var queryParams = { "api-key": "b9f91d369ff59547cd47b931d8cbc56b:0:74623931" };

    //query parameters
    if (searchTerm === "election")
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

    } else {
        queryParams.q = searchTerm
    }

    //return full URL
    queryURL += $.param(queryParams);

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
            console.log(headline.main);
            $articleListItem.append(
            "<a href='" + article.web_url + "' target='_blank'><strong>" + _.escape(headline.main) + "</strong></a>");
        }

        // Append a byline to document if exists
        var byline = article.byline;
        if (byline && byline.original) {
            $articleListItem.append("<h6>" + _.escape(byline.original) + "</h6>");
        }

        // Append section to document if exists
        var section = article.section_name;
        if (section) {
            $articleListItem.append("<h6>Section: " + _.escape(section) + "</h6>");
        }

        // Append published date to document if exists
        var pubDate = article.pub_date
        console.log(pubDate)
        if (pubDate) {
            pubDate = dateFns.format(pubDate, "YYYY-MM-DD");
            $articleListItem.append("<h6>" + pubDate + "</h6>");
        }

        // Append the article
        $articleList.append($articleListItem);
    }


}


$("#search").on("click", function(event) {
    console.log("search")
    event.preventDefault();

    $("#article-list").empty();

    getArticles("election")

});