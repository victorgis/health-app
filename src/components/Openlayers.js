import React, { useState, useEffect, useRef } from "react";

import {Map, Overlay, View} from "ol";
import { fromLonLat } from 'ol/proj';
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "./Openlayers.css"
import GeoJSON from 'ol/format/GeoJSON';
import {x} from "../data/poi"
import {toLonLat} from 'ol/proj';
import {toStringHDMS} from 'ol/coordinate';
import Popup from 'ol-popup';
import { transform } from 'ol/proj';

// import Popup from "./Popup";


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
            stopEvent: false,
      

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


        //the popup 
        const popup = new Popup();
        map.addOverlay(popup);
        

        
        map.on('singleclick', function(evt) {
            var prettyCoord = toStringHDMS(transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'), 2);
            popup.show(evt.coordinate, '<div><h2>Coordinates</h2><p>' + prettyCoord + '</p></div>');
        });
             
		});
        
        




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
