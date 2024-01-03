import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Routes, Route, Link } from "react-router-dom";
import Relation from "./Relation";

interface MenuSidebarProps {
  onMenuItemClick: () => void;
}

const MenuSidebar: React.FC<MenuSidebarProps> = ({ onMenuItemClick }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [rtl, setRtl] = React.useState(false);

  const handleRTLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRtl(event.target.checked);
  };

  return (
    <div className="menu-sidebar">
      <Sidebar collapsed={collapsed} rtl={rtl} rootStyles={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            component={<Link to="load-data" onClick={onMenuItemClick} />}
          >
            Load Data
          </MenuItem>
          <MenuItem
            component={<Link to="relation" onClick={onMenuItemClick} />}
          >
            Relational Operations
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default MenuSidebar;
