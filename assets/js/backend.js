
let searchfield = $("#search-target");
let searchButton = $("#searchBtn-target")
let clearButton = $("#clearBtn-target")
let cityTarget = $("#city-target")
let weatherTarget = $("#weather-target")
let typeTarget = $("#type-target")
let pokeParade = $("#pokeParade")
let catch1 =$("#catch-0")
let catch2 =$("#catch-1")
let catch3 =$("#catch-2")
let catch4 =$("#catch-3")
let globalType = ""
let pokeSavable =[]
let pokePersist =[]
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

function populateBank(){

}

function loaddata(){
    pokePersist = JSON.parse(localStorage.getItem("pokeBank"))

    if(!pokePersist){
        pokePersist = []
    }
    else{
        console.log(pokePersist)
        populateBank()
    }

}

function persistData(pokemon){

    if(pokePersist.length==6){
        alert("you already have 6 pokemon!")
    }
    else{
        pokePersist.push(pokeSavable[pokemon])

    
        console.log(pokePersist)
    }

    

    // localStorage.setItem("pokeBank",JSON.stringify(pokePersist))
}

function displayData(weatherData,pokeData){
    // console.log(weatherData)
    pokeSavable = pokeData
    console.log(pokeData)
    cityTarget.html(weatherData.city)
    weatherTarget.html(weatherData.status)
    typeTarget.html(globalType)
    pokeParade.removeClass("is-invisible")

    for (let i = 0; i < 4; i++) {
        // debugger    
        let pokeNameEl = $("#pokeName-"+ i)
        let pokeSpriteEl = $("#pokeImage-"+i)
        let pokeType = $("#poke-type-target"+i)
        let imgURL = pokeData[i].sprite
        let formattedName = pokeData[i].name.replace("-"," ")
        let imgShinyURL = pokeData[i].spriteShiny
        let imgFemaleURL = pokeData[i].spriteFemale
        let imgFemaleShinyURL = pokeData[i].spriteFemaleShiny
        let fullType
        let type1 = pokeData[i].types[0].type.name
        if(pokeData[i].types.length == 2){
            let type2 = pokeData[i].types[1].type.name
            fullType = type1 + " / "+ type2
        }else{
            fullType = type1 
        }
         

        

        pokeNameEl.html(formattedName)
        pokeSpriteEl.html(" ")
        let imgComponent = $("<img>")
        imgComponent.attr("id","img"+i)
        imgComponent.addClass("is-128x128")

        if(pokeData[i].isFemale){
            if(pokeData[i].isShiny){
                imgComponent.attr("src",imgFemaleShinyURL)
            }
            else{
                imgComponent.attr("src",imgFemaleURL)
            }
        }
        else if(pokeData[i].isShiny){
            imgComponent.attr("src",imgShinyURL)
        }
        else{
            imgComponent.attr("src",imgURL)
        }
        pokeSpriteEl.append(imgComponent)

        pokeType.html(fullType)

    }1

}

