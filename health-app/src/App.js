import "./App.css";
import Header from "./components/Header";
import MapBox from "./components/MapBox";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="parent">
      <div>
        <Header />
      </div>
      <div>
        <MapBox />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
