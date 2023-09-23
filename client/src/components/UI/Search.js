import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Implement your search logic here using the searchTerm state
    console.log("Searching for:", searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth 
        size="small"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        InputProps={{
          startAdornment: ( 
            <InputAdornment position="start">
              <IconButton size="small" onClick={handleSearch}>
                <SearchIcon fontSize="small" /> 
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
