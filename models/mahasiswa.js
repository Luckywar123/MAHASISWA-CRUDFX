// models/mahasiswa.js
const db = require('../config/database');

const Mahasiswa = {
    tambahMahasiswa: (nama, jurusan, angkatan, callback) => {
        db.query('INSERT INTO mahasiswa (nama, jurusan, angkatan) VALUES (?, ?, ?)', [nama, jurusan, angkatan], callback);
    },

    semuaMahasiswa: (callback) => {
        db.query('SELECT * FROM mahasiswa', callback);
    },

    detailMahasiswa: (id, callback) => {
        db.query('SELECT * FROM mahasiswa WHERE id = ?', [id], callback);
    },

    cariMahasiswa: (keyword, callback) => {
        db.query('SELECT * FROM mahasiswa WHERE nama LIKE ?', [`%${keyword}%`], callback);
    },

    updateMahasiswa: (id, nama, jurusan, angkatan, callback) => {
        db.query('UPDATE mahasiswa SET nama = ?, jurusan = ?, angkatan = ? WHERE id = ?', [nama, jurusan, angkatan, id], callback);
    },

    hapusMahasiswa: (id, callback) => {
        db.query('DELETE FROM mahasiswa WHERE id = ?', [id], callback);
    },
};

module.exports = Mahasiswa;
