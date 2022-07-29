
let searchfield = $("#search-target");
let searchButton = $("#searchBtn-target")
let clearButton = $("#clearBtn-target")
let cityTarget = $("#city-target")
let weatherTarget = $("#weather-target")
let typeTarget = $("#type-target")
let pokeParade = $("#pokeParade")
let catch1 = $("#catch-0")
let catch2 = $("#catch-1")
let catch3 = $("#catch-2")
let catch4 = $("#catch-3")
let release1 = $("#release-0")
let release2 = $("#release-1")
let release3 = $("#release-2")
let release4 = $("#release-3")
let release5 = $("#release-4")
let release6 = $("#release-5")
let modalClose =$(".delete")
let globalType = ""
let pokeSavable = []
let pokePersist = []
const pokemon = {
    types: [
        "normal",
        "fire",
        "water",
        "grass",
        "electric",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dark",
        "dragon",
        "steel",
        "fariy"
    ]
}
let searchElements = {
    element: "7f131d38f4522306e0a68bfbf8394fcd"
}

function closeModal(){
    let modal = $("#modal")
    modal.removeClass("is-active")
}

function openModal(header,text){

    // console.log(header,text)
    let modal = $("#modal")
    let modalContent = $(".message-body")
    let modalHeader = $("#headerText")
    modalHeader.html(header) 
    modalContent.html(text) 
    modal.addClass("is-active")

}

function removePoke(release){
    if (pokePersist.length <= 0) {
        openModal("Wait a Minute!","you don't have any pokemon!")
    }
    else {
        // pokePersist.push(pokeSavable[pokemon])

        // localStorage.setItem("pokeBank",JSON.stringify(pokePersist))
        // console.log(pokePersist)
        // populateBank()
        let hand1 = pokePersist[pokePersist.length - 1]
        
        let hand2 = pokePersist[release]
        pokePersist[pokePersist.length - 1] = hand2
        pokePersist[release] = hand1
        pokePersist.pop()
        persistData("",true)
        location.reload()
        
    //     let i = 0


    // while(pokePersist[i] !=""){
    //     let shifty = pokePersist.shift()
    //     pokePersist.push(shifty)
    //     i++

    // }
    }
    
}

function populateBank() {
    
    for (let i = 0; i < pokePersist.length; i++) {
        //     
        if(pokePersist[i]){
        let buttonMod = $("#release-"+i)
        buttonMod.removeClass("is-hidden")
        let pokeBankNameEl = $("#pokeBankName-" + i)
        let pokeBankSpriteEl = $("#pokeBankImage-" + i)
        let pokeBankType = $("#pokeBank-type-target" + i)
        let imgURL = pokePersist[i].sprite
        let formattedName = pokePersist[i].name.replace("-", " ")
        let imgShinyURL = pokePersist[i].spriteShiny
        let imgFemaleURL = pokePersist[i].spriteFemale
        let imgFemaleShinyURL = pokePersist[i].spriteFemaleShiny
        let fullType
        let type1 = pokePersist[i].types[0].type.name
        if (pokePersist[i].types.length == 2) {
            let type2 = pokePersist[i].types[1].type.name
            fullType = type1 + " / " + type2
        } else {
            fullType = type1
        }




        pokeBankNameEl.html(formattedName)
        if(pokePersist[i].isShiny){
            let swap = pokeBankNameEl.html()
            pokeBankNameEl.html(swap + "✨")
        }
        if(pokePersist[i].isFemale){
            let swap = pokeBankNameEl.html()
            pokeBankNameEl.html(swap + "♀")
        }
        else{
            let swap = pokeBankNameEl.html()
            pokeBankNameEl.html(swap + "♂")
        }
        pokeBankSpriteEl.html(" ")
        let imgComponent = $("<img>")
        imgComponent.attr("id", "img" + i)
        imgComponent.addClass("is-128x128")

        if (pokePersist[i].isFemale) {
            if (pokePersist[i].isShiny) {
                imgComponent.attr("src", imgFemaleShinyURL)
            }
            else {
                imgComponent.attr("src", imgFemaleURL)
            }
        }
        else if (pokePersist[i].isShiny) {
            imgComponent.attr("src", imgShinyURL)
        }
        else {
            imgComponent.attr("src", imgURL)
        }
        pokeBankSpriteEl.append(imgComponent)

        pokeBankType.html(fullType)
        }

    } 
}

