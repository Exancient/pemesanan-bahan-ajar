/* ============================================================
   data.js
   Berisi semua data simulasi (tanpa database / backend)
   untuk aplikasi Pemesanan Bahan Ajar UT-Daerah
============================================================ */

/* ===== 1. Daftar Buku / Bahan Ajar ===== */
const bukuData = [
  {
    id: 1,
    judul: "Perkembangan dan Konsep Dasar Pengembangan Anak Usia Dini",
    kode: "PAUD4306",
    harga: 75000,
    gambar: "img/paud_perkembangan.jpeg"
  },
  {
    id: 2,
    judul: "Mikrobiologi",
    kode: "BIOL4223",
    harga: 89000,
    gambar: "img/mikrobiologi.jpg"
  },
  {
    id: 3,
    judul: "Kepemimpinan",
    kode: "ADPU4334",
    harga: 81000,
    gambar: "img/kepemimpinan.jpg"
  },
  {
    id: 4,
    judul: "Manajemen Keuangan",
    kode: "EKMA4213",
    harga: 92000,
    gambar: "img/manajemen_keuangan.jpg"
  },
  {
    id: 5,
    judul: "Pengantar Ilmu Komunikasi",
    kode: "SKOM4101",
    harga: 86000,
    gambar: "img/pengantar_komunikasi.jpg"
  }
];

/* ===== 2. Data Delivery Order (DO) untuk Tracking Pengiriman ===== */
const doData = {
  "DO2025001": {
    no: "DO2025001",
    namaMahasiswa: "Ani Wijaya",
    tanggalKirim: "2025-03-01",
    ekspedisi: "JNE Reguler",
    jenisPaket: "Buku Besar",
    totalPembayaran: 92000,
    progress: 80,
    status: "Dalam Pengiriman"
  },
  "DO2025002": {
    no: "DO2025002",
    namaMahasiswa: "Budi Santoso",
    tanggalKirim: "2025-03-02",
    ekspedisi: "POS Indonesia",
    jenisPaket: "Buku + Modul",
    totalPembayaran: 165000,
    progress: 100,
    status: "Terkirim"
  },
  "DO2025003": {
    no: "DO2025003",
    namaMahasiswa: "Citra Dewi",
    tanggalKirim: "2025-03-05",
    ekspedisi: "SiCepat",
    jenisPaket: "Buku Ringan",
    totalPembayaran: 81000,
    progress: 40,
    status: "Dikemas"
  }
};

/* ===== 3. Data Transaksi (Histori & Laporan) ===== */
const transaksiData = [
  {
    id: "T2025001",
    tgl: "2025-03-01",
    nama: "Ani Wijaya",
    items: ["Manajemen Keuangan"],
    total: 92000,
    doNo: "DO2025001"
  },
  {
    id: "T2025002",
    tgl: "2025-03-02",
    nama: "Budi Santoso",
    items: ["Mikrobiologi", "Pengantar Ilmu Komunikasi"],
    total: 165000,
    doNo: "DO2025002"
  },
  {
    id: "T2025003",
    tgl: "2025-03-05",
    nama: "Citra Dewi",
    items: ["Kepemimpinan"],
    total: 81000,
    doNo: "DO2025003"
  }
];

/* ===== 4. Informasi Stok Bahan Ajar =====
   (Digunakan pada halaman stok.html)
============================================================ */
const dataBahanAjar = [
  {
    id: 1,
    nama: "Perkembangan Anak Usia Dini",
    kode: "PAUD4306",
    stok: 25,
    lokasi: "Gudang Pusat"
  },
  {
    id: 2,
    nama: "Mikrobiologi",
    kode: "BIOL4223",
    stok: 18,
    lokasi: "Gudang Jakarta"
  },
  {
    id: 3,
    nama: "Kepemimpinan",
    kode: "ADPU4334",
    stok: 30,
    lokasi: "Gudang Medan"
  },
  {
    id: 4,
    nama: "Manajemen Keuangan",
    kode: "EKMA4213",
    stok: 20,
    lokasi: "Gudang Surabaya"
  },
  {
    id: 5,
    nama: "Pengantar Ilmu Komunikasi",
    kode: "SKOM4101",
    stok: 15,
    lokasi: "Gudang Bandung"
  }
];
