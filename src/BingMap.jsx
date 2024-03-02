import React, { useState , useEffect } from "react";
import { ReactBingmaps } from "react-bingmaps";
import './BingMap.css'

function BingMap({coordinates , weatherInfo , ColorValue  }) { 
    const [tempCoordinates , setTempCoordinates] = useState(coordinates);
    const [tempWeatherInfo, setTempWeatherInfo] = useState({
      city : "null",
      feelsLike : 16.35,
      humidity : 59,
      temp : 17.05,
      tempMax : 17.05,
      tempMin : 17.05,
      weather : "smoke",
    });

    const updateTempWeatherInfo = (result) => {
      setTempWeatherInfo(result);
    }

    let getWeatherInfo = async (city) => {
      try {
          let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric`);
          let jsonResponse = await response.json();
          let result = {
              city : city ,
              temp : jsonResponse.main.temp,
              tempMin : jsonResponse.main.temp_min,
              tempMax : jsonResponse.main.temp_max,
              humidity : jsonResponse.main.humidity,
              feelsLike : jsonResponse.main.feels_like,
              weather : jsonResponse.weather[0].description,
          };
          updateTempWeatherInfo(result);
          return result;
      } catch (err){
          throw err;  
      }
    };

    const getPointCity = async (a,b) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${a}&lon=${b}&appid=${import.meta.env.VITE_WEATHER_KEY}`);
        const data = await response.json();
        getWeatherInfo(data[0].name);
      } catch (err){
        console.log(err);
      }
    }

    const updateTempCoordinates = (currCoordinates) => {
      setTempCoordinates(() => {
        return currCoordinates;
      });
    };

    const AddPushPinOnClick = (location) => {
      updateTempCoordinates([location.latitude, location.longitude]);
      getPointCity(location.latitude, location.longitude)
    };

  return (
        <div className="map-one">
          <ReactBingmaps
            bingmapKey={import.meta.env.VITE_MAP_KEY}
            center={coordinates}
            zoom={5}
            mapTypeId = {ColorValue.mapColor} 
            infoboxesWithPushPins = {[
              {
                "location":coordinates, 
                "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
                "infoboxOption": { 
                  title: weatherInfo.city , 
                  description: 
                    `Temperature :${weatherInfo.temp}&deg;C <br/> The Weather can be described as <i>${weatherInfo.weather}</i> and feels like : ${weatherInfo.feelsLike}&deg;C`,
                  },
                  
                "pushPinOption":{ title: '', description: ''},
              },
              {
                "location":tempCoordinates, 
                "addHandler":"click",
                "infoboxOption": {
                  title: tempWeatherInfo.city , 
                  description: 
                    `Temperature :${tempWeatherInfo.temp}&deg;C <br/> The Weather can be described as <i>${tempWeatherInfo.weather}</i> and feels like : ${tempWeatherInfo.feelsLike}&deg;C`,
                  },
                "pushPinOption":{ title: '', description: '', color:"blue"
                },
              },
            ]}
            getLocation = {
              {addHandler: "click", callback: AddPushPinOnClick}
            }
          />
        </div>   
  );
}

export default BingMap;