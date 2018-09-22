$(document).ready(function() {

    $("#rep-info").hide();

    $(document).on("click", "#submit", function() {

        $(document).ajaxError(function () {
            $("#rep-info").hide();
            $("#errorMessage").append("<p></p>").text("This is not a vaild address or zip code, please try again.");
        })

        $("#rep-info").show();
        var address = $("#addressInput").val();
        address = address.replace(" ", "%20");
        address = address.replace(",", "");
        
        var apiKey = "AIzaSyCMZgdTS5Ln1SHuAC1n9QnpwMADHeKF02k";
        var role = "";

        var headofGovernment = function() {
            role = "headOfGovernment";
            var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + apiKey + "&address=" + address + "&roles=" + role;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                console.log(response);

                if (!response) {
                    $("#errorMessage").append("<p></p>").text("This is not a valid address or zip code, please try again.");
                };

                if (response.officials[1].name === "Vacant") {
                    $("#governor").hide();
                } else if (!response.officials[1].photoUrl) {
                    $("#governorImg").hide();
                    $("#governor").show();
                } else {
                    $("#governorImg").show();
                    $("#governor").show();
                }

                $("#errorMessage").empty();
                $("#presidentName").text(response.officials[0].name);
                $("#presidentImg").attr("src", response.officials[0].photoUrl);
                $("#presidentParty").text(response.officials[0].party);
                $("#presidentLink").attr("href", response.officials[0].urls[0]);
                $("#presidentPhone").text("Phone: " + response.officials[0].phones[0]);
                $("#presidentRole").text(response.offices[0].name);
                $("#governorName").text(response.officials[1].name);
                $("#governorImg").attr("src", response.officials[1].photoUrl);
                $("#governorParty").text(response.officials[1].party);
                $("#governorLink").attr("href", response.officials[1].urls[0]);
                $("#governorPhone").text("Phone: " + response.officials[1].phones[0]);
                $("#governorRole").text(response.offices[1].name);
            });
        };


        var deputyHead = function() {
            role = "deputyHeadOfGovernment";
            var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + apiKey + "&address=" + address + "&roles=" + role;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                console.log(response);


                if (response.officials[1].name === "Vacant") {
                    $("#ltGovernor").hide();
                } else if (!response.officials[1].photoUrl) {
                    $("#ltGovernorImg").hide();
                    $("#ltGovernor").show();
                } else {
                    $("#ltGovernorImg").show();
                    $("#ltGovernor").show();
                }

                $("#viceName").text(response.officials[0].name);
                $("#viceImg").attr("src", response.officials[0].photoUrl);
                $("#viceParty").text(response.officials[0].party);
                $("#viceLink").attr("href", response.officials[0].urls[0]);
                $("#vicePhone").text("Phone: " + response.officials[0].phones[0]);
                $("#viceRole").text(response.offices[0].name);
                $("#ltGovernorName").text(response.officials[1].name);
                $("#ltGovernorImg").attr("src", response.officials[1].photoUrl);
                $("#ltGovernorParty").text(response.officials[1].party);
                $("#ltGovernorLink").attr("href", response.officials[1].urls[0]);
                $("#ltGovernorPhone").text("Phone: " + response.officials[1].phones[0]);
                $("#ltGovernorRole").text(response.offices[1].name);
            });
        };


        var senate = function() {
            role = "legislatorUpperBody";
            var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + apiKey + "&address=" + address + "&roles=" + role;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                console.log(response);

                if (!response.officials) {
                    $("#senateDeck").hide();
                } else if (response.officials[0].name === "Vacant") {
                    $("#senator1").hide();
                } else if (!response.officials[0].photoUrl) {
                    $("#senator1Img").hide();
                    $("#senator1").show();
                } else {
                    $("#senator1Img").show();
                    $("#senator1").show();
                }

                if (response.officials[1].name === "Vacant") {
                    $("#senator2").hide();
                } else if (!response.officials[1].photoUrl) {
                    $("#senator2Img").hide();
                    $("#senator2").show();
                } else {
                    $("#senator2Img").show();
                    $("#senator2").show();
                }

                $("#senator1Name").text(response.officials[0].name);
                $("#senator1Img").attr("src", response.officials[0].photoUrl);
                $("#senator1Party").text(response.officials[0].party);
                $("#senator1Link").attr("href", response.officials[0].urls[0]);
                $("#senator1Phone").text("Phone: " + response.officials[0].phones[0]);
                $("#senator1Role").text(response.offices[0].name);
                $("#senator2Name").text(response.officials[1].name);
                $("#senator2Img").attr("src", response.officials[1].photoUrl);
                $("#senator2Party").text(response.officials[1].party);
                $("#senator2Link").attr("href", response.officials[1].urls[0]);
                $("#senator2Phone").text("Phone: " + response.officials[1].phones[0]);
                $("#senator2Role").text(response.offices[0].name);
            });
        };


        var house = function() {
            role = "legislatorLowerBody";
            var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + apiKey + "&address=" + address + "&roles=" + role;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                console.log(response);

                if (!response.officials) {
                    $("#houseRep").hide();
                } else if (response.officials[0].name === "Vacant") {
                    $("#houseRep").hide();
                } else if (!response.officials[0].photoUrl) {
                    $("#houseRepImg").hide();
                    $("#houseRep").show();
                } else {
                    $("#houseRepImg").show();
                    $("#houseRep").show();
                }

                $("#houseRepName").text(response.officials[0].name);
                $("#houseRepImg").attr("src", response.officials[0].photoUrl);
                $("#houseRepParty").text(response.officials[0].party);
                $("#houseRepLink").attr("href", response.officials[0].urls[0]);
                $("#houseRepPhone").text("Phone: " + response.officials[0].phones[0]);
                $("#houseRepRole").text(response.offices[0].name);
            });

        };

        headofGovernment();
        deputyHead();
        senate();
        house();

    });

    
})