/* script.js
   Logika login, modal, dashboard navigation, tracking, laporan.
*/

/* =========== Utility & Modal ============ */
function el(id){ return document.getElementById(id); }
function showModal(id){ const m = el(id); if(m) m.style.display = "flex"; }
function hideModal(id){ const m = el(id); if(m) m.style.display = "none"; }

/* Close modal when clicking X or close buttons */
document.addEventListener("click", function(e){
  const tgt = e.target;
  if(tgt.matches("[data-close]")) {
    hideModal(tgt.dataset.close);
  }
  if(tgt.classList.contains("modal")) {
    // click outside modal content closes it
    tgt.style.display = "none";
  }
});

/* =========== Login page logic ============ */
if (window.location.pathname.endsWith("login.html") || window.location.pathname.endsWith("/")) {
  // Elements
  const loginForm = el("loginForm");
  const btnForgot = el("btnForgot");
  const btnRegister = el("btnRegister");
  const sendReset = el("sendReset");
  const doRegister = el("doRegister");

  if(btnForgot) btnForgot.addEventListener("click", ()=> showModal("modalForgot"));
  if(btnRegister) btnRegister.addEventListener("click", ()=> showModal("modalRegister"));
  if(sendReset) sendReset.addEventListener("click", ()=> {
    const email = el("forgotEmail").value;
    if(!email) { alert("Masukkan email untuk reset password."); return; }
    alert("Instruksi reset password telah dikirim (simulasi) ke: " + email);
    hideModal("modalForgot");
  });
  if(doRegister) doRegister.addEventListener("click", ()=> {
    const name = el("regName").value;
    const email = el("regEmail").value;
    const pw = el("regPassword").value;
    if(!name || !email || !pw) { alert("Lengkapi data pendaftaran."); return; }
    alert(`Terima kasih ${name}. Pendaftaran berhasil (simulasi). Silakan login.`);
    hideModal("modalRegister");
  });

  if(loginForm){
    loginForm.addEventListener("submit", function(ev){
      ev.preventDefault();
      const email = el("email").value.trim();
      const pw = el("password").value.trim();

      // Simulasi akun statis: admin@ut.ac.id / 12345
      if(email.toLowerCase() === "admin@ut.ac.id" && pw === "12345"){
        // tandai sesi login sederhana dengan localStorage
        localStorage.setItem("ut_logged_in", JSON.stringify({email: email, at: Date.now()}));
        // redirect ke dashboard
        window.location.href = "dashboard.html";
      } else {
        alert("email/password yang anda masukkan salah");
      }
    });
  }
}

