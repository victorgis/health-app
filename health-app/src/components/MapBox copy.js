import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "./MapBox.css"; // You can define your own styles in MapBox.css

const ToggleSwitch = ({ onToggle }) => {
  const [isChecked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!isChecked);
    onToggle(!isChecked);
  };

  return (
    <div className="toggle-container">
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

let handleToggle;

const MapBox = () => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidmVlc3BhdGlhbCIsImEiOiJjbHJxbXpkZWkwNDRlMmluenlnd2E4Mm9tIn0.2zBcvY3IMGRN2tS7kU5rNg";

    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [9.354, 8.2446], // starting position [lng, lat]
      zoom: 5, // starting zoom
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    let clickHandler = null;

    const enableClickHandler = () => {
      clickHandler = map.on("click", (e) => {
        const x = e.lngLat.lng;
        const y = e.lngLat.lat;

        console.log("x", x);
        console.log("y", y);
      });
    };

    const disableClickHandler = () => {
      if (clickHandler) {
        clickHandler.remove();
      }
    };

    map.on("load", () => {
      map.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                name: "Sam",
                area: 64,
                description: "This is a town",
                icon: "theatre",
              },
              geometry: {
                coordinates: [8.084942202848993, 4.776192184612867],
                type: "Point",
              },
            },
            {
              type: "Feature",
              properties: {
                name: "Abang",
                area: 25,
                description: "This is a village",
                icon: "theatre",
              },
              geometry: {
                coordinates: [7.6949275544108104, 4.798088191650336],
                type: "Point",
              },
            },
            {
              type: "Feature",
              properties: {
                name: "Uyo",
                area: 34,
                description: "This is a town",
                icon: "theatre",
              },
              geometry: {
                coordinates: [7.623516421598055, 5.041633177074289],
                type: "Point",
              },
            },
          ],
        },
      });
      map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": ["get", "icon"],
          "icon-allow-overlap": true,
        },
      });

      map.on("click", (e) => console.log(e.lngLat.lat));

      handleToggle = (isChecked) => {
        if (isChecked) {
          console.log("I'm checked");
          enableClickHandler();
        } else {
          console.log("I'm unchecked");
          disableClickHandler();
        }
      };

      map.on("click", "places", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties;

        // rr.addEventListener("click", (()=>console.log("I got here")))

        const html = `<h2>Simple HTML Table</h2>
    
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>${description.name}</td>
                    </tr>
                    <tr>
                        <th>Area</th>
                        <td>${description.area}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>${description.description}</td>
                    </tr>
                </tbody>
            </table>

            <button name="button" id="popup-button">Click me</button>
        `;

        // const rr = document.getElementById("popup-button");

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        const rrs = new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(html)
          .addTo(map);
        console.log(rrs);
      });

      map.on("mouseenter", "places", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "places", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    // Clean up resources on component unmount
    return () => {
      map.remove();
      disableClickHandler();
    };
  }, []);

  return (
    <div className="map-container">
      <div id="map" className="mapbox-map"></div>

      {/* Others  */}
      <div className="addHospital">
        <div className="map-container">
          <div id="map" className="mapbox-map"></div>

          {/* Others  */}
          <div className="addHospital">
            <ToggleSwitch onToggle={(isChecked) => handleToggle(isChecked)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapBox;
