let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let cors = require("cors");
let route = require("./routes/routeUser");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use("/api", route);

app.listen(3000, () => console.log("server up!"));
