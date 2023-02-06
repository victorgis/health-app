import "./App.css"
import Footer from "./components/Footer";


import Header from "./components/Header";
import OpenLayersMap from "./components/Openlayers";


function App() {
  return (
    <div className="App">
      <Header />
      <OpenLayersMap />
      <Footer />
    </div>
  );
}

export default App;