function loaddata() {
    pokePersist = JSON.parse(localStorage.getItem("pokeBank"))

    if (!pokePersist) {
        pokePersist = []
    }
    else {
        console.log(pokePersist)
        populateBank()
    }

}

function persistData(pokemon,run) {
    if(!run){
        if (pokePersist.length >= 6) {
            openModal("Woah there!","You already have 6 Pokemon!")
        }
        else {
            pokePersist.push(pokeSavable[pokemon])
    
            localStorage.setItem("pokeBank",JSON.stringify(pokePersist))
            console.log(pokePersist)
            openModal("Gotcha!","Pokemon Caught!")
            populateBank()
        }
    }
    else{
        localStorage.setItem("pokeBank",JSON.stringify(pokePersist))
            console.log(pokePersist)
            populateBank()
    }



}

function displayData(weatherData, pokeData) {
    // console.log(weatherData)
    pokeSavable = pokeData
    console.log(pokeData)
    cityTarget.html(weatherData.city)
    weatherTarget.html(weatherData.status)
    typeTarget.html(globalType)
    pokeParade.removeClass("is-invisible")

    for (let i = 0; i < 4; i++) {
        //     
        let pokeNameEl = $("#pokeName-" + i)
        let pokeSpriteEl = $("#pokeImage-" + i)
        let pokeType = $("#poke-type-target" + i)
        let imgURL = pokeData[i].sprite
        let formattedName = pokeData[i].name.replace("-", " ")
        let imgShinyURL = pokeData[i].spriteShiny
        let imgFemaleURL = pokeData[i].spriteFemale
        let imgFemaleShinyURL = pokeData[i].spriteFemaleShiny
        let fullType
        let type1 = pokeData[i].types[0].type.name
        if (pokeData[i].types.length == 2) {
            let type2 = pokeData[i].types[1].type.name
            fullType = type1 + " / " + type2
        } else {
            fullType = type1
        }





        pokeNameEl.html(formattedName)
        if(pokeData[i].isShiny){
            let swap = pokeNameEl.html()
            pokeNameEl.html(swap + "✨")
        }
        if(pokeData[i].isFemale){
            let swap = pokeNameEl.html()
            pokeNameEl.html(swap + "♀")
        }
        else{
            let swap = pokeNameEl.html()
            pokeNameEl.html(swap + "♂")
        }
        pokeSpriteEl.html(" ")
        let imgComponent = $("<img>")
        imgComponent.attr("id", "img" + i)
        imgComponent.addClass("is-128x128")

        if (pokeData[i].isFemale) {
            if (pokeData[i].isShiny) {
                imgComponent.attr("src", imgFemaleShinyURL)
            }
            else {
                imgComponent.attr("src", imgFemaleURL)
            }
        }
        else if (pokeData[i].isShiny) {
            imgComponent.attr("src", imgShinyURL)
        }
        else {
            imgComponent.attr("src", imgURL)
        }
        pokeSpriteEl.append(imgComponent)

        pokeType.html(fullType)

    } 

}

