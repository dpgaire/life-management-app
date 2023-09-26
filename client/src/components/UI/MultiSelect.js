import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const MultiSelect = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ]);

  const handleItemSelect = (event) => {
    const value = event.target.value;
    setSelectedItems(value);
  };

  const handleAddItem = () => {
    // Remove selected items from available items
    const newAvailableItems = availableItems.filter(
      (item) => !selectedItems.includes(item)
    );

    setAvailableItems(newAvailableItems);
    setSelectedItems([]);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Select Items</InputLabel>
        <Select
          multiple
          value={selectedItems}
          onChange={handleItemSelect}
          renderValue={(selected) => selected.join(", ")}
        >
          {availableItems.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddItem}
        disabled={selectedItems.length === 0}
      >
        Add Selected Items
      </Button>
    </div>
  );
};

export default MultiSelect;
