import React from "react";
import Navbar from "../navbar/Navbar";
import "./App.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab);

function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
