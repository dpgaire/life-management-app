import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Buttons from "./Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ExpenseCard = ({
  id,
  item,
  price,
  quantity,
  created_at,
  handleDelete,
  handleUpdate,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rs.{price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quantity: {quantity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Buttons
          isIconOnly
          Icon={<DeleteIcon />}
          handleClick={() => handleDelete(id)}
        />
        <Buttons
          isIconOnly
          Icon={<EditIcon />}
          handleClick={() => handleUpdate(id)}
        />
        <Buttons isIconOnly Icon={<VisibilityIcon />} />
      </CardActions>
    </Card>
  );
};

export default ExpenseCard;
