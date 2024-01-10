import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import MenuSidebar from "./components/MenuSidebar";
import LoadData from "./components/LoadData";
import ReactLeafletBaseMap from "./components/ReactLeafletBaseMap";
import Union from "./components/Union";
import FeatureExtractor from "./components/FeatureExtractor";
import Intersect from "./components/Intersect";
import Buffer from "./components/Buffer";
import Difference from "./components/Difference";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <MenuSidebar onMenuItemClick={toggleModal} />
        <ReactLeafletBaseMap />
        <section>
          <Routes>
            <Route path="idreasy" element={<React.Fragment />} />
            <Route
              path="idreasy/load-data"
              element={<LoadData isOpen={isModalOpen} onClose={toggleModal} />}
            />
            <Route
              path="idreasy/union"
              element={<Union isOpen={isModalOpen} onClose={toggleModal} />}
            />
            <Route
              path="idreasy/feature-extraction"
              element={
                <FeatureExtractor isOpen={isModalOpen} onClose={toggleModal} />
              }
            />
            <Route
              path="idreasy/intersect"
              element={<Intersect isOpen={isModalOpen} onClose={toggleModal} />}
            />
            <Route
              path="idreasy/buffer"
              element={<Buffer isOpen={isModalOpen} onClose={toggleModal} />}
            />
            <Route
              path="idreasy/difference"
              element={
                <Difference isOpen={isModalOpen} onClose={toggleModal} />
              }
            />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;
