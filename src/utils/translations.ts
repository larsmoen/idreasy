import { Language } from "../utils/types";
const translations: { [key in Language]: { [key: string]: string } } = {
  en: {
    baseModalClose: "CLOSE",
    loadData: "Upload data",
    loadDataTitle: "Upload GeoJSON",
    loadDataButton: "Choose file(s)",
    loadDataChosen: "Chosen files: ",
    loadDataNone: "No files chosen",
    relation: "Relational operations",
    layers: "Layers",
  },
  nn: {
    baseModalClose: "LUKK",
    loadData: "Last opp data",
    loadDataTitle: "Last opp GeoJSON",
    loadDataButton: "Vel fil(er)",
    loadDataChosen: "Valde filer: ",
    loadDataNone: "Ingen valde filer",
    relation: "Relational operations",
    layers: "Lag",
  },
  de: {
    baseModalClose: "SCHLIESSEN",
    loadData: "Daten hochladen",
    loadDataTitle: "GeoJSON hochladen",
    loadDataButton: "Dateien auswählen",
    loadDataChosen: "Ausgewählte Dateien: ",
    loadDataNone: "Keine Dateien ausgewählt",
    relation: "Relationale Operationen",
    layers: "Schichten",
  },
};

export default translations;
