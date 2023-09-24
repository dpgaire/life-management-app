import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Buttons from "./Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const TaskCard = ({ name, description, status,date }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* <CardActions > */}
        <Typography gutterBottom variant="body2" component="div">
          {status}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {date}
        </Typography>
        {/* </CardActions> */}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Buttons isIconOnly Icon={<DeleteIcon />} />
        <Buttons isIconOnly Icon={<EditIcon />} />
        <Buttons isIconOnly Icon={<VisibilityIcon />} />
      </CardActions>
    </Card>
  );
};

export default TaskCard;
