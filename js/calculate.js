document.addEventListener("DOMContentLoaded", () => {
  const areaInput = document.getElementById("calc-area");
  const packageSelect = document.getElementById("calc-package");
  const rateDisplay = document.getElementById("calc-rate-display");
  const totalDisplay = document.getElementById("calc-total-display");

  // Harga berdasarkan kategori luas
  const prices = {
    small: {
      "Starter Plan": 20000,
      "Visual Plan": 25000,
      "Design Plan": 30000,
      "Detail Plan": 50000,
      "Complete Plan": 65000,
    },
    medium: {
      "Starter Plan": 12500,
      "Visual Plan": 17500,
      "Design Plan": 22500,
      "Detail Plan": 42500,
      "Complete Plan": 50000,
    },
    large: {
      "Starter Plan": 10000,
      "Visual Plan": 15000,
      "Design Plan": 20000,
      "Detail Plan": 40000,
      "Complete Plan": 45000,
    },
  };

  function getCategory(area) {
    if (area < 100) return "small";
    if (area <= 500) return "medium";
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

    rateDisplay.textContent = `${formatRupiah(price)} / m²`;
    totalDisplay.textContent = formatRupiah(total);
  }

  areaInput.addEventListener("input", calculate);
  packageSelect.addEventListener("change", calculate);

  calculate();
});
