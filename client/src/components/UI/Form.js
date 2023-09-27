import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import Input from "../Auth/Input";

const Form = ({ onSubmit, fields, initialState, submitText }) => {
  const [form, setForm] = useState(initialState || {});
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const fieldConfig = fields.find((field) => field.name === name);
    if (fieldConfig) {
      const mappedValue = fieldConfig.map ? fieldConfig.map(value) : value;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: mappedValue,
      }));
      if (mappedValue?.trim() !== "" || !value) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          [name]: undefined,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    fields.forEach((item) => {
      if (!form[item.name] || form[item.name].trim() === "") {
        errors[item.name] = `${item.label} is required.`;
      }
    });
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
    } else {
      onSubmit(form);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {fields.map((item, index) => (
          <Input
            key={index}
            name={item.name}
            label={item.label}
            handleChange={handleChange}
            type={item.type}
            value={form[item.name] || ""}
            error={fieldErrors[item.name] ? true : false}
            errorMessage={fieldErrors[item.name]}
            autoFocus={index === 0}
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
