import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import LayerList from "./LayerList";
import useLanguage from "../hook/useLanguage";

interface MenuSidebarProps {
  onMenuItemClick: () => void;
}

const MenuSidebar: React.FC<MenuSidebarProps> = ({ onMenuItemClick }) => {
  const { t } = useLanguage();
  const [collapsed, setCollapsed] = React.useState(false);
  const [rtl, setRtl] = React.useState(false);

  // console.log("Current language:", language);

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
            {/* {t("loadData")} */}
            Upload Data
          </MenuItem>
          <MenuItem
            component={
              <Link to="feature-extraction" onClick={onMenuItemClick} />
            }
          >
            Feature Extractor
          </MenuItem>
          <MenuItem component={<Link to="union" onClick={onMenuItemClick} />}>
            Union
          </MenuItem>
          <MenuItem
            component={<Link to="intersect" onClick={onMenuItemClick} />}
          >
            Intersect
          </MenuItem>
          <MenuItem component={<Link to="buffer" onClick={onMenuItemClick} />}>
            Buffer
          </MenuItem>
          <MenuItem
            component={<Link to="difference" onClick={onMenuItemClick} />}
          >
            Difference
          </MenuItem>
        </Menu>
        <LayerList />
      </Sidebar>
    </div>
  );
};

export default MenuSidebar;
