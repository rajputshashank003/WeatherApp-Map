import {React, useState, useEffect} from "react";
import BingMap from "./BingMap.jsx"; 
import SearchBox  from "./SearchBox.jsx";
import InfoBox from "./InfoBox.jsx";
import "./Home.css";

function Home() {
  const [MenuState, setMenuState] = useState(false);
  const [ColorValue , setColorValue] = useState({bgColor:"#242424", fColor:"white", mapColor:"aerial"});   
  const [city, setLocation] = useState('Delhi');
  const [coordinates, setCoordinates] = useState([28.64339066, 77.11547852]);
  const [weatherInfo , setWeatherInfo] = useState({
    city : "Delhi",
    feelsLike : 0.00,
    humidity : 0,
    temp : 0.00,
    tempMax : 0.00,
    tempMin : 0.00,
    weather : "null",
  });

  let updateMenuState = (newMenuState) => {
    setMenuState ( () => {
      return newMenuState;
    });
  }

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  }
  let updateLocation = (newLocation) => {
    setLocation(newLocation);
  }
  let updateCoordinates = (newC) => {
    setCoordinates(newC);
  }
  let updateBgColor = () => {
    setColorValue( (lst) => {
        if(lst.bgColor === "white"){
            return {bgColor: "#242424", fColor:"white", mapColor:"aerial"};
        } else {
            return {bgColor: "white", fColor:"Black", mapColor:"road"};
        }
    });
  }

  // useEffect(() => {}, [coordinates]); 
  // useEffect(() => {}, [city]); 
  // useEffect(() =>{}, [weatherInfo]);
  useEffect( () => {
    async function getWeatherInfo (city) {
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
          updateInfo(result);  
      } catch (err){
          throw err;  
      }
    };
    getWeatherInfo(city);
  }, []);
  
  return (
    <div className="Home" style={{backgroundColor: ColorValue.bgColor}}>      
      <SearchBox 
        coordinates={coordinates} 
        city={city} 
        updateLocation={updateLocation} 
        updateCoordinates={updateCoordinates}
        updateWeatherInfo={updateInfo}
        ColorValue={ColorValue}
        updateBgColor={updateBgColor}
        MenuState={MenuState}
        updateMenuState={updateMenuState}
      />
      <br/><br/>
      <div style={{
        height :"100%",
        display:"flex", 
        justifyContent:"center" , 
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap" ,
      }}>
        <InfoBox weatherInfo={weatherInfo} ColorValue={ColorValue}/>
        <BingMap 
            coordinates={coordinates}  
            weatherInfo={weatherInfo} 
            ColorValue={ColorValue}
            updateCoordinates={updateCoordinates}
        />
      </div>
    </div>
  )
}

export default Home;