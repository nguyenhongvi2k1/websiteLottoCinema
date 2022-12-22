import React, { useState } from "react";
import "./style_admin.css";
import { FaList, FaPen, FaTh, FaUserAlt, FaBars, FaQuestion } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/admin-dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },

    {
      path: "/admin-user",
      name: "User",
      icon: <FaUserAlt />,
    },

    {
      path: "/admin-movie",
      name: "Movie List",
      icon: <FaList />,
    },

    {
      path: "/admin-addmovie",
      name: "Add Movie",
      icon: <FaPen />,
    },
    {
      path: "/admin-help",
      name: "Help",
      icon: <FaQuestion />,
    },
  ];

  return (
    <>
      <div className="Sidebar" style={{ width: isOpen ? "270px" : "50px"}}>
        <div className="top-section">
          <h1 className="logo title" style={{ display: isOpen ? "block" : "none" }}>
            LottoCinema
          </h1>
          <div
            className="bars"
            style={{ marginLeft: isOpen ? "20px" : "-3px" }}
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              className="link_text"
              style={{ display: isOpen ? "block" : "none" }}
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      {/* <main>{children}</main> */}
    </>
  );
};
export default SideBar;
