import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GrContactInfo } from "react-icons/gr";
import { IoStatsChartSharp } from "react-icons/io5";
import logo from "./Taiyo-logo.png";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      {/* Sibdebar for desktop view*/}
      <div className="sidebar">
        <h1 className="flex items-center gap-2">
          <img src={logo} alt="logo" height={30} width={30} /> Taiyo.ai
        </h1>
        <ul className="my-4">
          <li
            className={pathname.includes("contacts") ? "active" : ""}
            onClick={() => navigate("/contact-management-app/contacts")}
          >
            Contacts
          </li>
          <li
            className={pathname.includes("charts") ? "active" : ""}
            onClick={() => navigate("/contact-management-app/charts_and_maps")}
          >
            Charts and Maps
          </li>
        </ul>
      </div>
      {/* Sibdebar for mobile view*/}
      <div className="sidebar-mobile">
        <div className="p-2 my-4">
          <img src={logo} alt="logo" height={30} width={30} />
        </div>
        <ul className="my-4">
          <li
            className={pathname.includes("contacts") ? "active" : ""}
            onClick={() => navigate("/contact-management-app/contacts")}
          >
            <GrContactInfo />
          </li>
          <li
            className={pathname.includes("charts") ? "active" : ""}
            onClick={() => navigate("/contact-management-app/charts_and_maps")}
          >
            <IoStatsChartSharp />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
