require("dotenv").config();

const express = require("express");
const indexRouter = require("./routes/indexRouter");


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", indexRouter);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Mini Messaging Board - listening on port ${PORT}!`);
    console.log(`Try http://localhost:${PORT}/`);
});
