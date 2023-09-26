import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import Input from "../Auth/Input";

const Form = ({ onSubmit, fields, initialState, submitText }) => {
  const [form, setForm] = useState(initialState || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const fieldConfig = fields.find((field) => field.name === name);
    if (fieldConfig) {
      const mappedValue = fieldConfig.map ? fieldConfig.map(value) : value;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: mappedValue,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {fields.map((item, index) => (
          <Input
            key={index}
            name={item.name}
            label={item.label}
            handleChange={handleChange}
            type={item.type}
            value={form[item.name] || ""}
          />
        ))}
        <Box sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <Button variant="contained" type={"submit"}>
            {submitText}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Form;