//trasnslate weather conditions to pokemon types
function pokeTypeTranslate(weatherObj){
    
    let status = weatherObj.status
    let temp = weatherObj.CurrentTemp
    let windSp = weatherObj.CurrentWind
    let uvi = weatherObj.UVI
    let humidity = weatherObj.CurrentHum
    let pokeType;

    //determine type based on weather status
   
    switch(status){
    case 'Thunderstorm':
        pokeType = pokemon.types[4]
    break;
    case 'Drizzle':
        pokeType =  pokemon.types[3]
    break;
    case 'Rain':
        pokeType = pokemon.types[2]
    break;
    case 'Snow':
        pokeType =  pokemon.types[5]
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

    if(uvi=0){
        pokeType = pokemon.types[14]
    }
    else if(uvi>10){
        pokeType = pokemon.types[1]
    }
    
    if(windSp>6 && uvi > 6 ){
        pokeType == pokemon.types[15]
    }

     if(temp > 32 && humidity>40)
    {
        pokeType = pokemon.types[11]
    }

    if(windSp <1 && uvi <4 ){
        pokeType =  pokemon.types[10]
    }

    return pokeType
    
}

function ApiConnect(searchArg){
    // debugger
    searchButton.addClass('is-loading')
    //function declarations for API Calls

    function pokeConnect(pokeArr,weatherObj){

        for (let i = 0; i < 4; i++) {
            let pokeURL = pokeArr[i].url
            fetch(pokeURL)
            .then(function(response){
                response.json().then(function(data){
                    pokeArr[i].sprite = data.sprites.front_default
                    pokeArr[i].spriteShiny = data.sprites.front_shiny
                    //female
                    pokeArr[i].spriteFemale = data.sprites.front_female
                    pokeArr[i].spriteFemaleShiny = data.sprites.front_shiny_female
                    pokeArr[i].types = data.types
                    let shinyStat = Math.floor(Math.random() * 9 );
                    let femaleStat = Math.floor(Math.random() * 2 );

                    if(shinyStat == 5){
                        if(data.sprites.front_shiny){
                            pokeArr[i].isShiny = true
                        }
                    }
                    else{
                        pokeArr[i].isShiny = false
                    }

                    if(femaleStat == 1 ){
                        if(data.sprites.front_shiny_female){
                        pokeArr[i].isFemale = true
                        }
                    }
                    else{
                        pokeArr[i].isFemale = false
                    }

                    if(i==3){
                        // debugger
                        console.log("lets see",pokeArr)
                        searchButton.removeClass('is-loading')
                        displayData(weatherObj,pokeArr)
                    }

                })
            })
        }


        
    }

    function typeConnect(type,weatherObj){

        let typeURL = "https://pokeapi.co/api/v2/type/" + type
        fetch(typeURL)
        .then(function(response){
            if(response.ok){
                // debugger
                response.json().then(function(data){
                    // list
                    let pokeObj ={}
                    let pokeArr = []
                    let maxLength = data.pokemon.length - 1
                    for (let i = 0; i < 4; i++) {
                        let pokemonIndex = [] 
                        pokemonIndex[i] = Math.floor(Math.random() * maxLength);
                        pokeObj = data.pokemon[pokemonIndex[i]].pokemon
                        pokeObj.slot = data.pokemon[pokemonIndex[i]].slot
                        globalType = type
                        let finalObj = pokeObj
                        
                        console.log("first",pokeObj)
                        pokeArr.push(finalObj)
                        
                    }


                    return pokeConnect(pokeArr,weatherObj)

                })
            }
            else{
                alert("Error with Pokemon Fetch")
                searchButton.removeClass('is-loading')
            }
        })
        .catch(function(error){
            alert("Unable to pokemon data / connection failed")
            searchButton.removeClass('is-loading')
        })
    }

    function UVConnect(weatherObj){
        lat = weatherObj.lat
        lon = weatherObj.lon
        let WeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&exclude=minutely,hourly&units=metric&appid=" + searchElements.element
        fetch(WeatherURL)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
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
                        weatherObj.daily[i].iconURL = "<img src='https://openweathermap.org/img/wn/"+ weatherObj.daily[i].iconCode + ".png'> ("+weatherObj.daily[i].status+")"
                    
                      }

                    let type = pokeTypeTranslate(weatherObj)
                    return typeConnect(type,weatherObj)
                    

                })
            }
            else{
                alert("Unable to find that city")
                searchButton.removeClass('is-loading')
            }
        })
        .catch(function(error){
            alert("Unable to fetch weather data / connection failed")
            searchButton.removeClass('is-loading')
        })
    }

    function weatherConnect(){
        let latLongURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchArg + "&units=metric&appid="+ searchElements.element
    fetch(latLongURL)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
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
                     dataToUse.iconURL = "<img src='https://openweathermap.org/img/wn/"+ dataToUse.iconCode + ".png'> ("+dataToUse.status+")"
                     dataToUse.spanHTML = "<span class= 'tag is-large is-info mb-3' id='icon-target'>"+dataToUse.iconURL+"</span>"
                    return UVConnect(dataToUse)
                    // return dataToUse
                    
                    //add hisotry logic for later
                })
            }
            else{
                alert("Unable to find that city")
                searchButton.removeClass('is-loading')
            }
        })
        .catch(function(error){
            alert("Unable to fetch weather data / connection failed")
            searchButton.removeClass('is-loading')
        })
    }
    // let weatherConnect = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&appid=" + searchElements.element

    weatherConnect();
}






searchButton.on("click",function(){
    searchterms = searchfield.val()
    ApiConnect(searchterms)

})

catch1.on("click",function(){
    persistData(0)
})
catch2.on("click",function(event,target){
    persistData(1)
})
catch3.on("click",function(event,target){
    persistData(2)
})
catch4.on("click",function(event,target){
    persistData(3)
})

loaddata()