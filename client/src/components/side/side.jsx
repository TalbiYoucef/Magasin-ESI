import React, { useEffect, useState } from "react";
import "./side.css";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { TbHomeSignal } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineInventory2 } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { PiStorefront } from "react-icons/pi";
import { GrDeliver } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
function Side(props) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [UserPerimssionsId, setUserPerimssionsId] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUserPerimssionsId(res.data.perms)
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const Dashboard = {
    icon: <TbHomeSignal className="ic" style={{}} />,
    heading: "Dashboard",
  };
  const UsersManagement = {
    icon: <TbUsers className="ic" />,
    heading: "Users Management",
  };
  const RolesManagement = {
    icon: <MdOutlineAdminPanelSettings className="ic" />,
    heading: "Roles Management",
  };
  const ExternalOrders = {
    icon: <MdOutlineLocalGroceryStore className="ic" />,
    heading: "External Orders",
  };
  const InternalOrders = {
    icon: <LuClipboardList className="ic" />,
    heading: "Internal Orders",
  };
  const InternalOrdersDir = {
    icon: <LuClipboardList className="ic" />,
    heading: "Internal Orders Director",
  };
  const MyOrders = {
    icon: <MdFormatListBulletedAdd className="ic" />,
    heading: "My Orders",
  };
  const Inventory = {
    icon: <MdOutlineInventory2 className="ic" />,
    heading: "Inventory",
  };
  const ProductsManagement = {
    icon: <PiStorefront className="ic" />,
    heading: "Chapters Management",
  };
  const SuppliersManagement = {
    icon: <GrDeliver className="ic" />,
    heading: "Suppliers Management",
  };
  const SidebarData = [];
  const addSidebarData = (item) => {
    if (
      !SidebarData.find((existingItem) => existingItem.heading === item.heading)
    ) {
      SidebarData.push(item);
    }
  };
  UserPerimssionsId.forEach((Permission) => {
    switch (Permission) {
      case 1:
        addSidebarData(UsersManagement);
        break;
      case 2:
      case 3:
        addSidebarData(RolesManagement);
        break;
      case 5:
      case 6:
      case 7:
        addSidebarData(ProductsManagement);
        break;
      case 8:
        addSidebarData(SuppliersManagement);
        break;
      case 18: //consult sotre
        // addSidebarData(Dashboard);
        break;
      case 9: //manage BCE
      case 10: //consulte bce
      case 12: //manage BR
        addSidebarData(ExternalOrders);
        break;
      case 13: //maange invetory
      case 19: //consult invetory
        addSidebarData(Inventory);
        break;
      case 14: //consult  bci
      case 20: // manage bci
      case 17: //validate bci
        addSidebarData(InternalOrders);
        break;
      case 22 : 
      addSidebarData(InternalOrdersDir);
      break;
      default:
        break;
    }
  });
  addSidebarData(MyOrders);
  const Data = [
    {
      icon: <LuSettings className="ic" />,
      heading: "Settings",
    },
  ];
  const sidebarHeight = 92; // en vh
  const itemHeight = 55; // en px
  const sidebarHeightPX = (window.innerHeight * sidebarHeight) / 100;
  const spaceHeight =
    sidebarHeightPX - (SidebarData.length + Data.length + 1) * itemHeight;
  const handleLogOut = async () => {
    try {
      const res = await axios.get("http://localhost:3036/auth/logout", {
        withCredentials: true,
      });
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="nav__cont">
      <div
        className={selected === 0 ? "menuItem active" : "menuItem"}
        onClick={() => setSelected(0)}
      >
        {UserPerimssionsId.includes(21) ? (
          <li className="nav__items" style={{ marginTop: "20px" }}>
            <a
              href={`/storekeeperStat`}
              className={`link ${
                props.link === "storekeeperStat" ? "active" : ""
              }`}
            >
              {Dashboard.icon}
              {Dashboard.heading}
            </a>
          </li>
        ) : null}
        {UserPerimssionsId.includes(22) ? (
          <li className="nav__items" style={{ marginTop: "20px" }}>
            <a
              href={`/DirectorStat`}
              className={`link ${
                props.link === "DirectorStat" ? "active" : ""
              }`}
            >
              {Dashboard.icon}
              {Dashboard.heading}
            </a>
          </li>
        ) : null}
        {UserPerimssionsId.includes(23) ? (
          <li className="nav__items" style={{ marginTop: "20px" }}>
            <a
              href={`/HeadOfServiceStat`}
              className={`link ${
                props.link === "HeadOfServiceStat" ? "active" : ""
              }`}
            >
              {Dashboard.icon}
              {Dashboard.heading}
            </a>
          </li>
        ) : null}
      </div>
      <ul className="navv">
        {SidebarData.map((item, index) => (
          <div
            className={selected === index ? "menuItem active" : "menuItem"}
            key={index}
            onClick={() => setSelected(index)}
          >
            <li className="nav__items ">
              <a
                href={`/${item.heading.replace(/\s/g, "")}`}
                className={`link ${
                  props.link === item.heading ? "active" : ""
                }`}
              >
                {item.icon}
                {item.heading}
              </a>
            </li>
          </div>
        ))}
      </ul>
      <div style={{ height: spaceHeight }}></div>
      <ul>
        {Data.map((item, index) => (
          <div
            className={selected === index ? "menuItem active" : "menuItem"}
            key={index}
            onClick={() => setSelected(index)}
          >
            <li className="nav__items ">
              <a
                href={`/${item.heading.replace(/\s/g, "")}`}
                className={`link ${
                  props.link === item.heading ? "active" : ""
                }`}
              >
                {item.icon}
                {item.heading}
              </a>
            </li>
            <li className="nav__items" style={{color:'red'}}>
              <Link onClick={handleLogOut}>
                log out
                <FiLogOut className="ic" />
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </nav>
  );
}
export default Side;
