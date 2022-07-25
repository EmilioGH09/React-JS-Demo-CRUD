import "./App.css";
import Cards from "./components/cards/Cards";
import Item from "./components/Item";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Cards />}></Route>
                <Route path="items/:id" element={<Item />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