//trasnslate weather conditions to pokemon types
function pokeTypeTranslate(weatherObj) {

    let status = weatherObj.status
    let temp = weatherObj.CurrentTemp
    let windSp = weatherObj.CurrentWind
    let uvi = weatherObj.UVI
    let humidity = weatherObj.CurrentHum
    let pokeType;

    //determine type based on weather status

    switch (status) {
        case 'Thunderstorm':
            pokeType = pokemon.types[4]
            break;
        case 'Drizzle':
            pokeType = pokemon.types[3]
            break;
        case 'Rain':
            pokeType = pokemon.types[2]
            break;
        case 'Snow':
            pokeType = pokemon.types[5]
            break;
        case 'Clear':
            pokeType = pokemon.types[0]
            break
        case 'Clouds':
            pokeType = pokemon.types[9]
            break;
        case 'Smoke':
            pokeType = pokemon.types[7]
            break;
        case 'Sand':
            pokeType = pokemon.types[8]
            break;
        case 'Mist':
            pokeType = pokemon.types[17]
            break;
        case 'Dust':
            pokeType = pokemon.types[12]
        case 'fog':
            pokeType = pokemon.types[13]
            break;
        case 'Squall':
            pokeType = pokemon.types[6]
            break;
        case 'Tornado':
            pokeType = pokemon.types[16]
            break;
        case 'Ash':
            pokeType = pokemon.types[1]
            break;
        default:
            pokeType = pokemon.types[0]
    }

    //overrides

    if (uvi = 0) {
        pokeType = pokemon.types[14]
    }
    else if (uvi > 10) {
        pokeType = pokemon.types[1]
    }

    if (windSp > 6 && uvi > 6) {
        pokeType == pokemon.types[15]
    }

    if (temp > 32 && humidity > 40) {
        pokeType = pokemon.types[11]
    }

    if (windSp < 1 && uvi < 4) {
        pokeType = pokemon.types[10]
    }

    return pokeType

}

