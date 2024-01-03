import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
// import BaseMap from "./components/BaseMap";
import MenuSidebar from "./components/MenuSidebar";
import Relation from "./components/Relation";
import LoadData from "./components/LoadData";
import LeafletBaseMap from "./components/LeafletBaseMap";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="App">
      <header className="App-header">
        <h1>IDREASY</h1>
      </header>
      <div className="App-body">
        <MenuSidebar onMenuItemClick={toggleModal} />
        <LeafletBaseMap />
        {/* <BaseMap /> */}
        <section>
          <Routes>
            <Route
              path="load-data"
              element={<LoadData isOpen={isModalOpen} onClose={toggleModal} />}
            />
            <Route
              path="relation"
              element={<Relation isOpen={isModalOpen} onClose={toggleModal} />}
            />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;
