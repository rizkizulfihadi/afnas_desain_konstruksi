document.addEventListener("DOMContentLoaded", () => {
  const areaInput = document.getElementById("calc-area");
  const packageSelect = document.getElementById("calc-package");
  const rateDisplay = document.getElementById("calc-rate-display");
  const totalDisplay = document.getElementById("calc-total-display");
  const whatsappButton = document.getElementById("whatsapp-button");

  // Nomor WhatsApp
  const phoneNumber = "6285287979496";

  // Harga berdasarkan kategori luas
  const prices = {
    small: {
      "Paket A Visual Plan": 25000,
      "Paket B Detail Visual 3D": 50000,
      "Paket C Detail Engineering Desain": 75000,
    },
    large: {
      "Paket A Visual Plan": 20000,
      "Paket B Detail Visual 3D": 45000,
      "Paket C Detail Engineering Desain": 65000,
    },
  };

  function getCategory(area) {
    if (area <= 100) return "small";
    return "large";
  }

  function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  function calculate() {
    const area = Number(areaInput.value) || 0;
    const category = getCategory(area);
    const packageName = packageSelect.value;

    const price = prices[category][packageName];
    const total = area * price;

    // Update tampilan kalkulator
    rateDisplay.textContent = `${formatRupiah(price)} / m²`;
    totalDisplay.textContent = formatRupiah(total);

    // Membuat pesan WhatsApp
    const message = `Halo, saya ingin konsultasi desain rumah.

Berikut detail pilihan saya:

Paket Desain: ${packageName}
Luas Bangunan: ${area} m²
Harga Satuan: ${formatRupiah(price)} / m²
Estimasi Biaya: ${formatRupiah(total)}

Mohon informasi lebih lanjut. Terima kasih.`;

    // Update link WhatsApp
    whatsappButton.href = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  }

  // Perubahan luas
  areaInput.addEventListener("input", calculate);

  // Perubahan dropdown
  packageSelect.addEventListener("change", calculate);

  // ==========================================
  // Tombol "Pilih Paket"
  // ==========================================

  const packageButtons = document.querySelectorAll(".btn-select-package");

  packageButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const selectedPackage = button.dataset.package;

      // Pilih paket pada dropdown
      packageSelect.value = selectedPackage;

      // Hitung ulang harga
      calculate();

      // Scroll ke kalkulator
      document.getElementById("calc-package").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  });

  // Hitung pertama kali
  calculate();
});
