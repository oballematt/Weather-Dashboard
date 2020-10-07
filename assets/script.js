$(document).ready(function () {

    var cities = []
    var API = "f89acb677bf55f31af77b1cbe2b56df8"
    
    $("#search").on("click", function() {
        
        var city = $("#city-input").val().trim()
        cities.push(city)
        console.log(cities)
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API
        $("div").removeClass("hide")
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var tempF = Math.floor((response.main.temp - 273.15) * 1.80 + 32);
            var iconCode = response.weather[0].icon
            var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
            $("#wicon").attr("src", iconUrl)
            $("#name").text("Todays Weather in " + response.name)
            $("#temp").text("Temperature: " + tempF +  "\xb0F")
            $("#humidity").text("Humidity: " + response.main.humidity + "%")
            $("#wind").text("Wind Speed: " + response.wind.speed + "MPH")
            var lat = (response.coord.lat)
            var long = (response.coord.lon)
            var queryUrl2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + API
            $.ajax({
                url: queryUrl2,
                method: "GET"
            }).then(function (response1) {
                console.log(response1)
                $("#uv").text("UV Index: " + response1.value)
            })
            var queryUrl3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + API
            $.ajax({
                url: queryUrl3,
                method: "GET"
            }).then(function (response2) {
                console.log(response2)
                var date = 0
                for (i = 0; i < response2.list.length; i++) {
                    var futureTemp = Math.floor((response2.list[i].main.temp - 273.15) * 1.80 + 32)
                    if (response2.list[i].dt_txt.split(" ")[1] === "18:00:00") {
                        var day = response2.list[i].dt_txt.split("-")[2].split(" ")[0];
                        var month = response2.list[i].dt_txt.split("-")[1];
                        var year = response2.list[i].dt_txt.split("-")[0];
                        console.log(day, month, year)
                        $("#" + "date" + date).text(month + "/" + day + "/" + year);
                        $("#" + "temp" + date).text("Temperature: " + futureTemp + "\xb0F")
                        $("#" + "humidity" + date).text("Humidity: " + response2.list[i].main.humidity + "%")
                        $("#" + "img" + date).attr("src", "http://openweathermap.org/img/w/" + response2.list[i].weather[0].icon + ".png")
                        date++
                    }
                }

            })
        })
        displayCity()

    })


    function displayCity() {

        for (i = 0; i < cities.length; i++) {
            var btn = $("<button>")
            btn.addClass("showInfo")
            btn.text(cities.splice([i]))
            $("#city").append(btn)
        }
        $(".showInfo").on("click", function(){
            console.log("works")
        })

        
    }



})