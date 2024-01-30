let weather_api = {
    openWeather_api: '6130cd2c5f989c8182bed663e1661b23',
    favoritesCities: [],
    getCurrentWeather: async function () {
        let city = document.getElementById('js-search').value;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.openWeather_api}&units=metric`;

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        try {
            const result = await fetch(url, requestOptions)
                .then(response => response.text())
            let resultJson = JSON.parse(result);
            this.displayWeather(resultJson);
        } catch (error) {
            console.log("error: ", error);
        }
    },
    getCurrentWeatherClicked: async function (city) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.openWeather_api}&units=metric`;

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        try {
            const result = await fetch(url, requestOptions)
                .then(response => response.text())
            let resultJson = JSON.parse(result);
            this.displayWeather(resultJson);
        } catch (error) {
            console.log("error: ", error);
        }
        console.log("click");
    },
    displayWeather: function (cityData) {
        let resultPanel = document.querySelector('.weather-result');
        let weatherStatus = `<h2>Weather in ${cityData.name}</h2>
        <h2>Temperature: ${cityData.main.temp}°C</h2>
        <h2>Weather: ${cityData.weather["0"]["description"]}</h2>`

        let favButton = document.createElement("button");
        favButton.innerText = "Add to Favorites";
        favButton.addEventListener("click", () => this.addToFavorites(cityData.name));

        resultPanel.innerHTML = weatherStatus;
        resultPanel.appendChild(favButton);
    },
    addToFavorites: function (cityName) {
        if (!this.favoritesCities.includes(cityName)) {
            this.favoritesCities.push(cityName);
            this.updateFavList();
            localStorage.setItem("favList", JSON.stringify(this.favoritesCities));
        }

    },
    updateFavList: function () {
        const list = document.querySelector(".right-side");
        list.innerHTML ="<h2>Favorite Cities</h2>";
        this.favoritesCities.forEach(x => {
            const buttonDiv = document.createElement("div");
            const listItem  = document.createElement("button");
            const deleteItem = document.createElement("button")
            buttonDiv.classList.add("buttonsDiv")
            listItem.classList.add("favButton");
            deleteItem.classList.add("deleteButton")
            listItem.innerText = x;
            deleteItem.innerText = "x"
            listItem.addEventListener("click", () => weather_api.getCurrentWeatherClicked(x))
            deleteItem.addEventListener("click", () => weather_api.deleteFavItem(deleteItem,x))
            buttonDiv.appendChild(listItem)
            buttonDiv.appendChild(deleteItem)
            list.appendChild(buttonDiv);
        })
    },
    deleteFavItem : function (deleteButton,cityName) {
        deleteButton.parentElement.remove();
        let index = this.favoritesCities.indexOf(cityName)
        this.favoritesCities.splice(index,1);
    }
}

document.addEventListener("DOMContentLoaded",  function () {
    weather_api.favoritesCities = JSON.parse(localStorage.getItem('favCity')) || [];
    weather_api.updateFavList()

})