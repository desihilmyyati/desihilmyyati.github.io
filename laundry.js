// Fungsi untuk menambahkan laundry ke dalam tabel
function tambahLaundry() {
  const jenisInput = document.querySelector('input[name="jenis"]');
  const beratInput = document.querySelector('input[name="berat"]');

  const jenis = jenisInput.value;
  const berat = parseFloat(beratInput.value);

  if (jenis !== "" && !isNaN(berat) && berat > 0) {
    const harga = hitungHarga(jenis, berat); // Fungsi untuk menghitung harga

    const table = document.getElementById("laundryList");
    const newRow = table.insertRow(table.rows.length);

    const cellJenis = newRow.insertCell(0);
    const cellBerat = newRow.insertCell(1);
    const cellHarga = newRow.insertCell(2);
    const cellAksi = newRow.insertCell(3);

    cellJenis.innerHTML = jenis;
    cellBerat.innerHTML = berat + " Kg";
    cellHarga.innerHTML = "Rp." + harga;
    cellAksi.innerHTML =
      '<button onclick="editLaundry(this)">Edit</button> <button onclick="hapusLaundry(this)">Hapus</button>';

    hitungTotalHarga(); // Fungsi untuk menghitung total harga keseluruhan
    const laundryTable = document.querySelector('.laundryTable');
    laundryTable.style.display = 'table';
} else {
    alert("Mohon isi jenis dan berat laundry yang valid.");
}
  // Reset input setelah ditambahkan
  jenisInput.value = "";
  beratInput.value = "";
}

// Fungsi untuk menghitung harga berdasarkan jenis dan berat
function hitungHarga(jenis, berat) {
  let hargaPerKg = 0;
  switch (jenis.toLowerCase()) {
    case "baju":
      hargaPerKg = 5000;
      break;
    case "celana":
      hargaPerKg = 7000;
      break;
    case "handuk":
      hargaPerKg = 10000;
      break;
    case "selimut":
      hargaPerKg = 17000;
      break;
    case "sepatu":
      hargaPerKg = 20000;
      break;
    default:
      hargaPerKg = 0;
  }

  let totalHarga = hargaPerKg * berat;
  // Cek jika berat lebih dari 8 kg, berikan diskon 1 kg gratis

  return totalHarga;
}
// Fungsi untuk menghitung total harga keseluruhan
function hitungTotalHarga() {
  const table = document.getElementById("laundryList");
  let totalHarga = 0;
  for (let i = 0; i < table.rows.length; i++) {
    totalHarga += parseInt(table.rows[i].cells[2].innerHTML.replace("Rp.", ""));
  }
  document.getElementById("totalHarga").textContent = "Total : Rp." + totalHarga;
}

// Fungsi untuk menghapus laundry dari tabel
function hapusLaundry(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
  hitungTotalHarga(); // Hitung ulang total harga setelah menghapus
}

// Fungsi untuk mengedit laundry dalam tabel
function editLaundry(button) {
  const row = button.parentNode.parentNode;
  const jenis = row.cells[0].innerHTML;
  const berat = parseFloat(row.cells[1].innerHTML);
  const harga = parseFloat(
    row.cells[2].innerHTML.replace("Rp.", "").replace(",", "")
  );

  const jenisInput = document.querySelector('input[name="jenis"]');
  const beratInput = document.querySelector('input[name="berat"]');

  jenisInput.value = jenis;
  beratInput.value = berat;

  const addButton = document.querySelector(".btn-tambah");
  addButton.innerHTML = "Update"; // Mengubah teks tombol menjadi 'Update'
  addButton.setAttribute("onclick", "updateLaundry(this)"); // Mengubah fungsi tombol menjadi 'updateLaundry'
  addButton.dataset.index = row.rowIndex; // Menambahkan data-index untuk mengetahui indeks baris yang akan diupdate
}
// Fungsi untuk melakukan update pada laundry dalam tabel
function updateLaundry(button) {
  const jenisInput = document.querySelector('input[name="jenis"]');
  const beratInput = document.querySelector('input[name="berat"]');
  const jenis = jenisInput.value;
  const berat = parseFloat(beratInput.value);

  if (jenis !== "" && !isNaN(berat) && berat > 0) {
    const harga = hitungHarga(jenis, berat); // Fungsi untuk menghitung harga
    const table = document.getElementById("laundryList");
    const index = button.dataset.index; // Mendapatkan indeks baris yang akan diupdate
    const row = table.rows[index - 1]; // Mendapatkan baris yang akan diupdate

    row.cells[0].innerHTML = jenis;
    row.cells[1].innerHTML = berat + " Kg";
    row.cells[2].innerHTML = "Rp." + harga;

    hitungTotalHarga(); // Fungsi untuk menghitung total harga keseluruhan
    resetInputs();
  } else {
    alert("Mohon isi jenis dan berat laundry yang valid.");
  }

  button.innerHTML = "Hitung"; // Mengembalikan teks tombol menjadi 'Hitung'
  button.setAttribute("onclick", "tambahLaundry()"); // Mengembalikan fungsi tombol menjadi 'tambahLaundry'
  delete button.dataset.index; // Menghapus data-index setelah proses update selesai
}

// Fungsi untuk mereset input setelah proses tambah atau update
function resetInputs() {
  const jenisInput = document.querySelector('input[name="jenis"]');
  const beratInput = document.querySelector('input[name="berat"]');
  jenisInput.value = "";
  beratInput.value = "";
}

