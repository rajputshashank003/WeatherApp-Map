import {React, useState, useEffect} from "react";
import BingMap from "./BingMap.jsx"; // Correct import path and filename
import SearchBox  from "./SearchBox.jsx";
import InfoBox from "./InfoBox.jsx";
import SideMenu from "./SideMenu.jsx";

import "./Home.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [MenuState, setMenuState] = useState(false);
  const [ColorValue , setColorValue] = useState({bgColor:"#242424", fColor:"white", mapColor:"aerial"});   
  const [city, setLocation] = useState('delhi');
  const [coordinates, setCoordinates] = useState([28.64339066, 77.11547852]);
  const [weatherInfo , setWeatherInfo] = useState({
    city : "Delhi",
    feelsLike : 16.35,
    humidity : 59,
    temp : 17.05,
    tempMax : 17.05,
    tempMin : 17.05,
    weather : "smoke",
  });

  let updateMenuState = (newOpen) => {
    setMenuState ( () => {
      return newOpen;
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

  
  return (
    <div style={{backgroundColor: ColorValue.bgColor}}>      
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