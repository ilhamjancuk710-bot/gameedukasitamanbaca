// ==========================
//  TOMBOL BUNYI (🔊)
// ==========================
document.querySelectorAll(".sound-btn").forEach(btn => {
    btn.addEventListener("click", (event) => {
        event.stopPropagation(); // Hindari klik item
        const soundFile = btn.getAttribute("data-sound");

        const audio = new Audio(soundFile);
        audio.play().catch(err => console.log("Gagal memutar audio:", err));
    });
});
