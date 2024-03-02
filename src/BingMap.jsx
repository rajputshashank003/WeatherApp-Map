import React, { useState } from "react";
import { ReactBingmaps } from "react-bingmaps";
import './BingMap.css'

function BingMap({coordinates , weatherInfo , ColorValue }) { 
    const handlePushpinMouseover = (e) => {
        console.log("Pushpin mouseover:", e);
    };
    
    const pushPins = [{
        "location": coordinates,
        "option": { color: 'red' },
        "addHandler": {
          "type": "mouseover",
          "callback": handlePushpinMouseover,
        },        
    }];

    const AddPushPinOnClick = (location) => {
      console.log(location);
    }
  return (
        <div className="map-one">
          <ReactBingmaps
            bingmapKey={import.meta.env.VITE_MAP_KEY}
            center={coordinates}
            zoom={10}
            pushPins={pushPins}
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
                "pushPinOption":{ title: '', description: '' },
              },
            ]
            }
            getLocation = {
              {addHandler: "click",}
            }
          />
        </div>   
  );
}

export default BingMap;