/* =========== Dashboard logic ============ */
if (window.location.pathname.endsWith("dashboard.html")) {
  // proteksi halaman: cek login
  const sesi = JSON.parse(localStorage.getItem("ut_logged_in") || "null");
  if(!sesi) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
  }

  // greeting berdasarkan waktu lokal
  const greetEl = el("greeting");
  function updateGreeting(){
    const now = new Date();
    const h = now.getHours();
    let text = "";
    if(h < 11) text = "Selamat pagi";
    else if(h < 15) text = "Selamat siang";
    else text = "Selamat sore";
    // (opsional: tampilkan nama UT-Daerah, di sini kita pakai email bagian sebelum @)
    const user = sesi && sesi.email ? sesi.email.split("@")[0] : "Pengguna";
    greetEl.textContent = `${text}, ${user}!`;
  }
  updateGreeting();

  // logout
  el("logoutBtn").addEventListener("click", ()=> {
    localStorage.removeItem("ut_logged_in");
    window.location.href = "login.html";
  });

  // navigasi tab
  const navBtns = Array.from(document.querySelectorAll(".nav-btn"));
  const tabs = Array.from(document.querySelectorAll(".tab"));
  navBtns.forEach(btn => {
    btn.addEventListener("click", ()=> {
      navBtns.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.dataset.target;
      tabs.forEach(t => {
        if(t.id === target) t.classList.add("active"); else t.classList.remove("active");
      });
    });
  });

  /* ---------- Render Informasi Bahan Ajar ---------- */
  function formatIDR(n){
    return "Rp" + Number(n).toLocaleString("id-ID");
  }

  function renderBuku(){
    const container = el("buku-list");
    container.innerHTML = "";
    bukuData.forEach(b => {
      const div = document.createElement("div");
      div.className = "book-card";
      div.innerHTML = `
        <img src="${b.gambar}" alt="${b.judul}">
        <div class="body">
          <h3>${b.judul}</h3>
          <p><strong>${b.kode}</strong></p>
          <p>${formatIDR(b.harga)}</p>
          <div class="actions">
            <button class="btn" onclick="alert('Detail buku: ${b.judul}\\n(Hanya simulasi)')">Detail</button>
            <button class="btn primary" onclick="alert('Berhasil menambahkan ${b.judul} ke pesanan (simulasi)')">Pesan</button>
          </div>
        </div>
      `;
      container.appendChild(div);
    });
  }
  renderBuku();

  /* ---------- Tracking Pengiriman ---------- */
  el("btnCariDO").addEventListener("click", function(){
    const no = el("doNumber").value.trim();
    const res = el("trackingResult");
    res.innerHTML = "";
    if(!no){ alert("Masukkan nomor DO."); return; }

    // cari di doData, jika tidak ada tampilkan pesan
    const d = doData[no];
    if(!d){
      res.innerHTML = `<div class="card"><p>Data untuk nomor <strong>${no}</strong> tidak ditemukan (simulasi).</p></div>`;
      return;
    }

    // tampilkan info mahasiswa & progress
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>Delivery Order: ${d.no}</h3>
      <p><strong>Nama Mahasiswa:</strong> ${d.namaMahasiswa}</p>
      <p><strong>Tanggal Kirim:</strong> ${d.tanggalKirim}</p>
      <p><strong>Ekspedisi:</strong> ${d.ekspedisi} &middot; ${d.jenisPaket}</p>
      <p><strong>Total Pembayaran:</strong> ${formatIDR(d.totalPembayaran)}</p>
      <p><strong>Status:</strong> ${d.status}</p>
      <div class="progress"><span style="width:${d.progress}%"></span></div>
      <p>${d.progress}% selesai</p>
    `;
    res.appendChild(card);
  });

  /* ---------- Laporan: Monitoring & Rekap ---------- */
  function renderMonitoring(){
    const elMon = el("monitoringList");
    elMon.innerHTML = "";
    // gunakan doData: tampilkan setiap DO dengan progress
    Object.values(doData).forEach(d => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <strong>${d.no}</strong> &mdash; ${d.namaMahasiswa} <br/>
            <small>${d.ekspedisi} • ${d.tanggalKirim}</small>
          </div>
          <div style="min-width:220px;">
            <div class="progress"><span style="width:${d.progress}%"></span></div>
            <small>${d.status} (${d.progress}%)</small>
          </div>
        </div>
      `;
      elMon.appendChild(div);
    });
  }
  renderMonitoring();

  function renderRekapBuku(){
    const elRekap = el("rekapBuku");
    elRekap.innerHTML = "";
    // Buat rekap jumlah buku terjual (dari transaksiData)
    const counts = {};
    transaksiData.forEach(t => {
      t.items.forEach(title => {
        counts[title] = (counts[title] || 0) + 1;
      });
    });

    const table = document.createElement("table");
    table.className = "table";
    let html = "<thead><tr><th>Buku</th><th>Jumlah Terjual</th></tr></thead><tbody>";
    Object.entries(counts).forEach(([k,v]) => {
      html += `<tr><td>${k}</td><td>${v}</td></tr>`;
    });
    html += "</tbody>";
    table.innerHTML = html;
    elRekap.appendChild(table);
  }
  renderRekapBuku();

  /* ---------- Histori Transaksi ---------- */
  function renderHistory(){
    const elHist = el("historyList");
    elHist.innerHTML = "";
    if(transaksiData.length === 0) {
      elHist.innerHTML = "<div class='card'><p>Belum ada transaksi.</p></div>";
      return;
    }

    const table = document.createElement("table");
    table.className = "table";
    let html = "<thead><tr><th>No Transaksi</th><th>Tanggal</th><th>Nama</th><th>Item</th><th>Total</th><th>DO</th></tr></thead><tbody>";
    transaksiData.forEach(t => {
      html += `<tr>
        <td>${t.id}</td>
        <td>${t.tgl}</td>
        <td>${t.nama}</td>
        <td>${t.items.join(", ")}</td>
        <td>${formatIDR(t.total)}</td>
        <td>${t.doNo}</td>
      </tr>`;
    });
    html += "</tbody>";
    table.innerHTML = html;
    elHist.appendChild(table);
  }
  renderHistory();
}
