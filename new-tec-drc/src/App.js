import React from "react";
import './App.css';
import Navbar from './components/Navbar';
import Login from "./Login";
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Login />
      <Footer />
    </div>
  );
}

export default App;