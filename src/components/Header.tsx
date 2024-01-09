import React from "react";
import { useLanguage } from "../utils/LanguageContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
} from "@mui/material";

import { Language } from "../utils/types";
import LanguageOutlinedIcon from "@mui/icons-material/Language";

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (event: SelectChangeEvent<Language>) => {
    setLanguage(event.target.value as Language);
  };

  // console.log("Current language:", language);

  return (
    <AppBar position="static">
      <Toolbar
        className="App-header"
        style={{ justifyContent: "space-between" }}
      >
        <Box style={{ flexGrow: 1 }} />
        <Typography variant="h4" style={{ textAlign: "center", flexGrow: 2 }}>
          IDREASY vector
        </Typography>
        <Box
          style={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
        >
          <Select
            value={language}
            onChange={handleLanguageChange}
            style={{ color: "white" }}
            name="language"
            // IconComponent={LanguageOutlinedIcon}
          >
            <MenuItem value="nn">NO</MenuItem>
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="de">DE</MenuItem>
          </Select>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
