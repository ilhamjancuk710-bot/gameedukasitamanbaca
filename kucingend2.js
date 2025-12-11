// Ambil nilai skor dari URL
const urlParams = new URLSearchParams(window.location.search);
const skor = urlParams.get("skor") || 4;

// Tampilkan skor
document.getElementById("scoreDisplay").innerText = "Skor Anda: " + skor;

// Putar suara menang otomatis
const winSound = document.getElementById("winSound");
winSound.volume = 1.0;

winSound.play().catch(() => {
  // Jika autoplay diblokir browser, tunggu klik
  document.body.addEventListener("click", () => winSound.play(), { once: true });
});
