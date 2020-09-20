const express = require("express");
const path = require("path");
const app = express();
const logger = require("./middleware/logger");
const router = require("./routes/api/members");
const exphbs = require("express-handlebars");
const members = require("./members");

app.use(logger);

//handlebar middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body parser middleware
app.use(express.json());
//homepage view
app.get("/", (req, res) => {
  res.render("index", { title: "Members", members });
});

app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", router);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
