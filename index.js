const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mahasiswaRoutes = require("./routes/mahasiswaRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/mahasiswa", mahasiswaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