function ApiConnect(searchArg) {
    // 
    searchButton.addClass('is-loading')
    //function declarations for API Calls

    async function pokeConnect(pokeArr, weatherObj) {
        for (let i = 0; i < 4; i++) {
            let pokeURL = pokeArr[i].url
            await fetch(pokeURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    pokeArr[i].sprite = data.sprites.front_default
                    pokeArr[i].spriteShiny = data.sprites.front_shiny
                    //female
                    pokeArr[i].spriteFemale = data.sprites.front_female
                    pokeArr[i].spriteFemaleShiny = data.sprites.front_shiny_female
                    pokeArr[i].types = data.types
                    let shinyStat = Math.floor(Math.random() * 9);
                    let femaleStat = Math.floor(Math.random() * 2);

                    if (shinyStat == 5) {
                        if (data.sprites.front_shiny) {
                            pokeArr[i].isShiny = true
                        }
                    }
                    else {
                        pokeArr[i].isShiny = false
                    }

                    if (femaleStat == 1) {
                        if (data.sprites.front_shiny_female) {
                            pokeArr[i].isFemale = true
                        }
                    }
                    else {
                        pokeArr[i].isFemale = false
                    }

                    if (i == 3) {
                        // 
                        console.log("lets see", pokeArr)
                        searchButton.removeClass('is-loading')
                        displayData(weatherObj, pokeArr)
                    }

                })
        }

    }

    function typeConnect(type, weatherObj) {

        let typeURL = "https://pokeapi.co/api/v2/type/" + type
        fetch(typeURL)
            .then(function (response) {
                if (response.ok) {
                    // 
                    response.json().then(function (data) {
                        // list
                        let pokeObj = {}
                        let pokeArr = []
                        let maxLength = data.pokemon.length - 1
                        for (let i = 0; i < 4; i++) {
                            let pokemonIndex = []
                            pokemonIndex[i] = Math.floor(Math.random() * maxLength);
                            pokeObj = data.pokemon[pokemonIndex[i]].pokemon
                            pokeObj.slot = data.pokemon[pokemonIndex[i]].slot
                            globalType = type
                            let finalObj = pokeObj

                            console.log("first", pokeObj)
                            pokeArr.push(finalObj)

                        }


                        return pokeConnect(pokeArr, weatherObj)

                    })
                }
                else {
                    openModal("Uh-Oh","Error with Pokemon Fetch")
                    searchButton.removeClass('is-loading')
                }
            })
            .catch(function (error) {
                openModal("Uh-Oh","Unable to pokemon data / connection failed")
                searchButton.removeClass('is-loading')
            })
    }

    function UVConnect(weatherObj) {
        lat = weatherObj.lat
        lon = weatherObj.lon
        let WeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=metric&appid=" + searchElements.element
        fetch(WeatherURL)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        // console.log(data.current)
                        weatherObj.UVI = data.current.uvi
                        weatherObj.daily = data.daily
                        weatherObj.statusDesc = data.current.weather[0].description



                        for (let i = 1; i < data.daily.length; i++) {
                            weatherObj.daily[0] = ""
                            weatherObj.daily[i].date = moment.unix(data.daily[i].dt).format("MM/DD/YYYY")
                            weatherObj.daily[i].temp = data.daily[i].temp.day
                            weatherObj.daily[i].wind = data.daily[i].wind_speed
                            weatherObj.daily[i].humidity = data.daily[i].humidity
                            weatherObj.daily[i].iconCode = data.daily[i].weather[0].icon
                            weatherObj.daily[i].status = data.daily[i].weather[0].main
                            weatherObj.daily[i].iconURL = "<img src='https://openweathermap.org/img/wn/" + weatherObj.daily[i].iconCode + ".png'> (" + weatherObj.daily[i].status + ")"

                        }

                        let type = pokeTypeTranslate(weatherObj)
                        return typeConnect(type, weatherObj)


                    })
                }
                else {
                    openModal("Uh-Oh","Unable to find that city")
                    searchButton.removeClass('is-loading')
                }
            })
            .catch(function (error) {
                openModal("Uh-Oh","Unable to fetch weather data / connection failed")
                searchButton.removeClass('is-loading')
            })
    }

    function weatherConnect() {
        let latLongURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchArg + "&units=metric&appid=" + searchElements.element
        fetch(latLongURL)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        // console.log(data)
                        let dataToUse = {}
                        dataToUse.lat = data.coord.lat
                        dataToUse.lon = data.coord.lon
                        dataToUse.city = data.name
                        dataToUse.CurrentTemp = data.main.temp
                        dataToUse.CurrentWind = data.wind.speed
                        dataToUse.CurrentHum = data.main.humidity
                        dataToUse.Date = moment.unix(data.dt).format("MM/DD/YYYY")
                        dataToUse.iconCode = data.weather[0].icon
                        dataToUse.status = data.weather[0].main
                        dataToUse.iconURL = "<img src='https://openweathermap.org/img/wn/" + dataToUse.iconCode + ".png'> (" + dataToUse.status + ")"
                        dataToUse.spanHTML = "<span class= 'tag is-large is-info mb-3' id='icon-target'>" + dataToUse.iconURL + "</span>"
                        return UVConnect(dataToUse)
                        // return dataToUse

                        //add hisotry logic for later
                    })
                }
                else {
                    openModal("Uh-Oh","Unable to find that city")
                    searchButton.removeClass('is-loading')
                }
            })
            .catch(function (error) {
                openModal("Uh-Oh","Unable to fetch weather data / connection failed")
                searchButton.removeClass('is-loading')
            })
    }
    // let weatherConnect = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&appid=" + searchElements.element

    weatherConnect();
}

searchButton.on("click", function () {
    searchterms = searchfield.val()
    ApiConnect(searchterms)

})

clearButton.on("click", function () {
 searchfield.val("")


})
//I dont know why bubbling wasnt working :(
catch1.on("click", function () {
    persistData(0)
    
})
catch2.on("click", function (event, target) {
    persistData(1)
    
})
catch3.on("click", function (event, target) {
    persistData(2)
    
})
catch4.on("click", function (event, target) {
    persistData(3)
    
})

release1.on("click", function () {
    removePoke(0)
})
release2.on("click", function (event, target) {
    removePoke(1)
})
release3.on("click", function (event, target) {
    removePoke(2)
})
release4.on("click", function (event, target) {
    removePoke(3)
})
release5.on("click", function (event, target) {
    removePoke(4)
})
release6.on("click", function (event, target) {
    removePoke(5)
})

modalClose.on("click", function (event, target) {
    closeModal()
})

loaddata()