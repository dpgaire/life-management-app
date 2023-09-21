const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv')
const verifyToken = require("./middlewares/auth");

const notesRoutes = require("./routes/notes");
const expenseRoutes = require("./routes/expenses");
const categoryRoutes = require("./routes/category");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.use("/api/users", userRoutes);
app.use("/api/tasks",verifyToken, taskRoutes); 
app.use("/api/notes", verifyToken, notesRoutes); 
app.use("/api/expenses", verifyToken, expenseRoutes);
app.use("/api/categories", verifyToken, categoryRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'The requested URL is not found in server.' });
});

app.listen(
  process.env.PORT || 3001 ,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log(`Skill App listening at http://localhost:${process.env.PORT}`);
  }
);
