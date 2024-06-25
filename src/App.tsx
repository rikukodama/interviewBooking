import axios from 'axios';
import AllRoutes from "./AllRoutes"
import "./App.css"
import React from 'react';
axios.defaults.baseURL ="https://questymeprojectrepo-production.up.railway.app/"


function App(){
  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;




