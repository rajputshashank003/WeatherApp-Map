import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SearchBox({coordinates,city, updateLocation,updateCoordinates,updateWeatherInfo, ColorValue}) {

  const handleLocationChange = (event) => {
    updateLocation(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://dev.virtualearth.net/REST/v1/Locations/${encodeURIComponent(city)}?key=${import.meta.env.VITE_MAP_KEY}`);
      const data = await response.json();
      if (data && data.resourceSets && data.resourceSets.length > 0 && data.resourceSets[0].resources && data.resourceSets[0].resources.length > 0) {
        const tempCoordinates = data.resourceSets[0].resources[0].point.coordinates;
        updateCoordinates(tempCoordinates);
        console.log("hi" , city);
        getWeatherInfo({city});
        showSuccess("Successfully fetched data!");
      } else {
        showError('Location not found');
      }
    } catch (error) {
      showError("Error fetching coordinates!"); 
      console.error('Error fetching coordinates:', error);
    }
  };

  let getWeatherInfo = async ({city}) => {
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
        updateWeatherInfo(result);        
        return result;
    } catch (err){
        throw err;  
    }
  };
  
  const showError = (msg) => {
    toast.error(msg);
  };
  const showSuccess = (msg) => {
      toast.success(msg);
  };

  return (
    <div style={{display: "flex" , justifyContent:"center"}}>
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 , backgroundColor:ColorValue.bgColor}}
        >
            <IconButton sx={{ p: '10px', color:ColorValue.fColor }} aria-label="menu">
            <MenuIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 , color:ColorValue.fColor}}
                placeholder="Search for Weather"
                value={city} 
                onChange={handleLocationChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                      e.preventDefault(); // Prevent form submission
                      handleSearch(); // Call handleSearch function
                  }
                }} 
            />
            <ToastContainer toastStyle={{ backgroundColor: ColorValue.fColor === "white" ? "#99ff99" : "#14141f" }}  />
            <Divider sx={{ height: 28, m: 0.5 , backgroundColor:ColorValue.fColor }} orientation="vertical" />
            <IconButton type="button" sx={{ p: '10px' , color:ColorValue.fColor}} onClick={handleSearch} aria-label="search">
                <SearchIcon />
            </IconButton>      
        </Paper>
        <br></br>
    </div>        
  );
}