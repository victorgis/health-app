import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "./MapBox.css"; // You can define your own styles in MapBox.css

let map;
let longitude;
let latitude;

const AddHospitalForm = () => {
  // const [showForm, setFormVisibility] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: "",
    email: "",
    long: "",
    lat: "",
  });

  // const handleForm = () => {
  //   setFormVisibility(!showForm);

  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add logic to send form data to your backend or perform other actions
  };

  return (
    <div>
      <h2>Add Hospital</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name of Hospital:</label>
        <input
          type="text"
          id="hospitalName"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Longitude:</label>
        <input
          type="number"
          id="number"
          name="number"
          value={(formData.long = longitude)}
          // onChange={handleChange}
          required
        />

        <label htmlFor="email">Latitude:</label>
        <input
          type="number"
          id="number"
          name="number"
          value={(formData.lat = latitude)}
          // onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
const ToggleSwitch = () => {
  const [isChecked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!isChecked);

    if (!isChecked) {
      console.log("I'm checked");
      map.on("click", (e) => {
        const x = e.lngLat.lng;
        const y = e.lngLat.lat;

        console.log("x", x);
        console.log("y", y);
        longitude = x;
        latitude = y;
      });
    } else {
      console.log("I'm unchecked");
      map.on("click", (e) => {
        const y = e.lngLat.lat;
        console.log(y);
      });
    }
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

const MapBox = () => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidmVlc3BhdGlhbCIsImEiOiJjbHJxbXpkZWkwNDRlMmluenlnd2E4Mm9tIn0.2zBcvY3IMGRN2tS7kU5rNg";

    map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [9.354, 8.2446], // starting position [lng, lat]
      zoom: 5, // starting zoom
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

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
    };
  }, []);

  return (
    <div className="map-container">
      <div id="map" className="mapbox-map"></div>

      {/* Others  */}
      <div className="addHospital">
        <ToggleSwitch />
      </div>

      <div className="addHospitalForm">
        <AddHospitalForm />
      </div>
    </div>
  );
};

export default MapBox;
