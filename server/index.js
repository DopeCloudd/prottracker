const express = require("express");
const cors = require("cors");
const app = express();
const port = 3032;
// Activer CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
require("./routes/product.routes")(app);
require("./routes/category.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/stripe.routes")(app);

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
