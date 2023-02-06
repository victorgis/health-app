import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
// import {StrictMode} from 'react';

import {Map, Overlay, View} from "ol";
import { fromLonLat } from 'ol/proj';
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "./Openlayers.css"
import GeoJSON from 'ol/format/GeoJSON';
import {x} from "../data/poi"
import {toLonLat} from 'ol/proj';
import Popup from "./Popup";


//adding layers
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

const OpenLayersMap = () => { 
    // const mapRef = useRef();
    // const popupRef = useRef();
    


    const [isGoingOut] = useState(x)

    const pollayer = new VectorLayer({
        source: new VectorSource({
          features: (new GeoJSON({
          featureProjection: 'EPSG:3857',
          dataProjection: 'EPSG:4326'})).readFeatures(isGoingOut)
      }),
      //   style: styleFunction
    });
    const mapContainerRef = useRef(null);

    useEffect(() => {
        
        const overlay = new Overlay({
            positioning: 'bottom-center',
            element: createRoot(document.getElementsByClassName("ol-overlay-container ol-selectable"))

        });
        
        
        const map = new Map({
            target: mapContainerRef.current,
            layers: [
                new TileLayer({
                source: new OSM(),
                }),
                pollayer,
            ],
            overlays: [overlay],
            view: new View({
                center: fromLonLat([9.0820, 8.6753]),
                zoom: 6.3,
                // projection: 'EPSG:4326'
            }),       
        });


        map.addOverlay(overlay);

        // this.map.addOverlay(overlay)
        

        map.on('click', (event)=>{
            const coordinate = event.coordinate;
            const longLat = toLonLat(coordinate);
            const text = 'Hello OpenLayers nowww';
            // const long = longLat[0]
            // const lat = longLat[1]

            
            overlay.setPosition(coordinate);
            // overlay.element.innerHTML = `gje`;
            console.log(overlay)

            //  const popupContainer = document.createElement('div');
            //  popupContainer.id = "myDiv";
            //  document.body.appendChild(popupContainer);

            const popupContainer = document.createElement('div');
            document.body.appendChild(popupContainer);

            const popupRoot = createRoot(popupContainer);
            popupRoot.render(<Popup coordinate={longLat} text={text} />, popupContainer);

        

           
            


            var map = event.map;
            map.forEachFeatureAtPixel(event.pixel,
				(feature, layer) => {
                console.log("Clicked on the feature:", feature, "on the layer:", layer);
            });
            console.log(coordinate + ' ' + longLat)
            
		});
        
        


        return () => map.setTarget(null);
    }, );



  return (
    <div>
        <div
        className="openlayers"
        ref={mapContainerRef}
        ></div>
        {/* <Popup/> */}
        
        
        
        
    </div>
    
    
  );
};

export default OpenLayersMap;
