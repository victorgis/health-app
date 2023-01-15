// --- (1), (2) & (3): install and import ---
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Icon } from 'leaflet';
import React from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import './Header.css'

const Leaflet = () => {
    var map = L.map('map').setView([51.505, -0.09], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([51.5, -0.09]).addTo(map);

    return (
        <div id="map"></div>
    )

}

export default Leaflet


