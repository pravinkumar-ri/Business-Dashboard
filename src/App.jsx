import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeScreen from "./screens/home";
import CalendarScreen from "./screens/calendar";
import InboxScreen from "./screens/inbox";
import ProfileScreen from "./screens/profile";
import TableScreen from "./screens/table";
import BillingScreen from "./screens/billings";
import PageScreen from "./screens/pages";
import SettingScreen from "./screens/setting";

import "./css/style.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/calendar" element={<CalendarScreen />} />
        <Route path="/inbox" element={<InboxScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/table" element={<TableScreen />} />
        <Route path="/billing" element={<BillingScreen/>}/>
        <Route path="/pages" element={<PageScreen/>}/>
        <Route path="/setting" element={<SettingScreen/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;