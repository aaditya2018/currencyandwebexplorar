
import './App.css';
import { Routes, Route } from "react-router-dom";
import SideBarWithMainData from './Components/sideBarWithMainData/SideBarWithMainData';
import WebApiServiceDetails from './Components/WebApiServiceDetails/WebApiServiceDetails';
import { useState } from 'react';
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div>

      <Routes>
        <Route path="/" element={<SideBarWithMainData isOpen={isSidebarOpen} onClose={closeSidebar} />} />
        <Route path="/WebApiServiceDetails" element={<WebApiServiceDetails />} />
      </Routes>
    </div>
  );
}

export default App;
