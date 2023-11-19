// Import database
const db = require("../config/database");
//Controller buat handle mahasiswanya
const mahasiswaController = {
  //Render  buat nambah mahasiswa
  formTambah: (req, res) => {
    res.render("form.ejs");
  },
// Render buat edit mahasiswa yang ada
  formEdit: (req, res) => {
    const { id } = req.params;
// query database buat liat detail yang ada berdasarkan ID
    db.query("SELECT * FROM mahasiswa WHERE id = ?", [id], (err, result) => {
      if (err) {
        // Error handling data query dalam database
        console.error("Kesalahan saat mendapatkan detail mahasiswa:", err);
        res
          .status(500)
          .render("error", { message: "Terjadi kesalahan server" });
      } else {
        if (result.length === 0) {
          // kalo gaada Mahasiswa berdasarkan ID maka akan render eror
          res
            .status(404)
            .render("error", { message: "Data mahasiswa tidak ditemukan" });
        } else {
          //render edit form sebelumnya dengan melihat data mahasiswa
          res.render("edit.ejs", { data: result[0] });
        }
      }
    });
  },
// Handling penambahaan mahasiswa baru ke database
  tambahMahasiswa: (req, res) => {
    const { nama, jurusan, angkatan } = req.body;
// masukin data baru ke database
    db.query(
      "INSERT INTO mahasiswa (nama, jurusan, angkatan) VALUES (?, ?, ?)",
      [nama, jurusan, angkatan],
      (err, result) => {
        if (err) {
          //handling eror selama memasuki data
          console.error("Kesalahan saat menambahkan mahasiswa:", err);
          res
            .status(500)
            .render("error", { message: "Terjadi kesalahan server" });
        } else {
          //   res.json({
          //     message: "Data mahasiswa berhasil ditambahkan",
          //     data: result,
          //   });
          //Render success kalau berhasil
          res.render("success", {
            message: "Data mahasiswa berhasil ditambahkan",
            data: result,
          });
        }
      }
    );
  },
//Mengembalikan semua data mahasiswa
  semuaMahasiswa: (req, res) => {
    db.query("SELECT * FROM mahasiswa", (err, results) => {
      if (err) {
        //handling error 
        console.error("Kesalahan saat membaca mahasiswa:", err);
        res
          .status(500)
          //render error
          .render("error", { message: "Terjadi kesalahan server" });
      } else {
        // res.json({ data: results });
        res.render("index", { data: results });
      }
    });
  },

  detailMahasiswa: (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM mahasiswa WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.error("Kesalahan saat mendapatkan detail mahasiswa:", err);
        res
          .status(500)
          .render("error", { message: "Terjadi kesalahan server" });
      } else {
        if (result.length === 0) {
          res
            .status(404)
            .render("error", { message: "Data mahasiswa tidak ditemukan" });
        } else {
          //   res.json({ data: result[0] });
          res.render("detail", { data: result[0] });
        }
      }
    });
  },

  cariMahasiswa: (req, res) => {
    const { keyword } = req.query;

    db.query(
      "SELECT * FROM mahasiswa WHERE nama LIKE ?",
      [`%${keyword}%`],
      (err, results) => {
        if (err) {
          console.error("Kesalahan saat mencari mahasiswa:", err);
          res
            .status(500)
            .render("error", { message: "Terjadi kesalahan server" });
        } else {
          res.json({ data: results });
          res.render("index", { data: results });
        }
      }
    );
  },

  updateMahasiswa: (req, res) => {
    const { id } = req.params;
    const { nama, jurusan, angkatan } = req.body;

    db.query(
      "UPDATE mahasiswa SET nama = ?, jurusan = ?, angkatan = ? WHERE id = ?",
      [nama, jurusan, angkatan, id],
      (err, result) => {
        if (err) {
          console.error("Kesalahan saat memperbarui mahasiswa:", err);
          res.status(500).json({ message: "Terjadi kesalahan server" });
        } else {
          //   res.json({
          //     message: "Data mahasiswa berhasil diperbarui",
          //     data: result,
          //   });
          res.render("success", {
            message: "Data mahasiswa berhasil diperbarui",
            data: result,
          });
        }
      }
    );
  },

  hapusMahasiswa: (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM mahasiswa WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.error("Kesalahan saat menghapus mahasiswa:", err);
        res.status(500).json({ message: "Terjadi kesalahan server" });
      } else {
        // res.json({ message: 'Data mahasiswa berhasil dihapus', data: result });
        res.render("success", {
          message: "Data mahasiswa berhasil dihapus",
          data: result,
        });
      }
    });
  },
};

module.exports = mahasiswaController;
