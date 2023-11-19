const express = require("express");
const router = express.Router();
const mahasiswaController = require("../controllers/mahasiswaController");

router.get("/", mahasiswaController.semuaMahasiswa);
router.get("/form", mahasiswaController.formTambah);
router.post("/tambah", mahasiswaController.tambahMahasiswa);
router.get("/:id", mahasiswaController.detailMahasiswa);
router.get("/update/:id", mahasiswaController.formEdit);
router.post("/update/:id", mahasiswaController.updateMahasiswa);
router.get("/delete/:id", mahasiswaController.hapusMahasiswa);

module.exports = router;
